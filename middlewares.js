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
