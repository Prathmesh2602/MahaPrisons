const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateHeader() {
  const page = await prisma.pageNode.findUnique({ where: { slug: 'gallery' } });
  if (page) {
    const block = await prisma.contentBlock.findFirst({ where: { pageNodeId: page.id, blockType: 'page_template_data' } });
    if (block) {
      const content = block.content || {};
      content.header = {
        title: { mr: 'फोटो गॅलरी', en: 'Photo Gallery' },
        desc: {
          mr: 'महाराष्ट्र कारागृह विभागातील विविध उपक्रम, कार्यशाळा, आणि सुविधांची झलक. चित्रे मोठी करून पाहण्यासाठी आणि अधिक माहिती वाचण्यासाठी क्लिक करा.',
          en: 'A glimpse of various activities, workshops, and facilities at Maharashtra Prison Department. Click on any image to expand it and read more details.'
        }
      };
      await prisma.contentBlock.update({ where: { id: block.id }, data: { content } });
      console.log('Header data loaded into database.');
    }
  }
}
updateHeader().finally(() => prisma.$disconnect());
