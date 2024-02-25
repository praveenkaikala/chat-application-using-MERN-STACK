import React, { useContext, useEffect, useRef } from 'react'
import './styles.css'
import { CircularProgress, IconButton } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import Messageothers from './Messageothers';
import Messageself from './Messageself';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { mycontext } from './Container';
import { io } from 'socket.io-client';
const Endpoint="https://web-service-17f8.onrender.com"
var socket;

const Workarea = () => {
  const [loder,setloder]=useState(false)
  const {chatload,setchatload}=useContext(mycontext)
  const cref=useRef(null)
  const perams=useParams()
  const nav=useNavigate()
  const [chatid,chatname]=perams._id.split("&")
  const [messages,setmessages]=useState([])
  const [copyMessages,setCopyMessages]=useState([])
  const [content,setcontent]=useState("")
  const userdata=JSON.parse(localStorage.getItem("userdata"))
  if(!userdata)
  {
nav("/")
  }
  const config={
    headers:{
      "Content-type":"application/json",
      "Access-Control-Allow-Origin": "*",
      "authorization":`Bearer ${userdata.data.token}`,
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  }
  useEffect(()=>{

   socket=io(Endpoint)
   socket.emit("setup",userdata.data)

  },[])
  useEffect(()=>{
    socket.on("message recieved",(newmessage)=>{
      if(chatid === newmessage.chat._id)
      setmessages([...messages,newmessage])     
     })
     return()=>{
        socket.off("message recieved")
     }
  })
  useEffect(()=>{
    
    socket.emit("join room",chatid)
    console.log(`joined ${chatid}`)
  },[chatload])
  useEffect(()=>{
   async function data(){
    setloder(true)
    try
    {
       await axios.get("https://web-service-17f8.onrender.com/message/"+chatid,config).then((response)=>{
     
      setmessages(response.data)})
      setloder(false)
    }
    catch(err)
    {
     console.log(err)
    }
  
      
   }
  data()
    
  },[chatload])

useEffect(()=>{
  if(messages.length)
  {
    cref.current?.scrollIntoView({
     
      block:"end"
    })
  }
})
  const sendmessage=async()=>{
    const messaage=content
    setcontent("")
    let data=null
    const details={
      content:messaage,
      chatId:chatid
    }
    try{
      await axios.post("https://web-service-17f8.onrender.com/message/",details,config).then((response)=>{
  
      data=response.data
    })
    socket.emit("new message",data)
    setmessages([...messages,data])
    }
   catch(err)
   {
    console.log(err)
   }
    
   

  }
  return (
    <div className='workarea'>
      <div className='chatarea-header'>
        <div className='chatarea-pic'>
        
          <p className='c-icon'>{chatname[0]}</p>
        
  
        </div>
        <div className='chatarea-name'>
         <p className='c-name'>
          {chatname}
         </p>
        </div>
        <IconButton onClick={async()=>{
          setloder(true)
          const data={chatId:chatid}
          try{
            await axios.put("https://web-service-17f8.onrender.com/message/deletemessages/",data,config)
          setchatload(!chatload)
          setloder(false)
          }
          catch(err)
          {
            console.log(err)
          }
          

        }}>
          <DeleteIcon/>
        </IconButton>
      </div>
      <div className='message-container'>
           {loder?<CircularProgress color="secondary" style={{"heigth":"100%","alignSelf":"center","justifySelf":"center"}}/>:
           messages.map((message,index)=>{
            const userId=userdata.data._id;
            const sender=message.sender._id
            if(userId===sender)
            {
              return <div key={index}><Messageself props={message}  index={index}/>
              <div ref={cref}/>
              </div>
            }
            else{
              return <div key={index}><Messageothers props={message} name={chatname} index={index}/>
              <div ref={cref}/>
              </div>
            }
           })}

         
      </div>
      <div className='text-input'>
      <input placeholder='enter message' value={content} className='search-box input-box' onChange={(e)=>{
        setcontent(e.target.value)
      }} onKeyDown={(event)=>{
        if ( event.code === "Enter" )
        {
          sendmessage()
        }
      }}/>
      <IconButton onClick={sendmessage} >
        <SendIcon/>
      </IconButton>
      </div>
    </div>
  )
}

export default Workarea