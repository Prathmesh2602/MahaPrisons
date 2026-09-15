const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// POST /api/v1/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Seed an initial admin user if none exist (development helper)
router.post('/setup', async (req, res) => {
  try {
    const count = await prisma.user.count();
    if (count > 0) return res.status(400).json({ error: 'Admin already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const user = await prisma.user.create({
      data: {
        email: 'admin@mahaprisons.gov.in',
        password: hashedPassword,
        name: 'Super Admin',
        role: 'SUPER_ADMIN'
      }
    });

    res.json({ message: 'Default admin created', email: user.email });
  } catch (err) {
    res.status(500).json({ error: 'Setup failed' });
  }
});

module.exports = router;
