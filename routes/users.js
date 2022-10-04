const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.render('users/register');
});
router.get('/login', (req, res) => {
  res.render('users/login');
});

module.exports = router;
