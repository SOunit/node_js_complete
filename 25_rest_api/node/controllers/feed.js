const { validationResult } = require('express-validator/check');

const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: '1',
        title: 'First Post',
        content: 'This is the first post!',
        imageUrl: 'images/che_prof.jpeg',
        creator: {
          name: 'Jack',
        },
        createdAt: new Date(),
      },
    ],
  });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is not collect.');
    error.statusCode = 422;
    // sync code do NOT need next() to throw error
    throw error;
  }

  const title = req.body.title;
  const content = req.body.content;

  // create post in db
  const post = new Post({
    title,
    content,
    imageUrl: 'images/che_prof.jpeg',
    creator: { name: 'Jack' },
  });
  post
    .save()
    .then((result) => {
      console.log(result);
      res
        .status(201)
        .json({ message: 'Post created successfully!', post: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      // async code need next() to throw error
      next(err);
    });
};
