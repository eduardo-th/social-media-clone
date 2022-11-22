const express = require('express');

const middlewares = require('../middlewares');
const commentController=require('../controllers/comments')

const router = express.Router({ mergeParams: true });

router.post('/', middlewares.isLoggedIn, commentController.postComment);

router.put('/:commentId',middlewares.isLoggedIn, commentController.editComment);

router.delete('/:commentId', middlewares.isLoggedIn, commentController.deleteComment);

module.exports = router;
