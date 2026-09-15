const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { text } = req.query;
    if (!text) {
      return res.status(400).json({ error: 'Text query parameter is required' });
    }

    const url = `https://inputtools.google.com/request?text=${encodeURIComponent(text)}&itc=mr-t-i0-und&num=5`;
    const response = await fetch(url);
    const data = await response.json();
    
    res.json(data);
  } catch (error) {
    console.error('Transliteration proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch transliteration' });
  }
});

module.exports = router;
