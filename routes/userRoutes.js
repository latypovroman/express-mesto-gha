const userRoutes = require('express').Router();
const express = require('express');
const { getUsers, getUserById, createUser } = require('../controllers/users')

userRoutes.get('/', getUsers);
userRoutes.get('/:userId', getUserById);
userRoutes.post('/', express.json(), createUser);

module.exports = userRoutes;