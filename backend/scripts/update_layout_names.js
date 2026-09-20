const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateLayouts() {
  console.log('Updating old layout types...');
  
  const mapping = {
    'template_a': 'HeroFeaturesTimelineLayout',
    'template_b': 'HeroStatsGrid',
    'template_c': 'HeroThreeColGrid',
    'template_d': 'HeroSplitTimeline'
  };

  for (const [oldType, newType] of Object.entries(mapping)) {
    const result = await prisma.pageNode.updateMany({
      where: { layoutType: oldType },
      data: { layoutType: newType }
    });
    console.log(`Updated ${result.count} pages from ${oldType} to ${newType}`);
  }

  console.log('Done!');
}

updateLayouts()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
