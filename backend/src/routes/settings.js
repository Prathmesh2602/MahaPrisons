const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { requireAuth, requireRole } = require('../middleware/auth');
const { auditLogger } = require('../middleware/audit');

const router = express.Router();
const prisma = new PrismaClient();

// GET global settings (public)
router.get('/', async (req, res) => {
  try {
    const settings = await prisma.siteSettings.findFirst();
    if (!settings) {
      return res.status(404).json({ error: 'Settings not found' });
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// PUT update global settings (admin only)
router.put('/', requireAuth, requireRole(['SUPER_ADMIN', 'CONTENT_EDITOR']), auditLogger('UPDATE_GLOBAL_SETTINGS'), async (req, res) => {
  try {
    const settingsData = req.body;
    
    const existing = await prisma.siteSettings.findFirst();
    let settings;
    
    if (existing) {
      settings = await prisma.siteSettings.update({
        where: { id: existing.id },
        data: settingsData
      });
    } else {
      settings = await prisma.siteSettings.create({
        data: settingsData
      });
    }

    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

module.exports = router;
