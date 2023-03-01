const Post = require('../models/post');

module.exports.getTag = async function (req, res) {
  const { tag } = req.params;

  const foundPost = await Post.find({ tags: tag }).limit(10).sort({ createdAt: -1 });

  res.render('tags/index', { foundPost });
};