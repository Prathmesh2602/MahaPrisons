const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'No authentication token, access denied.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token verification failed, authorization denied.' });
  }
};

const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access forbidden: Insufficient privileges.' });
    }
    next();
  };
};

module.exports = { authMiddleware, requireRole };
