const User = require('../models/user');

module.exports.getLogin = (req, res) => {
  res.render('auth/login');
};
module.exports.getRegister = (req, res) => {
  res.render('auth/register');
};
module.exports.postLogin = (req, res) => {
  const redirectUrl = req.session.previusUrl || '/posts';
  req.flash('success', `Welcome back ${req.body.username}`);
  res.redirect(redirectUrl);
};
module.exports.postRegister = async (req, res, next) => {
  console.log(req.body)
  const { username, password, email } = req.body;
  const userDoc = new User({ username, email });

  const registeredUser = await User.register(userDoc, password);

  if (registeredUser) {
    //do this id user found
    req.login(registeredUser, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  }
  res.redirect('/register');
};
module.exports.postLogout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};
