import React, { useRef } from 'react'
const Messageself = ({props,index}) => {

return (
<div className='slef-message-coontainer' key={props._id} >
   <div className='selfmsg-box'>
    <p>{props.content}</p> 
   </div> 
</div>
)
}

export default Messageself