const express=require("express")
const router=express.Router()
const {protect}=require("../middleware/authmiddleware")
const {
    accessChat,
    fetchChats,
    accessGroup,
    fetchGroup,
    joinGroup,
}=require("../controllers/chatControllers")

router.post("/",protect,accessChat)
router.get("/",protect,fetchChats)
router.post("/creategroup",protect,accessGroup)
router.get("/fetchgroup",protect,fetchGroup)
router.put("/joingroup",protect,joinGroup)
module.exports=router