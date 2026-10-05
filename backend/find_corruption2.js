const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function findCorruption() {
  const blocks = await prisma.contentBlock.findMany();
  let count = 0;
  for (const block of blocks) {
    const jsonStr = JSON.stringify(block.content);
    // Find if it has "mr": "something" but the something lacks Devanagari
    let hasMarathiKey = jsonStr.includes('"mr":"') || jsonStr.includes('"label_mr":');
    let hasDevanagari = /[\u0900-\u097F]/.test(jsonStr);
    
    // Some blocks might be purely English, but if it has "mr" key it should have Devanagari,
    // or if it has corrupted characters.
    if (jsonStr.includes('') || jsonStr.includes('a?') || (hasMarathiKey && !hasDevanagari)) {
      count++;
      console.log(`Corrupted blockType: ${block.blockType}, ID: ${block.id}, Value Snippet: ${jsonStr.substring(0, 150)}`);
    }
  }
  console.log(`Found ${count} corrupted ContentBlocks`);

  const settings = await prisma.siteSetting.findMany();
  count = 0;
  for (const setting of settings) {
    const jsonStr = JSON.stringify(setting.value);
    let hasMarathiKey = jsonStr.includes('"mr":"') || jsonStr.includes('"label_mr":');
    let hasDevanagari = /[\u0900-\u097F]/.test(jsonStr);
    
    if (jsonStr.includes('') || jsonStr.includes('a?') || (hasMarathiKey && !hasDevanagari)) {
      count++;
      console.log(`Corrupted setting key: ${setting.key}, ID: ${setting.id}`);
    }
  }
  console.log(`Found ${count} corrupted SiteSettings`);

  prisma.$disconnect();
}
findCorruption();
