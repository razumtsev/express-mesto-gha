const { Joi } = require('celebrate');

const httpLinkPattern = /^https?:\/\/[w{3}.]?[\w./-]{5,}/i;

module.exports.signupValidation = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(httpLinkPattern),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).unknown(true),
};

module.exports.signinValidation = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

module.exports.userIdValidation = {
  params: Joi.object().keys({
    userId: Joi.string().length(24),
  }),
};

module.exports.userInfoValidation = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
};

module.exports.avatarValidation = {
  body: Joi.object().keys({
    avatar: Joi.string().pattern(httpLinkPattern),
  }),
};

module.exports.createCardValidation = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(httpLinkPattern),
  }),
};
