const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
  console.log(req.session.isLoggedIn);
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    productCSS: false,
    formsCSS: true,
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // try to fetch user
  // if email and password match, save data to session
  // else redirect to login page
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.redirect('/login');
      }
      bcrypt.compare(password, user.password).then((doMatch) => {
        if (doMatch) {
          // save data to mongodb session collection
          req.session.isLoggedIn = true;
          // user lost mongoose methods when saved in mongodb
          // so in app.js re-fetching object is needed by using User model
          req.session.user = user;

          // use save mthod to prevent redirecting before mongodb update finish
          return req.session.save((err) => {
            console.log(err);
            res.redirect('/');
          });
        }
        res.redirect('/login');
      });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    productCSS: false,
    formsCSS: true,
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        return res.redirect('/signup');
      }

      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save();
        })
        .then((result) => {
          res.redirect('/login');
        });
    })
    .catch((err) => console.log(err));
};
