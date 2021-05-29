exports.getLogin = (req, res, next) => {
  const isLoggedIn = req.get('Cookie').split(';')[5].trim().split('=')[1];
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: isLoggedIn,
    productCSS: false,
    formsCSS: true,
  });
};

exports.postLogin = (req, res, next) => {
  // if set login here, request ends when making response
  // user info is set by app, run before every request,
  // avaialbe later process, and ends when making request
  // req.isLoggedIn = true;

  res.setHeader('Set-Cookie', 'loggedIn=true');
  res.redirect('/');
};
