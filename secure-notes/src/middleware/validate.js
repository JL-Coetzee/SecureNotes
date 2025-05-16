// src/middleware/validate.js
const { validationResult } = require("express-validator");

/**
 * Apply an array of validation chains, then return 422 if any fail.
 * Usage: router.post('/foo', validate(rules), handler)
 */
module.exports = (rules) => [
  ...rules,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];
