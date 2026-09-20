const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const pages = await prisma.page.findMany();
  console.log(pages.map(p => p.slug));
}

main().finally(() => prisma.$disconnect());
