class DeniedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.message = message || 'Authorization required';
  }
}

module.exports = DeniedError;
