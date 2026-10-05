const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const items = await prisma.menuItem.findMany({
    where: { label_en: 'Home' }
  });
  console.log(items);
}

main().finally(() => prisma.$disconnect());
