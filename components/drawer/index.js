//Libs
import React, { useState, useContext } from "react";
import {
  SwipeableDrawer,
  ListItemIcon,
  InputAdornment,
  TextField,
  Divider,
  List,
  ListItem,
  Box,
  Avatar,
  ListItemText,
  ListItemButton,
  Button,
} from "@mui/material";

//Icons
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CloseIcon from "@mui/icons-material/Close";
import GitHubIcon from '@mui/icons-material/GitHub';
//Context
import configContext from "../../context/config/configContext";

export default function SwipeableTemporaryDrawer() {
  //Hook context
  const { drawerState, openDrawer, filterUsers, getAllUsers } = useContext(configContext);

  //Hook State
  const [code, setCode] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const abrirNuevoTab =(url)=> {
    // Abrir nuevo tab
    var win = window.open(url, '_blank');
    // Cambiar el foco al nuevo tab (punto opcional)
    win.focus();
  }

  const itemsDrawer = [
    {
      name: "Usuarios",
      icon: <PeopleAltIcon style={{color:'rgba(9, 22, 169, 0.695)'}}/>,
      code: 1,
      function: () => {getAllUsers(); openDrawer(false);},
    },
    {
      name: "Filtrar",
      icon: <FilterAltIcon style={{color:'rgba(89, 212, 169, 0.695)'}} />,
      code: 2,
      function: () => setCode(true),
    },
    {
      name: "Github",
      icon:  <GitHubIcon style={{color:'black'}}/>,
      code: 3,
      function: () => {openDrawer(false); abrirNuevoTab('https://github.com/ChristopherHawk')},
    }
  ];
 

  return (
    <div>
      <SwipeableDrawer
        anchor="left"
        onOpen={() => console.log("")}
        open={drawerState}
        onClose={() => console.log("")}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <Avatar
            alt="Remy Sharp"
            src="https://o.dlf.pt/dfpng/smallpng/52-528659_super-admin-icon-png-transparent-png.png"
            sx={{
              width: 150,
              height: 150,
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 5,
            }}
          />
          <p style={{textAlign:'center'}}>Néstor Barraza Otalvarez</p>
          <Divider />
          {!code && (
            <List>
              {itemsDrawer.map((item, key) => (
                <ListItem key={key} disablePadding>
                  <ListItemButton onClick={item.function}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
          <List style={{position:'absolute', bottom:5, width:'100%'}}>
                <ListItem disablePadding>
                  <ListItemButton onClick={ ()=> {openDrawer(false)}}>
                    <ListItemIcon><CloseIcon/></ListItemIcon>
                    <ListItemText primary='Cerrar' />
                  </ListItemButton>
                </ListItem>
            </List>
          {/* Submenu */}
          {code && (
            <List>
              <ListItemButton onClick={() => setCode(false)}>
                <ArrowBackIosIcon /> Atrás
              </ListItemButton>
              <br/>
              <br/>
              <ListItem>
                <TextField
                  id="input-with-icon-textfield"
                  label="Buscar Usuario"
                  value={inputValue}
                  onChange={({ target }) => setInputValue(target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                />
              </ListItem>
              <br/>
              <br/>
              <div style={{width:'100%', justifyContent:'center', display:'flex'}}>
              <Button
                style={{
                  background: "rgb(123, 168, 216)",
                  color: "white",
                  marginLeft: "auto",
                  marginRight: "auto"
                }}
                onClick={() => {filterUsers(inputValue); setInputValue(''); setCode(false); openDrawer(false)}}
              >
                Buscar
              </Button>
              </div>
            </List>
          )}
        </Box>
      </SwipeableDrawer>
    </div>
  );
}
