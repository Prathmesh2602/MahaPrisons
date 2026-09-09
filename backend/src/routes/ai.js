const router = require('express').Router();

router.post('/describe-image', async (req, res) => {
  try {
    const { imageUrl } = req.body;
    
    if (!imageUrl) {
      return res.status(400).json({ error: 'imageUrl is required' });
    }

    const geminiApiKey = process.env.GEMINI_API_KEY;

    if (!geminiApiKey) {
      // Mock response if no API key is provided
      await new Promise(resolve => setTimeout(resolve, 1500));
      return res.json({
        description: {
          en: "Mock AI Description: A high-quality image showing various activities within the prison premises.",
          mr: "मॉक एआय वर्णन: कारागृहाच्या आवारातील विविध उपक्रम दर्शविणारे एक उच्च-गुणवत्तेचे चित्र."
        }
      });
    }

    const filename = imageUrl.split('/').pop().split('.')[0].replace(/[-_]/g, ' ');
    const prompt = `Write a short, engaging description for a photo titled "${filename}" taken at a Maharashtra prison facility. Keep it under 2 sentences. Return ONLY a JSON object with 'en' (English description) and 'mr' (Marathi translation). Do not use markdown blocks.`;

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${geminiApiKey}`;

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    
    if (data.error) {
      console.error('Gemini API Error:', data.error);
      return res.status(500).json({ error: data.error.message || 'Gemini API Error' });
    }

    if (data.candidates && data.candidates[0]) {
      const text = data.candidates[0].content.parts[0].text;
      try {
        const parsed = JSON.parse(text);
        return res.json({ description: parsed });
      } catch (e) {
        // Fallback if not strict JSON
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '');
        const parsed = JSON.parse(cleanText);
        return res.json({ description: parsed });
      }
    }
    
    return res.status(500).json({ error: 'Failed to generate from AI' });
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
