const { StatusCodes } = require("http-status-codes");
const { userModel } = require("../../../models/UserModel");
const bycrpt = require('bcrypt');
const jwt = require("jsonwebtoken");

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userFind = await userModel.findOne({ email })
        if (userFind) {
            const match = await bycrpt.compare(password, userFind.password);
            console.log(match)
            if (match) {
                const token = jwt.sign({ 'id': userFind._id ,'email':userFind.email ,'role':userFind.role,'img':userFind.img ,"fullname":userFind.fullname, isLogged: true }, process.env.tokenSignature);
                res.status(StatusCodes.ACCEPTED).json({message:"logged","userToken": token});
            } else {
                res.status(StatusCodes.ACCEPTED).json({ message: "password not match" })
            }
        } else {
            res.status(StatusCodes.ACCEPTED).json({ message: "email not exist" })
        }
    } catch (error) {

        res.status(StatusCodes.BAD_REQUEST).json({ message: "catch err ", error })
    }
}
module.exports = { signin }