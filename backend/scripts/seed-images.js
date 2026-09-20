const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

async function downloadAndSaveImage(url) {
  try {
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream',
    });

    const contentType = response.headers['content-type'];
    if (!contentType || (!contentType.startsWith('image/') && contentType !== 'application/pdf')) {
      console.log(`Skipping non-image/pdf URL: ${url}`);
      return null;
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

    await prisma.media.create({
      data: {
        filename,
        filepath,
        mimetype: contentType,
        size: stats.size,
        url: localUrl
      }
    });

    return localUrl;
  } catch (error) {
    console.error(`Failed to download ${url}:`, error.message);
    return null;
  }
}

async function processJson(obj, fieldName = '') {
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      obj[i] = await processJson(obj[i], fieldName);
    }
  } else if (obj !== null && typeof obj === 'object') {
    for (const key of Object.keys(obj)) {
      obj[key] = await processJson(obj[key], key);
    }
  } else if (typeof obj === 'string') {
    if (obj.startsWith('http://') || obj.startsWith('https://')) {
      // Ignore localhost
      if (obj.includes('localhost') || obj.includes('127.0.0.1')) {
        return obj;
      }
      
      // Heuristic: only try to download if it looks like an image URL, or if the key suggests an image
      const isImageKey = fieldName.toLowerCase().includes('image') || fieldName.toLowerCase().includes('logo') || fieldName.toLowerCase().includes('src') || fieldName.toLowerCase().includes('icon') || fieldName.toLowerCase().includes('bg');
      const isImageUrl = obj.match(/\.(jpeg|jpg|gif|png|webp|svg|pdf)($|\?)/i);
      
      if (isImageKey || isImageUrl) {
        console.log(`Found external URL: ${obj}`);
        const localUrl = await downloadAndSaveImage(obj);
        if (localUrl) {
          console.log(`-> Replaced with: ${localUrl}`);
          return localUrl;
        }
      }
    }
  }
  return obj;
}

async function main() {
  console.log('Starting external image migration...');

  // 1. Process ContentBlocks
  const blocks = await prisma.contentBlock.findMany();
  for (const block of blocks) {
    const updatedContent = await processJson(block.content);
    if (JSON.stringify(block.content) !== JSON.stringify(updatedContent)) {
      await prisma.contentBlock.update({
        where: { id: block.id },
        data: { content: updatedContent }
      });
      console.log(`Updated ContentBlock ${block.id}`);
    }
  }

  // 2. Process SiteSettings
  const settings = await prisma.siteSetting.findMany();
  for (const setting of settings) {
    const updatedValue = await processJson(setting.value);
    if (JSON.stringify(setting.value) !== JSON.stringify(updatedValue)) {
      await prisma.siteSetting.update({
        where: { id: setting.id },
        data: { value: updatedValue }
      });
      console.log(`Updated SiteSetting ${setting.key}`);
    }
  }

  console.log('Migration complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
