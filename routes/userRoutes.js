const userRoutes = require('express').Router();
const {
  getUsers, getUserById, patchUserInfo, patchAvatar, getUserInfo,
} = require('../controllers/users');

userRoutes.get('/', getUsers);
userRoutes.get('/:userId', getUserById);
userRoutes.get('/me', getUserInfo);
userRoutes.patch('/me', patchUserInfo);
userRoutes.patch('/me/avatar', patchAvatar);

module.exports = userRoutes;
