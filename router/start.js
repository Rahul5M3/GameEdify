const express=require("express");
const router=express.Router({mergeParams:true});
const Course=require('../models/course.js');
const Chapter=require('../models/chapter.js');
const Question=require('../models/question.js');
const wrapAsync=require("../utils/wrapAsync.js");
const User = require('../models/user.js');
const {isLoggedin}=require('../middleware.js');

router.get('/:id/chapter',isLoggedin,wrapAsync(async(req,res)=>{
    let chapters=await Chapter.find({course:req.params.id}).populate('course');
    // console.log(chapters[0]);
    if(typeof chapters[0]=="undefined"){
        req.flash('error',"No chapters there..Try another course till chapter added to it");
        return res.redirect("/Gamedify/explore");
    }
// res.send(chapters);
    res.render("start/web-chapter.ejs",{chapters});
}))

router.get("/:id/question",isLoggedin,wrapAsync(async(req,res)=>{
    let ques=await Question.find({chapter:req.params.id}).populate({path:'chapter',populate:{path:'course'}});
    let users=await User.countDocuments({});
    // console.log(ques);
    res.render('start/web-question.ejs',{ques,users});
}))

router.get('/:quesId/solve',isLoggedin,wrapAsync(async (req,res)=>{
    let ques=await Question.findById({_id:req.params.quesId});
    // res.send("solve");
    res.render("start/web-ques-solve.ejs",{ques});
}))

router.get('/:queId/ans',isLoggedin,async(req,res)=>{
    let {opti}=req.query;
    const que=await Question.findOne({_id:req.params.queId});
    
    let user=await User.findOne({_id:req.user._id});
    

    if(que.answer==opti){
        if(user.correctQues.includes(req.params.queId)){
            req.flash('error',"This Question already done so no points added");
            return res.redirect(`/Gamedify/course/${que.chapter}/question`);
        }else{
            if(user.incorrectQues.includes(req.params.queId)){
                await User.findByIdAndUpdate(req.user._id, { $pull: { incorrectQues: req.params.queId  } });
            }
            user.correctQues.push(req.params.queId);
            user.points+=1;
            await user.save();
            req.flash('success',"Solved Correctly ...... Congrats  1 point added");
            return res.redirect(`/Gamedify/course/${que.chapter}/question`);
        }
    }else{
        if(user.incorrectQues.includes(req.params.queId)){
            req.flash('error',"Incorrect Answer");
            let ans=user.answer;
            req.session.ans=ans;
            return res.redirect(`/Gamedify/course/${req.params.queId}/solve`);
        }else{
            user.incorrectQues.push(req.params.queId);
            await user.save();

            req.flash('error',"Incorrect Answer");
            return res.redirect(`/Gamedify/course/${req.params.queId}/solve`);
        }
    }
})



module.exports=router;