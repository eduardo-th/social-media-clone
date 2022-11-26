const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const authController=require('../controllers/auth')

const router = express.Router();

router.get('/login',authController.getLogin);
router.get('/register', authController.getRegister);
router.post(
  '/login',
  passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login',
    keepSessionInfo: true,
  }),
  authController.postLogin
);
router.post('/register', authController.postRegister);
router.post('/logout', authController.postLogout);

module.exports = router;
