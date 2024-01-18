const router = require('express').Router();
const { celebrate } = require('celebrate');
const { signupValidation, signinValidation } = require('../utils/joiSettings');
const { createUser, login } = require('../controllers/users');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const wrongPathRouter = require('./wrong');
const auth = require('../middlewares/auth');

router.post('/signup', celebrate(signupValidation), createUser);
router.post('/signin', celebrate(signinValidation), login);
router.use(auth);
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('/*', wrongPathRouter);

module.exports = router;
