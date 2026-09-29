const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { authMiddleware } = require('../middleware/auth');
const { uploadFile, deleteFile } = require('../lib/storage');
const { supabase, bucketName } = require('../lib/supabase');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|svg|webp|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Error: Invalid file type! Only images and PDFs are allowed.'));
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

    const uniqueFilename =
      Date.now() +
      '-' +
      Math.round(Math.random() * 1E9) +
      path.extname(req.file.originalname);

    let filepath;
    let url;

    if (process.env.STORAGE_MODE === 'supabase') {
      // Production: upload to Supabase Storage
      const result = await uploadFile({
        buffer: req.file.buffer,
        filename: uniqueFilename,
        mimetype: req.file.mimetype
      });

      filepath = result.filepath;

      const { data: publicUrlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filepath);

      url = publicUrlData.publicUrl;

    } else {
      // Local development: save to backend/uploads
      const localFilepath = path.join(uploadDir, uniqueFilename);

      require('fs').writeFileSync(
        localFilepath,
        req.file.buffer
      );

      filepath = localFilepath;
      url = `/uploads/${uniqueFilename}`;
    }

    const media = await prisma.media.create({
      data: {
        filename: req.file.originalname,
        filepath,
        mimetype: req.file.mimetype,
        size: req.file.size,
        url
      }
    });

    res.status(201).json(media);

  } catch (error) {
    console.error('Error uploading media:', error);

    res.status(500).json({
      error: 'Failed to upload media'
    });
  }
});

// DELETE /api/v1/media/:id - Delete a media file
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const media = await prisma.media.findUnique({
      where: {
        id: req.params.id
      }
    });

    if (!media) {
      return res.status(404).json({
        error: 'Media not found'
      });
    }

    // Delete from local storage or Supabase Storage
    await deleteFile(media.filepath);

    // Delete database record
    await prisma.media.delete({
      where: {
        id: req.params.id
      }
    });

    res.json({
      message: 'Media deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting media:', error);

    res.status(500).json({
      error: 'Failed to delete media'
    });
  }
});

// POST /api/v1/media/import-url - Import an external URL to DB
router.post('/import-url', authMiddleware, async (req, res) => {
  try {
    const { url } = req.body;
    if (!url || !url.startsWith('http')) {
      return res.status(400).json({ error: 'Invalid URL provided' });
    }

    const axios = require('axios');
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream',
    });

    const contentType = response.headers['content-type'];
    if (!contentType || (!contentType.startsWith('image/') && contentType !== 'application/pdf')) {
      return res.status(400).json({ error: 'Invalid file type from URL. Only images and PDFs are allowed.' });
    }

    const ext = contentType === 'application/pdf' ? '.pdf' : '.' + contentType.split('/')[1].replace('jpeg', 'jpg');
    const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
    const filepath = path.join(uploadDir, filename);

    const writer = fs.createWriteStream(filepath);
    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    const stats = fs.statSync(filepath);
    const localUrl = `/uploads/${filename}`;

    const media = await prisma.media.create({
      data: {
        filename,
        filepath,
        mimetype: contentType,
        size: stats.size,
        url: localUrl
      }
    });

    res.status(201).json(media);
  } catch (error) {
    console.error('Error importing media from URL:', error);
    res.status(500).json({ error: 'Failed to import media from URL' });
  }
});

module.exports = router;
