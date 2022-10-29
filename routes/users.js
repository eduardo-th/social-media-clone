const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const upload = require('../multercloudinaryconfig');

router.get('/', function (req, res, next) {
  res.render('users/register');
});
router.get('/login', (req, res) => {
  res.render('users/login');
});
router.get('/:id', async (req, res) => {
  const { id } = req.params;  

  const foundUser = await User.findById(id);

  console.log(foundUser);

  res.render('users/show', { foundUser });
});
router.patch('/:id', upload.single('image'), async (req, res) => {
  console.log('LLEGO AL PATCH USER');
  const { id } = req.params;
  const { about } = req.body;
  const avatar = {
    url: req.file.path,
    filename: req.file.filename,
  };

  const foundUser = await User.findByIdAndUpdate(id, { about, avatar },{new:true});

  console.log('-*-*PARAMS-*-*', req.params);
  console.log('-*-*BODY-*-*', req.body);
  console.log('-*-*FILE-*-*', req.file);
  console.log('-*-*FOUND USER-*-*', foundUser);

  res.redirect(`/users/${id}`);
});
router.post('/', async (req, res) => {
  const { username, password, email } = req.body;
  const userDoc = new User({ username, email });

  const registeredUser = await User.register(userDoc, password);

  req.login(registeredUser, function (err) {
    if (err) {
      return next(err);
    }
    return res.redirect('/');
  });
});
router.post(
  '/login',
  passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/users/login',
    keepSessionInfo: true,
  }),
  (req, res) => {
    const redirectUrl = req.session.previusUrl || '/posts';
    req.flash('success', `Welcome back ${req.body.username}`);
    res.redirect(redirectUrl);
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
