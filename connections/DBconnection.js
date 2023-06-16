const mongoose = require('mongoose');
const connectDB = () => {
    
    // return mongoose.connect(process.env.DBURL)
    return mongoose.connect((process.env.DBURL).substring(0,x.indexOf('?'))+'ecommerce'+(process.env.DBURL).substring(x.indexOf('?')))
    // return mongoose.connect('mongodb+srv://se3a:ZkRg57L6ZYTOuCQU@cluster0.sxlie.mongodb.net/ecommerce?retryWrites=true&w=majority')
        .then((result) => { console.log('connect DB',process.env.DBURL) })
        .catch((err) => { console.log({ 'fail DB': err }) })
}
module.exports = connectDB;
