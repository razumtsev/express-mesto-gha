const NotFoundError = require('../utils/errors/not-found');

module.exports.wrongPath = (req, res, next) => {
  next(new NotFoundError('Wrong path'));
};
