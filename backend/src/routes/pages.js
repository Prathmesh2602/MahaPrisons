const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();
const prisma = new PrismaClient();

// GET /api/v1/pages/by-slug
router.get('/by-slug', async (req, res) => {
  try {
    const { slug } = req.query;
    if (!slug) {
      return res.status(400).json({ error: 'Slug is required' });
    }

    const pageNode = await prisma.pageNode.findUnique({
      where: { slug: slug },
      include: {
        contentBlocks: {
          where: { isActive: true },
          orderBy: { order: 'asc' }
        }
      }
    });
    
    if (!pageNode) {
      return res.status(404).json({ error: 'Page not found' });
    }

    res.json(pageNode);
  } catch (error) {
    console.error('Page fetch error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT /api/v1/pages/blocks/:id
router.put('/blocks/:id', authMiddleware, async (req, res) => {
  try {
    const updatedContent = req.body.content;
    const blockId = req.params.id;
    
    // Ensure block exists
    const block = await prisma.contentBlock.findUnique({
      where: { id: blockId }
    });
    
    if (!block) {
      return res.status(404).json({ error: 'Content block not found' });
    }

    if (req.user && req.user.role === 'MAKER') {
      await prisma.revision.create({
        data: {
          modelName: 'ContentBlock',
          recordId: blockId,
          proposedData: updatedContent,
          status: 'PENDING_REVIEW',
          createdById: req.user.id
        }
      });
      return res.json({ success: true, pendingReview: true, message: 'Block changes submitted for review' });
    }

    // Direct update for SUPER_ADMIN
    await prisma.contentBlock.update({
      where: { id: blockId },
      data: { content: updatedContent }
    });

    res.json({ success: true, message: 'Content block updated successfully' });
  } catch (error) {
    console.error('Content block update error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// PUT /api/v1/pages/:id/layout
router.put('/:id/layout', authMiddleware, async (req, res) => {
  try {
    const { layoutType } = req.body;
    const pageId = req.params.id;
    
    if (!layoutType) {
      return res.status(400).json({ error: 'layoutType is required' });
    }

    const page = await prisma.pageNode.findUnique({
      where: { id: pageId }
    });
    
    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }

    // Direct update for SUPER_ADMIN for now.
    // MAKER flows would create a revision on PageNode, but for layout change we just update directly for simplicity right now unless we want revision on PageNode.
    if (req.user && req.user.role === 'MAKER') {
      await prisma.revision.create({
        data: {
          modelName: 'PageNode',
          recordId: pageId,
          proposedData: { layoutType },
          status: 'PENDING_REVIEW',
          createdById: req.user.id
        }
      });
      return res.json({ success: true, pendingReview: true, message: 'Layout change submitted for review' });
    }

    await prisma.pageNode.update({
      where: { id: pageId },
      data: { layoutType }
    });

    res.json({ success: true, message: 'Page layout updated successfully' });
  } catch (error) {
    console.error('Page layout update error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
