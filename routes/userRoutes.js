const userRoutes = require('express').Router();
const {
  getUsers, getUserById, patchUserInfo, patchAvatar,
} = require('../controllers/users');

userRoutes.get('/', getUsers);
userRoutes.get('/:userId', getUserById);
userRoutes.patch('/me', patchUserInfo);
userRoutes.patch('/me/avatar', patchAvatar);

module.exports = userRoutes;
