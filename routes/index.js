const router = require('express').Router();
const { celebrate } = require('celebrate');
const { signupValidation } = require('../utils/joiSettings');
const { createUser, login } = require('../controllers/users');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const wrongPathRouter = require('./wrong');
const auth = require('../middlewares/auth');

router.post('/signup', celebrate(signupValidation), createUser);
router.post('/signin', login);
router.use(auth);
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('/*', wrongPathRouter);

module.exports = router;
