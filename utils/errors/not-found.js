class NotFoundError extends Error {
  constructor(message = 'Not found') {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
