// src/logger.js
const { createLogger, format, transports } = require('winston');
const Daily = require('winston-daily-rotate-file');

module.exports = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new Daily({ filename: 'logs/app-%DATE%.log', datePattern: 'YYYY-MM-DD' }),
    new transports.Console({ format: format.simple() })
  ],
  exceptionHandlers: [
    new transports.File({ filename: 'logs/exceptions.log' })
  ]
});