const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const mongoConnect = require('./util/database').mongoConnect;

const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const shopRouter = require('./routes/shop');
const User = require('./models/user');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// to import css
app.use(express.static(path.join(__dirname, 'public')));

// set user
app.use((req, res, next) => {
  // get user
  User.findById('60adcd7606889d084be6f490')
    .then((user) => {
      if (user) {
        // user exists, use user
        return user;
      } else {
        // user NOT exist, create user
        const newUser = new User(
          'test name',
          'email@test.com',
          '60adcd7606889d084be6f490'
        );
        return newUser.save();
      }
    })
    .then((user) => {
      req.user = user;
      console.log(req.user);
      next();
    })
    .catch((err) => {
      console.log(err);
      next();
    });
});

// router
app.use('/admin', adminRoutes);
app.use(shopRouter);
app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});
