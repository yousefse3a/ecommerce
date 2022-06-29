require('dotenv').config();
const path = require('path');
var cors = require('cors')
const { userRouter, authRouter, productRouter, orderRouter, cartRouter, stripeRouter } = require('./modules/index.router');
const connectDB = require('./connections/DBconnection');
const express = require('express');
const app = express();
app.use(cors())
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, './uploads')))
app.use(authRouter, userRouter, productRouter, orderRouter, cartRouter, stripeRouter);
connectDB();
app.listen(+process.env.PORT || 4000, () => {
    console.log(`run on port ${process.env.PORT}`);
})