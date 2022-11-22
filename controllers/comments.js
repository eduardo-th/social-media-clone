const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.postComment=async (req, res) => {
    const { id } = req.params;
  
    const commentDoc = new Comment({ author: req.user._id, body: req.body.body });
    const foundPost = await Post.findById(id);
    foundPost.comments.push(commentDoc);
      
    await Promise.all([commentDoc.save(), foundPost.save()]);
  
    req.flash('success', 'Comment created');
    res.redirect(`/posts/${id}`);
  }
  module.exports.editComment=async (req, res) => {
    const { id, commentId } = req.params;
    const { body } = req.body;
  
    const foundComment = await Comment.findByIdAndUpdate(commentId, { body }, { new: true });
  
    req.flash('success', 'Comment edited');
    res.redirect(`/posts/${id}`);
  }
  module.exports.deleteComment=async (req, res) => {
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
  }