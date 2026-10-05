import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

function isCorrupted(str) {
  if (typeof str !== 'string') return false;
  return str.includes('a??') || str.includes('a?+') || str.includes('Ã') || str.includes('Â') || str.includes('\ufffd');
}

function extractCorruptedStrings(obj, corruptedSet) {
  if (typeof obj === 'string') {
    if (isCorrupted(obj)) {
      corruptedSet.add(obj);
    }
  } else if (Array.isArray(obj)) {
    obj.forEach(item => extractCorruptedStrings(item, corruptedSet));
  } else if (obj !== null && typeof obj === 'object') {
    for (const key in obj) {
      extractCorruptedStrings(obj[key], corruptedSet);
    }
  }
}

async function dump() {
  let corruptedSet = new Set();
  
  const blocks = await prisma.contentBlock.findMany();
  blocks.forEach(b => extractCorruptedStrings(b.content, corruptedSet));
  
  const settings = await prisma.siteSetting.findMany();
  settings.forEach(s => extractCorruptedStrings(s.value, corruptedSet));
  
  console.log("=== EXACT CORRUPTED STRINGS ===");
  console.log(JSON.stringify(Array.from(corruptedSet), null, 2));
  
  prisma.$disconnect();
}
dump();
