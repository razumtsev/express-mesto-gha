const router = require('express').Router();
const { celebrate } = require('celebrate');
const { userIdValidation, userInfoValidation, avatarValidation } = require('../utils/joiSettings');
const {
  getUsers,
  getCurrentUser,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
// router.get('/:userId', getUserById);
// router.patch('/me', updateUserInfo);
// router.patch('/me/avatar', updateUserAvatar);
router.get('/:userId', celebrate(userIdValidation), getUserById);
router.patch('/me', celebrate(userInfoValidation), updateUserInfo);
router.patch('/me/avatar', celebrate(avatarValidation), updateUserAvatar);

module.exports = router;
