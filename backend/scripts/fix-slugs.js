const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Find the 'home' page
  const oldHome = await prisma.page.findUnique({
    where: { slug: 'home' }
  });

  // Find the 'home-1788511440700' page
  const activeHome = await prisma.page.findFirst({
    where: { 
      menuItem: {
        href: '/'
      }
    }
  });

  if (oldHome && activeHome && oldHome.id !== activeHome.id) {
    console.log('Deleting old home page...');
    // Delete blocks first
    await prisma.contentBlock.deleteMany({ where: { pageId: oldHome.id } });
    await prisma.page.delete({ where: { id: oldHome.id } });
    
    console.log('Renaming active home page to "home"...');
    await prisma.page.update({
      where: { id: activeHome.id },
      data: { slug: 'home' }
    });
    console.log('Done!');
  } else {
    console.log('Pages already in correct state or missing.');
  }
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
