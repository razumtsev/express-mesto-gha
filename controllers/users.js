const UserModel = require('../models/user');

const {
  setStatusCreated,
  setStatusNotFound,
  setStatusBadRequest,
  setStatusServerError,
} = require('./utils');

module.exports.createUser = (req, res) => {
  const userData = req.body;
  return UserModel.create(userData)
    .then((data) => setStatusCreated(res, data))
    .catch((err) => {
      if (err.name === 'ValidationError') return setStatusBadRequest(res, err);
      return setStatusServerError(res);
    });
};

module.exports.getUsers = (req, res) => {
  UserModel.find({})
    .then((users) => res.send(users))
    .catch(() => setStatusServerError(res));
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;
  return UserModel.findById(userId)
    .then((user) => {
      if (!user) return setStatusNotFound(res);
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') return setStatusBadRequest(res);
      return setStatusServerError(res);
    });
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  return UserModel.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') return setStatusBadRequest(res, err);
      return setStatusServerError(res);
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  return UserModel.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') return setStatusBadRequest(res, err);
      return setStatusServerError(res);
    });
};
