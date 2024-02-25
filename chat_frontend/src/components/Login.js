import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CircularProgress } from '@mui/material'
const Login = () => {
  const [progress,setprogress]=useState(false)
  const [errMsg,setErrMsg]=useState("")
  const navigate=useNavigate()
  const [user,setuser]=useState({
    name:"",
    password:"",
  })
  const handlechanger=(e)=>{
    setErrMsg("")
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
      const response=await axios.post("https://web-service-17f8.onrender.com/user/login/",user,config)
      setprogress(false)
     
      if(response.status===200)
      {
       
        localStorage.setItem("userdata",JSON.stringify(response))
        navigate("/app/welcome")
      }
    }
    catch(err)
   {
    setprogress(false)
    setErrMsg("username or password incorrect")
   }
  }
  return (
    <div className={progress?<CircularProgress/>:"login-container"}>
        <div className='login-box'>
            <p style={{margin:"10px"}}>LOG IN TO YOUR ACCOUNT</p>
        <TextField id="outlined-basic 1" label="enter username" name="name" onChange={handlechanger} variant="outlined" />
        <TextField id="outlined-basic 2" label="enter password" name='password' onChange={handlechanger} variant="outlined" type='password'  onKeyDown={(event) => {
                if (event.code === "Enter") {
                  
                  loginhandler();
                }
              }}/>
              <span style={{color:"red"}}>{errMsg}</span>
        <Button variant="contained" onClick={()=>{
          loginhandler()
        }
        }>{progress ? <CircularProgress color="inherit" /> : "Log in"}</Button>
        <p>DO YOU HAVE NO ACCOUNT <Button variant='containes' onClick={()=>{navigate('/register')}}>Register</Button></p>
        </div>
    </div>
  )
}

export default Login