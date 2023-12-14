const { HTTP_STATUS_NOT_FOUND } = require('http2').constants;

module.exports.wrongPath = (req, res) => res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Wrong Path' });
