require('dotenv').config();

console.log('AUTH EXPORT TYPE →', typeof require('./routes/auth'));
console.log('NOTES EXPORT TYPE →', typeof require('./routes/notes'));

const express   = require('express');
const mongoose  = require('mongoose');
const cors      = require('cors');
const rateLimit = require('./middleware/rateLimit');
const { errors } = require('celebrate');
const logger    = require('./logger');           // ← NEW

const app = express();

// ── Middle­ware ───────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(rateLimit);

/* ── Request logger (Winston) ───────────────────────────────────────── */
app.use((req, _res, next) => {
  logger.info({ method: req.method, url: req.originalUrl, ip: req.ip });
  next();
});

// ── Routes ────────────────────────────────────────────────────────────
app.use('/api/auth',  require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// celebrate validation errors
app.use(errors());

/* ── Error logger (optional but handy) ──────────────────────────────── */
app.use((err, _req, res, _next) => {
  logger.error(err);
  res.status(err.status || 500).json({ msg: err.message || 'Server error' });
});

// ── Start-up ───────────────────────────────────────────────────────────
(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  logger.info('Mongo connected');
  app.listen(process.env.PORT, () =>
    logger.info(`API listening on :${process.env.PORT}`)
  );
})();
