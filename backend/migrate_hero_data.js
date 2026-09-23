const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Starting migration of hero data...');

  // Only target dynamic template data blocks
  const blocks = await prisma.contentBlock.findMany({
    where: {
      blockType: 'page_template_data',
    },
  });

  console.log(`Found ${blocks.length} template data blocks.`);
  let updatedCount = 0;

  for (const block of blocks) {
    const data = block.content;

    if (data && typeof data === 'object') {
      let needsUpdate = false;

      // If there's already a hero object, we might not need to do anything,
      // but let's check if there are root fields that need to be migrated.
      if (!data.hero) {
        data.hero = {};
      }

      if (data.title && !data.hero.title) {
        data.hero.title = data.title;
        delete data.title;
        needsUpdate = true;
      }
      
      if (data.subtitle && !data.hero.subtitle) {
        data.hero.subtitle = data.subtitle;
        delete data.subtitle;
        needsUpdate = true;
      }
      
      if (data.description && !data.hero.description) {
        data.hero.description = data.description;
        delete data.description;
        needsUpdate = true;
      }
      
      if (data.heroImage && !data.hero.heroImage) {
        data.hero.heroImage = data.heroImage;
        delete data.heroImage;
        needsUpdate = true;
      }

      if (needsUpdate) {
        await prisma.contentBlock.update({
          where: { id: block.id },
          data: { content: data },
        });
        console.log(`Migrated block ID: ${block.id}`);
        updatedCount++;
      }
    }
  }

  console.log(`Migration complete. Updated ${updatedCount} blocks.`);
}

main()
  .catch((e) => {
    console.error('Error during migration:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
