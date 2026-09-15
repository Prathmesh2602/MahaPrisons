const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();
const prisma = new PrismaClient();

// GET /api/v1/menu
// Fetches the entire nested main_navigation tree
router.get('/', async (req, res) => {
  try {
    const menu = await prisma.menu.findUnique({
      where: { name: 'main_navigation' },
      include: {
        items: {
          orderBy: { order: 'asc' },
          include: {
            children: {
              orderBy: { order: 'asc' }
            }
          }
        }
      }
    });

    if (!menu) {
      return res.status(404).json({ error: 'Menu not found' });
    }

    // Filter out root items since children are included recursively (2 levels deep)
    const rootItems = menu.items.filter(item => !item.parentId);
    
    res.json(rootItems);
  } catch (error) {
    console.error('Menu fetch error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT /api/v1/menu
// Updates the entire menu tree (replaces all existing items)
router.put('/', authMiddleware, async (req, res) => {
  const items = req.body; // Expects an array of root items with optional children/groups
  
  if (!Array.isArray(items)) {
    return res.status(400).json({ error: 'Expected an array of menu items' });
  }

  try {
    const menu = await prisma.menu.findUnique({ where: { name: 'main_navigation' } });
    if (!menu) return res.status(404).json({ error: 'Menu not found' });

    // Maker-Checker Logic
    if (req.user && req.user.role === 'MAKER') {
      await prisma.revision.create({
        data: {
          modelName: 'Menu',
          recordId: menu.id,
          proposedData: items,
          status: 'PENDING_REVIEW',
          createdById: req.user.id
        }
      });
      return res.json({ success: true, pendingReview: true, message: 'Menu changes submitted for review' });
    }

    // Direct update for CHECKER / SUPER_ADMIN
    // Transaction to ensure atomic update
    await prisma.$transaction(async (tx) => {
      // 1. Delete all existing items
      await tx.menuItem.deleteMany({ where: { menuId: menu.id } });

      // 2. Insert new items
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
    });

    res.json({ success: true, message: 'Menu updated successfully' });
  } catch (error) {
    console.error('Menu update error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
