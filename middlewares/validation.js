const dataMethod = ['body', 'params', 'query']
const validation = (schema) => {
    return (req, res, next) => {
        const validationErrArr = []
        dataMethod.forEach(key => {
            if (schema[key]) {
                const validationResult = schema[key].validate(req[key], { abortEarly: false });
                if (validationResult.error) {
                    validationErrArr.push(validationResult.error.details)
                }
            }
        })
        if (validationErrArr.length) {
            res.json({ message: "validation error", err: validationErrArr })
        } else {
            next()
        }
    }
}
module.exports = { validation }