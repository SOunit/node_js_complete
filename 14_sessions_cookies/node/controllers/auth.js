exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    productCSS: false,
    formsCSS: true,
  });
};
