const Post = require('./models/post');
const Comment =require('./models/comment')
const { postValidSchema } = require('./validationschemas');

module.exports.validatePost = (req, res, next) => {
  const { title, body } = req.body;

  const validation = postValidSchema.validate({ title, body });

  if (!validation.error) {
    return next();
  }
  req.flash('error', validation.error.message);
  res.redirect('/posts/new');
};

module.exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('error', 'Need to Loggin');
    res.redirect('/login');
  }
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const foundPost = await Post.findById(id);
  if (req.user._id.equals(foundPost.author)) {
    return next();
  }
  req.flash('success', `Don't have permission to do that`);
  res.redirect('/');
};

module.exports.isCommentAuthor = async (req, res, next) => {
  const { commentId } = req.params;  
  const foundComment = await Comment.findById(commentId);  
  if (req.user._id.equals(foundComment.author)) {  
    return next();
  }
  req.flash('success', `Don't have permission to do that`);
  res.redirect('/');
};