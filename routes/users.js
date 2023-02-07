const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const middlewares = require('../middlewares');
const { upload, cloudinary } = require('../multercloudinaryconfig');
const wrapAsyncError=require('../utils/wrapAsyncError')

router.post('/follow',middlewares.isLoggedIn,wrapAsyncError(usersController.followUser))
router.get('/:id', wrapAsyncError(usersController.getShowUser));
router.patch('/:id', middlewares.isLoggedIn, upload.single('image'), wrapAsyncError(usersController.editUserInfo));

module.exports = router;
