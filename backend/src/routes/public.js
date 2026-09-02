const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { cacheMiddleware } = require('../redis');

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/v1/public/pages/:slug
router.get('/pages/:slug(*)', cacheMiddleware(60), async (req, res) => {
  try {
    const slug = req.params.slug;
    const page = await prisma.page.findUnique({
      where: { slug },
      include: {
        blocks: {
          orderBy: { order: 'asc' }
        },
        template: true
      }
    });

    if (!page || page.status !== 'PUBLISHED') {
      return res.status(404).json({ error: 'Page not found' });
    }

    res.json(page);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/v1/public/menu
router.get('/menu', cacheMiddleware(120), async (req, res) => {
  try {
    const items = await prisma.menuItem.findMany({
      where: { visible: true },
      orderBy: { order: 'asc' }
    });

    // Helper to construct hierarchy tree
    const buildTree = (parentId = null) => {
      return items
        .filter(item => item.parentId === parentId)
        .map(item => ({ ...item, children: buildTree(item.id) }));
    };

    res.json(buildTree(null));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/v1/public/translations
router.get('/translations', cacheMiddleware(300), async (req, res) => {
  try {
    const translationsList = await prisma.translation.findMany();
    const translationsMap = {};
    for (const t of translationsList) {
      translationsMap[t.key] = { mr: t.mr, en: t.en };
    }
    res.json(translationsMap);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/v1/public/settings
router.get('/settings', cacheMiddleware(300), async (req, res) => {
  try {
    const settings = await prisma.siteSettings.findFirst();
    res.json(settings || {});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/v1/public/announcements
router.get('/announcements', cacheMiddleware(60), async (req, res) => {
  try {
    const category = req.query.category;
    const announcements = await prisma.announcement.findMany({
      where: {
        status: 'PUBLISHED',
        ...(category ? { category } : {})
      },
      orderBy: { publishDate: 'desc' }
    });
    res.json(announcements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
