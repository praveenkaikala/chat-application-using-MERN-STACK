import React from "react";
import Container from "./components/Container";
import "./App.css";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome";
import Workarea from "./components/Workarea";
import Onlineusers from "./components/Onlineusers";
import Creategroups from "./components/Creategroups";
import Groups from "./components/Groups";
import Register from "./components/Register";

const App = () => {
  return (
    <div className="body">
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="register" element={<Register/>}/>
        <Route path="App" element={<Container />}>
          <Route path="welcome" element={<Welcome />} />
          <Route path="chat/:_id" element={<Workarea />} />
          <Route path="users" element={<Onlineusers />} />
          <Route path="create-groups" element={<Creategroups />} />
          <Route path="groups" element={<Groups />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
