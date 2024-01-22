class DeniedError extends Error {
  constructor(message = 'Authorization required') {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = DeniedError;
