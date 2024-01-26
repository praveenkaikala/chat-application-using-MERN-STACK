const asyncHandler = require("express-async-handler");
const Chat = require("../models/Chatmodel")
const User = require("../models/Usermodel");

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    const name = await User.findOne({_id:userId})
    var chatData = {
      chatname: name.name,
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

const fetchChats = asyncHandler(async (req, res) => {
  try {
   
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("GroupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const accessGroup = asyncHandler(async (req, res) => {
  const { Groupname } = req.body;

  if (!Groupname) {
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({chatname:Groupname})
 if(isChat.chatname == Groupname)
 {
     
     res.json(isChat)
 }
  else {
    var chatData = {
      chatname: Groupname,
      isGroupChat: true,
      users: [req.user._id],
      GroupAdmin:req.user._id
    }

    try {
      const createdChat = await Chat.create(chatData);
     
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

const fetchGroup = asyncHandler(async (req, res) => {
  try {
   await Chat.find({ isGroupChat:true, $and: [{GroupAdmin: { $ne: req.user._id  } }]})
      .populate("users", "-password")
      .populate("GroupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const joinGroup=asyncHandler(async(req,res)=>{
   const {chatId}=req.body
   const isingroup =await Chat.findOne({_id:chatId, $and: [{users: {$elemMatch : {$eq:req.user._id}}}] })
   if(isingroup)
   {
    res.send("already in group")

   }
   else
   {
const addgroup=await Chat.findOneAndUpdate({_id:chatId},{ $push:{users:req.user._id}}).populate("users","-password")
res.status(200).json(addgroup)
   }
   

})

module.exports={accessChat,fetchChats,accessGroup,fetchGroup,joinGroup}