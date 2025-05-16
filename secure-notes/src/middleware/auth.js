const jwt = require('jsonwebtoken');

// JWT authentication middleware
module.exports = (req, _res, next) => {
  // Extract the token from the Authorization header.
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return next({ status: 401, message: 'Missing token' });

  try {
    // Verify the token’s signature and expiration against our secret.
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    //if token valid continue down the middleware chain.
    next();
  } catch {
    next({ status: 401, message: 'Invalid token' });
  }
};
