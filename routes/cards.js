const router = require('express').Router();

const { createCard, getCards, deleteCardById } = require('../controllers/cards');

router.post('/', createCard);
router.get('/', getCards);
router.delete('/:cardId', deleteCardById);

module.exports = router;
