const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares');
const { upload } = require('../multercloudinaryconfig');
const postController = require('../controllers/posts');

router.get('/', postController.getIndexPost);
router.get('/new', middlewares.isLoggedIn, postController.getNewPost);
router.get('/:id', postController.getShowPost);
router.get('/:id/edit', middlewares.isLoggedIn, postController.getEditPost);

router.post(
  '/',
  middlewares.isLoggedIn,
  upload.single('image'),
  middlewares.validatePost,
  postController.createNewPost
);
router.patch('/:id',middlewares.isLoggedIn, middlewares.isAuthor, postController.editPost);
router.delete('/:id', middlewares.isLoggedIn, middlewares.isAuthor, postController.deletePost);
module.exports = router;
