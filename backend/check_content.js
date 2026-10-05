const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.contentBlock.findFirst({ where: { blockType: 'about_section' } }).then(b => { 
  console.log(JSON.stringify(b, null, 2)); 
  p.$disconnect(); 
});
