const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const crypto = require('crypto');

const prisma = new PrismaClient();

const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;
    client.get(url, (response) => {
      if (response.statusCode !== 200) {
        return reject(new Error('Failed to get ' + url));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
};

async function processObject(obj, userId) {
  let updated = false;
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      const res = await processObject(obj[i], userId);
      if (res.updated) updated = true;
    }
  } else if (obj !== null && typeof obj === 'object') {
    for (const key in obj) {
      if (typeof obj[key] === 'string' && (obj[key].startsWith('http://') || obj[key].startsWith('https://'))) {
        const url = obj[key];
        
        // Skip links that are not images (like maharashtra.gov.in)
        if (url.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i) || url.includes('cdnbbsr') || url.includes('uploads') || url.includes('image')) {
          console.log("Downloading", url);
          try {
            const extMatch = url.match(/\.([a-zA-Z0-9]+)$/);
            let ext = extMatch ? extMatch[1] : 'jpeg';
            if (ext.length > 4 || ext === 'in' || ext === 'com') ext = 'jpeg';
            
            const filename = crypto.randomUUID() + '.' + ext;
            const uploadPath = path.join(__dirname, 'uploads', filename);
            
            // Ensure uploads directory exists
            if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
              fs.mkdirSync(path.join(__dirname, 'uploads'));
            }
            
            await downloadFile(url, uploadPath);
            
            const localUrl = '/uploads/' + filename;
            
            await prisma.media.create({
              data: {
                filename: filename,
                url: localUrl,
                altMr: 'Downloaded Image',
                altEn: 'Downloaded Image',
                uploadedBy: userId
              }
            });
            
            obj[key] = localUrl;
            updated = true;
          } catch (e) {
            console.error("Failed to process", url, e.message);
          }
        }
      } else {
        const res = await processObject(obj[key], userId);
        if (res.updated) updated = true;
      }
    }
  }
  return { updated, obj };
}

async function main() {
  const user = await prisma.user.findFirst();
  if (!user) {
    console.log("No user found to attribute uploads to.");
    return;
  }
  
  const blocks = await prisma.contentBlock.findMany();
  for (const block of blocks) {
    let data = block.data;
    if (typeof data === 'string') data = JSON.parse(data);
    
    const { updated, obj } = await processObject(data, user.id);
    if (updated) {
      await prisma.contentBlock.update({
        where: { id: block.id },
        data: { data: obj }
      });
      console.log(`Updated block ${block.id} (${block.blockType})`);
    }
  }
  console.log("Done processing blocks!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
