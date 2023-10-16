const UserModel = require('../models/user');

const createUser = (req, res) => {
  const userData = req.body;
  console.log(`Данные из тела запроса: ${userData}`);
  return UserModel.create(userData)
    .then((data) => res.status(201).send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: 'Server Error' });
    });
};

const getUsers = (req, res) => {
  UserModel.find()
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(500).send({ message: 'Server Error' }));
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  UserModel.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Invalid ID' });
      }
      return res.status(500).send({ message: 'Server Error' });
    });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
};
