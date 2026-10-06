import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function fixEmptyAnnouncements() {
  console.log('Finding empty announcements_tabs blocks on the homepage...');

  const blocks = await prisma.contentBlock.findMany({
    where: {
      pageNode: { slug: '/' },
      blockType: 'announcements_tabs'
    }
  });

  let deleted = 0;
  for (const block of blocks) {
    // Check if it's empty
    if (!block.content || !block.content.tabs || block.content.tabs.length === 0) {
      console.log(`Found empty announcements_tabs block. ID: ${block.id}, Order: ${block.order}`);
      await prisma.contentBlock.delete({
        where: { id: block.id }
      });
      console.log(`Deleted block ${block.id}`);
      deleted++;
    } else {
      console.log(`Found valid announcements_tabs block with data. ID: ${block.id}, Order: ${block.order}`);
    }
  }

  console.log(`Deleted ${deleted} empty blocks.`);
  
  await prisma.$disconnect();
}

fixEmptyAnnouncements().catch(console.error);
