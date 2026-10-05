const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const blocks = await prisma.contentBlock.findMany();
  for (let i = 0; i < 5; i++) {
    console.log(JSON.stringify(blocks[i].content).substring(0, 300));
  }
  prisma.$disconnect();
}
check();
