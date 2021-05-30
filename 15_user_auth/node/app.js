const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');

const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const User = require('./models/user');

const MONGO_DB_URL = 'mongodb://mongo:27017/shop';

const app = express();
const store = new MongoDBStore({
  uri: MONGO_DB_URL,
  collection: 'sessions',
});
const csrfProtection = csrf();

// middle wares
app.use(bodyParser.urlencoded({ extended: false }));
// template engine
app.set('view engine', 'ejs');
app.set('views', 'views');
// to import css
app.use(express.static(path.join(__dirname, 'public')));
// session config
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
// csurf needs session, so this must be after session setting code
app.use(csrfProtection);

// setup user with mongoose method, save it in request
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

// router
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404);

mongoose
  .connect(MONGO_DB_URL)
  .then((result) => {
    // console.log(result);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
