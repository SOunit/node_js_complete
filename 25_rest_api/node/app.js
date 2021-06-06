const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const feedRoutes = require('./routes/feed');

// create constant
const MONGO_DB_URL = 'mongodb://mongo:27017/messages';

const app = express();

// for x-www-form-urlencode, for data in form request
// app.use(bodyParser.json());

// for application/json, for json data in request
app.use(bodyParser.json());
// for static image file serve
app.use('/images', express.static(path.join(__dirname, 'images')));

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

// general error handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message });
});

mongoose
  .connect(MONGO_DB_URL)
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
