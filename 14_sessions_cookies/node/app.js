const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');

const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const User = require('./models/user');
const mongoose = require('mongoose');

const app = express();

// middle wares
app.use(bodyParser.urlencoded({ extended: false }));
// template engine
app.set('view engine', 'ejs');
app.set('views', 'views');
// to import css
app.use(express.static(path.join(__dirname, 'public')));
// session config
app.use(
  session({ secret: 'my secret', resave: false, saveUninitialized: false })
);

// set user
app.use((req, res, next) => {
  // try to fetch user
  User.findOne()
    .then((user) => {
      // if user NOT exist
      if (!user) {
        const user = new User({
          name: 'Max',
          email: 'max@test.com',
          cart: {
            items: [],
          },
        });
        return user.save();
      }
      // if user exist
      return user;
    })
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
  .connect('mongodb://mongo:27017/shop')
  .then((result) => {
    // console.log(result);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
