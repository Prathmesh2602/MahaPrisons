import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixAdministrationData() {
  console.log('Fixing prison_administration in production...');

  const blocks = await prisma.contentBlock.findMany({
    where: {
      blockType: 'prison_administration'
    }
  });

  for (const block of blocks) {
    let changed = false;
    const data = block.content;
    
    if (data && data.staff) {
      data.staff.forEach(member => {
        if (member.name?.en === 'Shri. Govind Gawade') {
          member.img = '/uploads/govind_gawade.png';
          changed = true;
        }
        if (member.name?.en === 'Shri. Pravin Khuspe') {
          member.img = '/uploads/pravin_khuspe.png';
          changed = true;
        }
      });
    }

    if (changed) {
      console.log(`Updating block ID: ${block.id}`);
      await prisma.contentBlock.update({
        where: { id: block.id },
        data: { content: data }
      });
    }
  }
  
  console.log('Done!');
  await prisma.$disconnect();
}

fixAdministrationData().catch(console.error);
