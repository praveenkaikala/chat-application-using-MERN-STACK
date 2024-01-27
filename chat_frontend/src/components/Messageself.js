
const Messageself = ({props}) => {

return (
<div className='slef-message-coontainer' key={props._id} >
   <div className='selfmsg-box'>
    <p>{props.content}</p> 
   </div> 
</div>
)
}

export default Messageself