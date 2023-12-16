const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const wrongPathRouter = require('./wrong');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('/*', wrongPathRouter);

module.exports = router;
