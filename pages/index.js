import React, { useEffect, useContext } from "react";
import DrawerCustom from "./components/drawer";
import CardCustom from "./components/card";
import ModalCustom from "./components/modal";
import AlertCustom from "./components/alert";
import DehazeIcon from "@mui/icons-material/Dehaze";
import ListItemButton from "@mui/material/ListItemButton";
//Icons
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
// Context
import configContext from "./context/config/configContext";

import { Container } from "@mui/material";

export default function Home() {
  const {
    getAllUsers,
    drawerState,
    openDrawer,
    isHiddenAlert,
    userOrder,
    userOrderBySales,
  } = useContext(configContext);

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      {!drawerState && (
        <ListItemButton
          style={{
            width: 50,
            borderRadius: 4,
            justifyContent: "center",
            position: "fixed",
            top: 0,
            left: 0,
          }}
          onClick={() => openDrawer(true)}
        >
          <DehazeIcon
            style={{
              color: "black",
              cursor: "pointer",
            }}
          />
        </ListItemButton>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          position: "fixed",
          top: 0,
          right: 0,
        }}
      >
        <ListItemButton
          style={{ borderRadius: 4, color: "black", fontSize: 13 }}
          onClick={() => userOrderBySales()}
        >
          <ProductionQuantityLimitsIcon
            style={{
              color: "rgba(89, 212, 169, 0.695)",
              cursor: "pointer",
              marginRight: 3,
            }}
          />{" "}
          Orden por ventas
        </ListItemButton>
        <ListItemButton
          style={{ borderRadius: 4, color: "black", fontSize: 13 }}
          onClick={() => userOrder()}
        >
          <SortByAlphaIcon
            style={{
              color: "rgba(89, 212, 169, 0.695)",
              cursor: "pointer",
              marginRight: 3,
            }}
          />{" "}
          Orden por nombre
        </ListItemButton>
      </div>

      <Container style={{ paddingTop: 60, paddingLeft: 40 }}>
        <DrawerCustom />
        <CardCustom />
        <ModalCustom />
      </Container>
      {!isHiddenAlert && <AlertCustom />}
    </>
  );
}
