const { handleProduct,handleConnection } = require('./controllers/');

var path = require("path");

module.exports = (app) => {

    app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/pages/index.html')));

    app.post('/product', handleProduct);

    app.post('/db/connection', handleConnection);
};
