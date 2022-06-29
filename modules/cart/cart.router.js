const { getAllCart, getCart, updateCart, deleteCart, createCart, getCartUser } = require('./controller/Profile');
const { auth } = require('../../middlewares/auth');
const { validation } = require('../../middlewares/validation');
const { endPoint } = require('./cart.endPoint');
const { updateValidation } = require('./cart.validation');
const { myMulter } = require('../../services/multer');
const router = require('express').Router();


router.post('/Cart', auth(endPoint.createCart), createCart)
router.put('/Cart/:id', auth(endPoint.updateCart), updateCart)
router.delete('/Cart/:id', auth(endPoint.deleteCart), deleteCart)
router.get('/Cart/:id', auth(endPoint.getCart), getCart)
router.get('/getCartUser', auth(endPoint.getCart), getCartUser)
router.get('/Carts', auth(endPoint.getAllCart), getAllCart)

module.exports = router;
