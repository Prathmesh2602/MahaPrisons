import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

function isCorrupted(str) {
  if (typeof str !== 'string') return false;
  return str.includes('a??') || str.includes('a?+') || str.includes('Ã') || str.includes('Â') || str.includes('\ufffd');
}

async function dumpFull() {
  const blocks = await prisma.contentBlock.findMany();
  for (const b of blocks) {
    if (isCorrupted(JSON.stringify(b.content))) {
      console.log(`\n\n=== ContentBlock: ${b.id} (${b.blockType}) ===`);
      console.log(JSON.stringify(b.content, null, 2));
    }
  }
  const settings = await prisma.siteSetting.findMany();
  for (const s of settings) {
    if (isCorrupted(JSON.stringify(s.value))) {
      console.log(`\n\n=== SiteSetting: ${s.id} (${s.key}) ===`);
      console.log(JSON.stringify(s.value, null, 2));
    }
  }
  prisma.$disconnect();
}
dumpFull();
