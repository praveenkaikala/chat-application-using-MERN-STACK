import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const navigate=useNavigate()
  const [user,setuser]=useState({
    name:"",
    email:"",
    password:"",
  })
  const handlechanger=(e)=>{
    setuser({...user,[e.target.name]:e.target.value})
  }
  const registerhandler= async()=>{
    try{
      const config={
        headers:{
           "Content-type":"application/json",
           "Access-Control-Allow-Origin": "*",
           "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        },
      }
      const response=await axios.post("https://web-service-17f8.onrender.com/user/register/",user,config)
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
    <div className='register-container'>
      
        <div className='login-box'>
            <p>REGISTER TO YOUR ACCOUNT</p>
        <TextField id="outlined-basic 1" label="enter username" variant="outlined" name='name' onChange={handlechanger}/>
        <TextField id="outlined-basic 2 " label="enter email" variant="outlined" name='email' onChange={handlechanger} />
        <TextField id="outlined-basic 3" label="enter password" variant="outlined" type='text' name='password' onChange={handlechanger}/>
        <Button variant="contained" onClick={registerhandler}>Register </Button>
        <p>click here to  <Button variant='containes' onClick={()=>{navigate('/')}}>LOGIN</Button></p>
        </div>
    </div>
  )
}

export default Register