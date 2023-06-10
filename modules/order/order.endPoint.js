const { Roles } = require('../../middlewares/auth');
const endPoint = {
    createOrder: [Roles.admin,Roles.user],
    updateOrder: [Roles.admin],
    deleteOrder: [Roles.admin],
    getOrder: [Roles.admin,Roles.user],
    getAllOrder: [Roles.admin],
    stateOrder: [Roles.admin]
}
module.exports = { endPoint };