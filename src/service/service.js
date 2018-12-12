const express =require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


require('./routes')(app);

// app.use(errors());
app.listen('5011');

console.log(`Listening on localhost, port: 5011`);
