// src/validators/noteRules.js
const { body } = require("express-validator");

exports.createOrUpdate = [
  body("title").trim().notEmpty().withMessage("Title is required").escape(),
  body("body")
    .optional()
    .isString()
    .withMessage("Body must be text")
    .trim()
    .escape(),
];
