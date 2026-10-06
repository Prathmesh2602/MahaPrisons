import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function insertAnnouncements() {
  let retries = 5;
  while (retries > 0) {
    try {
      const pageNode = await prisma.pageNode.findUnique({
        where: { slug: '/' }
      });

      if (!pageNode) {
        console.error('Homepage not found');
        return;
      }

      const localData = JSON.parse(fs.readFileSync('local_announcements.json', 'utf8'));
      
      const newBlock = await prisma.contentBlock.create({
        data: {
          pageNodeId: pageNode.id,
          blockType: 'announcements_tabs',
          order: 4,
          content: localData.content,
          isActive: true
        }
      });

      console.log('Successfully inserted announcements_tabs block:', newBlock.id);
      break;
    } catch (error) {
      console.error('Error:', error.message);
      retries--;
      console.log(`Retries left: ${retries}`);
      await new Promise(r => setTimeout(r, 2000));
    }
  }
  await prisma.$disconnect();
}

insertAnnouncements();
