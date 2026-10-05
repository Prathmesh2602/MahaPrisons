const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function findCorruption() {
  const blocks = await prisma.contentBlock.findMany();
  let count = 0;
  for (const block of blocks) {
    const jsonStr = JSON.stringify(block.content);
    if (jsonStr.includes('??') || jsonStr.includes('Ã') || jsonStr.includes('Â')) {
      count++;
      console.log(`Corrupted blockType: ${block.blockType}, ID: ${block.id}`);
    }
  }
  console.log(`Found ${count} corrupted ContentBlocks`);

  const settings = await prisma.siteSetting.findMany();
  count = 0;
  for (const setting of settings) {
    const jsonStr = JSON.stringify(setting.value);
    if (jsonStr.includes('??') || jsonStr.includes('Ã') || jsonStr.includes('Â')) {
      count++;
      console.log(`Corrupted setting key: ${setting.key}, ID: ${setting.id}`);
    }
  }
  console.log(`Found ${count} corrupted SiteSettings`);

  prisma.$disconnect();
}
findCorruption();
