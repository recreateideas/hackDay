const express =require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

require('./routes')(app);

const port = process.env.REMOTE_PORT || 5011;

app.listen(port);

console.log(`-> Server Listening on ${process.env.REMOTE_HOST} port: ${port}\n`);
