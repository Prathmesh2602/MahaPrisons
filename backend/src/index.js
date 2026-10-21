
const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./lib/env').validateEnv();

const path = require('path');

const app = express();

// Caddy reverse proxy sits in front in production
app.set('trust proxy', 1);

// CORS_ORIGINS: comma-separated allowlist; unset allows all (local dev)
const corsOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map((o) => o.trim())
  : true;
app.use(cors({ origin: corsOrigins }));
app.use(express.json());

// Serve static uploaded media files for local development fallback only.
// Production media is served directly from Supabase Storage CDN.
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'MahaPrisons API'
  });
});

const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menu');
const settingsRoutes = require('./routes/settings');
const reviewRoutes = require('./routes/review');
const usersRoutes = require('./routes/users');
const transliterateRoutes = require('./routes/transliterate');
const translateRoutes = require('./routes/translate');
const mediaRoutes = require('./routes/media');
const pagesRoutes = require('./routes/pages');

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/menu', menuRoutes);
app.use('/api/v1/settings', settingsRoutes);
app.use('/api/v1/review', reviewRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/transliterate', transliterateRoutes);
app.use('/api/v1/translate', translateRoutes);
app.use('/api/v1/media', mediaRoutes);
app.use('/api/v1/pages', pagesRoutes);

// Root Endpoint for deployment verification
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'MahaPrisons API',
    health: '/api/health',
    version: 'v1'
  });
});

// 404 Not Found handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.originalUrl
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// Export the app for Vercel serverless hosting.
module.exports = app;

// Allow local development to keep using npm start.
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
