const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const courseSchema=new Schema({
    courseName: {
        type:String,
        required:true
    },
    aboutCourse: {
        type:String,
        required:true
    },
    chapters:[
        {
            type:Schema.Types.ObjectId,
            ref:"Chapter",
        }
    ],
    questions : [
        {
            type:Schema.Types.ObjectId,
            ref:"Question",
        }
    ],
    countChapter: {
        type:Number,
    },
    countQuestion: {
        type:Number,
    }
});

courseSchema.index({ fieldName: 'text' });

module.exports=new mongoose.model('Course',courseSchema);