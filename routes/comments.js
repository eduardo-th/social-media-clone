const express = require('express');
const Post = require('../models/post');
const Comment = require('../models/comment');

const router = express.Router({ mergeParams: true });

router.post('/', async (req, res) => {
  const { id } = req.params;

  const commentDoc = new Comment({ author: req.user._id, body: req.body.body });
  const foundPost = await Post.findById(id);
  foundPost.comments.push(commentDoc);

  await Promise.all([commentDoc.save(), foundPost.save()]);

  req.flash('success', 'Comment created');
  res.redirect(`/posts/${id}`);
});

router.delete('/:commentId', async (req, res) => {
  const { id, commentId } = req.params;

  const deleteCommentPost = Post.findByIdAndUpdate(
    id,
    { $pull: { comments: commentId } },
    { new: true }
  ).exec();
  const deleteComment = Comment.findByIdAndDelete(commentId).exec();

  await Promise.all([deleteComment, deleteCommentPost]);

  req.flash('success', 'Comment deleted');
  res.redirect(`/posts/${id}`);
});

module.exports = router;
