const { getAllOrder, getOrder, createOrder, updateOrder, deleteOrder, stateOrder } = require('./controller/Profile');
const { auth } = require('../../middlewares/auth');
const { endPoint } = require('./order.endPoint');
const router = require('express').Router();


router.post('/Order', auth(endPoint.createOrder), createOrder)
router.put('/Order/:id', auth(endPoint.updateOrder), updateOrder)
router.delete('/Order/:id', auth(endPoint.deleteOrder), deleteOrder)
router.get('/Order/:id', auth(endPoint.getOrder), getOrder)
router.get('/Orders', auth(endPoint.getAllOrder), getAllOrder)
router.get('/Orders/stats', auth(endPoint.stateOrder), stateOrder)

module.exports = router;
