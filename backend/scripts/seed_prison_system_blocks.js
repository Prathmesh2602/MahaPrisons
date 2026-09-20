const { PrismaClient } = require('@prisma/client');
const path = require('path');
const url = require('url');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Prison System Page Blocks...');

  // 1. Import mock data
  const mockDataPath = path.resolve(__dirname, '../../web/src/data/yerawadaOpenJailData.js');
  const { yerawadaOpenJailData } = await import(url.pathToFileURL(mockDataPath).href);

  // 2. Ensure PageNode exists for slug 'yerawada-open-jail'
  let pageNode = await prisma.pageNode.findUnique({
    where: { slug: 'yerawada-open-jail' }
  });

  if (!pageNode) {
    pageNode = await prisma.pageNode.create({
      data: {
        slug: 'yerawada-open-jail',
        title: 'Yerawada Open Jail',
        description: 'Information about Yerawada Open Jail',
        layoutType: 'standard'
      }
    });
    console.log('Created PageNode for yerawada-open-jail');
  }

  const blocksToSeed = [
    { type: 'prison_hero', order: 1, content: yerawadaOpenJailData.hero || {} },
    { type: 'prison_overview', order: 2, content: yerawadaOpenJailData.overview || {} },
    { type: 'prison_timeline', order: 3, content: yerawadaOpenJailData.timeline || {} },
    { type: 'prison_administration', order: 4, content: yerawadaOpenJailData.administration || {} },
    { type: 'prison_activities', order: 5, content: yerawadaOpenJailData.activities || {} }
  ];

  // 4. Insert or update the blocks
  for (const blockData of blocksToSeed) {
    const existingBlock = await prisma.contentBlock.findFirst({
      where: {
        pageNodeId: pageNode.id,
        blockType: blockData.type
      }
    });

    if (existingBlock) {
      console.log(`Block ${blockData.type} already exists. Skipping.`);
    } else {
      await prisma.contentBlock.create({
        data: {
          pageNodeId: pageNode.id,
          blockType: blockData.type,
          order: blockData.order,
          content: blockData.content
        }
      });
      console.log(`Created block: ${blockData.type}`);
    }
  }

  console.log('Done!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
