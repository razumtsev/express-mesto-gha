const router = require('express').Router();
const { celebrate } = require('celebrate');
const { createCardValidation } = require('../utils/joiSettings');
const {
  createCard,
  getCards,
  deleteCardById,
  setCardLike,
  removeCardLike,
} = require('../controllers/cards');

router.post('/', celebrate(createCardValidation), createCard);
router.get('/', getCards);
router.delete('/:cardId', deleteCardById);
router.put('/:cardId/likes', setCardLike);
router.delete('/:cardId/likes', removeCardLike);

module.exports = router;
