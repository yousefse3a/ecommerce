const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { userModel } = require("../models/UserModel");

const Roles = {
    user: 'user',
    admin: 'admin'
}
const auth = (accessRoles) => {
    return async (req, res, next) => {
        try {
            const headerToken = req.headers['authorization']
            if (!headerToken ||
                headerToken == null ||
                headerToken == undefined ||
                !headerToken.startsWith(`${process.env.Bearerkey} `)) {
                res.status(StatusCodes.UNAUTHORIZED).json({ message: "header token error" })
            } else {
                const token = headerToken.split(" ")[1];
                if (!token ||
                    token == null ||
                    token == undefined || token.length < 1) {
                    res.status(StatusCodes.UNAUTHORIZED).json({ message: "in-valid token " })
                } else {
                    const decoded = jwt.verify(token, process.env.tokenSignature);
                    const findUser = await userModel.findById(decoded.id).select('username email role');
                    if (!findUser) {
                        res.status(StatusCodes.UNAUTHORIZED).json({ message: "in-valid loggin user " })
                    } else {
                        if (accessRoles.includes(findUser.role)) {
                            req[findUser.role]=findUser;
                            req.user = findUser
                            next()
                        } else {
                            res.status(StatusCodes.UNAUTHORIZED).json({ message: "not auth user" })
                        }

                    }
                }
            }
        } catch (error) {
            res.status(StatusCodes.NOT_FOUND).json({ "error": "error", error });
        }
    }
}

module.exports = { auth, Roles }
