import React, { useState, useContext } from "react";
import {
  Modal,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Rating,
  ListItemButton,
  TextField
} from "@mui/material";
//Icons
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
//Context
import configContext from "../../context/config/configContext";
import { Edit } from "@mui/icons-material";

const ModalCustom = () => {
  const {
    openModalFunction,
    isOpenModal,
    userInfo,
    removeUser,
    randomNumberProducts,
  } = useContext(configContext);

  const [inputEdit, setInputEdit] = useState(false);
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    score: 0,
  });

  if (!userInfo) return `loading...`;
  return (
    <Modal
      open={isOpenModal}
      onClose={() => console.log("")}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ListItemButton
          style={{ position: "absolute", right: 10, top: 10, background:'rgba(89, 212, 169, 0.695)', borderRadius:5 }}
          onClick={() => openModalFunction(false)}
        >
          <CloseIcon />
        </ListItemButton>

        <Card sx={{ width: 260, height: 500 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="200"
              image={userInfo.avatar}
              alt="Avatar"
            />
            {!inputEdit && (
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  style={{ fontSize: 17 }}
                  component="div"
                >
                  <BadgeIcon style={{width:19, marginBottom:-4, marginRight:3, color:'rgba(9, 22, 169, 0.695)'}}/> 
                 {userInfo.first_name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                <EmailIcon style={{width:19, marginBottom:-8, marginRight:3, color:'rgba(9, 22, 169, 0.695)'}}/> 
                  {userInfo.email}
                <Typography
                  gutterBottom
                  variant="h6"
                  style={{ fontSize: 15, marginTop:10 }}
                  component="div"
                >
                    <ProductionQuantityLimitsIcon  style={{width:19, marginBottom:-8, marginRight:3, color:'rgba(9, 22, 169, 0.695)'}}/> 
                  <b>Productos vendidos: </b>{" "}
                  {randomNumberProducts(userInfo.id)}
                </Typography>
                  <br />
                  <Rating
                    style={{ marginLeft: "25%" }}
                    name="read-only"
                    value={userInfo.id % 5}
                    readOnly
                  />
                </Typography>
                
              </CardContent>
            )}
            {inputEdit && (
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  style={{ fontSize: 17 }}
                  component="div"
                >
                  <TextField
                    style={{ width: "100%" }}
                    id="input-with-icon-textfield"
                    label="Nombre"
                    value={
                      inputValue.name === ""
                        ? `${userInfo.first_name}  ${userInfo.last_name}`
                        : inputValue.name
                    }
                    onChange={({ target }) =>
                      setInputValue({ ...inputValue, name: target.value })
                    }
                    variant="standard"
                  />
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <TextField
                    style={{ width: "100%" }}
                    id="input-with-icon-textfield"
                    label="Email"
                    value={
                      inputValue.email === ""
                        ? userInfo.email
                        : inputValue.email
                    }
                    onChange={({ target }) =>
                      setInputValue({ ...inputValue, email: target.value })
                    }
                    variant="standard"
                  />

                  <br />
                  <br />
                  <br />
                  <br />
                  <Rating
                    style={{ marginLeft: "25%" }}
                    name="simple-controlled"
                    value={
                      inputValue.score === 0
                        ? userInfo.id % 5
                        : inputValue.score
                    }
                    onChange={(event, newValue) => {
                      setInputValue({ ...inputValue, score: newValue });
                    }}
                  />
                </Typography>
              </CardContent>
            )}
            {!inputEdit && (
              <ListItemButton
                style={{
                  width: 110,
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: 10,
                  background:'rgba(9, 22, 169, 0.295)',
                  borderRadius:5
                }}
                onClick={() => setInputEdit(true)}
              >
                <Edit style={{ color: "black" }} /> Editar
              </ListItemButton>
            )}
            {!inputEdit && (
              <ListItemButton
                style={{
                  width: 110,
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: 10,
                  background:'rgba(9, 22, 169, 0.295)',
                  borderRadius:5
                }}
                onClick={() =>
                  removeUser(
                    userInfo.id,
                    `${userInfo.first_name} ${userInfo.last_name}`
                  )
                }
              >
                <DeleteIcon style={{ color: "red" }} /> Eliminar
              </ListItemButton>
            )}

            {inputEdit && (
              <ListItemButton
                style={{
                  width: 110,
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: 20,
                  background:'rgba(98, 202, 169, 0.295)',
                  borderRadius:5
                }}
                onClick={() => {
                  setInputEdit(false);
                  setInputValue({
                    name: "",
                    email: "",
                    score: 0,
                  });
                }}
              >
                <SaveIcon style={{ color: "green" }} /> Guardar
              </ListItemButton>
            )}
          </CardActionArea>
        </Card>
      </div>
    </Modal>
  );
};

export default ModalCustom;
