import { IconButton } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { mycontext } from "./Container";
import axios from "axios";
const Groups = () => {
  const {refresh,setrefresh}=useContext(mycontext)
  const [groups,setgroups]=useState([])
  const userdata=JSON.parse(localStorage.getItem("userdata"))
  const config = {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "authorization": `Bearer ${userdata.data.token}`,
      "Access-Control-Allow-Methods":
        "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  useEffect(()=>{
    async function fetchgroup()
    {
       await axios.get("http://localhost:5000/chat/fetchgroup/",config).then((res)=>{
      setgroups(res.data)
     })
    }
    fetchgroup()
  })
  return (
    <div className="onlineuser-container">
      <div className="sb-search">
        <IconButton>
          <SearchIcon />
        </IconButton>
        <input className="search-box" type="text" placeholder="search for groups" onChange={(e)=>{
          // setgroup(e.target.value)
        }} />
      </div>
      <div className="users-list">
{
  groups.map((group,index)=>{
    return (
       <div className="list-item" key={index} onClick={async()=>{
        const data={chatId:group._id}
        await axios.put("http://localhost:5000/chat/joingroup/",data,config)
        setrefresh(!refresh)

       }}>
    <p className="c-icon">{group.chatname[0]}</p>
    <p className="c-name">{group.chatname}</p>
  </div>
  )
  
  })
}
    </div>
    </div>
  );
};
export default Groups;