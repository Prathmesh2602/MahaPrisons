const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Fetching user...');
  const user = await prisma.user.findFirst();
  if (!user) {
    console.log('No user found to set as creator');
    return;
  }

  // Ensure BLANK_PAGE template exists just in case
  const templateExists = await prisma.template.findUnique({ where: { key: 'BLANK_PAGE' } });
  if (!templateExists) {
    await prisma.template.create({
      data: {
        key: 'BLANK_PAGE',
        name: 'Blank Page',
        allowedBlockTypes: ['HERO', 'TEXT', 'GALLERY', 'FAQ']
      }
    });
  }

  const items = await prisma.menuItem.findMany({
    where: { 
      isMegaGroup: false,
      pageId: null
    }
  });

  console.log(`Found ${items.length} menu items without pages.`);

  for (const item of items) {
    let slug = item.href === '/' ? 'home' : (item.href || '').replace(/^\//, '');
    if (!slug || slug === '#') slug = `page-${item.id}`;
      
    // Check if slug exists
    let slugExists = await prisma.page.findUnique({ where: { slug } });
    if (slugExists) {
      slug = `${slug}-${Math.floor(Math.random() * 10000)}`;
    }

    const page = await prisma.page.create({
      data: {
        slug: slug,
        menuItemId: item.id,
        templateKey: 'BLANK_PAGE',
        titleEn: item.labelEn,
        titleMr: item.labelMr,
        createdBy: user.id,
        updatedBy: user.id,
        status: 'DRAFT',
      }
    });

    await prisma.menuItem.update({
      where: { id: item.id },
      data: { pageId: page.id }
    });
    console.log(`Created page for: ${item.labelEn}`);
  }
  
  console.log('All missing pages have been successfully linked!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
