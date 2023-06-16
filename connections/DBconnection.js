const mongoose = require('mongoose');
const connectDB = () => {
    // return mongoose.connect(process.env.DBURL)
    const x=process.env.DBURL;
    return mongoose.connect(x.substring(0,x.indexOf('?'))+'ecommerce'+x.substring(x.indexOf('?')))
        .then((result) => { console.log('connect DB') })
        .catch((err) => { console.log({ 'fail DB': err }) })
}
module.exports = connectDB;
