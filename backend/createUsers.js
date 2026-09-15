const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const salt = await bcrypt.genSalt(10);
  
  const users = [
    {
      email: 'admin@mahaprisons.gov.in',
      password: 'admin',
      name: 'Super Admin',
      role: 'SUPER_ADMIN'
    },
    {
      email: 'checker@mahaprisons.gov.in',
      password: 'admin', // the user asked for checker login, maybe just standard password
      name: 'Checker Admin',
      role: 'CHECKER'
    },
    {
      email: 'maker@mahaprisons.gov.in',
      password: 'admin',
      name: 'Content Maker',
      role: 'MAKER'
    }
  ];

  for (const u of users) {
    const hashedPassword = await bcrypt.hash(u.password, salt);
    await prisma.user.upsert({
      where: { email: u.email },
      update: { password: hashedPassword, role: u.role, name: u.name },
      create: { email: u.email, password: hashedPassword, role: u.role, name: u.name }
    });
    console.log(`Upserted user: ${u.email}`);
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
