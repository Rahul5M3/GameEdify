const mongoose=require("mongoose");
const passportLocalMongoose=require('passport-local-mongoose');

const userSchema=new mongoose.Schema({
    email: {
        type:String,
        require:true
    },
    correctQues:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Question'
    }],
    incorrectQues:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Question'
    }],
    ansSaw:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Question'
    },
    points:{
        type:Number,
        default:0,
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports=new mongoose.model('User',userSchema);