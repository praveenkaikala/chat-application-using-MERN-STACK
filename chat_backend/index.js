const express=require('express')
const dotenv=require("dotenv")
const mongoDB=require('mongodb')
const { default: mongoose } = require('mongoose')
const userRoutes=require("./Routes/userRoutes")
const chatRoutes=require("./Routes/chatRoutes")
const messageRoutes=require("./Routes/messageRoutes")
dotenv.config()
const port = process.env.PORT || 5001
const cors=require("cors")
const { Socket } = require('socket.io')

const app=express()
app.use(express.json())
app.use(cors())
const connectDB= async () => {
    try{
        const connect=await mongoose.connect(process.env.Mongo_uri)
        console.log("db connected")
    }
    catch(err){
        console.log("db not connected",err.message)
    }
   
};
connectDB()

app.get("/",(req,res)=>{
res.send("api is running")
})
app.use('/user',userRoutes)
app.use("/chat",chatRoutes)
app.use("/message",messageRoutes)
const server= app.listen(port,()=>{
    console.log("server is running on 5000 port.....")
})
let roomid,userid
const io=require("socket.io")(server,{
    cors:{
        origin:"*",
    },
    pingTimeout:5000,
})

io.on("connection",(Socket)=>{
    console.log("socket connected")
    Socket.on("setup",(user)=>{
        userid=user._id
        Socket.join(user._id)
        Socket.emit("connected")
    })
    Socket.on("join room",(room)=>{
        Socket.join(room)
        roomid=room
        console.log(`room joined,${room}`)
    })
    Socket.on("content",(msg)=>{
        Socket.broadcast.emit("recieve",msg)
    })
    Socket.on("new message",(newMessagestatus)=>{
        console.log(newMessagestatus)
        var chat=newMessagestatus.chat
        if(!chat.users)
        {
            return console.log("chat users not defined")
        }
        chat.users.forEach((user) => {
            if(user._id !== newMessagestatus.sender._id){
             if(roomid === newMessagestatus.chat._id)
             {
                 Socket.broadcast.to(roomid).emit("message recieved",newMessagestatus)
             }
           
            }
        
           
            
            
        });
       
    })
    Socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        Socket.leave(userData._id)
    })
})



