import React, { createContext, useState } from "react";
import "./styles.css";
import Slidebar from "./Slidebar";
import { Outlet } from "react-router-dom";
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
    </div>
  );
};

export default Container;
