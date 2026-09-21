const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

async function main() {
  console.log('Seeding remaining 17 template pages...');

  const pages = JSON.parse(fs.readFileSync('backend/scripts/extracted_pages.json', 'utf8'));

  for (const page of pages) {
    const { slug, layoutType, data } = page;
    const fullSlug = '/' + slug;

    // Check if PageNode already exists
    let pageNode = await prisma.pageNode.findUnique({
      where: { slug: fullSlug }
    });

    if (!pageNode) {
      pageNode = await prisma.pageNode.create({
        data: {
          slug: fullSlug,
          title: data.title ? data.title.en : slug,
          description: data.description ? data.description.en : 'Dynamic Page',
          layoutType: layoutType,
          isActive: true
        }
      });
      console.log(`Created PageNode: ${fullSlug}`);
    } else {
      console.log(`PageNode already exists: ${fullSlug}`);
      // Update layout type in case it's wrong
      await prisma.pageNode.update({
        where: { id: pageNode.id },
        data: { layoutType: layoutType }
      });
    }

    // Check if ContentBlock exists
    const existingBlock = await prisma.contentBlock.findFirst({
      where: {
        pageNodeId: pageNode.id,
        blockType: 'page_template_data'
      }
    });

    if (!existingBlock) {
      await prisma.contentBlock.create({
        data: {
          pageNodeId: pageNode.id,
          blockType: 'page_template_data',
          order: 0,
          content: data,
          isActive: true
        }
      });
      console.log(`Created ContentBlock for: ${fullSlug}`);
    } else {
      console.log(`ContentBlock already exists for: ${fullSlug}`);
      // Update data just in case
      await prisma.contentBlock.update({
        where: { id: existingBlock.id },
        data: { content: data }
      });
    }
  }

  console.log('Seeding 17 pages complete.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
