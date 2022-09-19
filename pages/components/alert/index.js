import React, { useEffect, useContext } from "react";
import { Alert, Button } from "@mui/material";
import configContext from "../../context/config/configContext";
const AlertCustom = () => {
    
    const { alertContent } = useContext(configContext);
    
    return ( 
        <Alert
        severity={alertContent.type}
        style={{position:'fixed', top:0, width:'100%'}}
      >
        {alertContent.title} - {alertContent.message}
      </Alert>
        );
}
 
export default AlertCustom;