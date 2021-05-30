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
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.redirect('/');
    })
    .catch((err) => console.log(err));
};
