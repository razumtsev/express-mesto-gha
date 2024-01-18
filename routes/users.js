const router = require('express').Router();
const { celebrate } = require('celebrate');
const { userIdValidation } = require('../utils/joiSettings');
const {
  getUsers,
  getCurrentUser,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', celebrate(userIdValidation), getUserById);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
