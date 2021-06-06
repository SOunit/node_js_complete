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
  const title = req.body.title;
  const content = req.body.content;
  // create post in db
  res.status(201).json({
    message: 'Post created successfully!',
    post: {
      title,
      content,
      _id: new Date().toISOString(),
      creator: { name: 'Jack' },
      createdAt: new Date(),
    },
  });
};
