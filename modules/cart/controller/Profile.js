const { StatusCodes } = require('http-status-codes');
const { CartModel } = require("../../../models/CartModel");
const getAllCart = async (req, res) => {
    try {
        const allCart = await CartModel.find();
        res.json(allCart)
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({ error: "error", error });
    }
}
const getCart = async (req, res) => {
    try {
        const findCart = await CartModel.findById(req.params.id).populate("products._id");
        if (findCart) {
            res.status(StatusCodes.OK).json({ message: "Cart data", findCart });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ error: "Cart not found data" });
        }
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({ error: "error", error });
    }
}
const getCartUser = async (req, res) => {
    try {
        const Cart = await CartModel.findOne({ userId: req.user._id }).populate("products._id");
        if (Cart) {
            res.status(StatusCodes.OK).json({ message: "Cart data", Cart });
        } else {
            res.json({ message: "Cart not found data" });
        }
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({ error: "error", error });
    }
}
const createCart = async (req, res) => {
    try {
        const newCart = new CartModel({ ...req.body, userId: req.user._id });
        const Cart = await newCart.save();
        res.status(StatusCodes.OK).json({ message: "Cart added", Cart });
    } catch (error) {

        res.status(StatusCodes.BAD_REQUEST).json({ message: "catch err ", error })
    }
}
const updateCart = async (req, res) => {
    try {
        const CartUpdate = await CartModel.findOneAndUpdate({ _id: req.params.id }, { ...req.body }, { new: true })
        console.log(req.params.id);
        console.log(CartUpdate);
        if (CartUpdate) {
            res.status(StatusCodes.OK).json({ message: "Cart updated", CartUpdate });
        } else {
            res.status(StatusCodes.OK).json({ message: "Cart not found" });
        }
    } catch (error) {

        res.status(StatusCodes.BAD_REQUEST).json({ message: "catch err ", error })
    }
}
const deleteCart = async (req, res) => {

    try {
        // if (req.Cart && req.Cart._id != req.params.id) {
        //     res.status(StatusCodes.UNAUTHORIZED).json({ message: "not auth Cart" })
        // } else {
        const deleteCart = await CartModel.deleteOne({ _id: req.params.id });
        if (deleteCart.deletedCount) {
            res.status(StatusCodes.OK).json({ message: "Cart deleted" });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ error: "Cart not found data" });
        }
        // }

    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({ error: "error", error });
    }
}


module.exports = {
    getAllCart, getCart, updateCart, deleteCart, createCart, getCartUser
}       