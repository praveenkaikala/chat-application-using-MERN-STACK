import React, { useEffect } from 'react'
import logo from "./logo.png"
import { useNavigate } from 'react-router-dom'

const Welcome = () => {
  const nav=useNavigate()
  useEffect(()=>{
    
  const userdata=JSON.parse(localStorage.getItem("userdata"))
  if(!userdata)
  {
    console.log("user not authticated")
    nav("/")
  }

  })
  
  return (
    <div className='welcome-container'>
        <img src={logo} alt='logo' className='welcome-logo'/>
    </div>
  )
}

export default Welcome