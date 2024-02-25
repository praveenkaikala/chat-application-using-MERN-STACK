import { IconButton } from '@mui/material'
import React, { useContext, useState } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import { mycontext } from './Container';
import axios from 'axios';
const Creategroups = () => {
  const [Groupname,setgroupname]=useState("")
  const {refresh,setrefresh}=useContext(mycontext)
  const userdata=JSON.parse(localStorage.getItem("userdata"))
  const config={
    headers:{
      "Content-type":"application/json",
      "Access-Control-Allow-Origin": "*",
      "authorization":`Bearer ${userdata.data.token}`,
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  }

  const creategroup=async()=>{
    try{
      const data={Groupname:Groupname}
    await axios.post("https://web-service-17f8.onrender.com/chat/creategroup/",data,config)
    setrefresh(!refresh)
    setgroupname("")
    }
    catch(err)
    {
      console.log(err)
    }
  }
  return (
    <div className='group-container'>
        <input type='txt'  placeholder='enter group name' value={Groupname} className='search-box group-input' onChange={(e)=>{
          setgroupname(e.target.value)
        }}/>
        <IconButton onClick={creategroup}>
          <CheckIcon/>
        </IconButton>
        </div>
  )
}

export default Creategroups