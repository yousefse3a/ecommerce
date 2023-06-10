const mongoose = require('mongoose');
const messageSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    categories : {
        type: Array,
    },
    size: {
        type: Array,
    },
    color:{
        type:Array
    },
    price: {
        type: Number,
        required: true
    },
    inStock:{
        type:Boolean,
        default:true
    }
}, {
    timestamps: true

});
const ProductModel = mongoose.model('Product', messageSchema);
module.exports = { ProductModel };