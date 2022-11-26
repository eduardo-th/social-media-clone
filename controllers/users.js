const User = require('../models/user');
const { upload, cloudinary } = require('../multercloudinaryconfig');

module.exports.getShowUser = async (req, res) => {
  const { id } = req.params;

  const foundUser = await User.findById(id)
    .populate('follows followers', 'username avatar')
    .populate('posts', 'title image');

  res.render('users/show', { foundUser });
};
module.exports.editUserInfo = async (req, res) => {
  const { id } = req.params;
  const { about } = req.body;
  const currentAvatar = await User.findById(id, 'avatar');
  const avatar = {
    url: req.file ? req.file.path : currentAvatar.avatar.url,
    filename: req.file ? req.file.filename : currentAvatar.avatar.filename,
  };

  const foundUser = await User.findByIdAndUpdate(id, { about, avatar }, { new: true });
  if (currentAvatar.avatar.filename !== '') {
    const result = await cloudinary.uploader.destroy(currentAvatar.avatar.filename);
  }
  res.redirect(`/users/${id}`);
};
