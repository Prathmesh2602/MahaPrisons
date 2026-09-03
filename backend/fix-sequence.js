const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const page = await prisma.page.findUnique({
    where: { slug: 'home' },
    include: { blocks: true }
  });

  if (!page) {
    console.log('Home page not found');
    return;
  }

  const expectedSequence = [
    'HERO_CAROUSEL',
    'MINISTER_PROFILES',
    'ABOUT_SECTION',
    'JAIL_INSIGHTS',
    'ANNOUNCEMENTS',
    'HOLIDAY_CALENDAR',
    'PHOTO_GALLERY',
    'QUICK_SERVICES'
  ];

  for (let i = 0; i < expectedSequence.length; i++) {
    const blockType = expectedSequence[i];
    const block = page.blocks.find(b => b.blockType === blockType);
    if (block) {
      await prisma.contentBlock.update({
        where: { id: block.id },
        data: { order: i }
      });
      console.log(`Updated ${blockType} to order ${i}`);
    } else {
      console.log(`Block ${blockType} not found in database!`);
    }
  }

  const updatedPage = await prisma.page.findUnique({
    where: { slug: 'home' },
    include: { blocks: { orderBy: { order: 'asc' } } }
  });
  
  console.log('Final sequence:', updatedPage.blocks.map(b => b.blockType));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
