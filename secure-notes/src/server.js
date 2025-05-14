require('dotenv').config();

console.log('AUTH EXPORT TYPE →', typeof require('./routes/auth'));
console.log('NOTES EXPORT TYPE →', typeof require('./routes/notes'));

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('./middleware/rateLimit');
const { errors } = require('celebrate');

const app = express();
app.use(cors());
app.use(express.json());
app.use(rateLimit);

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.use(errors());                 // celebrate → 400 handler

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Mongo connected');
  app.listen(process.env.PORT, () =>
    console.log(`API listening on :${process.env.PORT}`)
  );
})();
