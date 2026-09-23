const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const blocks = await prisma.contentBlock.findMany();
  let updatedCount = 0;

  for (const block of blocks) {
    if (block.content && block.content.labels) {
      const newContent = { ...block.content };
      const labels = newContent.labels;
      
      if (!newContent.sectionHeaders) {
        newContent.sectionHeaders = {};
      }

      // Migrate each label to sectionHeaders.[key].title
      for (const [key, val] of Object.entries(labels)) {
        if (!newContent.sectionHeaders[key]) {
          newContent.sectionHeaders[key] = {};
        }
        if (!newContent.sectionHeaders[key].title) {
           // check if val is a string or object. The old schema used phonetic objects
           if (typeof val === 'object' && (val.mr || val.en)) {
             newContent.sectionHeaders[key].title = { mr: val.mr || '', en: val.en || '' };
           } else if (typeof val === 'string') {
             newContent.sectionHeaders[key].title = { mr: val, en: val };
           }
        }
      }

      // Optional: remove labels if we don't need it anymore
      // delete newContent.labels;

      await prisma.contentBlock.update({
        where: { id: block.id },
        data: { content: newContent }
      });
      updatedCount++;
    }
  }

  console.log(`Successfully migrated labels to sectionHeaders for ${updatedCount} blocks.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
