const mongoose = require('mongoose');
const { httpLinkPattern } = require('../config');

const { ObjectId } = mongoose.Schema.Types;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    validate: {
      validator: (v) => httpLinkPattern.test(v),
    },
    required: true,
  },
  owner: {
    type: ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
