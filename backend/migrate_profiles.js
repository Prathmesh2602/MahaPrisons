const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const block = await prisma.contentBlock.findFirst({
    where: { blockType: 'MINISTER_PROFILES' }
  });

  if (block) {
    let data = block.data;
    if (typeof data === 'string') data = JSON.parse(data);

    if (data.profiles && Array.isArray(data.profiles)) {
      data.ministers = data.profiles.slice(0, 4);
      data.seniorOfficers = data.profiles.slice(4);
      delete data.profiles; // Remove the old field

      await prisma.contentBlock.update({
        where: { id: block.id },
        data: { data: data }
      });
      console.log('Successfully migrated MINISTER_PROFILES block data.');
    } else {
      console.log('No profiles array found to migrate.');
    }
  } else {
    console.log('MINISTER_PROFILES block not found.');
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
