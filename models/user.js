const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const DeniedError = require('../utils/errors/denied');
const {
  httpLinkPattern,
  defaultUserName,
  defaultUserAbout,
  defaultUserAvatar,
} = require('../config');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: defaultUserName,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: defaultUserAbout,
  },
  avatar: {
    type: String,
    default: defaultUserAvatar,
    validate: {
      validator: (v) => (httpLinkPattern).test(v),
      // message: 'url validation failed',
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // вот здесь зарыта одна половина собаки (база теперь не возвращает пароль)
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password') // вот здесь - вторая половина собаки (пароль по спецзапросу)
    .then((user) => {
      if (!user) throw new DeniedError('Invalid login or password');
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) throw new DeniedError('Invalid login or password');
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
