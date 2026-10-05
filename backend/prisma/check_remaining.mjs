import fs from 'fs';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function bruteForce() {
  const blocks = await prisma.contentBlock.findMany();
  for (const b of blocks) {
    let str = JSON.stringify(b.content);
    if (str.includes('a??') || str.includes('a?+')) {
      console.log(`\n\n--- ID: ${b.id} Type: ${b.blockType} ---`);
      console.log(str.substring(0, 1000)); // Print the full thing
    }
  }
  const settings = await prisma.siteSetting.findMany();
  for (const s of settings) {
    let str = JSON.stringify(s.value);
    if (str.includes('a??') || str.includes('a?+')) {
      console.log(`\n\n--- ID: ${s.id} Key: ${s.key} ---`);
      console.log(str.substring(0, 1000));
    }
  }
  prisma.$disconnect();
}
bruteForce();
