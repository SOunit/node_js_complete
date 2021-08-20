const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const envs = require('../envs');

module.exports = {
  createUser: async ({ userInput }, req) => {
    // const email = userInput.email;

    const errors = [];
    console.log('userInput.email', { ...userInput });
    if (!validator.isEmail(userInput.email)) {
      errors.push({ message: 'E-Mail is invalid.' });
    }
    if (
      validator.isEmpty(userInput.password) ||
      !validator.isLength(userInput.password, { min: 5 })
    ) {
      errors.push({ message: 'Password too short!' });
    }
    if (errors.length > 0) {
      const error = new Error('Invalid input.');
      error.data = errors;
      error.code = 422;
      throw error;
    }

    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser) {
      const error = new Error('User exists already!');
      throw error;
    }
    const hashedPassword = await bcrypt.hash(userInput.password, 12);
    const user = new User({
      email: userInput.email,
      name: userInput.name,
      password: hashedPassword,
    });
    const createdUser = await user.save();
    // convert id object to string to avoid error
    console.log('createdUser._doc', createdUser._doc);
    return { ...createdUser._doc, _id: createdUser._id.toString() };
  },

  login: async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error('User not found!');
      error.code = 401;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error('Password is incorrect.');
      error.code = 401;
      throw error;
    }

    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      envs.USER_TOKEN_SECRET_KEY,
      { expiresIn: '1h' }
    );

    return { token, userId: user._id.toString() };
  },
};

// module.exports = {
//   createUser(args, req) {
//     const email = args.userInput.email;
//   },
// };
