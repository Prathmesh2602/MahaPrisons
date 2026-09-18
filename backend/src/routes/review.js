const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authMiddleware, requireRole } = require('../middleware/auth');
const router = express.Router();
const prisma = new PrismaClient();

// GET /api/v1/review/pending
// Fetch all pending revisions for CHECKER
router.get('/pending', authMiddleware, requireRole(['CHECKER', 'SUPER_ADMIN']), async (req, res) => {
  try {
    const pendingRevisions = await prisma.revision.findMany({
      where: { status: 'PENDING_REVIEW' },
      include: { createdBy: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(pendingRevisions);
  } catch (error) {
    console.error('Fetch pending reviews error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/v1/review/my-requests
// Fetch all revisions created by the logged-in MAKER
router.get('/my-requests', authMiddleware, requireRole(['MAKER', 'SUPER_ADMIN']), async (req, res) => {
  try {
    const myRevisions = await prisma.revision.findMany({
      where: { createdById: req.user.id },
      include: { createdBy: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(myRevisions);
  } catch (error) {
    console.error('Fetch my reviews error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /api/v1/review/:id
// Cancel a pending revision (only by the creator)
router.delete('/:id', authMiddleware, requireRole(['MAKER', 'SUPER_ADMIN']), async (req, res) => {
  try {
    const revision = await prisma.revision.findUnique({ where: { id: req.params.id } });
    if (!revision) return res.status(404).json({ error: 'Revision not found' });
    
    // Only the creator or SUPER_ADMIN can delete
    if (revision.createdById !== req.user.id && req.user.role !== 'SUPER_ADMIN') {
      return res.status(403).json({ error: 'Unauthorized to delete this revision' });
    }

    if (revision.status !== 'PENDING_REVIEW') {
      return res.status(400).json({ error: 'Can only delete pending revisions' });
    }

    await prisma.revision.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Revision cancelled successfully' });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/v1/review/:id/diff
// Fetch the difference between proposed data and live data
router.get('/:id/diff', authMiddleware, requireRole(['CHECKER', 'SUPER_ADMIN']), async (req, res) => {
  try {
    const revision = await prisma.revision.findUnique({ where: { id: req.params.id } });
    if (!revision) return res.status(404).json({ error: 'Revision not found' });

    let oldData = null;
    const newData = revision.proposedData;

    if (revision.modelName === 'SiteSetting') {
      const currentSetting = await prisma.siteSetting.findUnique({ where: { key: revision.recordId } });
      const currentVal = currentSetting ? currentSetting.value : {};
      // Format as key-value pair of the individual fields for easier diffing
      oldData = Object.keys(currentVal).map(k => ({ key: k, value: currentVal[k] }));
      const newObj = revision.proposedData || {};
      newData = Object.keys(newObj).map(k => ({ key: k, value: newObj[k] }));
    } else if (revision.modelName === 'Menu') {
      const menu = await prisma.menu.findUnique({ where: { name: 'main_navigation' } });
      if (menu) {
        // Fetch current tree (flat)
        const items = await prisma.menuItem.findMany({
          where: { menuId: menu.id },
          orderBy: { order: 'asc' }
        });
        
        // Reconstruct the tree (simple version)
        const rootItems = items.filter(i => !i.parentId).map(root => {
          return {
            ...root,
            children: items.filter(child => child.parentId === root.id).sort((a,b) => a.order - b.order)
          };
        });
        oldData = rootItems;
      }
    }

    res.json({
      modelName: revision.modelName,
      status: revision.status,
      oldData,
      newData
    });
  } catch (error) {
    console.error('Fetch review diff error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/v1/review/:id/approve
router.post('/:id/approve', authMiddleware, requireRole(['CHECKER', 'SUPER_ADMIN']), async (req, res) => {
  try {
    const revision = await prisma.revision.findUnique({ where: { id: req.params.id } });
    if (!revision) return res.status(404).json({ error: 'Revision not found' });
    if (revision.status !== 'PENDING_REVIEW') return res.status(400).json({ error: 'Revision is not pending' });

    await prisma.$transaction(async (tx) => {
      // 1. Mark revision as APPROVED
      await tx.revision.update({
        where: { id: revision.id },
        data: {
          status: 'APPROVED',
          reviewedById: req.user.id
        }
      });

      // 2. Apply the proposedData payload to the target table
      // This is dynamic based on modelName. 
      // For Menu, the payload is the entire tree structure since they replace the menu completely.
      // So if modelName === 'Menu', we just replace the menu.
      const payload = revision.proposedData;

      if (revision.modelName === 'Menu') {
        const menu = await tx.menu.findUnique({ where: { name: 'main_navigation' } });
        if (menu) {
          await tx.menuItem.deleteMany({ where: { menuId: menu.id } });
          const items = payload;
          for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const rootItem = await tx.menuItem.create({
              data: {
                menuId: menu.id,
                label_mr: item.label_mr,
                label_en: item.label_en,
                href: item.href,
                icon: item.icon,
                order: i,
                groups: item.groups || null,
              }
            });
            if (item.children && Array.isArray(item.children)) {
              for (let j = 0; j < item.children.length; j++) {
                const child = item.children[j];
                await tx.menuItem.create({
                  data: {
                    menuId: menu.id,
                    parentId: rootItem.id,
                    label_mr: child.label_mr,
                    label_en: child.label_en,
                    href: child.href,
                    icon: child.icon,
                    order: j
                  }
                });
              }
            }
          }
        }
      }
      
      if (revision.modelName === 'SiteSetting') {
        await tx.siteSetting.upsert({
          where: { key: revision.recordId },
          update: { value: payload },
          create: { key: revision.recordId, value: payload }
        });
      }
    });

    res.json({ success: true, message: 'Revision approved and published' });
  } catch (error) {
    console.error('Approve review error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/v1/review/:id/reject
router.post('/:id/reject', authMiddleware, requireRole(['CHECKER', 'SUPER_ADMIN']), async (req, res) => {
  try {
    const { rejectReason } = req.body;
    if (!rejectReason) return res.status(400).json({ error: 'Rejection reason is required' });

    const revision = await prisma.revision.update({
      where: { id: req.params.id },
      data: {
        status: 'REJECTED',
        rejectReason,
        reviewedById: req.user.id
      }
    });

    res.json({ success: true, message: 'Revision rejected', revision });
  } catch (error) {
    console.error('Reject review error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
