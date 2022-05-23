const userRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserById, patchUserInfo, patchAvatar, getUserInfo,
} = require('../controllers/users');

userRoutes.get('/', getUsers);
userRoutes.get('/me', getUserInfo);

userRoutes.get('/:userId', celebrate({
  params: Joi.object().keys({
    postId: Joi.string().length(24),
  }),
}), getUserById);

userRoutes.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), patchUserInfo);

userRoutes.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().min(2),
    about: Joi.string().min(2).max(30),
  }),
}), patchAvatar);

module.exports = userRoutes;
