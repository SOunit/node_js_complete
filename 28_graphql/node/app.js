const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require('./graphql/schema');
const graphqlResolvers = require('./graphql/resolvers');
const resolvers = require('./graphql/resolvers');

// create constant
const MONGO_DB_URL = 'mongodb://mongo:27017/messages';

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().toISOString()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// for x-www-form-urlencode, for data in form request
// app.use(bodyParser.json());

// for application/json, for json data in request
app.use(bodyParser.json());
// for file upload
app.use(multer({ storage: fileStorage, fileFilter }).single('image'));
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

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    // you can use graphql in link below
    // http://localhost/node/graphql
    graphiql: true,
    formatError(err) {
      if (!err.originalError) {
        return err;
      }
      const data = err.originalError.data;
      const message = err.message || 'An error occured.';
      const code = err.originalError.code || 500;
      return { message, status: code, data };
    },
  })
);

// general error handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data });
});

mongoose
  .connect(MONGO_DB_URL)
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
