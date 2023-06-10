const { Roles } = require('../../middlewares/auth');
const endPoint = {
    updateUser: [Roles.admin,Roles.user],
    deleteUser: [Roles.admin,Roles.user],
    getUser: [Roles.admin,Roles.user],
    getAllUser: [Roles.admin],
    stateUser: [Roles.admin]
}
module.exports = { endPoint };