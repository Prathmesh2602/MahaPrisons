const express = require('express');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const { requireAuth, requireRole } = require('../middleware/auth');
const { auditLogger } = require('../middleware/audit');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Configure Multer to save files to the frontend's public directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../../web/public/uploads'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'img-' + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images and PDFs are allowed.'));
    }
  }
});

router.post('/', requireAuth, requireRole(['SUPER_ADMIN', 'CONTENT_EDITOR']), upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    
    // Save to Media model
    const media = await prisma.media.create({
      data: {
        filename: req.file.filename,
        url: fileUrl,
        altEn: req.body.altEn || req.file.originalname,
        altMr: req.body.altMr || req.file.originalname,
        uploadedBy: req.user.userId
      }
    });

    res.status(201).json({
      message: 'File uploaded successfully',
      url: fileUrl,
      media
    });
  } catch (err) {
    console.error('Upload Error:', err);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// GET all media library
router.get('/', requireAuth, async (req, res) => {
  try {
    const mediaList = await prisma.media.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(mediaList);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch media' });
  }
});

module.exports = router;
