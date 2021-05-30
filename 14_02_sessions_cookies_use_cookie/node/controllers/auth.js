const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  const isLoggedIn = req.get('Cookie').split(';')[5].trim().split('=')[1];
  console.log(isLoggedIn);
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: isLoggedIn,
    productCSS: false,
    formsCSS: true,
  });
};

exports.postLogin = (req, res, next) => {
  // this is possible, but security weak, easy to change in browser
  res.setHeader('Set-Cookie', 'loggedIn=true');
  res.redirect('/');
};
