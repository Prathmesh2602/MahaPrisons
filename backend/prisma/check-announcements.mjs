import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkAnnouncements() {
  console.log('Checking announcements in production...');

  const blocks = await prisma.contentBlock.findMany({
    where: {
      pageNode: { slug: '/' },
      blockType: 'announcements_tabs'
    }
  });

  for (const block of blocks) {
    console.log(`Block ID: ${block.id}`);
    if (Array.isArray(block.content)) {
      block.content.forEach(tab => {
        if (Array.isArray(tab.items)) {
          tab.items.forEach(item => {
            console.log(`Item href: ${item.href}`);
            console.log(`Item url: ${item.url}`);
          });
        }
      });
    }
  }

  await prisma.$disconnect();
}

checkAnnouncements().catch(console.error);
