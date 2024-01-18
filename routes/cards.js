const router = require('express').Router();
const { celebrate } = require('celebrate');
const { createCardValidation, cardIdValidation } = require('../utils/joiSettings');
const {
  createCard,
  getCards,
  deleteCardById,
  setCardLike,
  removeCardLike,
} = require('../controllers/cards');

router.post('/', celebrate(createCardValidation), createCard);
router.get('/', getCards);
router.delete('/:cardId', celebrate(cardIdValidation), deleteCardById);
router.put('/:cardId/likes', celebrate(cardIdValidation), setCardLike);
router.delete('/:cardId/likes', celebrate(cardIdValidation), removeCardLike);

module.exports = router;
