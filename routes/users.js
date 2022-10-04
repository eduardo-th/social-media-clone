const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', function (req, res, next) {
  res.render('users/register');
});
router.get('/login', (req, res) => {
  res.render('users/login');
});

router.post('/', async (req, res) => {
  const { username, password, email } = req.body;
  const userDoc = new User({ username, email });
  await User.register(userDoc, password);

  res.redirect('/');
});

module.exports = router;
