import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkAllBlocks() {
  console.log('Checking ALL announcements in production...');

  const blocks = await prisma.contentBlock.findMany();

  for (const block of blocks) {
    let hasLocalhost = false;
    let blockString = JSON.stringify(block.content);
    if (blockString && blockString.includes('localhost')) {
        console.log(`FOUND LOCALHOST IN BLOCK: ${block.id}, TYPE: ${block.blockType}, PAGE ID: ${block.pageNodeId}`);
    }
  }
  
  const pages = await prisma.pageNode.findMany();
  for (const page of pages) {
    if (JSON.stringify(page).includes('localhost')) {
       console.log(`FOUND LOCALHOST IN PAGE: ${page.id}`);
    }
  }

  await prisma.$disconnect();
}

checkAllBlocks().catch(console.error);
