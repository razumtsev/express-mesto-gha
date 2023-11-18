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

const createCard = (req, res) => {
  const cardData = req.body;
  cardData.owner = req.user._id;
  console.log(cardData);
  return CardModel.create(cardData)
    .then((data) => res.status(HTTP_STATUS_CREATED).send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: err.message });
      }
      return res.status(HTTP_STATUS_SERVER_ERROR).send({ message: 'Server Error' });
    });
};

const getCards = (req, res) => {
  CardModel.find()
    .then((cards) => res.status(HTTP_STATUS_OK).send(cards))
    .catch(() => res.status(HTTP_STATUS_SERVER_ERROR).send({ message: 'Server Error' }));
};

const deleteCardById = (req, res) => {
  const { cardId } = req.params;
  CardModel.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        return res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Card not found' });
      }
      return res.status(HTTP_STATUS_OK).send({ message: 'Card Deleted' });
    })
    .catch(() => res.status(HTTP_STATUS_SERVER_ERROR).send({ message: 'Server Error' }));
};

module.exports = {
  createCard,
  getCards,
  deleteCardById,
};
