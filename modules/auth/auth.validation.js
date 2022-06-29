const Joi = require("joi")

const signinValidation = {
    body: Joi.object().required().keys({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required()
    })
}
const signupValidation = {
    body: Joi.object().required().keys({
        username: Joi.string().required().pattern(new RegExp(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{2,20}$/)).messages({
            'string.empty': 'plz fill in u name',
            'any.required': 'plz send  u name',
            'string.pattern.base': 'plz enter valid name char',
        }),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
        cPassword: Joi.string().valid(Joi.ref('password')).required(),
        fullname: Joi.string().required(),
        address: Joi.string().optional(),
        gender: Joi.string().required(),
        img:Joi.string().optional()
    })
}

module.exports = {
    signinValidation,
    signupValidation
}