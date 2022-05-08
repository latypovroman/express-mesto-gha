const userRoutes = require('express').Router();
const express = require('express');
const { getUsers, getUserById, createUser, patchUserInfo, patchAvatar } = require('../controllers/users');

userRoutes.get('/', getUsers);
userRoutes.get('/:userId', getUserById);
userRoutes.post('/', express.json(), createUser);
userRoutes.patch('/me', express.json(), patchUserInfo);
userRoutes.patch('/me/avatar', express.json(), patchAvatar);

module.exports = userRoutes;