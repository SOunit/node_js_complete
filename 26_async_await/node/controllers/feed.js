const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator/check');

const Post = require('../models/post');
const User = require('../models/user');

exports.getPosts = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  let totalItems;
  try {
    const count = await Post.find().countDocuments();
    totalItems = count;
    const posts = await Post.find()
      .populate('creator')
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
    res.status(200).json({
      message: 'Fetched posts successfully.',
      posts,
      totalItems,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    // async code need next() to throw error
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is not collect.');
    error.statusCode = 422;
    // sync code do NOT need next() to throw error
    throw error;
  }
  if (!req.file) {
    const error = new Error('No image provided.');
    error.statusCode = 422;
    throw error;
  }

  const imageUrl = req.file.path;
  const title = req.body.title;
  const content = req.body.content;

  // create post in db
  const post = new Post({
    title,
    content,
    imageUrl,
    creator: req.userId,
  });

  try {
    // create post
    await post.save();

    // create post in user
    const user = await User.findById(req.userId);
    user.posts.push(post);
    await user.save();

    // return result
    res.status(201).json({
      message: 'Post created successfully!',
      post,
      creator: { _id: user._id, name: user.name },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    // async code need next() to throw error
    next(err);
  }
};

exports.getPost = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      const error = new Error('Could not find post.');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ message: 'Post fetched', post });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is not collect.');
    error.statusCode = 422;
    // sync code do NOT need next() to throw error
    throw error;
  }

  // get data from client
  const postId = req.params.postId;
  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = req.body.image;
  if (req.file) {
    imageUrl = req.file.path;
  }

  // check error
  if (!imageUrl) {
    const error = new Error('No file picked');
    error.statusCode = 422;
    throw error;
  }

  try {
    // update db
    const post = await Post.findById(postId);

    if (!post) {
      const error = new Error('Could not find post.');
      error.statusCode = 404;
      throw error;
    }

    // check for user authorization
    if (post.creator.toString() !== req.userId.toString()) {
      const error = new Error('Not authorized.');
      error.statusCode = 403;
      throw error;
    }

    // delete file if new path is different.
    if (post.imageUrl !== imageUrl) {
      clearImage(post.imageUrl);
    }

    // update post
    post.title = title;
    post.content = content;
    post.imageUrl = imageUrl;
    const result = await post.save();

    res.status(201).json({
      message: 'Post updated!',
      post: result,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error('Could not find post.');
      error.statusCode = 404;
      throw error;
    }

    // check logged in user
    if (post.creator.toString() !== req.userId.toString()) {
      const error = new Error('Not authorized.');
      error.statusCode = 403;
      throw error;
    }

    // delete post
    clearImage(post.imageUrl);
    await Post.findByIdAndDelete(postId);

    // delete post from user posts
    const user = await User.findById(req.userId);
    user.posts.pull(postId);
    await user.save();

    res.status(200).json({ message: 'Deleted post.' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
