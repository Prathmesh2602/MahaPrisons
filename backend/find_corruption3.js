const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function findCorruption() {
  const blocks = await prisma.contentBlock.findMany();
  let count = 0;
  for (const block of blocks) {
    const jsonStr = JSON.stringify(block.content);
    if (jsonStr.includes('a??') || jsonStr.includes('a?+') || jsonStr.includes('Ã') || jsonStr.includes('Â') || jsonStr.includes('\ufffd')) {
      count++;
      let match = jsonStr.match(/a\?\?|a\?\+|Ã|Â|\ufffd/);
      console.log(`Corrupted ContentBlock ID: ${block.id}, blockType: ${block.blockType}, match: ${match[0]}`);
    }
  }
  console.log(`Found ${count} corrupted ContentBlocks`);

  const settings = await prisma.siteSetting.findMany();
  count = 0;
  for (const setting of settings) {
    const jsonStr = JSON.stringify(setting.value);
    if (jsonStr.includes('a??') || jsonStr.includes('a?+') || jsonStr.includes('Ã') || jsonStr.includes('Â') || jsonStr.includes('\ufffd')) {
      count++;
      let match = jsonStr.match(/a\?\?|a\?\+|Ã|Â|\ufffd/);
      console.log(`Corrupted SiteSetting ID: ${setting.id}, key: ${setting.key}, match: ${match[0]}`);
    }
  }
  console.log(`Found ${count} corrupted SiteSettings`);

  prisma.$disconnect();
}
findCorruption();
