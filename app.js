const express=require('express');
const app=express();
const ejs=require("ejs");
const path=require('path');
const ejsMate=require('ejs-mate');
const mongoose=require('mongoose');
const methodOverride=require("method-override");

const Course=require('./models/course.js');
const Question=require('./models/question.js');
const Chapter=require('./models/chapter.js');

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride("_method"))

app.engine('ejs',ejsMate)
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'/public')))
app.set('views',path.join(__dirname,'/views'))

app.listen(3000,()=>{
    console.log("server started");
})

app.get('/',(req,res)=>{
    res.redirect('/Gamedify');
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

const homeRouter=require("./router/home.js");
const adminRouter=require("./router/admin.js");
const startRouter=require("./router/start.js");

// home
app.use('/Gamedify',homeRouter);

// start
// app.use('/Gamedify',)

// admin
app.use("/Gamedify/admin",adminRouter);
