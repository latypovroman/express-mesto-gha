const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.status(200).send(cards))
    .catch((err) => res.status(500).send({ message: 'Неизвестная ошибка', err }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).send({ message: 'Карточка с указанным _id не найдена.', err });
      } else {
        res.status(500).send({ message: 'Неизвестная ошибка', err });
      }
    })
}

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании карточки.', err });
        return
      }
      res.status(500).send({ message: 'Неизвестная ошибка', err });
    })
}

module.exports.putLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {$addToSet: {likes: req.user._id}},
    {new: true},
  )
  .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные для постановки лайка.', err });
        return
      }
      if (err.name === 'CastError') {
        res.status(404).send({message: 'Карточка с указанным _id не найдена.', err});
        return
      }
      res.status(500).send({ message: 'Неизвестная ошибка', err });
    })
}

module.exports.deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {$pull: {likes: req.user._id}},
    {new: true},
  )
  .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные для снятия лайка.', err });
        return
      }
      if (err.name === 'CastError') {
        res.status(404).send({message: 'Карточка с указанным _id не найдена.', err});
        return
      }
      res.status(500).send({ message: 'Неизвестная ошибка', err });
    })
}