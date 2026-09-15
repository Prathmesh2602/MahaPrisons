const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const homeItem = await prisma.menuItem.findFirst({
    where: { href: '/' }
  });

  if (homeItem) {
    // Delete existing children of Home
    await prisma.menuItem.deleteMany({
      where: { parentId: homeItem.id }
    });

    const childrenToCreate = [
      { label_en: 'Hero Section', label_mr: 'मुख्य विभाग', href: '/#hero', order: 0 },
      { label_en: 'Minister Profiles', label_mr: 'मंत्र्यांचे प्रोफाइल', href: '/#ministers', order: 1 },
      { label_en: 'About Us', label_mr: 'आमच्याबद्दल', href: '/#about', order: 2 },
      { label_en: 'Jail Insights', label_mr: 'कारागृह माहिती', href: '/#insights', order: 3 },
      { label_en: 'Announcements', label_mr: 'घोषणा', href: '/#announcements', order: 4 },
      { label_en: 'Holiday Calendar', label_mr: 'सुट्टीचे कॅलेंडर', href: '/#calendar', order: 5 },
      { label_en: 'Photo Gallery', label_mr: 'फोटो गॅलरी', href: '/#gallery', order: 6 },
      { label_en: 'Quick Services', label_mr: 'जलद सेवा', href: '/#services', order: 7 },
    ];

    for (const child of childrenToCreate) {
      await prisma.menuItem.create({
        data: {
          ...child,
          parentId: homeItem.id,
          menuId: homeItem.menuId
        }
      });
    }
    console.log('Successfully inserted home menu children!');
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
