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
});

module.exports=mongoose.model('DoubtQ',doubtSchema);