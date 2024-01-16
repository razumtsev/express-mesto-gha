class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.message = message || 'Incorrect data sent';
  }
}

module.exports = BadRequestError;
