const Joi = require("joi")

const updateValidation = {
    // body: Joi.object().required().keys({
    //     username: Joi.string().pattern(new RegExp(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{2,20}$/)).messages({
    //         'string.empty': 'plz fill in u name',
    //         'any.required': 'plz send  u name',
    //         'string.pattern.base': 'plz enter valid name char',
    //     }),
    //     password:Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/))
    // })
}
module.exports = { updateValidation }