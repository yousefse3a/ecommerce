const Joi = require("joi")

const createValidation = {
    body: Joi.object().required().keys({
        title: Joi.string().pattern(new RegExp(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{2,20}$/)),
        desc: Joi.string(),
        size: Joi.string(),
        price: Joi.number(),
        categories:Joi.array(),
        img: Joi.string().optional()
    })
}
const updateValidation = {
    body: Joi.object().required().keys({
        title: Joi.string().pattern(new RegExp(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{2,20}$/)),
        desc: Joi.string(),
        size: Joi.string(),
        price: Joi.number(),
        categories:Joi.array(),
        img: Joi.string().optional()

    })
}
module.exports = { updateValidation, createValidation }