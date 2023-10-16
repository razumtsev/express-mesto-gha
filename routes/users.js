const router = require('express').Router();

const { createUser, getUsers, getUserById } = require('../controllers/users');

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:userId', getUserById);

module.exports = router;
