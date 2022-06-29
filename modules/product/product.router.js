const { getAllProduct, getProduct, updateProduct, deleteProduct, createProduct } = require('./controller/Profile');
const { auth } = require('../../middlewares/auth');
const { validation } = require('../../middlewares/validation');
const { endPoint } = require('./product.endPoint');
const { updateValidation, createValidation } = require('./product.validation');
const { myMulter, HME } = require('../../services/multer');
const router = require('express').Router();

router.post('/Product', validation(createValidation),auth(endPoint.createProduct),myMulter('productPic', 'image').single('img'), createProduct)
router.put('/Product/:id', myMulter('productPic', 'image').single('img'),auth(endPoint.updateProduct),HME, updateProduct)
router.delete('/Product/:id', auth(endPoint.deleteProduct), deleteProduct)
router.get('/Product/:id', getProduct)
router.get('/Products', getAllProduct)

module.exports = router;
