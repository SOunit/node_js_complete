const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const adminData = require('./routes/admin');
const shopRouter = require('./routes/shop');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// router
app.use('/admin', adminData.routes);
app.use(shopRouter);

// to import css
app.use(express.static(path.join(__dirname, 'public')));

// 404 router
app.use((req, res, next) => {
  res.status(404).render('404', {
    pageTitle: 'Page Not Found',
    productCSS: false,
    formsCSS: false,
  });
});

app.listen(3000);
