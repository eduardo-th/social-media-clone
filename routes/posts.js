const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const { upload } = require('../multercloudinaryconfig');
const postController = require('../controllers/posts');
const wrapAsyncError=require('../utils/wrapAsyncError')

router.get('/', wrapAsyncError(postController.getIndexPost));
router.get('/new', middlewares.isLoggedIn, postController.getNewPost);
router.get('/:id', wrapAsyncError(postController.getShowPost));
router.get('/:id/edit', middlewares.isLoggedIn, middlewares.isAuthor, wrapAsyncError(postController.getEditPost));

router.post(
  '/',
  middlewares.isLoggedIn,
  upload.single('image'),
  middlewares.validatePost,
  wrapAsyncError(postController.createNewPost)
);
router.patch('/:id',middlewares.isLoggedIn, middlewares.isAuthor, wrapAsyncError(postController.editPost));
router.delete('/:id', middlewares.isLoggedIn, middlewares.isAuthor, wrapAsyncError(postController.deletePost));
module.exports = router;
