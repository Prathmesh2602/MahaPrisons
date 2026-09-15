const express = require('express');
const cors = require('cors');
require('dotenv').config();

const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static uploaded media files
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

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/menu', menuRoutes);
app.use('/api/v1/settings', settingsRoutes);
app.use('/api/v1/review', reviewRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/transliterate', transliterateRoutes);
app.use('/api/v1/translate', translateRoutes);
app.use('/api/v1/media', mediaRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
