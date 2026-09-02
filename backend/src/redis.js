const Redis = require('ioredis');

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const redis = new Redis(redisUrl, {
  retryStrategy(times) {
    console.warn(`Redis connection retry attempt: ${times}`);
    // Reconnect after 3 seconds, up to a max wait
    return Math.min(times * 100, 3000);
  }
});

redis.on('error', (err) => {
  console.error('Redis connection error:', err.message);
});

redis.on('connect', () => {
  console.log('Connected to Redis cache.');
});

// Cache middleware factory
const cacheMiddleware = (ttlSeconds = 60) => {
  return async (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }
    const key = `cache:${req.originalUrl}`;
    
    try {
      const cachedResponse = await redis.get(key);
      if (cachedResponse) {
        res.setHeader('X-Cache', 'HIT');
        return res.json(JSON.parse(cachedResponse));
      }
    } catch (err) {
      console.error('Redis get error:', err);
      // Fail gracefully and continue without caching if Redis is down
    }

    // Capture the response to cache it
    const originalJson = res.json.bind(res);
    res.json = (body) => {
      res.setHeader('X-Cache', 'MISS');
      originalJson(body);
      
      try {
        redis.set(key, JSON.stringify(body), 'EX', ttlSeconds);
      } catch (err) {
        console.error('Redis set error:', err);
      }
    };
    next();
  };
};

module.exports = {
  redis,
  cacheMiddleware
};
