const express = require('express');
const passport = require('passport');

const authController=require('../controllers/auth')
const {validateUserRegistration}=require('../middlewares')
const wrapAsyncError=require('../utils/wrapAsyncError')

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
router.post('/register', validateUserRegistration, wrapAsyncError(authController.postRegister));
router.post('/logout', authController.postLogout);

module.exports = router;
