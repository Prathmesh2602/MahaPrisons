const { PrismaClient } = require('@prisma/client');
const path = require('path');
const url = require('url');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Home Page Blocks...');

  // 1. Import mock data
  const mockDataPath = path.resolve(__dirname, '../../web/src/data/mockData.js');
  const { mockHomepageData, mockHolidays2026 } = await import(url.pathToFileURL(mockDataPath).href);

  // 2. Ensure PageNode exists for slug '/'
  let pageNode = await prisma.pageNode.findUnique({
    where: { slug: '/' }
  });

  if (!pageNode) {
    pageNode = await prisma.pageNode.create({
      data: {
        slug: '/',
        title: 'Homepage',
        description: 'The main landing page for MahaPrisons',
        layoutType: 'homepage'
      }
    });
    console.log('Created PageNode for /');
  }

  // 3. Prepare default blocks
  const blocksToSeed = [
    { type: 'minister_profiles', order: 1, content: mockHomepageData.minister_profiles || [] },
    { type: 'about_section', order: 2, content: { title_en: 'About Us', title_mr: 'आमच्याबद्दल', desc_en: 'We aim to rehabilitate...', desc_mr: 'आम्ही पुनर्वसनाचा प्रयत्न करतो...', btn_en: 'Read More', btn_mr: 'अधिक वाचा', link: '#' } },
    { type: 'jail_insights', order: 3, content: { title_en: 'Prison Insights', title_mr: 'कारागृह माहिती', stats: [{ label_en: 'Jails', label_mr: 'कारागृहे', value: '60' }] } },
    { type: 'announcements_tabs', order: 4, content: mockHomepageData.announcements_tabs || [] },
    { type: 'holiday_calendar', order: 5, content: mockHolidays2026 || [] },
    { type: 'photo_gallery', order: 6, content: mockHomepageData.gallery || {} },
    { type: 'quick_services', order: 7, content: { important_links: mockHomepageData.important_links || [], pdf_downloads: mockHomepageData.all_pdf_downloads || [] } }
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
