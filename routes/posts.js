const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const middlewares = require('../middlewares');
const upload = require('../multercloudinaryconfig');

router.get('/', async (req, res) => {
  const foundPost = await Post.find().limit(10).sort({ createdAt: -1 });
  res.render('posts/index', { foundPost });
});
router.get('/new', middlewares.isLoggedIn, (req, res) => {
  res.render('posts/new');
});
router.get('/:id', async (req, res) => {
  let userComment = null;
  const { id } = req.params;
  const foundPost = await Post.findById(id).populate({
    path: 'comments',
    populate: { path: 'author', select: 'username', ref: 'User' },
  });

  if (req.user) {
    userComment = foundPost.comments.find((elem) => elem.author._id.equals(req.user._id));
  }
  res.render('posts/show', { foundPost, userComment });
});
router.get('/:id/edit', middlewares.isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const foundPost = await Post.findById(id);
  res.render('posts/edit', { foundPost });
});

router.post(
  '/',
  middlewares.isLoggedIn,
  upload.single('image'),
  middlewares.validatePost,
  async (req, res) => {
    const { title, body, tags } = req.body;
    const image = {
      url: req.file.path,
      filename: req.file.filename,
    };
    console.log(req.body);
    console.log(req.file);
    const postDoc = new Post({
      title,
      body,
      tags: tags.split(' '),
      author: req.user._id,
      image,
    });
    await postDoc.save();
    res.redirect('/');
  }
);
router.patch('/:id', middlewares.isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { title, body, tags } = req.body;
  const editedPost = {
    title,
    body,
    tags: tags.split(' '),
  };
  const foundDoc = await Post.findByIdAndUpdate(id, editedPost);
  res.redirect(`/posts/${id}`);
});
router.delete('/:id', middlewares.isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const foundDoc = await Post.findByIdAndDelete(id);

  res.redirect('/');
});
module.exports = router;
