const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  console.log(req.session.isLoggedIn);
  // const isLoggedIn = req.get('Cookie').split(';')[5].trim().split('=')[1];
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false,
    productCSS: false,
    formsCSS: true,
  });
};

exports.postLogin = (req, res, next) => {
  // if set login here, request ends when making response
  // user info is set by app, run before every request,
  // avaialbe later process, and ends when making request
  // req.isLoggedIn = true;

  // this is possible, but security weak, easy to change in browser
  // res.setHeader('Set-Cookie', 'loggedIn=true');

  // store data in session sample
  // req.session.isLoggedIn = true;

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
