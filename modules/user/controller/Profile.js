const { StatusCodes } = require('http-status-codes');
const fs = require("fs");
const path = require("path");
const { userModel } = require("../../../models/UserModel");

const getAllUser = async (req, res) => {
    console.log("first");
    const query = req.query.new;
    try {
        const allUser = query ? await userModel.find().sort({ _id: -1 }).limit(5) : await userModel.find();
        res.json(allUser)
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({ error: "error", error });
    }
}
const getUser = async (req, res) => {
    try {
        const findUser = await userModel.findById(req.params.id);
        if (findUser) {
            res.status(StatusCodes.OK).json({ message: "user data", findUser });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ error: "user not found data" });
        }
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({ error: "error", error });
    }
}
const updateUser = async (req, res) => {
    try {
        const { email, username, fullname, address } = req.body;
        if (!req.fileError) {
            if (req.file) {
                const img = `${req.fileDest}/${req.file.filename}`;
                var userOld = await userModel.findById(req.params.id);
                var userUpdate = await userModel.findOneAndUpdate({ _id: req.params.id }, { email, username, fullname, address, img }, { new: true })
                fs.unlinkSync(path.join(__dirname, `../../../${userOld.img}`));
            } else {
                var userUpdate = await userModel.findOneAndUpdate({ _id: req.params.id }, { email, username, fullname, address }, { new: true })
            }
            if (userUpdate) {
                res.status(StatusCodes.OK).json({ message: "user updated", userUpdate });
            } else {
                res.status(StatusCodes.FORBIDDEN).json({ message: "user not found" });
            }
        } else {
            res.status(StatusCodes.OK).json({ message: "invaild type" });
        }

    } catch (error) {

        res.status(StatusCodes.BAD_REQUEST).json({ message: "catch err ", error })
    }
}
const deleteUser = async (req, res) => {
    // try {
        console.log(req.user)
        if (req.user && (req.user.role === "admin" || req.user._id == req.params.id)) {
            const deleteUser = await userModel.deleteOne({ _id: req.params.id });
            if (deleteUser.deletedCount) {
                res.status(StatusCodes.OK).json({ message: "user deleted" });
            } else {
                res.status(StatusCodes.NOT_FOUND).json({ error: "user not found data" });
            }
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: "not auth user" })
        }
    // } catch (error) {
    //     res.status(StatusCodes.NOT_FOUND).json({ error: "error", error });
    // }
}
const stateUser = async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        const data = await userModel.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            }
        ]);
        console.log(data);
        res.status(200).json(data)
    } catch (err) {
        res.status(StatusCodes.NOT_FOUND).json({ error: "error", error });
    }
}
module.exports = {
    getAllUser, getUser, updateUser, deleteUser, stateUser
}       