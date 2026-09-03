const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { requireAuth, requireRole } = require('../middleware/auth');
const { auditLogger } = require('../middleware/audit');

const router = express.Router();
const prisma = new PrismaClient();

// Helper to trigger Next.js revalidation
const triggerRevalidate = async (pathOrTag) => {
  try {
    const url = process.env.NEXT_REVALIDATE_URL || 'http://localhost:3000/api/revalidate';
    const secret = process.env.REVALIDATE_SECRET || 'dev-revalidate-secret-123';
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${secret}`
      },
      body: JSON.stringify(pathOrTag)
    });
  } catch (err) {
    console.error('Failed to trigger Next.js revalidation:', err.message);
  }
};

// ==========================================
// 1. AUTHENTICATION
// ==========================================
router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Default superadmin override for local dev
    if (email === 'admin@mahaprisons.gov.in' && password === 'admin123') {
      // Upsert the user so it has a valid UUID in the DB
      let user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        user = await prisma.user.create({
          data: {
            email,
            name: 'Super Admin',
            role: 'SUPER_ADMIN',
            passwordHash: await bcrypt.hash('admin123', 10)
          }
        });
      }
      const token = jwt.sign(
        { userId: user.id, role: 'SUPER_ADMIN', email },
        process.env.JWT_SECRET || 'mahaprisons-super-secret-jwt-key-2026',
        { expiresIn: '8h' }
      );
      return res.json({ token, user: { id: user.id, email, role: 'SUPER_ADMIN' } });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Invalid credentials or inactive account' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET || 'mahaprisons-super-secret-jwt-key-2026',
      { expiresIn: '8h' }
    );

    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ==========================================
// 2. MAKER-CHECKER (Governance)
// ==========================================

// List all pages
router.get('/pages', requireAuth, requireRole(['SUPER_ADMIN', 'CONTENT_EDITOR', 'CHECKER']), async (req, res) => {
  try {
    const pages = await prisma.page.findMany({
      orderBy: { updatedAt: 'desc' }
    });
    res.json(pages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pages' });
  }
});

// Get single page with blocks
router.get('/pages/:id', requireAuth, requireRole(['SUPER_ADMIN', 'CONTENT_EDITOR', 'CHECKER']), async (req, res) => {
  try {
    const page = await prisma.page.findUnique({
      where: { id: req.params.id },
      include: { blocks: true }
    });
    if (!page) return res.status(404).json({ error: 'Page not found' });
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch page' });
  }
});

// Maker submits a page for review
router.post('/pages/:id/submit-for-review', requireAuth, requireRole(['CONTENT_EDITOR']), auditLogger('SUBMIT_FOR_REVIEW'), async (req, res) => {
  try {
    const { id } = req.params;
    const { blocks } = req.body; // updated block data
    
    // Create a new PageVersion
    const version = await prisma.pageVersion.create({
      data: {
        pageId: id,
        blocks: blocks,
        authorId: req.user.userId,
        status: 'PENDING'
      }
    });

    // Update page status to IN_REVIEW
    await prisma.page.update({
      where: { id },
      data: { status: 'IN_REVIEW' }
    });

    res.json({ message: 'Submitted for review', version });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit' });
  }
});

// Checker approves a page
router.post('/pages/:id/approve', requireAuth, requireRole(['CHECKER', 'SUPER_ADMIN']), auditLogger('APPROVE_PAGE'), async (req, res) => {
  try {
    const { id } = req.params;
    const { versionId } = req.body;
    
    const version = await prisma.pageVersion.update({
      where: { id: versionId },
      data: {
        status: 'APPROVED',
        reviewerId: req.user.userId,
        reviewedAt: new Date()
      }
    });

    const page = await prisma.page.update({
      where: { id },
      data: { status: 'PUBLISHED' }
    });

    await triggerRevalidate({ path: `/${page.slug}` });

    res.json({ message: 'Page approved and published', page });
  } catch (err) {
    res.status(500).json({ error: 'Failed to approve' });
  }
});

// GET /api/v1/admin/pages/:id/blocks
router.get('/pages/:id/blocks', requireAuth, requireRole(['SUPER_ADMIN', 'CONTENT_EDITOR', 'CHECKER']), async (req, res) => {
  try {
    const blocks = await prisma.contentBlock.findMany({
      where: { pageId: req.params.id },
      orderBy: { order: 'asc' }
    });
    res.json(blocks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blocks' });
  }
});

// PUT /api/v1/admin/pages/:id/blocks
router.put('/pages/:id/blocks', requireAuth, requireRole(['SUPER_ADMIN', 'CONTENT_EDITOR']), auditLogger('UPDATE_PAGE_BLOCKS'), async (req, res) => {
  try {
    const { blocks } = req.body;
    
    await prisma.$transaction(async (tx) => {
      await tx.contentBlock.deleteMany({ where: { pageId: req.params.id } });
      if (blocks && blocks.length > 0) {
        await tx.contentBlock.createMany({
          data: blocks.map((b, i) => ({
            pageId: req.params.id,
            blockType: b.blockType,
            order: i,
            data: b.data
          }))
        });
      }
    });

    res.json({ message: 'Blocks updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update blocks' });
  }
});

// Checker rejects a page
router.post('/pages/:id/reject', requireAuth, requireRole(['CHECKER', 'SUPER_ADMIN']), auditLogger('REJECT_PAGE'), async (req, res) => {
  try {
    const { id } = req.params;
    const { versionId, reviewNotes } = req.body;
    
    await prisma.pageVersion.update({
      where: { id: versionId },
      data: {
        status: 'REJECTED',
        reviewNotes,
        reviewerId: req.user.userId,
        reviewedAt: new Date()
      }
    });

    await prisma.page.update({
      where: { id },
      data: { status: 'DRAFT' } // return to draft
    });

    res.json({ message: 'Page rejected' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reject' });
  }
});

// List Review Queue
router.get('/review-queue', requireAuth, requireRole(['CHECKER', 'SUPER_ADMIN']), async (req, res) => {
  try {
    const queue = await prisma.pageVersion.findMany({
      where: { status: 'PENDING' },
      include: { page: true }
    });
    res.json(queue);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch queue' });
  }
});

// ==========================================
// 3. DIRECT-WRITE (Translations, Menu, etc.)
// ==========================================

router.put('/translations/:id', requireAuth, requireRole(['CONTENT_EDITOR', 'SUPER_ADMIN']), auditLogger('UPDATE_TRANSLATION'), async (req, res) => {
  try {
    const { id } = req.params;
    const { mr, en } = req.body;
    
    const trans = await prisma.translation.update({
      where: { id },
      data: { mr, en }
    });

    await triggerRevalidate({ tag: 'translations' });
    res.json(trans);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update' });
  }
});

router.post('/menu', requireAuth, requireRole(['CONTENT_EDITOR', 'SUPER_ADMIN']), auditLogger('CREATE_MENU'), async (req, res) => {
  try {
    const { labelEn, labelMr, href, icon, parentId, isMegaGroup, order } = req.body;
    
    // Default order if not provided
    let newOrder = order;
    if (newOrder === undefined) {
      const lastItem = await prisma.menuItem.findFirst({
        where: { parentId: parentId || null },
        orderBy: { order: 'desc' }
      });
      newOrder = lastItem ? lastItem.order + 1 : 0;
    }

    let menu = await prisma.menuItem.create({
      data: {
        labelEn,
        labelMr,
        href: href || '#',
        icon: icon || null,
        parentId: parentId || null,
        isMegaGroup: isMegaGroup || false,
        order: newOrder,
        visible: true
      }
    });

    if (!isMegaGroup) {
      let slug = href === '/' ? 'home' : (href || '').replace(/^\//, '');
      if (!slug || slug === '#') slug = `page-${menu.id}`;
      
      const slugExists = await prisma.page.findUnique({ where: { slug } });
      if (slugExists) slug = `${slug}-${Date.now()}`;

      const page = await prisma.page.create({
        data: {
          slug: slug,
          menuItemId: menu.id,
          templateKey: 'BLANK_PAGE',
          titleEn: labelEn,
          titleMr: labelMr,
          createdBy: req.user.userId,
          updatedBy: req.user.userId,
          status: 'DRAFT',
        }
      });
      
      menu = await prisma.menuItem.update({
        where: { id: menu.id },
        data: { pageId: page.id }
      });
    }

    await triggerRevalidate({ tag: 'menu' });
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create' });
  }
});

router.put('/menu/reorder', requireAuth, requireRole(['CONTENT_EDITOR', 'SUPER_ADMIN']), auditLogger('REORDER_MENU'), async (req, res) => {
  try {
    const { items } = req.body; // Array of { id, order, parentId }
    
    // Process in a transaction
    await prisma.$transaction(
      items.map(item => 
        prisma.menuItem.update({
          where: { id: item.id },
          data: { 
            order: item.order,
            parentId: item.parentId || null
          }
        })
      )
    );

    await triggerRevalidate({ tag: 'menu' });
    res.json({ message: 'Menu reordered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reorder' });
  }
});

router.put('/menu/:id', requireAuth, requireRole(['CONTENT_EDITOR', 'SUPER_ADMIN']), auditLogger('UPDATE_MENU'), async (req, res) => {
  try {
    const { id } = req.params;
    const { labelEn, labelMr, href, icon, isMegaGroup, visible } = req.body;
    
    const menu = await prisma.menuItem.update({
      where: { id },
      data: { 
        ...(labelEn !== undefined && { labelEn }),
        ...(labelMr !== undefined && { labelMr }),
        ...(href !== undefined && { href }),
        ...(icon !== undefined && { icon }),
        ...(isMegaGroup !== undefined && { isMegaGroup }),
        ...(visible !== undefined && { visible })
      }
    });

    await triggerRevalidate({ tag: 'menu' });
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update' });
  }
});

router.delete('/menu/:id', requireAuth, requireRole(['CONTENT_EDITOR', 'SUPER_ADMIN']), auditLogger('DELETE_MENU'), async (req, res) => {
  try {
    const { id } = req.params;
    
    // Delete item and its descendants (Cascade would handle this if configured, but let's do it safely)
    // Actually in Prisma without Cascade on self relation, we must delete children first.
    // For a deeper tree, a recursive function is needed, but we can just use deleteMany on children for up to 3 levels.
    
    const deleteRecursive = async (nodeId) => {
      const children = await prisma.menuItem.findMany({ where: { parentId: nodeId } });
      for (const child of children) {
        await deleteRecursive(child.id);
      }
      await prisma.menuItem.delete({ where: { id: nodeId } });
    };

    await deleteRecursive(id);

    await triggerRevalidate({ tag: 'menu' });
    res.json({ message: 'Menu item deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete' });
  }
});

module.exports = router;
