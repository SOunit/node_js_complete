const User = require('../models/user');
const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const envs = require('../envs');

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  try {
    // create user
    const hashedPw = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      name,
      password: hashedPw,
    });
    const result = await user.save();

    res.status(201).json({ message: 'User created', userId: result._id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    // async code need next() to throw error
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    // check user
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error('A user with this email cound not be found.');
      error.statusCode = 401;
      throw error;
    }

    // check password
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }

    // create token
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      envs.USER_TOKEN_SECRET_KEY,
      {
        expiresIn: '1h',
      }
    );

    // return token and user id
    res.status(200).json({ token, userId: user._id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    // async code need next() to throw error
    next(err);
  }
};

exports.getStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error('A user with this email cound not be found.');
      error.statusCode = 401;
      throw error;
    }
    res.status(200).json({ status: user.status });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    // async code need next() to throw error
    next(err);
  }
};

exports.updateUserStatus = async (req, res, next) => {
  const newStatus = req.body.status;

  try {
    const user = await User.findById(req.userId);
    user.status = newStatus;
    await user.save();
    res.status(200).json({ message: 'User updated!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    // async code need next() to throw error
    next(err);
  }
};
