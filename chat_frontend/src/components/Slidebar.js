import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {CircularProgress, IconButton } from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Conversationitem from "./Conversationitem";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import axios from "axios";
import { mycontext } from "./Container";
const Slidebar = () => {
  const [loader,setloader]=useState(false)
  const {refresh}=useContext(mycontext)
  const navigate = useNavigate();
  const logout=()=>{
    localStorage.removeItem("userdata");
    navigate("/")
  }
  const [conversations, setconversations] = useState([]);
  const userdata=JSON.parse(localStorage.getItem("userdata"))
  if(!userdata)
  {
    navigate("/")
  }
  useEffect(()=>{
    setloader(true)
    const config={
      headers:{
        "Content-type":"application/json",
        "Access-Control-Allow-Origin": "*",
        "authorization":`Bearer ${userdata.data.token}`,
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      }
    }
    try{
       axios.get("https://web-service-17f8.onrender.com/chat/",config).then((result)=>{
      setconversations(result.data)
      setloader(false)
    })
  }
   catch(err)
   {
    console.log(err)
   }

    
  },[refresh])
  
  return (
    <div className="slidebar">
      <div className="sb-header">
        <div  className="admin-icon">
           <p className="c-icon " >{userdata.data.name[0]}</p>
        </div>
        <div>
          <IconButton onClick={()=>{
            navigate('users')
          }}>
            <PersonAddIcon />
          </IconButton>
          <IconButton onClick={()=>{
            navigate('groups')
          }}>
            <GroupAddIcon />
          </IconButton>
          <IconButton  onClick={()=>{
            navigate('create-groups')
          }}>
            <AddIcon />
          </IconButton>
           <IconButton onClick={logout}>
             <LogoutIcon/>
          </IconButton> 
        </div>
      </div>
    
      <div className="sb-conversation">
        {loader?<CircularProgress/>:conversations.map((conversation,index) => {
          return (
            <Conversationitem props={conversation} userdata={userdata.data} key={index} />
          ); }
        )}
      </div>
    </div>
  );
};

export default Slidebar;
