const jwt = require('jsonwebtoken');

const envs = require('../envs');

module.exports = (req, res, next) => {
  // auth header has auth info from client request
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  // auth header value is like below, we get token only from value
  // Bearer someTokenString
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, envs.USER_TOKEN_SECRET_KEY);
  } catch (err) {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  // this is middleware, all reqeust go through this process
  req.userId = decodedToken.userId;
  req.isAuth = true;
  next();
};
