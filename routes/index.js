const router = require('express').Router();
const usersRouter = require('./users');

router.get('/', (req, res) => {
  res.status(200).send('Server is working now!');
});

router.use('/users', usersRouter);

module.exports = router;
