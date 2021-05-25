const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const mongoConnect = require('./util/database').mongoConnect;

const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const shopRouter = require('./routes/shop');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// to import css
app.use(express.static(path.join(__dirname, 'public')));

// router
app.use('/admin', adminRoutes);
app.use(shopRouter);
app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});
