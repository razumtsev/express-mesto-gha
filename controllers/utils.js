// Памятка по импортируемым статусам:
// HTTP_STATUS_OK - 200
// HTTP_STATUS_CREATED - 201
// HTTP_STATUS_BAD_REQUEST - 400
// HTTP_STATUS_NOT_FOUND - 404
// HTTP_STATUS_SERVER_ERROR - 500

const {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_SERVER_ERROR,
} = require('http2').constants;

const setStatusCreated = (res, data) => res.status(HTTP_STATUS_CREATED).send(data);
const setStatusNotFound = (res) => res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Item not found' });
const setStatusBadRequest = (res, err) => res.status(HTTP_STATUS_BAD_REQUEST).send({ message: !err ? 'Incorrect data sent' : err.message });
const setStatusServerError = (res) => res.status(HTTP_STATUS_SERVER_ERROR).send({ message: 'Server Error' });

module.exports = {
  setStatusCreated,
  setStatusNotFound,
  setStatusBadRequest,
  setStatusServerError,
};
