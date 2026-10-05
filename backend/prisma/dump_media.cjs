const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const media = await prisma.media.findMany({take: 5});
  console.log(media);
  prisma.$disconnect();
}
run();
