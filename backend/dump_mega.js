const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const item = await prisma.menuItem.findFirst({ where: { label_en: 'Administrative Departments' } });
  console.log(JSON.stringify(item.groups, null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
