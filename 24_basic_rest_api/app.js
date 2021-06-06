const express = require('express');
const bodyParser = require('body-parser');

const feedRoutes = require('./routes/feed');

const app = express();

// for x-www-form-urlencode, for data in form request
// app.use(bodyParser.json());

// for application/json, for json data in request
app.use(bodyParser.json());

// routes
app.use('/feed', feedRoutes);

app.listen(8080);
