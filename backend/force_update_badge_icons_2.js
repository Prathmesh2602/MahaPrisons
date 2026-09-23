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
    if (block && block.content) {
      let needsUpdate = false;
      if (!block.content.sectionHeaders) block.content.sectionHeaders = {};
      const headers = block.content.sectionHeaders;

      if (page.layoutType === 'HeroWithProcessGrid' && !headers.partnership) {
        headers.partnership = {
          title: { mr: "औद्योगिक भागीदारी", en: "Industrial Partnership" },
          icon: 'Factory'
        };
        needsUpdate = true;
      }
      if (page.layoutType === 'HeroWithPricingList' && !headers.training) {
        headers.training = {
          title: { mr: "व्यावसायिक प्रशिक्षण", en: "Vocational Training" },
          icon: 'Scissors'
        };
        needsUpdate = true;
      }
      if (page.layoutType === 'ContentWithRightSidebar' && !headers.organization) {
        headers.organization = {
          title: { mr: "डीएलएसए", en: "DLSA" },
          icon: 'Scale'
        };
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

  console.log(`Force updated badge data in ${updatedCount} pages.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
