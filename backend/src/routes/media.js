const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { authMiddleware } = require('../middleware/auth');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|svg|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }
});

// GET /api/v1/media - Get all media files
router.get('/', async (req, res) => {
  try {
    const media = await prisma.media.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(media);
  } catch (error) {
    console.error('Error fetching media:', error);
    res.status(500).json({ error: 'Failed to fetch media' });
  }
});

// POST /api/v1/media/upload - Upload a new media file
router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { filename, path: filepath, mimetype, size } = req.file;
    const url = `/uploads/${filename}`; // Public URL path

    const media = await prisma.media.create({
      data: {
        filename,
        filepath,
        mimetype,
        size,
        url
      }
    });

    res.status(201).json(media);
  } catch (error) {
    console.error('Error uploading media:', error);
    res.status(500).json({ error: 'Failed to upload media' });
  }
});

// DELETE /api/v1/media/:id - Delete a media file
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const media = await prisma.media.findUnique({
      where: { id: req.params.id }
    });

    if (!media) {
      return res.status(404).json({ error: 'Media not found' });
    }

    // Delete file from filesystem
    if (fs.existsSync(media.filepath)) {
      fs.unlinkSync(media.filepath);
    }

    // Delete record from DB
    await prisma.media.delete({
      where: { id: req.params.id }
    });

    res.json({ message: 'Media deleted successfully' });
  } catch (error) {
    console.error('Error deleting media:', error);
    res.status(500).json({ error: 'Failed to delete media' });
  }
});

module.exports = router;
