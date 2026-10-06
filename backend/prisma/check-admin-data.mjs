import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkAdministrationData() {
  console.log('Checking prison_administration in production...');

  const blocks = await prisma.contentBlock.findMany({
    where: {
      blockType: 'prison_administration'
    }
  });

  for (const block of blocks) {
    console.log(`Block ID: ${block.id}`);
    const data = block.content;
    if (data && data.staff) {
      data.staff.forEach(member => {
        console.log(`Staff: ${member.name?.en}, Image: ${member.img}`);
      });
    }
  }

  await prisma.$disconnect();
}

checkAdministrationData().catch(console.error);
