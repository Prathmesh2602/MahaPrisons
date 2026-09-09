const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const page = await prisma.page.findUnique({
    where: { slug: 'home' },
    include: { blocks: { orderBy: { order: 'asc' } } }
  });

  if (!page) {
    console.log('Home page not found');
    return;
  }

  console.log('Current blocks:', page.blocks.map(b => b.blockType));

  const hasMinisterProfiles = page.blocks.some(b => b.blockType === 'MINISTER_PROFILES');
  if (!hasMinisterProfiles) {
    // Insert after HERO_CAROUSEL
    let heroIndex = page.blocks.findIndex(b => b.blockType === 'HERO_CAROUSEL');
    if (heroIndex === -1) heroIndex = 0; // fallback

    // Shift orders up
    for (let i = heroIndex + 1; i < page.blocks.length; i++) {
      await prisma.contentBlock.update({
        where: { id: page.blocks[i].id },
        data: { order: page.blocks[i].order + 1 }
      });
    }

    // Insert new block
    await prisma.contentBlock.create({
      data: {
        pageId: page.id,
        blockType: 'MINISTER_PROFILES',
        order: heroIndex + 1,
        data: {} // Use empty data to fallback to mock data initially
      }
    });
    console.log('Added MINISTER_PROFILES block!');
  } else {
    console.log('MINISTER_PROFILES already exists.');
  }

  const updatedPage = await prisma.page.findUnique({
    where: { slug: 'home' },
    include: { blocks: { orderBy: { order: 'asc' } } }
  });
  console.log('Updated blocks:', updatedPage.blocks.map(b => b.blockType));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
