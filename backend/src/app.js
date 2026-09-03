const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { sanitizePayload } = require('./middleware/sanitize');
const publicRoutes = require('./routes/public');
const adminRoutes = require('./routes/admin');
const uploadRoutes = require('./routes/upload');
const settingsRoutes = require('./routes/settings');

const app = express();

// Security Middlewares
app.use(helmet({ crossOriginResourcePolicy: false })); // allow images to be loaded cross origin

const allowedOrigins = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:3001'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Rate limiting (General)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10000, // increased for dev
  message: 'Too many requests, please try again later.'
});
app.use('/api/', limiter);

// Stricter Rate limiting for Auth
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200, // max 200 login attempts per 15 minutes
  message: 'Too many login attempts, please try again later.'
});
app.use('/api/v1/admin/auth', authLimiter);

// Routes
app.use('/api/v1/public', publicRoutes);
app.use('/api/v1/upload', uploadRoutes);
app.use('/api/v1/settings', settingsRoutes);

// Apply HTML Sanitizer only to admin mutating routes to protect CMS content
app.use('/api/v1/admin', sanitizePayload, adminRoutes);

// Basic health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = { app };
