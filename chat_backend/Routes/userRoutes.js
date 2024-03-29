const express=require('express')
const {loginController,registerController,fetchAllUserController}=require('../controllers/userController')
const router=express.Router()
const {protect}=require("../middleware/authmiddleware")

router.post("/login",loginController);
router.post('/register',registerController)
router.get("/fetchuser",protect,fetchAllUserController)

module.exports=router;