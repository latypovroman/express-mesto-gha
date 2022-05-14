const cardRoutes = require('express').Router();
const {
  getCards, deleteCard, createCard, putLike, deleteLike,
} = require('../controllers/cards');

cardRoutes.get('/', getCards);
cardRoutes.delete('/:cardId', deleteCard);
cardRoutes.post('/', createCard);
cardRoutes.put('/:cardId/likes', putLike);
cardRoutes.delete('/:cardId/likes', deleteLike);

module.exports = cardRoutes;
