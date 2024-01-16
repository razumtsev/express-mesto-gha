const jwt = require('jsonwebtoken');
const { key } = require('../utils/key');
const DeniedError = require('../utils/errors/denied');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) throw new DeniedError('Authorization required');
  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, key);
  } catch (err) {
    throw new DeniedError('Authorization required');
  }

  req.user = payload;

  return next();
};
