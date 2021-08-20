const bcrypt = require('bcryptjs');
const User = require('../models/user');

module.exports = {
  createUser: async ({ userInput }, req) => {
    // const email = userInput.email;
    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser) {
      const error = new Error('Use exists already!');
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
};

// module.exports = {
//   createUser(args, req) {
//     const email = args.userInput.email;
//   },
// };
