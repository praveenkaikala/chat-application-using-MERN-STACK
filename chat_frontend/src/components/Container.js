import React, { createContext, useState } from "react";
import "./styles.css";
import Slidebar from "./Slidebar";
import Workarea from "./Workarea";
import Welcome from "./Welcome";
import Creategroups from "./Creategroups";
import Onlineusers from "./Onlineusers";
import { Outlet } from "react-router-dom";
import { Circle } from "@mui/icons-material";
export const mycontext = createContext();
const Container = () => {
  const [chatload, setchatload] = useState(false);
  const [refresh, setrefresh] = useState(true);
  return (
    <div className="container">
      <mycontext.Provider
        value={{
          refresh: refresh,
          setrefresh: setrefresh,
          chatload: chatload,
          setchatload: setchatload,
        }}
      >
        <Slidebar />
        <Outlet />
      </mycontext.Provider>

      {/* <Onlineusers/> */}
      {/* <Creategroups/> */}
      {/* <Welcome/> */}
      {/* <Workarea /> */}
    </div>
  );
};

export default Container;
