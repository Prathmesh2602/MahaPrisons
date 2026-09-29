const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  await prisma.menuItem.updateMany({
    where: { label_en: 'Contact Us' },
    data: { href: '/contact' }
  });
  console.log('Updated Contact Us href');
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
