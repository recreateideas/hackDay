

const { handleConnection } = require('./dbControllers');
const { handleProduct } = require('./queryControllers');

module.exports = {
    handleProduct,
    handleConnection
};
