const { Joi } = require('celebrate');

const { httpLinkPattern } = require('../config');

module.exports.signupValidation = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(httpLinkPattern),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

module.exports.signinValidation = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

module.exports.userIdValidation = {
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
};

module.exports.userInfoValidation = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
};

module.exports.avatarValidation = {
  body: Joi.object().keys({
    avatar: Joi.string().pattern(httpLinkPattern).required(),
  }),
};

module.exports.createCardValidation = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(httpLinkPattern).required(),
  }),
};

module.exports.cardIdValidation = {
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
};
