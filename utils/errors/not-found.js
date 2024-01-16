class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.message = message || 'Not found';
  }
}

module.exports = NotFoundError;
