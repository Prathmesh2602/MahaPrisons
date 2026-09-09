const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function test() {
  try {
    const u = await prisma.user.create({
      data: {
        email: 'admin@mahaprisons.gov.in',
        name: 'Super Admin',
        role: 'SUPER_ADMIN',
        passwordHash: await bcrypt.hash('admin123', 10)
      }
    });
    console.log('success', u);
  } catch(e) {
    console.error('ERROR', e);
  } finally {
    prisma.$disconnect();
  }
}
test();
