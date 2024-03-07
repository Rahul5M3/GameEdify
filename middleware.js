let {chapterValidation,questionValidation,courseValidation}=require("./schema.js");
let ExpressError=require("./utils/expressError.js");

module.exports.validateCourse=(err,req,res,next)=>{
    let {error}=courseValidation.validate(req.body);
    if(error){
        let errMsg=error.details.map(el=>el.message).join(',');
        throw new ExpressError(400,error);
    }
    next();
}

module.exports.validateChapter=(err,req,res,next)=>{
    let {error}=chapterValidation.validate(req.body);
    if(error){
        let errMsg=error.details.map(el=>el.message).join(',');
        throw new ExpressError(400,error);
    }
    next();
}

module.exports.validateQuestion=(err,req,res,next)=>{
    let {error}=questionValidation.validate(req.body);
    if(error){
        let errMsg=error.details.map(el=>el.message).join(',');
        throw new ExpressError(400,error);
    }
    next();
}