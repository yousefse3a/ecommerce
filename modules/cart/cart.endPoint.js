const { Roles } = require('../../middlewares/auth');
const endPoint = {
    createCart: [Roles.admin, Roles.user],
    updateCart: [Roles.admin, Roles.user],
    deleteCart: [Roles.admin, Roles.user],
    getCart: [Roles.admin, Roles.user],
    getAllCart: [Roles.admin]
}
module.exports = { endPoint };