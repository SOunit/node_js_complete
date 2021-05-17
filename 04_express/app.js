const express = require('express');
const app = express();

app.use('/', (req, res, next) => {
  console.log('this always run');
  next();
});

app.use('/add-products', (req, res, next) => {
  console.log('in 1st middleware');
  res.send('<h1>Add Product</h1>');
});

app.use('/', (req, res, next) => {
  console.log('in 2nd middleware');
  res.send('<h1>test</h1>');
});

app.listen(3000);
