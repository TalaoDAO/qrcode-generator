const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

require('./helpers/mongoose').connect();

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(routes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Example app listening on port:', PORT))
