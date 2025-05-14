// src/middleware/rateLimit.js
const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 minutes
  max: 100,                   // 100 requests per window per IP
  standardHeaders: true,      // send RateLimit-* headers
  legacyHeaders: false        // disable X-RateLimit-* headers
});

