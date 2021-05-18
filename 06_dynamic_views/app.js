const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const adminData = require('./routes/admin');
const shopRouter = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));

// template engine
app.set('view engine', 'pug');
app.set('views', 'views');

// router
app.use('/admin', adminData.routes);
app.use(shopRouter);

// to import css
app.use(express.static(path.join(__dirname, 'public')));

// 404 router
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);
