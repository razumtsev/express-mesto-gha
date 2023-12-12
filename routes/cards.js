const router = require('express').Router();
const {
  createCard,
  getCards,
  deleteCardById,
  setCardLike,
  removeCardLike,
} = require('../controllers/cards');

router.post('/', createCard);
router.get('/', getCards);
router.delete('/:cardId', deleteCardById);
router.put('/:cardId/likes', setCardLike);
router.delete('/:cardId/likes', removeCardLike);

module.exports = router;
