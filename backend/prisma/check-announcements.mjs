import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkDatabase() {
  console.log('Searching database for announcements_tabs...');

  const blocks = await prisma.contentBlock.findMany({
    where: { blockType: 'announcements_tabs' }
  });

  for (const block of blocks) {
    console.log(`Found in Block ID: ${block.id}`);
    console.log(JSON.stringify(block.content, null, 2));
  }

  await prisma.$disconnect();
}

checkDatabase().catch(console.error);
