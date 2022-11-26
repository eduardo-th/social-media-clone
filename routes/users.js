const express = require('express');
const router = express.Router();
const User = require('../models/user');

const middlewares=require('../middlewares')
const { upload, cloudinary } = require('../multercloudinaryconfig');

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const foundUser = await User.findById(id)
  .populate('follows followers','username avatar')
  .populate('posts','title image')  
  
  res.render('users/show', { foundUser });
});
router.patch('/:id', middlewares.isLoggedIn,upload.single('image'), async (req, res) => {
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
});

module.exports = router;
