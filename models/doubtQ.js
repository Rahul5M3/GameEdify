const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const doubtSchema=new Schema({
    doubtQues: {
        type:String,
        required:true,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    doubtans:String,
    userSolved:[
        {
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    date:{
        type:Date,
        default:new Date(Date.now()),
    }
});

module.exports=mongoose.model('DoubtQ',doubtSchema);