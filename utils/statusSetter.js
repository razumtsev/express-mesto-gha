// Памятка по импортируемым статусам:
// HTTP_STATUS_OK - 200
// HTTP_STATUS_CREATED - 201
// HTTP_STATUS_BAD_REQUEST - 400
// HTTP_STATUS_DENIED - 401
// HTTP_STATUS_NOT_FOUND - 404
// HTTP_STATUS_SERVER_ERROR - 500

const {
  HTTP_STATUS_CREATED,
} = require('http2').constants;

module.exports.setStatusCreated = (res, data) => res.status(HTTP_STATUS_CREATED).send(data);
