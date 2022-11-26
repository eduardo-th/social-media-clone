const express = require('express');
const passport = require('passport');
const User = require('../models/user');

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('auth/login');
});
router.get('/register', function (req, res, next) {
  res.render('auth/register');
});
router.post(
  '/login',
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
router.post('/register', async (req, res, next) => {
  const { username, password, email } = req.body;
  const userDoc = new User({ username, email });

  const registeredUser =  await User.register(userDoc, password);  
  
  if(registeredUser){
    //do this id user found
  req.login(registeredUser, function (err) {
    if (err) {
      return next(err);
    }
    return res.redirect('/');
  });
  }    
  res.redirect('/register')
});

module.exports = router;
