const express=require("express");
const router=express.Router({mergeParams:true});
const Course=require('../models/course.js');
const Chapter=require('../models/chapter.js');
const Question=require('../models/question.js');
const DoubtQ=require('../models/doubtQ.js');
const wrapAsync=require("../utils/wrapAsync.js");
const User = require('../models/user.js');
const passport = require("passport");
const {isLoggedin}=require('../middleware.js');

router.get('/',((req,res)=>{
    res.redirect('/Gamedify/explore');
}))

router.get("/signup",((req,res)=>{
    res.render('home/signup.ejs');
}))

router.get('/login',((req,res)=>{
    res.render("home/login.ejs");
}))

router.get('/user',isLoggedin,((req,res)=>{
    res.render('home/userInfo.ejs');
}))

router.get('/search', async(req,res)=>{
    let {s}=req.query;
    let courses=await Course.find({courseName:s});
    // res.send(courses);
    res.render('home/explore.ejs',{courses});
})

router.post('/doubtQues',isLoggedin,async (req,res)=>{
    let {doubtques}=req.body;
    let newDoubt=new DoubtQ({doubtQues:doubtques, user:req.user._id});
    let d=await newDoubt.save();
    console.log(d);
    console.log(d._id);
    await User.findByIdAndUpdate(req.user._id,{ $push: { 'doubtQues': d._id } },);
    req.flash('success',"DoubtQ added successfully");
    res.redirect("/Gamedify/explore");
})

router.get('/doubtQues',isLoggedin,async(req,res)=>{
    let Doubtq=await DoubtQ.find({user:{$ne:req.user._id}});
    let user=req.user._id;
    res.render("home/doubt.ejs",{Doubtq,user});
})

router.get('/doubtQ/:id',isLoggedin,async(req,res)=>{
    let q=await DoubtQ.findById(req.params.id);
    res.render("home/doubtAns.ejs",{q});
})

router.post('/doubtans/:id',isLoggedin,async (req,res)=>{
   await DoubtQ.findByIdAndUpdate(req.params.id,{doubtans:req.body.doubtans});
   let user=await User.findById(req.user._id);
   
    user.points+=1;
    // user.doubtQues.push(req.params.id);
    await user.save();
   res.redirect('/Gamedify/doubtQues');  
})

router.get('/explore',isLoggedin, wrapAsync(async (req,res)=>{
    // console.log(req.user);
    let courses=await Course.find({}).populate('chapters').populate('questions');
    req.flash("success","Welcome");
    // res.send('hhfhf');
    res.render('home/explore.ejs',{courses});
}))

router.post("/signup",async(req,res)=>{
    let {username,email,password}=req.body;
    let user=new User({username,email});
    let newuser=await User.register(user,password);
    // res.send('registered or signup');
    req.login(newuser,(err)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect('/Gamedify/explore');
        }
    })
})

router.get('/login',(req,res)=>{
    res.render('home/login.ejs');
})

router.post('/login',passport.authenticate('local', { failureRedirect: '/Gamedify/login' }),(req,res)=>{
    res.redirect('/Gamedify/explore');
})

router.get('/logout',(req,res)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }else{
            res.redirect('/Gamedify/login');
        }
    })
})

router.get('/userInfo',isLoggedin,async (req,res)=>{
    let user=await User.findById(req.user._id).populate('correctQues').populate('incorrectQues').populate('doubtQues');
    res.render("home/infoUser.ejs",{user});
})

module.exports=router;