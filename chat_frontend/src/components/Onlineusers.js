import { IconButton } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {CircularProgress} from "@mui/material";
import { mycontext } from "./Container";
const Onlineusers = () => {
  const nav = useNavigate();
  const [loader,setloader]=useState(true)
  const { refresh, setrefresh } = useContext(mycontext);
  const [users, setusers] = useState([]);
  const token = JSON.parse(localStorage.getItem("userdata"));
  if (!token) {
    nav(-1);
  }
  useEffect(() => {
    function fetchdata() {
      
      const config = {
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          authorization: `Bearer ${token.data.token}`,
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      };
      axios
        .get("https://web-service-17f8.onrender.com/user/fetchuser/", config)
        .then((data) => {
          setusers(data.data);
         
        });
        
    }

    fetchdata();
    setloader(false)
  }, [refresh]);
  return (
    <div className="onlineuser-container">
      <div className="sb-search">
        <IconButton>
          <SearchIcon />
        </IconButton>
        <input
          className="search-box"
          type="text"
          placeholder="search for users"
        />
      </div>
      <div className="users-list">
        {loader?<div className="list-item" style={{"width":"100%"}}><CircularProgress style={{"alignSelf":"center"}}/></div>:
        users.map((user, index) => {
          return (
            <div
              className="list-item"
              key={index}
              onClick={async () => {
                const config = {
                  headers: {
                    "Content-type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    authorization: `Bearer ${token.data.token}`,
                    "Access-Control-Allow-Methods":
                      "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                  },
                };
                await axios.post(
                  "https://web-service-17f8.onrender.com/chat/",
                  {
                    userId: user._id,
                  },
                  config
                );
              
                setrefresh(!refresh);
              }}
            >
              <p className="c-icon">{user.name[0]}</p>
              <p className="c-name">{user.name}</p>
            </div>
          );
        })
        }
        
      </div>
    </div>
  );
};

export default Onlineusers;
