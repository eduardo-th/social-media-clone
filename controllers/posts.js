const Post = require('../models/post');
const User = require('../models/user');

module.exports.getIndexPost = async (req, res) => {
  const foundPost = await Post.find().limit(10).sort({ createdAt: -1 });
  res.render('posts/index', { foundPost });
};
module.exports.getNewPost = (req, res) => {
  res.render('posts/new');
};
module.exports.getShowPost = async (req, res) => {
  let userComment = null;
  const { id } = req.params;
  const foundPost = await Post.findById(id)
    .populate('author', 'username')
    .populate({
      path: 'comments',
      populate: { path: 'author', select: 'username', ref: 'User' },
    });

  if (req.user) {
    userComment = foundPost.comments.find((elem) => elem.author._id.equals(req.user._id));
  }
  res.render('posts/show', { foundPost, userComment });
};
module.exports.getEditPost = async (req, res) => {
  const { id } = req.params;
  const foundPost = await Post.findById(id);
  res.render('posts/edit', { foundPost });
};
module.exports.createNewPost = async (req, res) => {
  const { title, body, tags } = req.body;
  const image = {
    url: req.file ? req.file.path : '',
    filename: req.file ? req.file.filename : '',
  };
  const postDoc = new Post({
    title,
    body,
    tags: tags.split(' '),
    author: req.user._id,
    image,
  });
  await postDoc.save();

  User.findById(req.user.id, (err, foundDoc) => {
    foundDoc.posts.push(postDoc._id);    
    foundDoc.save()
  });
  
  res.redirect('/');
};
module.exports.editPost = async (req, res) => {
  const { id } = req.params;
  const { title, body, tags } = req.body;
  const editedPost = {
    title,
    body,
    tags: tags.split(' '),
  };
  const foundDoc = await Post.findByIdAndUpdate(id, editedPost);
  res.redirect(`/posts/${id}`);
};
module.exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const foundDoc = await Post.findByIdAndDelete(id);

  res.redirect('/');
};
