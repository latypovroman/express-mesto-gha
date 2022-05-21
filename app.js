const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const auth = require('./middlewares/auth');
const userRoutes = require('./routes/userRoutes');
const cardRoutes = require('./routes/cardRoutes');
const { login, createUser } = require('./controllers/users');

const app = express();

app.use(express.json());
app.post('/signin', login);
app.post('/signup', createUser);
app.use('/users', auth, userRoutes);
app.use('/cards', auth, cardRoutes);
app.use(auth, (req, res) => {
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
