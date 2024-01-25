const CardModel = require('../models/card');
const BadRequestError = require('../utils/errors/bad-request');
const ForbiddenError = require('../utils/errors/forbidden');
const NotFoundError = require('../utils/errors/not-found');
const { setStatusCreated } = require('../utils/statusSetter');

module.exports.createCard = (req, res, next) => {
  const cardData = req.body;
  cardData.owner = req.user._id;
  return CardModel.create(cardData)
    .then((data) => setStatusCreated(res, data))
    .catch((err) => {
      if (err.name === 'ValidationError') return next(new BadRequestError());
      return next(err);
    })
    .catch(next);
};

module.exports.getCards = (req, res, next) => {
  CardModel.find()
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteCardById = (req, res, next) => {
  const { cardId } = req.params;
  CardModel.findById(cardId)
    .then((card) => {
      if (!card) return next(new NotFoundError('Card not found'));
      const cardOwnerId = card.owner.toString();
      if (cardOwnerId !== req.user._id) return next(new ForbiddenError());
      return CardModel.deleteOne(card)
        .then(() => res.send({ message: 'Card Deleted' }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') return next(new BadRequestError());
      return next(err);
    })
    .catch(next);
};

module.exports.setCardLike = (req, res, next) => {
  const { cardId } = req.params;
  return CardModel.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) return next(new NotFoundError('Card not found'));
      return res.send(card.likes);
    })
    .catch((err) => {
      if (err.name === 'CastError') return next(new BadRequestError());
      return next(err);
    })
    .catch(next);
};

module.exports.removeCardLike = (req, res, next) => {
  const { cardId } = req.params;
  return CardModel.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) return next(new NotFoundError('Card not found'));
      return res.send(card.likes);
    })
    .catch((err) => {
      if (err.name === 'CastError') return next(new BadRequestError());
      return next(err);
    })
    .catch(next);
};
