class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
    this.message = message || 'Forbidden';
  }
}

module.exports = ForbiddenError;
