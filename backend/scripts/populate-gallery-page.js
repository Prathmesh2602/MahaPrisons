const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

async function main() {
  console.log('Populating Gallery Page and adding to Menu...');

  // 1. Read gallery data file
  const filePath = path.join(__dirname, '../../web/src/data/galleryData.js');
  let content = fs.readFileSync(filePath, 'utf-8');
  content = content.replace(/export const /g, 'global.');
  eval(content);
  const galleryItems = global.galleryItems;

  // 2. Get the super admin user
  let adminUser = await prisma.user.findFirst({
    where: { role: 'SUPER_ADMIN' }
  });
  if (!adminUser) {
    adminUser = await prisma.user.findFirst();
  }
  if (!adminUser) {
    console.error('No admin user found. Please run seed-admin.js first.');
    return;
  }

  // 3. Handle Menu Item (Second Last)
  let topMenuItems = await prisma.menuItem.findMany({
    where: { parentId: null },
    orderBy: { order: 'asc' }
  });

  const existingGalleryMenu = topMenuItems.find(m => m.href === '/gallery');
  let galleryMenuId = existingGalleryMenu ? existingGalleryMenu.id : null;

  if (!existingGalleryMenu) {
    // Determine second last position
    const lastItem = topMenuItems[topMenuItems.length - 1]; // "Contact"
    const targetOrder = lastItem ? lastItem.order : 10;

    // Shift the last item's order down
    if (lastItem) {
      await prisma.menuItem.update({
        where: { id: lastItem.id },
        data: { order: targetOrder + 1 }
      });
    }

    const newMenuItem = await prisma.menuItem.create({
      data: {
        labelMr: 'फोटो गॅलरी',
        labelEn: 'Photo Gallery',
        href: '/gallery',
        icon: 'Image',
        order: targetOrder,
        isMegaGroup: false,
        visible: true
      }
    });
    galleryMenuId = newMenuItem.id;
    console.log('Menu Item created successfully!');
  } else {
    console.log('Menu Item already exists.');
  }

  // 4. Create or Update Page
  let page = await prisma.page.findFirst({
    where: { slug: 'gallery' }
  });

  if (!page) {
    page = await prisma.page.create({
      data: {
        slug: 'gallery',
        titleEn: 'Photo Gallery',
        titleMr: 'फोटो गॅलरी',
        templateKey: 'BLANK_PAGE', // Using standard template
        status: 'PUBLISHED',
        isPrimary: false,
        createdBy: adminUser.id,
        updatedBy: adminUser.id,
        menuItemId: galleryMenuId
      }
    });
    console.log('Gallery Page created successfully!');
  } else {
    // Update existing page to ensure it points to the menu
    await prisma.page.update({
      where: { id: page.id },
      data: { menuItemId: galleryMenuId }
    });
    console.log('Gallery Page already exists. Updated link.');
  }

  // 5. Update Menu Item to point to the page
  await prisma.menuItem.update({
    where: { id: galleryMenuId },
    data: { pageId: page.id }
  });

  // 6. Set Content Block
  await prisma.contentBlock.deleteMany({
    where: { pageId: page.id }
  });

  await prisma.contentBlock.create({
    data: {
      pageId: page.id,
      blockType: 'FULL_GALLERY',
      order: 1,
      data: {
        title: { en: "Photo Gallery", mr: "फोटो गॅलरी" },
        subtitle: {
          en: "A glimpse of various activities, workshops, and facilities at Maharashtra Prison Department. Click on any image to expand it and read more details.",
          mr: "महाराष्ट्र कारागृह विभागातील विविध उपक्रम, कार्यशाळा, आणि सुविधांची झलक. चित्रे मोठी करून पाहण्यासाठी आणि अधिक माहिती वाचण्यासाठी क्लिक करा."
        },
        items: galleryItems
      }
    }
  });

  console.log('Gallery blocks populated successfully!');
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
