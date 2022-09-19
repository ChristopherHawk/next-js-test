import React, { useState, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Divider, ListItemButton } from "@mui/material";
import { Grid, Rating } from "@mui/material";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
//Context
import configContext from "../../context/config/configContext";

export default function MediaControlCard() {
  
  const { users, openModalFunction, showUser, randomNumberProducts } = useContext(configContext);

  if (!users) return `Loading...`;
  return (
    <Grid container spacing={3}>
      {users.map((item, key) => (
        <Grid style={{justifyContent:'center', display:'flex'}} key={key} item xs>
          <Card
            onClick={() => {openModalFunction(true); showUser(item)}}
            sx={{ width: 160, height: 192 }}
          >
            <ListItemButton style={{position:'absolute',zIndex:1, background:'rgba(89, 212, 169, 0.695)',borderBottomRightRadius:4, display:'flex'}}>
            <ProductionQuantityLimitsIcon fontSize="3" style={{marginRight:4, color:'white'}}/>{randomNumberProducts(item.id)}
            </ListItemButton>
            <CardActionArea>
              <CardMedia
                component="img"
                height="100"
                image={item.avatar}
                alt="Avatar"
              />
              <p style={{marginTop:-1, marginBottom:-10, marginLeft:4, color:'white'}}>{randomNumberProducts(item.id) < 9? 'Lider':'Distribuidor'}</p>
              <Divider style={{background:randomNumberProducts(item.id) < 9 ? `rgba(89, 212, 169, 0.695)`: `rgba(8, 22, 169, 0.695)`, height:15, marginTop:-16}}/>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  style={{ fontSize: 15 }}
                  component="div"
                >
                  {item.first_name} {item.last_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <Rating name="read-only" value={item.id % 5} readOnly />
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
