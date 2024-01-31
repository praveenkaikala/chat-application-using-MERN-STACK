import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CircularProgress } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  const notify = () =>{ toast('🦄 Wow so easy!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  
    });;
  }
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
      const response=await axios.post("https://web-service-17f8.onrender.com/user/login/",user,config)
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
                if (event.code === "Enter") {
                  
                  loginhandler();
                }
              }}/>
        <Button variant="contained" onClick={()=>{
          loginhandler()
          notify()
        }
        }>log in </Button>
        <p>DO YOU HAVE NO ACCOUNT <Button variant='containes' onClick={()=>{navigate('/register')}}>Register</Button></p>
        </div>
        <ToastContainer />
    </div>
  )
}

export default Login