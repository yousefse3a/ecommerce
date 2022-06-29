const mongoose = require('mongoose');
const messageSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    products:{
        type:[{
            _id:{
                type: mongoose.Schema.Types.ObjectId, ref: "Product"
            },
            Amount:{
                type:Number,
                default:1
            }
        }]
    }
}, {
    timestamps: true

});
const CartModel = mongoose.model('Cart', messageSchema);
module.exports = { CartModel };