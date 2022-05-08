const cardRoutes = require('express').Router();
const express = require('express');
const { getCards, deleteCard, createCard, putLike, deleteLike} = require('../controllers/cards');

cardRoutes.get('/', getCards);
cardRoutes.delete('/:cardId', deleteCard);
cardRoutes.post('/', express.json(), createCard);
cardRoutes.put('/:cardId/likes', putLike);
cardRoutes.delete('/:cardId/likes', deleteLike);

module.exports = cardRoutes;