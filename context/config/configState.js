import React, { useReducer } from "react";
import UserReducer from "./configReducer";
import UserContext from "./configContext";
import axios from "axios";
const { NEXT_PUBLIC_API_HOST } = process.env;

const UserState = (props) => {
  const initialState = {
    //All users
    users: [],
    userInfo: null,
    drawerState: true,
    isOpenModal: false,
    isHiddenAlert: true,
    alertContent: {
      title: "test",
      type: "warning",
      message: "",
    },
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  //Api Axios instance

  const api = axios.create({
    baseURL: NEXT_PUBLIC_API_HOST,
  });

  // SHow alert
  const showAlert = () => {
    dispatch({
      type: "SHOW_ALERT",
      payload: false,
    });

    setTimeout(() => {
      dispatch({
        type: "SHOW_ALERT",
        payload: true,
      });
    }, 3000);
  };
  //Alert content
  const alertContentFunction = (alertInfo) => {
    dispatch({
      type: "PUSH_ALERT_CONTENT",
      payload: alertInfo,
    });
  };

  //Get all users

  const getAllUsers = async () => {
    try {
      const { data } = await api.get("/users?per_page=1000");
      dispatch({
        type: "GET_ALL_USERS",
        payload: data.data,
      });
      return data;
    } catch (error) {
      showAlert();
      alertContentFunction({
        title: error.code,
        type: "error",
        message: error.message,
      });
    }
  };

  //Find User

  const filterUsers = async (word) => {
    if (word !== "") {
      const resultFilter = state.users.filter((items) =>
        items.first_name.toLowerCase().includes(word.toLowerCase())
      );
      if (resultFilter.length === 0) {
        showAlert();
        alertContentFunction({
          title: "Búsqueda",
          type: "warning",
          message: "No hay resultados.",
        });

        setTimeout(() => {
          getAllUsers();
        }, 2000);
      } else {
        dispatch({
          type: "GET_ALL_USERS",
          payload: resultFilter,
        });
      }
    }
  };

  //Change drawer state
  const openDrawer = (state) => {
    dispatch({
      type: "CHANGE_DRAWER_STATE",
      payload: state,
    });
  };
  //Open modal
  const openModalFunction = (state) => {
    dispatch({
      type: "OPEN_MODAL",
      payload: state,
    });
  };
  //Random number
  const randomNumberProducts = (id) => {
    if (id) {
      let randomNumber = id * 2;
      return randomNumber;
    }
  };
  //User detail
  const showUser = (userInfo) => {
    dispatch({
      type: "USER_DETAILS",
      payload: userInfo,
    });
  };
  //User Organize
  const userOrder = () => {
    const userOrganize = state.users.sort(function (a, b) {
      return a.first_name.localeCompare(b.first_name, "en", {
        numeric: true,
      });
    });

    dispatch({
      type: "GET_ALL_USERS",
      payload: userOrganize,
    });
  };
  //User Organize by sales
  const userOrderBySales = () => {
    const salesOrganize = state.users.sort(function (a, b) {
      return randomNumberProducts(a.id) - randomNumberProducts(b.id);
    });
    dispatch({
      type: "GET_ALL_USERS",
      payload: salesOrganize,
    });
  };
  //Delete user
  const removeUser = async (userID, name) => {
    try {
      await api.delete(`/users/${userID}`);
      getAllUsers();
      showAlert();
      alertContentFunction({
        title: "Eliminar",
        type: "success",
        message: `El usuario ${name} ha sido eliminado con éxito!`,
      });
      openModalFunction(false);
    } catch (error) {
      console.log(error);
      showAlert();
      alertContentFunction({
        title: error.code,
        type: "error",
        message: error.message,
      });
      openModalFunction(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        //Functions
        filterUsers,
        openDrawer,
        getAllUsers,
        openModalFunction,
        showUser,
        removeUser,
        showAlert,
        userOrder,
        randomNumberProducts,
        userOrderBySales,
        //States
        users: state.users,
        userInfo: state.userInfo,
        drawerState: state.drawerState,
        isOpenModal: state.isOpenModal,
        isHiddenAlert: state.isHiddenAlert,
        alertContent: state.alertContent,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
