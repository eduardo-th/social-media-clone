module.exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('error','Need to Loggin')
    res.redirect('/users/login')
  }
};
