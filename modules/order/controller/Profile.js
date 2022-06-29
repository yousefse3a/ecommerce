const { StatusCodes } = require('http-status-codes');
const bycrpt = require('bcrypt');
const { OrderModel } = require("../../../models/OrderModel");

const getAllOrder = async (req, res) => {
    try {
        const allOrder = await OrderModel.find();
        res.json(allOrder)
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({ error: "error", error });
    }
}
const getOrder = async (req, res) => {
    try {
        const findOrder = await OrderModel.findById(req.params.id);
        if (findOrder) {
            res.status(StatusCodes.OK).json({ message: "Order data", findOrder });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ error: "Order not found data" });
        }
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({ error: "error", error });
    }
}
const createOrder = async (req, res) => {
    try {
        const newOrder = new OrderModel({ ...req.body, userId: req.user._id });
        const Order = await newOrder.save();
        res.status(StatusCodes.OK).json({ message: "Order added", Order });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "catch err ", error })
    }
}
const updateOrder = async (req, res) => {
    try {

        const OrderUpdate = await OrderModel.findOneAndUpdate({ _id: req.params.id }, { ...req.body }, { new: true })
        if (OrderUpdate) {
            res.status(StatusCodes.OK).json({ message: "Order updated", OrderUpdate });
        } else {
            res.status(StatusCodes.FORBIDDEN).json({ message: "Order not found" });
        }
    } catch (error) {

        res.status(StatusCodes.BAD_REQUEST).json({ message: "catch err ", error })
    }
}
const deleteOrder = async (req, res) => {

    try {
        if (req.Order && req.Order._id != req.params.id) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: "not auth Order" })
        } else {
            const deleteOrder = await OrderModel.deleteOne({ _id: req.params.id });
            if (deleteOrder.deletedCount) {
                res.status(StatusCodes.OK).json({ message: "Order deleted" });
            } else {
                res.status(StatusCodes.NOT_FOUND).json({ error: "Order not found data" });
            }
        }
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({ error: "error", error });
    }
}
const stateOrder = async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));
    const productId = req.query.pid;
    try {
        const income = await OrderModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: previousMonth },
                    ...(productId && {
                        products: { $elemMatch: { productId } },
                    }),
                },
            },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ]);
        res.status(200).json(income);
    } catch (err) {
        res.status(StatusCodes.NOT_FOUND).json({ error: "error", err });
    }
}
module.exports = {
    getAllOrder, getOrder, createOrder, updateOrder, deleteOrder, stateOrder
}       