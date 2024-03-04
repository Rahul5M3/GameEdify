const express=require('express');
const router=express.Router({mergeParams:true});

const Course=require('../models/course.js');
const Question=require('../models/question.js');
const Chapter=require('../models/chapter.js');

router.get("/",(req,res)=>{
    res.render("admin/admin-page.ejs");
})

router.get('/course/new',(req,res)=>{
    res.render('admin/course-form.ejs');
})

router.post("/course/new",async (req,res)=>{
    let newCourse=new Course(req.body);
    console.log(newCourse);
    await newCourse.save();
    res.redirect("/Gamedify/admin");
})

router.get('/view/course', async (Req,res)=>{
    let courses=await Course.find({}).populate('chapters').populate('questions');
    res.render('admin/view-course.ejs',{courses});
})

router.post('/:id/chapter', async (req,res)=>{
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
})

router.get('/:id/chapter/new',(req,res)=>{
    let {id}=req.params;
    res.render("admin/chapterForm.ejs",{id});
})

router.get("/view/chapter", async (req,res)=>{
    let chapters=await Chapter.find({}).populate('course');
    res.render("admin/view-chapter.ejs",{chapters});
})

router.get('/:chapterId/question/new',(req,res)=>{
    let {chapterId}=req.params;
    // console.log(chapterId);
    res.render('admin/questionForm.ejs',{chapterId});
})

router.post('/:chapterId/question/new', async (req,res)=>{
    let {chapterId}=req.params;

    let option=req.body.option;
    // console.log(option);

    let newQues=new Question(req.body.Ques);
    newQues.chapter=chapterId;
    for(let opt of option){
        newQues.options.push(opt);
    };
    let result=await newQues.save();

    let chapter=await Chapter.findById(chapterId);
    chapter.question=result;
    await chapter.save();

    let course=await Course.findById(chapter.course);
    course.questions.push(result);
    await course.save();

    res.redirect('/Gamedify/admin/view/chapter');
})

router.get("/view/question", async(req,res)=>{
    let questions=await Question.find({}).populate("chapter");
    res.render('admin/view-question.ejs',{questions});
})

router.delete("/:QuesId/question", async (req,res)=>{
    let {QuesId}=req.params;

    let Ques=await Question.findById(QuesId);

    let chId=Ques.chapter
    let chapter=await Chapter.findByIdAndUpdate(chId,{$pull:{question:QuesId}});

    let cId=chapter.course;
    let course=await Course.findByIdAndUpdate(cId,{$pull:{questions:QuesId}});

    await Question.findByIdAndDelete(QuesId);

})

module.exports=router;