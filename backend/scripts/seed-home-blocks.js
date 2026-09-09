const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding initial blocks for the Home Page...');

  const homePage = await prisma.page.findFirst({
    where: { slug: 'home' }
  });

  if (!homePage) {
    console.error('Home page not found!');
    return;
  }

  // Delete existing blocks to prevent duplicates
  await prisma.contentBlock.deleteMany({
    where: { pageId: homePage.id }
  });

  const initialBlocks = [
    { blockType: 'HERO_CAROUSEL', order: 0, data: {} },
    { blockType: 'ABOUT_SECTION', order: 1, data: {} },
    { blockType: 'JAIL_INSIGHTS', order: 2, data: {} },
    { blockType: 'ANNOUNCEMENTS', order: 3, data: {} },
    { blockType: 'CALENDAR', order: 4, data: {} },
    { blockType: 'GALLERY', order: 5, data: {} },
    { blockType: 'QUICK_SERVICES', order: 6, data: {} },
  ];

  await prisma.contentBlock.createMany({
    data: initialBlocks.map(b => ({
      pageId: homePage.id,
      blockType: b.blockType,
      order: b.order,
      data: b.data
    }))
  });

  console.log('Home Page blocks seeded successfully.');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
