const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('/', async (req, res) => {
  const foundPost = await Post.find().limit(10).sort({ createdAt: -1 });
  res.render('posts/index', { foundPost });
});
router.get('/new', (req, res) => {
  res.render('posts/new');
});
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const foundPost = await Post.findById(id);
  res.render('posts/show', { foundPost });
});
router.get('/:id/edit', async (req, res) => {
  const { id } = req.params;
  const foundPost = await Post.findById(id);
  res.render('posts/edit', { foundPost });
});
router.post('/', async (req, res) => {
  const { title, body, tags } = req.body;
  const postDoc = new Post({
    title,
    body,
    tags: tags.split(' '),
    //get user id from session
    //multer image
  });
  await postDoc.save();
  res.redirect('/');
});
module.exports = router;
