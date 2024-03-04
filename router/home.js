const express=require("express");
const router=express.Router({mergeParams:true});
const Course=require('../models/course.js');

router.get('/',(req,res)=>{
    res.render('home/home.ejs');
})

router.get("/signup",(req,res)=>{
    res.render('home/signup.ejs');
})

router.get('/login',(req,res)=>{
    res.render("home/login.ejs");
})

router.get('/user',(req,res)=>{
    res.render('home/userInfo.ejs');
})

router.get('/explore', async (req,res)=>{
    let courses=await Course.find({}).populate('chapters').populate('questions');
    res.render('home/explore.ejs',{courses});
})

module.exports=router;