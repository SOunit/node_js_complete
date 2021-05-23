const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const shopRouter = require('./routes/shop');

const sequelize = require('./util/database');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// router
app.use('/admin', adminRoutes);
app.use(shopRouter);

// to import css
app.use(express.static(path.join(__dirname, 'public')));

// 404 router
app.use(errorController.get404);

// create tables
sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
