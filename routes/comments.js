const express = require('express');

const middlewares = require('../middlewares');
const commentController=require('../controllers/comments')
const wrapAsyncError=require('../utils/wrapAsyncError')

const router = express.Router({ mergeParams: true });

router.post('/', middlewares.isLoggedIn, wrapAsyncError(commentController.postComment));

router.put('/:commentId',middlewares.isLoggedIn, middlewares.isCommentAuthor, commentController.editComment);

router.delete('/:commentId', middlewares.isLoggedIn, middlewares.isCommentAuthor, wrapAsyncError(commentController.deleteComment));

module.exports = router;
