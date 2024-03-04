const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const questionSchema=new Schema({
    question:{
        type:String,
        required:true
    },
    options:[String] ,
    answer:{
        type:String,
        required:true
    },
    chapter:{
            type:Schema.Types.ObjectId,
            ref:"Chapter"
    },
    // owner: {
    //     type:Schema.Types.ObjectId,
    //     ref:"Admin"
    // }
});

module.exports=new mongoose.model("Question",questionSchema);