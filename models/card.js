const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
  },
  likes: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
  },
});

module.exports = mongoose.model('card', cardSchema);
