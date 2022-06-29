const bycrpt = require('bcrypt');
const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true,
    }
    ,
    password: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    gender: {
        type: String,
        required: true,
        enum: ['not yet','male', 'female']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        default: 'user'
    }
}, {
    timestamps: true

});

userSchema.pre('save', async function (next) {
    this.password = await bycrpt.hash(this.password, +process.env.Roundbycrpt);
    next();
})

userSchema.pre(`findOneAndUpdate`, async function () {
    const hookData = await this.model.findOne(this.getQuery()).select('__v');
    if (hookData) {
        this.set({ __v: hookData.__v + 1 })
    }
})


const userModel = mongoose.model('User', userSchema);
module.exports = { userModel };