class ConflictError extends Error {
  constructor(message = 'This email is already used') {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
