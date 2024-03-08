const express=require('express');
const app=express();
const ejs=require("ejs");
const path=require('path');
const ejsMate=require('ejs-mate');
const mongoose=require('mongoose');
const methodOverride=require("method-override");
const ExpressError=require('./utils/expressError.js');
const cookieParser=require("cookie-parser");

const Course=require('./models/course.js');
const Question=require('./models/question.js');
const Chapter=require('./models/chapter.js');
const User = require('./models/user.js');

const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");

const homeRouter=require("./router/home.js");
const adminRouter=require("./router/admin.js");
const startRouter=require("./router/start.js");

app.listen(3000,()=>{
    console.log("server started");
})

main()
.then(()=>{
    console.log('db connected');
})
.catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect("mongodb://localhost:27017/Gamedify");
}


app.use(cookieParser())

app.use(session({
    secret:"keyboard cat",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expire:new Date(Date.now()+7*24*60*60*1000),
        maxAge:7*24*60*60*1000
    }
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride("_method"))

app.engine('ejs',ejsMate)
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'/public')))
app.set('views',path.join(__dirname,'/views'))




app.use((req,res,next)=>{
    // console.log(req.user);
    // res.locals.currUser=req.user;
    // console.log(res.locals.currUser);
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    res.locals.currUser=req.user;
    next();
})

app.get('/',(req,res)=>{
    res.redirect('/Gamedify');
})

// home
app.use('/Gamedify',homeRouter);

// start
app.use('/Gamedify/course',startRouter);

// admin
app.use("/Gamedify/admin",adminRouter);

// app.all('*',(req,res,next)=>{
//     throw new ExpressError(404,"Page not found");
// })

// app.use((err,req,res,next)=>{
//     let {status=404,message="Page not found"}=err;
//     res.status(status).send(message);
// })