const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

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
router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/', failureMessage: true }),
  (req, res) => {
    res.redirect('/posts');
  }
);
router.post('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
