const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.contentBlock.deleteMany({ where: { blockType: 'photo_gallery' } })
  .then(() => console.log('Deleted photo_gallery'))
  .catch(console.error)
  .finally(() => p.$disconnect());
