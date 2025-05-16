// src/validators/authRules.js
const { body } = require("express-validator");

exports.register = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters")
    .isAlphanumeric()
    .withMessage("Username must contain only letters and numbers")
    .escape(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .escape(),
];

exports.login = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .trim()
    .escape(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .trim()
    .escape(),
];
