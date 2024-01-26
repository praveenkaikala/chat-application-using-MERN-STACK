const mongoose=require("mongoose")
const chatmodel=mongoose.Schema({
    chatname:{type:String},
    isGroupChat:{type:Boolean},
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    }],
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"message",
    },
    GroupAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },

},
{
    timeStamp:true,
})
const chat=mongoose.model("chat",chatmodel)
module.exports=chat;

