const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_SERVER_ERROR,
} = require('http2').constants;

// HTTP_STATUS_OK - 200
// HTTP_STATUS_CREATED - 201
// HTTP_STATUS_BAD_REQUEST - 400
// HTTP_STATUS_NOT_FOUND - 404
// HTTP_STATUS_SERVER_ERROR - 500

const UserModel = require('../models/user');

const createUser = (req, res) => {
  const userData = req.body;
  console.log(`Данные из тела запроса: ${userData}`);
  return UserModel.create(userData)
    .then((data) => res.status(HTTP_STATUS_CREATED).send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: err.message });
      }
      return res.status(HTTP_STATUS_SERVER_ERROR).send({ message: 'Server Error' });
    });
};

const getUsers = (req, res) => {
  UserModel.find()
    .then((users) => res.status(HTTP_STATUS_OK).send(users))
    .catch(() => res.status(HTTP_STATUS_SERVER_ERROR).send({ message: 'Server Error' }));
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  UserModel.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'User not found' });
      }
      return res.status(HTTP_STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Invalid ID' });
      }
      return res.status(HTTP_STATUS_SERVER_ERROR).send({ message: 'Server Error' });
    });
};

const updateUserInfo = (req, res) => {
  UserModel.findByIdAndUpdate(req.user._id)
    .then((user) => {
      console.log(user);
      if (!user) {
        return res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'User not found' });
      }
      console.log(user.name, user.about);
      return res.status(HTTP_STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Invalid ID' });
      }
      return res.status(HTTP_STATUS_SERVER_ERROR).send({ message: 'Server Error' });
    });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserInfo,
};
