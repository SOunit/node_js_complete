const express = require('express');
const bodyParser = require('body-parser');

const feedRoutes = require('./routes/feed');

const app = express();

// for x-www-form-urlencode, for data in form request
// app.use(bodyParser.json());

// for application/json, for json data in request
app.use(bodyParser.json());

// setup for cors header
app.use((req, res, next) => {
  // allow origin, localhost:8080, sample.com
  res.setHeader('Access-Control-Allow-Origin', '*');
  // allow methods
  res.setHeader('Access-Control-Allow-Method', 'GET, POST, PUT, PATCH, DELETE');
  // allow setting content-type in client side
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// routes
app.use('/feed', feedRoutes);

app.listen(8080);
