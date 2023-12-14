const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_SERVER_ERROR,
} = require('http2').constants;

// HTTP_STATUS_OK - 200
// HTTP_STATUS_CREATED - 201
// HTTP_STATUS_BAD_REQUEST - 400
// HTTP_STATUS_NOT_FOUND - 404
// HTTP_STATUS_SERVER_ERROR - 500

const CardModel = require('../models/card');

module.exports.createCard = (req, res) => {
  const cardData = req.body;
  cardData.owner = req.user._id;
  // console.log(cardData);
  return CardModel.create(cardData)
    .then((data) => res.status(HTTP_STATUS_CREATED).send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: err.message });
      }
      return res.status(HTTP_STATUS_SERVER_ERROR).send({ message: 'Server Error' });
    });
};

module.exports.getCards = (req, res) => {
  CardModel.find()
    .then((cards) => res.status(HTTP_STATUS_OK).send(cards))
    .catch(() => res.status(HTTP_STATUS_SERVER_ERROR).send({ message: 'Server Error' }));
};

module.exports.deleteCardById = (req, res) => {
  const { cardId } = req.params;
  CardModel.findByIdAndRemove(cardId)
    .then((card) => {
      // console.log(card);
      console.log(cardId);
      if (!card) {
        return res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Card not found' });
      }
      return res.status(HTTP_STATUS_OK).send({ message: 'Card Deleted' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Invalid card ID' });
      }
      return res.status(HTTP_STATUS_SERVER_ERROR).send({ message: 'Server Error' });
    });
};

module.exports.setCardLike = (req, res) => {
  const { cardId } = req.params;
  // console.log(cardId);
  // console.log(req.user._id);
  return CardModel.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(HTTP_STATUS_OK).send(card.likes))
    .catch((err) => {
      if (err.name === 'TypeError') {
        return res.status(HTTP_STATUS_NOT_FOUND).send({ message: `Card ${cardId} does not exist` });
      }
      if (err.name === 'CastError') {
        return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Invalid card ID' });
      }
      return res.status(HTTP_STATUS_SERVER_ERROR).send({ message: 'Server Error' });
    });
};

module.exports.removeCardLike = (req, res) => {
  const { cardId } = req.params;
  return CardModel.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(HTTP_STATUS_OK).send(card.likes))
    .catch((err) => {
      if (err.name === 'TypeError') {
        return res.status(HTTP_STATUS_NOT_FOUND).send({ message: `Card ${cardId} does not exist` });
      }
      if (err.name === 'CastError') {
        return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Invalid card ID' });
      }
      return res.status(HTTP_STATUS_SERVER_ERROR).send({ message: 'Server Error' });
    });
};
