const jwt = require('jsonwebtoken');
const { key } = require('./key');

module.exports.getJwtToken = (userId) => {
  const token = jwt.sign({ _id: userId }, key, { expiresIn: '7d' });
  return token;
};
