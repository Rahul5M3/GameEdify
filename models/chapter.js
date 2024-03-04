const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const chapterSchema=new Schema({
    chapterName:{
        type:String,
        required:true
    },
    course: {
        type:Schema.Types.ObjectId,
        ref:"Course"
    },
    question: [
        {
            type:Schema.Types.ObjectId,
            ref:"Question"
        }
    ]
});

module.exports=new mongoose.model('Chapter',chapterSchema);