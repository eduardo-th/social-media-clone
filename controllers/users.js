const User = require('../models/user');
const { upload, cloudinary } = require('../multercloudinaryconfig');

module.exports.unfollowUser = async (req, res) => {
  const { userId } = req.body;
  const followerId = req.user.id;

  const updateUser = User.findByIdAndUpdate(userId, { $pull: { followers: followerId } });
  const updateFollower = User.findByIdAndUpdate(followerId, { $pull: { follows: userId } });
  await Promise.all([updateUser, updateFollower]);

  res.status(200).send();
}

module.exports.followUser = async (req, res) => {
  const { userId } = req.body;
  const followerId = req.user.id;

  const updateUser = User.findByIdAndUpdate(userId, { $push: { followers: followerId } });
  const updateFollower = User.findByIdAndUpdate(followerId, { $push: { follows: userId } });
  await Promise.all([updateUser, updateFollower]);

  res.status(200).send();
};
module.exports.getShowUser = async (req, res) => {
  const { id } = req.params;
  let isFollower = false;
  if (req.user) {
    const { followers } = await User.findById(id).select('followers');
    isFollower = followers.includes(req.user._id);
  }

  const foundUser = await User.findById(id)
    .populate('follows followers', 'username avatar')
    .populate('posts', 'title image');

  res.render('users/show', { foundUser, isFollower });
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
