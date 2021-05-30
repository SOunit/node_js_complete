const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  console.log(req.isLoggedIn);
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false,
    productCSS: false,
    formsCSS: true,
  });
};

exports.postLogin = (req, res, next) => {
  // store data in request sample
  req.isLoggedIn = true;
  res.redirect('/');
};
