const NotFoundError = require('../utils/errors/not-found');

module.exports.wrongPath = (req, res, next) => {
  const err = new NotFoundError('Wrong path');
  next(err);
};
