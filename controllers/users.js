const User = require('../models/user');
const { upload, cloudinary } = require('../multercloudinaryconfig');

module.exports.followUser = async (req, res) => {
  const { userId } = req.body;
  const followerId = req.user.id;

  const getUser = User.findById(userId);
  const getFollower = User.findById(followerId);

  const [foundUser, foundFollower] = await Promise.all([getUser, getFollower]);

  foundUser.followers.push(foundFollower._id);
  foundFollower.follows.push(foundUser._id);

  await Promise.all([foundUser.save(), foundFollower.save()]);

  res.status(200).send();
};
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
