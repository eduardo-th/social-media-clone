const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('auth/login');
});
router.post(
  '/',
  passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login',
    keepSessionInfo: true,
  }),
  (req, res) => {
    const redirectUrl = req.session.previusUrl || '/posts';
    req.flash('success', `Welcome back ${req.body.username}`);
    res.redirect(redirectUrl);
  }
);

module.exports = router;
