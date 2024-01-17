const { Joi } = require('celebrate');

module.exports.signupValidation = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    email: Joi.string().email(),
    password: Joi.string(),
  }).unknown(true),
};

module.exports.userIdValidation = {
  params: Joi.object().keys({
    userId: Joi.string().length(24),
  }),
};
