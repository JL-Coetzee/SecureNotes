require('dotenv').config();

console.log('AUTH EXPORT TYPE →', typeof require('./routes/auth'));
console.log('NOTES EXPORT TYPE →', typeof require('./routes/notes'));

const express   = require('express');
const mongoose  = require('mongoose');
const cors      = require('cors');
const rateLimit = require('./middleware/rateLimit');
const { errors } = require('celebrate');
const logger    = require('./logger');
const prom      = require('prom-client');

// ── Prometheus defaults ───────────────────────────────────────────────
prom.collectDefaultMetrics();
const httpHistogram = new prom.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status']
});

// ── Instantiate your Express app ──────────────────────────────────────
const app = express();

app.use((req, res, next) => {
  console.log('🔔 New prompt — request received:', req.method, req.originalUrl);
  next();
});

// ── DEBUG: log the forwarded Authorization header ──────────────────────
app.use((req, _res, next) => {
  console.log('→ GW forwarded header:', req.headers['authorization']);
  next();
});

// ── Core middleware ────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(rateLimit);

// ── Winston request logger ─────────────────────────────────────────────
app.use((req, _res, next) => {
  logger.info({ method: req.method, url: req.originalUrl, ip: req.ip });
  next();
});

// ── Prometheus timing middleware ──────────────────────────────────────
app.use((req, res, next) => {
  const end = httpHistogram.startTimer({ method: req.method });
  res.on('finish', () => end({ route: req.path, status: res.statusCode }));
  next();
});

// ── Routes ─────────────────────────────────────────────────────────────
app.use('/api/auth',  require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// ── Expose /metrics ───────────────────────────────────────────────────
app.get('/metrics', async (_req, res) => {
  res.set('Content-Type', prom.register.contentType);
  res.end(await prom.register.metrics());
});

// ── Celebrate validation errors ────────────────────────────────────────
app.use(errors());

// ── Winston error logger ───────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  logger.error(err);
  res.status(err.status || 500).json({ msg: err.message || 'Server error' });
});

// ── Start up ───────────────────────────────────────────────────────────
(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  logger.info('Mongo connected');
  app.listen(process.env.PORT, () =>
    logger.info(`API listening on :${process.env.PORT}`)
  );
})();
