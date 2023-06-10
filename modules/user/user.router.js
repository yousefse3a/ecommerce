const { getAllUser, getUser, updateUser, deleteUser, stateUser } = require('./controller/Profile');
const { auth } = require('../../middlewares/auth');
const { validation } = require('../../middlewares/validation');
const { endPoint } = require('./user.endPoint');
const { updateValidation } = require('./user.validation');
const { myMulter } = require('../../services/multer');
const router = require('express').Router();


router.put('/user/:id', myMulter('userPic', 'image').single('img'),validation(updateValidation), auth(endPoint.updateUser) ,updateUser)
router.delete('/user/:id', auth(endPoint.deleteUser), deleteUser)
router.get('/user/:id', auth(endPoint.getUser), getUser)
router.get('/users', auth(endPoint.getAllUser), getAllUser)
router.get('/users/stats', auth(endPoint.stateUser), stateUser)

module.exports = router;
