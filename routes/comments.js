const express = require('express');
const Post = require('../models/post');
const Comment = require('../models/comment');

const router = express.Router({ mergeParams: true });

router.post('/', async (req, res) => {
  const { id } = req.params;

  const commentDoc = new Comment({ author: req.user._id, body: req.body.body });
  const foundPost = await Post.findById(id);
  foundPost.comments.push(commentDoc);

  Promise.all([commentDoc.save(), foundPost.save()]);

  req.flash('success', 'Comment created');
  res.redirect(`/posts/${id}`);
});

module.exports = router;
