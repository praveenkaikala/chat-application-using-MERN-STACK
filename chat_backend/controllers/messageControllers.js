const expressAsyncHandler = require("express-async-handler");
const User=require("../models/Usermodel")
const Chat=require("../models/Chatmodel")
const Message=require("../models/messageModel");

const allMessages = expressAsyncHandler(async (req, res) => {
    try {
      const messages = await Message.find({ chat: req.params.chatId })
        .populate("sender", "name email")
        .populate("reciever","name email")
        .populate("chat");
      res.json(messages);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });
  
  const sendMessage = expressAsyncHandler(async (req, res) => {
    const { content, chatId } = req.body;
  
    if (!content || !chatId) {
      console.log("Invalid data passed into request");
      return res.sendStatus(400);
    }
  const reciever=await Chat.findOne({_id:chatId})
    var newMessage = {
      sender: req.user._id,
      content: content,
      // reciever:reciever.users[1],
      chat: chatId,
    };
  
    try {
      var message = await Message.create(newMessage);

      message = await message.populate("sender", "name");
      message = await message.populate("chat");
      message = await message.populate("reciever","name");
      message = await User.populate(message, {
        path: "chat.users",
        select: "name email _id",
      });
  
      await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
      res.json(message);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });
  
  const Deletemessages=expressAsyncHandler(async(req,res)=>{
    const {chatId}=req.body
    if(!chatId)
    {
      res.status(400).send("invalid chat id")
    }
    else{
      try{
          await Message.deleteMany({chat:chatId})
      res.status(200).send("delete messages successfull")
      }
      catch(err)
      {
        res.status(400)
        res.send(err)
      }
    
    }
  })
  module.exports = { allMessages, sendMessage ,Deletemessages};