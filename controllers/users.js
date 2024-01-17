const bcrypt = require('bcrypt');
// const validator = require('validator');
const { setStatusCreated } = require('../utils/statusSetter');
const { getJwtToken } = require('../utils/jwt');
const UserModel = require('../models/user');
const NotFoundError = require('../utils/errors/not-found');
const BadRequestError = require('../utils/errors/bad-request');
const ConflictError = require('../utils/errors/conflict');
const DeniedError = require('../utils/errors/denied');

// module.exports.createUser = (req, res, next) => {
//   const {
//     name,
//     about,
//     avatar,
//     email,
//     password,
//   } = req.body;
//   return bcrypt.hash(password, 10)
//     .then((hash) => UserModel.create({
//       name,
//       about,
//       avatar,
//       email,
//       password: hash,
//     }))
//     .catch((err) => {
//       // console.log('this is error:', err);
//       console.log('this is error code:', err.code);
//       if (err.code === 11000) throw new ConflictError('This email is already used');
//       // if (err.code === undefined) throw new BadRequestError('Invalid avatar link');
//       return next(err);
//     })
//     .then((data) => {
//       setStatusCreated(res, data);
//     })
//     .catch(next);
// };

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  return bcrypt.hash(password, 10)
    .then((hash) => UserModel.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .catch((err) => {
      // console.log('this is error:', err);
      // console.log('this is error code:', err.code);
      if (err.code === 11000) throw new ConflictError('This email is already used');
      throw new NotFoundError();
    })
    .then((data) => {
      setStatusCreated(res, data);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) throw new DeniedError('Invalid login or password');
  return UserModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = getJwtToken(user._id);
      return res.send(token);
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  UserModel.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  UserModel.findById(req.user._id)
    .then((user) => {
      if (!user) throw new NotFoundError('User is not found');
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') throw new BadRequestError();
      return next(err);
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;
  return UserModel.findById(userId)
    .then((user) => {
      if (!user) throw new NotFoundError('User is not found');
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') throw new BadRequestError();
      return next(err);
    })
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  return UserModel.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') throw new BadRequestError();
      return next(err);
    })
    .catch(next);
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  return UserModel.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') throw new BadRequestError();
      return next(err);
    })
    .catch(next);
};
