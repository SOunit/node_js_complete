const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  console.log(req.session.isLoggedIn);
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: req.session.isLoggedIn,
    productCSS: false,
    formsCSS: true,
  });
};

exports.postLogin = (req, res, next) => {
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
      // save data to mongodb session collection
      req.session.isLoggedIn = true;
      // user lost mongoose method when saved in mongodb
      // so in app.js re-fetching object is needed by using User model
      req.session.user = user;
      res.redirect('/');
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
};
