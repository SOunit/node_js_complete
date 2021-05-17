const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/add-products', (req, res, next) => {
  res.send(
    '<form action="/product" method="post" ><input name="title" /><button>Add</button></form>'
  );
});

app.post('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

app.get('/', (req, res, next) => {
  res.send('<h1>test</h1>');
});

app.listen(3000);
