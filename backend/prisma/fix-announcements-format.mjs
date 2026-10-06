import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixAnnouncementsFormat() {
  console.log('Fixing announcements format in production...');

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
            return {
              date: item.date,
              isNew: item.isNew || false,
              href: item.href || item.url || '',
              text: item.text || item.title || { en: '', mr: '' }
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
      console.log(`Updated block ${block.id} to use href and text instead of url and title.`);
    }
  }

  await prisma.$disconnect();
}

fixAnnouncementsFormat().catch(console.error);
