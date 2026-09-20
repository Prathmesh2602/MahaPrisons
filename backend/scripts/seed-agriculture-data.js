const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const prisma = new PrismaClient();

const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Ensure placeholder exists
const PLACEHOLDER_PATH = path.join(UPLOADS_DIR, 'placeholder.jpg');

async function downloadImage(url, filename) {
  if (url.startsWith('http://localhost')) {
    // Already local or mapped
    return url;
  }
  
  const destPath = path.join(UPLOADS_DIR, filename);
  let finalUrl = url;

  try {
    const response = await axios({ url: finalUrl, responseType: 'stream', timeout: 5000 });
    const writer = fs.createWriteStream(destPath);
    response.data.pipe(writer);
    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
    return `/uploads/${filename}`;
  } catch (error) {
    console.log(`Failed to download ${url}, using placeholder. Error: ${error.message}`);
    // If we haven't downloaded placeholder yet, get it
    if (!fs.existsSync(PLACEHOLDER_PATH)) {
      try {
        const pResponse = await axios({ url: 'https://placehold.co/800x600/eee/31343c.png?text=Image+Not+Found', responseType: 'stream', timeout: 5000 });
        const pWriter = fs.createWriteStream(PLACEHOLDER_PATH);
        pResponse.data.pipe(pWriter);
        await new Promise((resolve, reject) => {
          pWriter.on('finish', resolve);
          pWriter.on('error', reject);
        });
      } catch (e) {
        console.log("Failed to download placeholder too!", e.message);
      }
    }
    return `/uploads/placeholder.jpg`;
  }
}

const TEMPLATE_MAP = {
  'A': 'HeroFeaturesTimelineLayout',
  'B': 'HeroStatsGrid',
  'C': 'HeroThreeColGrid',
  'D': 'HeroSplitTimeline',
  'E': 'HeroFeatureList'
};

async function processObjectImages(obj, prefix = '') {
  if (!obj) return obj;
  if (typeof obj === 'string') {
    if (obj.startsWith('http')) {
      const ext = obj.includes('.png') ? '.png' : '.jpg';
      const filename = `agriculture_${Date.now()}_${Math.random().toString(36).substring(7)}${ext}`;
      return await downloadImage(obj, filename);
    }
    return obj;
  }
  
  if (Array.isArray(obj)) {
    const newArr = [];
    for (const item of obj) {
      newArr.push(await processObjectImages(item, prefix));
    }
    return newArr;
  }
  
  if (typeof obj === 'object') {
    const newObj = {};
    for (const [k, v] of Object.entries(obj)) {
      newObj[k] = await processObjectImages(v, prefix);
    }
    return newObj;
  }
  
  return obj;
}

async function main() {
  console.log("Loading agricultureData.js...");
  const modulePath = path.join(__dirname, '..', '..', 'web', 'src', 'data', 'agricultureData.js');
  const m = await import('file:///' + modulePath.replace(/\\/g, '/'));
  const data = m.agricultureData;
  
  for (const [key, pageData] of Object.entries(data)) {
    console.log(`\nProcessing ${key}...`);
    const slug = `agriculture/${key}`;
    const layoutType = 'HeroFeatureList'; // all agriculture pages use this template currently
    
    // Process images
    const processedData = await processObjectImages(pageData);
    
    // Refactor sections into an array
    const contentSections = [];
    if (processedData.detailsSection) {
      contentSections.push({
        ...processedData.detailsSection,
        imagePosition: 'left'
      });
      delete processedData.detailsSection;
    }
    if (processedData.impactSection) {
      contentSections.push({
        ...processedData.impactSection,
        imagePosition: 'right'
      });
      delete processedData.impactSection;
    }
    processedData.contentSections = contentSections;
    
    // Upsert PageNode
    const title = processedData.title?.en || processedData.title || key;
    let page = await prisma.pageNode.findUnique({ where: { slug } });
    if (!page) {
      page = await prisma.pageNode.create({
        data: {
          slug,
          title: title,
          layoutType: layoutType,
          isActive: true
        }
      });
      console.log(`Created PageNode ${slug}`);
    } else {
      page = await prisma.pageNode.update({
        where: { slug },
        data: { title, layoutType }
      });
      console.log(`Updated PageNode ${slug}`);
    }
    
    // Upsert ContentBlock
    const existingBlock = await prisma.contentBlock.findFirst({
      where: { pageNodeId: page.id, blockType: 'page_template_data' }
    });
    
    if (!existingBlock) {
      await prisma.contentBlock.create({
        data: {
          pageNodeId: page.id,
          blockType: 'page_template_data',
          content: processedData,
          order: 0
        }
      });
      console.log(`Created ContentBlock for ${slug}`);
    } else {
      await prisma.contentBlock.update({
        where: { id: existingBlock.id },
        data: { content: processedData }
      });
      console.log(`Updated ContentBlock for ${slug}`);
    }
  }
  
  console.log("\nDone seeding!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
