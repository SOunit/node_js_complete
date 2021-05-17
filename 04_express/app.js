const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log('in 1st middleware');
  next();
});

app.use((req, res, next) => {
  console.log('in 2nd middleware');
  res.send('<h1>test</h1>');
});

app.listen(3000);
