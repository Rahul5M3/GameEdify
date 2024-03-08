const express=require("express");
const router=express.Router({mergeParams:true});
const Course=require('../models/course.js');
const Chapter=require('../models/chapter.js');
const Question=require('../models/question.js');
const wrapAsync=require("../utils/wrapAsync.js");

router.get('/:id/chapter',wrapAsync(async(req,res)=>{
    let chapters=await Chapter.find({course:req.params.id}).populate('course');
    console.log(chapters[0]);
    if(typeof chapters[0]=="undefined"){
        req.flash('error',"No chapters there..Try another course till chapter added to it");
        return res.redirect("/Gamedify/explore");
    }
// res.send(chapters);
    res.render("start/web-chapter.ejs",{chapters});
}))

router.get("/:id/question",wrapAsync(async(req,res)=>{
    let ques=await Question.find({chapter:req.params.id}).populate({path:'chapter',populate:{path:'course'}});
    // console.log(ques);
    res.render('start/web-question.ejs',{ques});
}))

router.get('/:quesId/solve',wrapAsync(async (req,res)=>{
    let ques=await Question.findById({_id:req.params.quesId});
    // res.send("solve");
    res.render("start/web-ques-solve.ejs",{ques});
}))

router.get('/:queId/ans',async(req,res)=>{
    let {opti}=req.query;
    const que=await Question.findOne({_id:req.params.queId});
    if(que.answer==opti){
        req.flash('success',"Solved Correctly ...... Congrats  1 point added");
       return res.redirect(`/Gamedify/course/${que.chapter}/question`);
    }
    req.flash('error',"Incorrect Answer");
    return res.redirect(`/Gamedify/course/${req.params.queId}/solve`);
})


module.exports=router;