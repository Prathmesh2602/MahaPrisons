import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkAnnouncements() {
  console.log('Checking announcements in production...');

  const blocks = await prisma.contentBlock.findMany({
    where: {
      blockType: 'announcements_tabs'
    }
  });

  for (const block of blocks) {
    console.log(`Block ID: ${block.id}`);
    if (Array.isArray(block.content)) {
      block.content.forEach(tab => {
        if (Array.isArray(tab.items)) {
          tab.items.forEach(item => {
            if (item.href && item.href.includes('localhost')) {
              console.log(`FOUND LOCALHOST! Block ID: ${block.id}, href: ${item.href}`);
            }
          });
        }
      });
    }
  }

  await prisma.$disconnect();
}

checkAnnouncements().catch(console.error);
