const express=require("express");
const router=express.Router({mergeParams:true});
const Course=require('../models/course.js');
const Chapter=require('../models/chapter.js');
const Question=require('../models/question.js');
const wrapAsync=require("../utils/wrapAsync.js");
const User = require('../models/user.js');
const passport = require("passport");
const {isLoggedin}=require('../middleware.js');

router.get('/',((req,res)=>{
    res.render('home/home.ejs');
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
    let user=await User.findById(req.user._id).populate('correctQues').populate('incorrectQues');
    res.render("home/infoUser.ejs",{user});
})

module.exports=router;