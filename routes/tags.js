const express = require('express');
const router = express.Router();

const tagsController = require('../controllers/tags');

router.get('/:tag', tagsController.getTag);
router.get('/:tag/feed', tagsController.getFeedTag);

module.exports = router;
