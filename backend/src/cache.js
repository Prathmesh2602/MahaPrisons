const NodeCache = require('node-cache');

// Create a new in-memory cache instance (replacing Redis entirely)
const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

console.log('Initialized in-memory cache.');

// Cache middleware factory
const cacheMiddleware = (ttlSeconds = 60) => {
  return async (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }
    const key = `cache:${req.originalUrl}`;
    
    try {
      const cachedResponse = cache.get(key);
      if (cachedResponse) {
        res.setHeader('X-Cache', 'HIT');
        return res.json(JSON.parse(cachedResponse));
      }
    } catch (err) {
      console.error('Cache get error:', err);
    }

    // Capture the response to cache it
    const originalJson = res.json.bind(res);
    res.json = function(body) {
      res.setHeader('X-Cache', 'MISS');
      
      try {
        cache.set(key, JSON.stringify(body), ttlSeconds);
      } catch (err) {
        console.error('Cache set error:', err.message);
      }
      
      res.json = originalJson;
      return originalJson.call(this, body);
    };
    next();
  };
};

module.exports = {
  cache,
  cacheMiddleware
};
