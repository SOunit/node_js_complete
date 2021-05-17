const express = require('express');

const router = express.Router();

router.get('/add-products', (req, res, next) => {
  res.send(
    '<form action="/product" method="post" ><input name="title" /><button>Add</button></form>'
  );
});

router.post('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;
