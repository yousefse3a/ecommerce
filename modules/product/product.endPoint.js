const { Roles } = require('../../middlewares/auth');
const endPoint = {
    createProduct: [Roles.admin],
    updateProduct: [Roles.admin],
    deleteProduct: [Roles.admin]
}
module.exports = { endPoint };