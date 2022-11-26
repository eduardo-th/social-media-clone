const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const middlewares = require('../middlewares');
const { upload, cloudinary } = require('../multercloudinaryconfig');

router.get('/:id', usersController.getShowUser);
router.patch('/:id', middlewares.isLoggedIn, upload.single('image'), usersController.editUserInfo);

module.exports = router;
