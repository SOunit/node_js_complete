// import packages
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

// import classes
const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

// import classes for mongodb
const User = require('./models/user');
const { exception } = require('console');

// create constant
const MONGO_DB_URL = 'mongodb://mongo:27017/shop';

// setup variables for app
const app = express();
const store = new MongoDBStore({
  uri: MONGO_DB_URL,
  collection: 'sessions',
});
const csrfProtection = csrf();

// setup middle wares
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
// to show error messages and etc. for user experience
app.use(flash());

// setup user with mongoose method, save it in request
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      // throw Error, express take care of it.
      throw new Error(err);
    });
});

// set params for all view rendering
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

// router
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404);
app.use('/500', errorController.get500);

mongoose
  .connect(MONGO_DB_URL)
  .then((result) => {
    // console.log(result);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
