const fs = require('fs');
const path = require('path');
const https = require('https');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const UPLOADS_DIR = path.join(__dirname, '../uploads');
const WEB_PUBLIC_DIR = path.join(__dirname, '../../web/public');
const WEB_GALLARY_DIR = path.join(WEB_PUBLIC_DIR, 'gallary');

const EXTERNAL_URLS = [
  {
    url: 'https://mahaprisons.gov.in/wp-content/themes/sdo-theme/images/emblem.svg',
    filename: 'emblem.svg'
  },
  {
    url: 'https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2019/03/2019031587.png',
    filename: 'digital_india.png'
  }
];

const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(dest);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
};

const processFile = async (filepath, filename) => {
  const stats = fs.statSync(filepath);
  const ext = path.extname(filename).toLowerCase();
  
  let mimetype = 'application/octet-stream';
  if (ext === '.jpeg' || ext === '.jpg') mimetype = 'image/jpeg';
  else if (ext === '.png') mimetype = 'image/png';
  else if (ext === '.svg') mimetype = 'image/svg+xml';
  else if (ext === '.webp') mimetype = 'image/webp';
  else if (ext === '.gif') mimetype = 'image/gif';

  // KEEP ORIGINAL FILENAME (sanitized slightly to avoid spaces)
  const newFilename = filename.replace(/\s+/g, '_');
  const newFilepath = path.join(UPLOADS_DIR, newFilename);
  
  fs.copyFileSync(filepath, newFilepath);
  
  const media = await prisma.media.create({
    data: {
      filename: newFilename,
      filepath: newFilepath,
      mimetype,
      size: stats.size,
      url: `/uploads/${newFilename}`
    }
  });

  return media;
};

const migrate = async () => {
  try {
    console.log('Cleaning up old media records and uploads folder...');
    await prisma.media.deleteMany({});
    
    if (fs.existsSync(UPLOADS_DIR)) {
      fs.rmSync(UPLOADS_DIR, { recursive: true, force: true });
    }
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });

    console.log('Downloading external assets...');
    let emblemMedia = null;
    let digitalIndiaMedia = null;

    for (const asset of EXTERNAL_URLS) {
      const tempPath = path.join(__dirname, asset.filename);
      await downloadFile(asset.url, tempPath);
      const media = await processFile(tempPath, asset.filename);
      fs.unlinkSync(tempPath);
      
      if (asset.filename === 'emblem.svg') emblemMedia = media;
      if (asset.filename === 'digital_india.png') digitalIndiaMedia = media;
      console.log(`Downloaded & saved ${asset.filename} as ${media.filename}`);
    }

    console.log('Migrating local assets from web/public...');
    let logoMedia = null;
    if (fs.existsSync(path.join(WEB_PUBLIC_DIR, 'logo.jpeg'))) {
      logoMedia = await processFile(path.join(WEB_PUBLIC_DIR, 'logo.jpeg'), 'logo.jpeg');
      console.log(`Migrated logo.jpeg as ${logoMedia.filename}`);
    }

    if (fs.existsSync(WEB_GALLARY_DIR)) {
      const galleryFiles = fs.readdirSync(WEB_GALLARY_DIR);
      for (const file of galleryFiles) {
        const filePath = path.join(WEB_GALLARY_DIR, file);
        if (fs.statSync(filePath).isFile()) {
          const ext = path.extname(file).toLowerCase();
          if (['.jpeg', '.jpg', '.png', '.webp', '.svg', '.gif'].includes(ext)) {
            const media = await processFile(filePath, file);
            console.log(`Migrated gallery/${file} as ${media.filename}`);
          }
        }
      }
      
      const croppedDir = path.join(WEB_GALLARY_DIR, 'cropped');
      if (fs.existsSync(croppedDir)) {
        const croppedFiles = fs.readdirSync(croppedDir);
        for (const file of croppedFiles) {
          const filePath = path.join(croppedDir, file);
          if (fs.statSync(filePath).isFile()) {
            const ext = path.extname(file).toLowerCase();
            if (['.jpeg', '.jpg', '.png', '.webp', '.svg', '.gif'].includes(ext)) {
              const media = await processFile(filePath, file);
              console.log(`Migrated gallery/cropped/${file} as ${media.filename}`);
            }
          }
        }
      }
    }

    console.log('Updating SiteSetting header_config...');
    const headerSetting = await prisma.siteSetting.findUnique({
      where: { key: 'header_config' }
    });

    if (headerSetting) {
      const config = headerSetting.value;
      if (logoMedia) config.logo_src = logoMedia.url;
      if (emblemMedia) config.state_emblem_src = emblemMedia.url;
      if (digitalIndiaMedia) config.digital_india_src = digitalIndiaMedia.url;

      await prisma.siteSetting.update({
        where: { key: 'header_config' },
        data: { value: config }
      });
      console.log('header_config updated successfully.');
    } else {
      console.log('header_config not found in DB. Skipping update.');
    }

    console.log('Migration complete!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

migrate();
