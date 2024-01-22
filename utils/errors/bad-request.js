class BadRequestError extends Error {
  constructor(message = 'Incorrect data sent') {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
