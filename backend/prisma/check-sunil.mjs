import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkDatabase() {
  console.log('Searching database for Sunil Dhamal...');

  const blocks = await prisma.contentBlock.findMany();

  for (const block of blocks) {
    const data = JSON.stringify(block.content);
    if (data && data.includes('Sunil Dhamal')) {
      console.log(`Found in Block ID: ${block.id}, Type: ${block.blockType}`);
      console.log(JSON.stringify(block.content, null, 2));
    }
  }

  await prisma.$disconnect();
}

checkDatabase().catch(console.error);
