const { StatusCodes } = require("http-status-codes");
const { userModel } = require("../../../models/UserModel");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    try {
        const { username, email, password, address, gender, fullname } = req.body;
        if (req.file) {
            if (!req.fileError) {
                const img = `${req.fileDest}/${req.file.filename}`;
                const newUser = new userModel({ username, email, password, address, gender, fullname, img });
                const savedUser = await newUser.save();
                const token = jwt.sign({ 'id': savedUser._id ,'email':savedUser.email ,'role':savedUser.role,'img':savedUser.img ,"fullname":savedUser.fullname, isLogged: true }, process.env.tokenSignature);
                res.status(StatusCodes.OK).json({ message: "user added", token });
            } else {
                res.status(StatusCodes.ACCEPTED).json({ message: "invaild type" });
            }
        } else {
            const newUser = new userModel({ username, email, password, address, gender, fullname });
            const savedUser = await newUser.save();
            const token = jwt.sign({ 'id': savedUser._id ,'email':savedUser.email ,'role':savedUser.role,"fullname":savedUser.fullname, isLogged: true }, process.env.tokenSignature);
            res.status(StatusCodes.OK).json({ message: "user added", token });
        }
    } catch (error) {
        if (error.keyValue) {
            res.status(StatusCodes.OK).json({ message: "email exist" })
        } else {
            res.status(StatusCodes.Ok).json({ message: "catch err ", error })
        }
    }
}
module.exports = { signup }