import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { mycontext } from './Container'
const Conversationitem = ({props,userdata}) => {
  const {chatload,setchatload}=useContext(mycontext)
  let name=""
  if(props.isGroupChat)
  {
    name=props.chatname
  }
  else
  {
     if(userdata._id === props.users[0]._id)
  {
    name=props.users[1].name;
  }
  else{
    name=props.users[0].name
  }
  }
 

  const navigate=useNavigate()
  return (
    <div className='conversations' onClick={()=>{
      setchatload(!chatload)
      navigate('chat/'+props._id+"&"+name)
      }}>
        <p className='c-icon'>{name[0]}</p>
        <p className='c-name'>{name}</p>
          {/* <p className='c-lastmsg'>{props.latestMessage.content}</p> */}
        {/* <p className='c-lastseen'>{props.lastseen}</p>  */}
    </div>
  )
}

export default Conversationitem