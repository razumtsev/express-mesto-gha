const router = require('express').Router();
const { celebrate } = require('celebrate');
const { signupSettings } = require('../utils/joiSettings');
const auth = require('../middlewares/auth');
const {
  createUser,
  login,
  getUsers,
  getCurrentUser,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.post('/signup', celebrate(signupSettings), createUser);
router.post('/signin', login);

router.use(auth);
router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', getUserById);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
