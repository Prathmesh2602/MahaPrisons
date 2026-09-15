const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { text, source, target } = req.query;
    if (!text || !source || !target) {
      return res.status(400).json({ error: 'Missing required query parameters (text, source, target)' });
    }

    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`;
    const response = await fetch(url);
    const data = await response.json();
    
    res.json(data);
  } catch (error) {
    console.error('Translate proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch translation' });
  }
});

module.exports = router;
