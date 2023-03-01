const Post = require('../models/post');

module.exports.getTag = async function (req, res) {
  const { tag } = req.params;

  const foundPost = await Post.find({ tags: tag }).limit(10).sort({ createdAt: -1 });

  res.render('tags/index', { foundPost });
};
module.exports.getFeedTag = async function (req, res) {
  let page = 0 || req.query.page;
  const { tag } = req.params;

  const itemsPerPage = 10;
  const foundPost = await Post.find({ tags: tag })
    .skip(page * itemsPerPage)
    .limit(itemsPerPage)
    .sort({ createdAt: -1 });

  res.send({ foundPost });
};