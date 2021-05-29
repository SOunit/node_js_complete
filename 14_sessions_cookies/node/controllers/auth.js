exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: req.isLoggedIn,
    productCSS: false,
    formsCSS: true,
  });
};

exports.postLogin = (req, res, next) => {
  // if set login here, request ends when making response
  // user info is set by app, run before every request,
  // avaialbe later process, and ends when making request
  req.isLoggedIn = true;
  res.redirect('/');
};
