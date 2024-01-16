module.exports = (err, req, res, next) => {
  console.log('Error Handler is here!');
  console.log(err.statusCode, err.message);

  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({ message: statusCode === 500 ? 'Server Error' : message });
};
