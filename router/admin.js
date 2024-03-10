const express=require('express');
const router=express.Router({mergeParams:true});

const Course=require('../models/course.js');
const Question=require('../models/question.js');
const Chapter=require('../models/chapter.js');
const User=require("../models/user.js");
const {validateCourse}=require('../middleware.js');
const wrapAsync=require("../utils/wrapAsync.js");

router.get("/",async (req,res)=>{
    let totalCourse=await Course.countDocuments({});
    let totalChapter=await Chapter.countDocuments({});
    let totalQuestion=await Question.countDocuments({});
    let totalUser=await User.countDocuments({});
    let courses=await Course.find({});
    let chapters=await Chapter.find({});
    let questions=await Question.find({});
    let recentCourses=await Course.find().sort({_id:-1}).limit(2);
    let recentChapter=await Chapter.find().sort({_id:-1}).limit(3);
    let recentQuestion=await Question.find().sort({_id:-1}).limit(3);
    res.render("admin/admin-page.ejs",{totalCourse,totalChapter,totalQuestion,totalUser,courses,chapters,questions,recentCourses,recentChapter,recentQuestion});
})

router.get('/course/new',wrapAsync((req,res)=>{
    res.render('admin/course-form.ejs');
}))

router.post("/course/new",validateCourse,wrapAsync(async (req,res)=>{
    let newCourse=new Course(req.body);
    console.log(newCourse);
    await newCourse.save();
    res.redirect("/Gamedify/admin/view/course");
}))

router.get('/view/course', wrapAsync(async (Req,res)=>{
    let courses=await Course.find({}).populate('chapters').populate('questions');
    res.render('admin/view-course.ejs',{courses});
}))

router.post('/:id/chapter', wrapAsync(async (req,res)=>{
    let {id}=req.params;
    let {chapterName}=req.body;
    
    let course=await Course.findById(id);

    let newChapter=new Chapter({chapterName});

    course.chapters.push(newChapter);

    newChapter.course=id;
    await newChapter.save();

    let cChapter=await Chapter.countDocuments({course:id});
    // console.log(cChapter);

    course.countChapter=cChapter;
    await course.save();

    res.redirect('/Gamedify/admin/view/course');
}))

router.get('/:id/chapter/new',wrapAsync((req,res)=>{
    let {id}=req.params;
    res.render("admin/chapterForm.ejs",{id});
}))

router.get("/view/chapter",wrapAsync(async(req,res)=>{
    let chapters=await Chapter.find({}).populate('course');
    res.render("admin/view-chapter.ejs",{chapters});
}))

router.get("/:id/view/chapter",wrapAsync( async (req,res)=>{
    let chapters=await Chapter.find({course:req.params.id}).populate('course');
    res.render("admin/view-chapter.ejs",{chapters});
}))

router.get('/:chapterId/question/new',wrapAsync((req,res)=>{
    let {chapterId}=req.params;
    // console.log(chapterId);
    res.render('admin/questionForm.ejs',{chapterId});
}))

router.post('/:chapterId/question/new', wrapAsync(async (req,res)=>{
    let {chapterId}=req.params;

    let option=req.body.option;
    // console.log(option);

    let newQues=new Question(req.body.Ques);
    newQues.chapter=chapterId;
    for(let opt of option){
        newQues.options.push(opt);
    };
    let result=await newQues.save();

    let countQues=await Question.countDocuments({});

    let chapter=await Chapter.findById(chapterId);
    chapter.question.push(result);
    await chapter.save();

    let course=await Course.findById(chapter.course);
    course.questions.push(result);
    course.countQuestion=countQues;
    await course.save();

    res.redirect(`/Gamedify/admin/${chapterId}/view/chapter`);
}))

router.get("/:id/view/question", wrapAsync(async(req,res)=>{
    let questions=await Question.find({chapter:req.params.id}).populate("chapter");
    res.render('admin/view-question.ejs',{questions});
}))

router.get("/view/question",wrapAsync(async(req,res)=>{
    let questions=await Question.find({}).populate("chapter");
    res.render('admin/view-question.ejs',{questions});
}))

router.delete("/:QuesId/question", wrapAsync(async (req,res)=>{
    let {QuesId}=req.params;

    let Ques=await Question.findById(QuesId);

    let chId=Ques.chapter
    let chapter=await Chapter.findByIdAndUpdate(chId,{$pull:{question:QuesId}});

    let cId=chapter.course;
    let course=await Course.findByIdAndUpdate(cId,{$pull:{questions:QuesId}});

    await Question.findByIdAndDelete(QuesId);

}))

router.delete('/:chapterId/chapter',wrapAsync( async (req,res)=>{
    let {chapterId}=req.params;
    console.log(chapterId);

    let chapter=await Chapter.findByIdAndDelete(chapterId);

    let course=await Course.findById(chapter.course);

    await Course.findByIdAndUpdate(course._id,{$pull:{chapters:chapterId}});

    let ques=await Question.find({chapter:chapterId});

    for(let que of ques){
        await Question.updateOne({_id:que._id},{$unset:{chapter:""}});
    }
    // await Question.updateOne({_id:ques._id})

    res.redirect("/Gamedify/admin/view/chapter");
}))

router.delete("/:id/course",wrapAsync(async (req,res)=>{
    await Course.deleteOne({_id:req.params.id});
    res.redirect("/Gamedify/admin/view/course");
}))

module.exports=router;