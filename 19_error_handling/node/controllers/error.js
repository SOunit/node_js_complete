exports.get404 = (req, res, next) => {
  res.status(404).render('404', {
    path: '/404',
    pageTitle: 'Page Not Found',
    productCSS: false,
    formsCSS: false,
  });
};

exports.get500 = (req, res, next) => {
  res.status(500).render('500', {
    path: '/500',
    pageTitle: 'Error!',
    productCSS: false,
    formsCSS: false,
  });
};
