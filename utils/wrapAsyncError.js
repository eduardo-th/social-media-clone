module.exports = function wrapAsyncError(cb) {
  return function (req, res, next) {
    cb(req, res, next).catch((err) => next(err));
  };
};
