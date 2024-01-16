const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const DeniedError = require('../utils/errors/denied');
const BadRequestError = require('../utils/errors/bad-request');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  // avatar: {
  //   type: String,
  //   default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  // },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => {
        const regex = /^https?:\/\/[w{3}.]?[\w./-]{5,}/i;
        return regex.test(v);
      },
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
