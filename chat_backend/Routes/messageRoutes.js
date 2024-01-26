const express=require("express")
const {allMessages,sendMessage,Deletemessages}=require("../controllers/messageControllers")
const router=express.Router()
const {protect}=require("../middleware/authmiddleware")
router.get("/:chatId",protect,allMessages)
router.post("/",protect,sendMessage)
router.put("/deletemessages",protect,Deletemessages)
module.exports=router;