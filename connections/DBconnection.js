const mongoose = require('mongoose');
const connectDB = () => {
    // return mongoose.connect(process.env.DBURL)
    return mongoose.connect('mongodb+srv://se3a:ZkRg57L6ZYTOuCQU@cluster0.sxlie.mongodb.net/ecommerce?retryWrites=true&w=majority')
        .then((result) => { console.log('connect DB') })
        .catch((err) => { console.log({ 'fail DB': err }) })
}
module.exports = connectDB;
