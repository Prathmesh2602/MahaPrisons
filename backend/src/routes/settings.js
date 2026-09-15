const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();
const prisma = new PrismaClient();

// GET /api/v1/settings/:key
router.get('/:key', async (req, res) => {
  try {
    const config = await prisma.siteSetting.findUnique({
      where: { key: req.params.key }
    });
    
    if (!config) {
      return res.status(404).json({ error: 'Settings not found' });
    }

    res.json(config.value);
  } catch (error) {
    console.error('Settings fetch error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/v1/settings
// Fetches global site settings (legacy)
router.get('/', async (req, res) => {
  try {
    const config = await prisma.siteSetting.findUnique({
      where: { key: 'global_config' }
    });

    if (!config) {
      return res.status(404).json({ error: 'Settings not found' });
    }

    res.json(config.value);
  } catch (error) {
    console.error('Settings fetch error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT /api/v1/settings/:key
router.put('/:key', authMiddleware, async (req, res) => {
  try {
    const updatedSettings = req.body;
    const key = req.params.key;
    
    if (req.user && req.user.role === 'MAKER') {
      await prisma.revision.create({
        data: {
          modelName: 'SiteSetting',
          recordId: key,
          proposedData: updatedSettings,
          status: 'PENDING_REVIEW',
          createdById: req.user.id
        }
      });
      return res.json({ success: true, pendingReview: true, message: 'Settings changes submitted for review' });
    }

    await prisma.siteSetting.upsert({
      where: { key },
      update: { value: updatedSettings },
      create: { key, value: updatedSettings }
    });

    res.json({ success: true, message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Settings update error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
