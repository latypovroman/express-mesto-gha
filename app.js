const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');

const { PORT = 3000 } = process.env;
const auth = require('./middlewares/auth');
const userRoutes = require('./routes/userRoutes');
const cardRoutes = require('./routes/cardRoutes');
const { login, createUser } = require('./controllers/users');
const { createError } = require('./errors/createError');

const app = express();

app.use(express.json());

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

app.use('/users', auth, userRoutes);
app.use('/cards', auth, cardRoutes);

app.use(auth, (req, res) => {
  res.status(404).send({ message: 'Неверный адрес.' });
});

app.use(errors());
app.use(createError);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });
  app.listen(PORT, () => {});
}

main();
