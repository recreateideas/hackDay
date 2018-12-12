const { findProduct, saveProduct } = require('./controllers');
var path = require("path");

module.exports = (app) => {

    app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/pages/index.html')));

    app.get('/pages/:page', (req, res) => res.sendFile(path.join(__dirname + '/pages/'+req.params.page+'.html')));

    app.get('/find', findProduct);

    app.post('/save', saveProduct);
};
