import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Navigate, Outlet, Route, Router, useNavigate } from 'react-router-dom'
import Register from './Register'
import axios from 'axios'
import { Toast } from 'toaster-js'
import { CircularProgress, IconButton } from '@mui/material'
const Login = () => {
  const [progress,setprogress]=useState(false)
  const navigate=useNavigate()
  const [user,setuser]=useState({
    name:"",
    password:"",
  })
  const handlechanger=(e)=>{
    setuser({...user,[e.target.name]:e.target.value})
  }
  const loginhandler= async()=>{
    try{
      setprogress(true)
      const config={
        headers:{
           "Content-type":"application/json",
           "Access-Control-Allow-Origin": "*",
           "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        },
      }
      const response=await axios.post("http://localhost:5000/user/login/",user,config)
      setprogress(false)
      if(response)
      {
        localStorage.setItem("userdata",JSON.stringify(response))
        navigate("/app/welcome")
      }
    }
    catch(err)
   {
    console.log("error")
   }
  }
  return (
    <div className={progress?<CircularProgress/>:"login-container"}>
        <div className='login-box'>
            <p>LOG IN TO YOUR ACCOUNT</p>
        <TextField id="outlined-basic 1" label="enter username" name="name" onChange={handlechanger} variant="outlined" />
        <TextField id="outlined-basic 2" label="enter password" name='password' onChange={handlechanger} variant="outlined" type='password'  onKeyDown={(event) => {
                if (event.code == "Enter") {
                  
                  loginhandler();
                }
              }}/>
        <Button variant="contained" onClick={loginhandler}>log in </Button>
        <p>DO YOU HAVE NO ACCOUNT <a href='' onClick={()=>{navigate('register')}}>REGISTER</a></p>
        </div>
    </div>
  )
}

export default Login