const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const userRoutes = require('./routes/userRoutes');
const cardRoutes = require('./routes/cardRoutes');

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '62770a4bca72d09f2f4f7ef8',
  };
  next();
});

app.use(express.json());
app.use('/users', userRoutes);
app.use('/cards', cardRoutes);
app.use((req, res) => {
  res.status(404).send({ message: 'Неверный адрес.' });
});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });
  app.listen(PORT, () => {});
}

main();
