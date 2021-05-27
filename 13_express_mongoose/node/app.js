const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const shopRouter = require('./routes/shop');
const User = require('./models/user');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// to import css
app.use(express.static(path.join(__dirname, 'public')));

// set user
app.use((req, res, next) => {
  // fetch user
  User.findById('60b0225c202db80324c80e6a')
    .then((user) => {
      req.user = user;
      console.log('app set user', req.user);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

// router
app.use('/admin', adminRoutes);
app.use(shopRouter);
app.use(errorController.get404);

mongoose
  .connect('mongodb://mongo:27017/shop')
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: 'Max',
          email: 'test@test.com',
          cart: { items: [] },
          _id: '60b0225c202db80324c80e6a',
        });
        user.save().then((user) => {
          console.log(user);
        });
      }
    });

    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
