const cardRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, deleteCard, createCard, putLike, deleteLike,
} = require('../controllers/cards');

cardRoutes.get('/', getCards);

cardRoutes.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    postId: Joi.string().length(24),
  }),
}), deleteCard);

cardRoutes.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().min(2).required(),
  }),
}), createCard);

cardRoutes.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    postId: Joi.string().length(24),
  }),
}), putLike);

cardRoutes.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    postId: Joi.string().length(24),
  }),
}), deleteLike);

module.exports = cardRoutes;
