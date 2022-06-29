const mongoose = require('mongoose');
const connectDB = () => {
    return mongoose.connect("mongodb+srv://ecommerce:01228103702@cluster0.sxlie.mongodb.net/ecommerce")
        .then((result) => { console.log('connect DB') })
        .catch((err) => { console.log({ 'fail DB': err }) })
}
module.exports = connectDB;
// mongodb://localhost:27017/ecommerce