exports.get404 = (req, res, next) => {
  res.status(404).render('404', {
    path: '/404',
    pageTitle: 'Page Not Found',
    isAuthenticated: req.isLoggedIn,
    productCSS: false,
    formsCSS: false,
  });
};
