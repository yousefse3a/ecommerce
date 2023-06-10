const { validation } = require('../../middlewares/validation');
const { signup } = require('./controller/signup');
const { signin } = require('./controller/signin');
const { signupValidation, signinValidation } = require('./auth.validation');
const { myMulter } = require('../../services/multer');

const router = require('express').Router();

router.post('/signup' ,myMulter('userPic', 'image').single('img'),validation(signupValidation),signup)
router.post('/signin',  signin)

module.exports = router;