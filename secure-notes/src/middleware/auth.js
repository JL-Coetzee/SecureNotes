const jwt = require('jsonwebtoken');

module.exports = (req, _res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return next({ status: 401, message: 'Missing token' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    next({ status: 401, message: 'Invalid token' });
  }
};
