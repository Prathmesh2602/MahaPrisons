import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixLocalhostInAnnouncements() {
  console.log('Fixing localhost in announcements in production...');

  const blocks = await prisma.contentBlock.findMany({
    where: {
      pageNode: { slug: '/' },
      blockType: 'announcements_tabs'
    }
  });

  for (const block of blocks) {
    if (Array.isArray(block.content)) {
      const newContent = block.content.map(tab => {
        if (Array.isArray(tab.items)) {
          const newItems = tab.items.map(item => {
            let href = item.href || item.url || '';
            href = href.replace(/http:\/\/localhost:5000/g, '');
            return {
              ...item,
              href
            };
          });
          return { ...tab, items: newItems };
        }
        return tab;
      });

      await prisma.contentBlock.update({
        where: { id: block.id },
        data: { content: newContent }
      });
      console.log(`Updated block ${block.id} to remove localhost from href.`);
    }
  }

  await prisma.$disconnect();
}

fixLocalhostInAnnouncements().catch(console.error);
