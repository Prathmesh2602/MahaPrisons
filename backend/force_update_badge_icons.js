const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const pages = await prisma.pageNode.findMany({
    include: {
      contentBlocks: {
        where: { blockType: 'page_template_data' }
      }
    }
  });

  let updatedCount = 0;

  for (const page of pages) {
    const block = page.contentBlocks[0];
    if (block && block.content && block.content.sectionHeaders) {
      let needsUpdate = false;
      const headers = block.content.sectionHeaders;

      if (headers.category && headers.category.icon === 'LayoutGrid') {
        headers.category.icon = 'Clock';
        needsUpdate = true;
      }
      if (headers.production && headers.production.icon === 'Wrench') {
        headers.production.icon = 'Zap';
        needsUpdate = true;
      }
      if (headers.general && !headers.general.icon) {
        headers.general.icon = 'Sprout';
        needsUpdate = true;
      }

      if (needsUpdate) {
        await prisma.contentBlock.update({
          where: { id: block.id },
          data: { content: block.content }
        });
        updatedCount++;
      }
    }
  }

  console.log(`Force updated badge icons in ${updatedCount} pages.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
