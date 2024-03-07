const Joi=require("joi");

module.exports.courseValidation= Joi.object({
    courseName:Joi.string().required(),
    description:Joi.string().required(),
});

module.exports.chapterValidation=Joi.object({
    chapterName:Joi.string().required(),
});

module.exports.questionValidation=Joi.object({
    Ques:Joi.object({
        question:Joi.string().required(),
        answer:Joi.string().required(),
    }).required(),
    // option:Joi.array().required(),
});
