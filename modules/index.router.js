const userRouter = require('../modules/user/user.router');
const authRouter = require('../modules/auth/auth.router');
const productRouter = require('../modules/product/product.router');
const orderRouter = require('../modules/order/order.router');
const cartRouter = require('../modules/cart/cart.router');
const stripeRouter = require('../modules/stripe');
module.exports = {
    userRouter,
    authRouter,
    productRouter,
    orderRouter,
    cartRouter, 
    stripeRouter
}