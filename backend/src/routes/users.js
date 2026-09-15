const express = require('express');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const { authMiddleware, requireRole } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

router.use(authMiddleware);

// PUT /api/v1/users/profile/password - Change logged-in user's password
router.put('/profile/password', async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new passwords are required' });
    }

    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) return res.status(400).json({ error: 'Incorrect current password' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: { id: req.user.id },
      data: { password: hashedPassword }
    });

    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// All routes below require SUPER_ADMIN
router.use(requireRole(['SUPER_ADMIN']));

// GET /api/v1/users - List all users
router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(users);
  } catch (error) {
    console.error('Fetch users error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/v1/users - Create new user
router.post('/', async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    
    if (!email || !password || !role) {
      return res.status(400).json({ error: 'Email, password, and role are required' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || '',
        role
      },
      select: { id: true, email: true, name: true, role: true }
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT /api/v1/users/:id - Update user
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, name, role } = req.body;

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Prevent changing your own role or deleting yourself (optional safeguard)
    // if (user.id === req.user.id && role !== 'SUPER_ADMIN') {
    //   return res.status(400).json({ error: 'Cannot demote yourself' });
    // }

    const updateData = { email, name, role };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: { id: true, email: true, name: true, role: true }
    });

    res.json(updatedUser);
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /api/v1/users/:id - Delete user
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (id === req.user.id) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }

    await prisma.user.delete({ where: { id } });
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
