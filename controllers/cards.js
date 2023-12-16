const CardModel = require('../models/card');

const {
  setStatusCreated,
  setStatusNotFound,
  setStatusBadRequest,
  setStatusServerError,
} = require('./utils');

module.exports.createCard = (req, res) => {
  const cardData = req.body;
  cardData.owner = req.user._id;
  return CardModel.create(cardData)
    .then((data) => setStatusCreated(res, data))
    .catch((err) => {
      if (err.name === 'ValidationError') return setStatusBadRequest(res);
      return setStatusServerError(res);
    });
};

module.exports.getCards = (req, res) => {
  CardModel.find()
    .then((cards) => res.send(cards))
    .catch(() => setStatusServerError(res));
};

module.exports.deleteCardById = (req, res) => {
  const { cardId } = req.params;
  CardModel.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) return setStatusNotFound(res);
      return res.send({ message: 'Card Deleted' });
    })
    .catch((err) => {
      if (err.name === 'CastError') return setStatusBadRequest(res);
      return setStatusServerError(res);
    });
};

module.exports.setCardLike = (req, res) => {
  const { cardId } = req.params;
  return CardModel.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) return setStatusNotFound(res);
      return res.send(card.likes);
    })
    .catch((err) => {
      if (err.name === 'CastError') return setStatusBadRequest(res);
      return setStatusServerError(res);
    });
};

module.exports.removeCardLike = (req, res) => {
  const { cardId } = req.params;
  return CardModel.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) return setStatusNotFound(res);
      return res.send(card.likes);
    })
    .catch((err) => {
      if (err.name === 'CastError') return setStatusBadRequest(res);
      return setStatusServerError(res);
    });
};
