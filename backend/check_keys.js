const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const blocks = await prisma.contentBlock.findMany();
  console.log(blocks.filter(b => b.content).map(b => Object.keys(b.content)));
}

main().finally(() => prisma.$disconnect());
