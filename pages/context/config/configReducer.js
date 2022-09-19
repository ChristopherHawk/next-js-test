import { USER_DETAILS, GET_ALL_USERS, CHANGE_DRAWER_STATE, OPEN_MODAL, SHOW_ALERT, PUSH_ALERT_CONTENT } from "../types";

const configReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case USER_DETAILS:
      return {
        ...state,
        userInfo: payload,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        users: payload,
      };
    case CHANGE_DRAWER_STATE:
      return {
        ...state,
        drawerState: payload,
      };
    case OPEN_MODAL:
      return {
        ...state,
        isOpenModal: payload,
      };
    case SHOW_ALERT:
      return {
        ...state,
        isHiddenAlert: payload,
      };
    case PUSH_ALERT_CONTENT:
      return {
        ...state,
        alertContent: payload,
      };
    default:
      return state;
  }
};

export default configReducer;
