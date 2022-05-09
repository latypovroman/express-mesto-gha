const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.status(200).send({ data: users }))
    .catch((err) => res.status(500).send({ message: 'Неизвестная ошибка', err }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь по указанному _id не найден.', err });
      } else {
        res.status(200).send(user)
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Неправильный _id.', err });
        return
      }
      res.status(500).send({ message: 'Неизвестная ошибка', err });
    })
}

module.exports.createUser = (req, res) => {
  const {name, about, avatar} = req.body;

  User.create({name, about, avatar})
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.', err });
        return
      }
      res.status(500).send({ message: 'Неизвестная ошибка', err });
    })
}

module.exports.patchUserInfo = (req, res) => {
  const { name, about, _id = req.user._id } = req.body;

  User.findByIdAndUpdate(
    _id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: false
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении пользователя.', err });
        return
      }
      if (err.name === 'CastError') {
        res.status(404).send({message: 'Пользователь по указанному _id не найден.', err});
        return
      }
      res.status(500).send({ message: 'Неизвестная ошибка', err });
    })
}

module.exports.patchAvatar = (req, res) => {
  const { avatar, _id = req.user._id } = req.body;

  User.findByIdAndUpdate(
    _id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: false
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара.', err });
        return
      }
      if (err.name === 'CastError') {
        res.status(404).send({message: 'Пользователь по указанному _id не найден.', err});
        return
      }
      res.status(500).send({ message: 'Неизвестная ошибка', err });
    })
}