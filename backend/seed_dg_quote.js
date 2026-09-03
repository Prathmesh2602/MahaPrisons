const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const homePage = await prisma.page.findUnique({ where: { slug: 'home' } });
  if (!homePage) {
    console.log("Home page not found");
    return;
  }
  
  const heroBlock = await prisma.contentBlock.findFirst({
    where: { pageId: homePage.id, blockType: 'HERO_CAROUSEL' }
  });
  
  if (heroBlock) {
    let dataField = heroBlock.data;
    if (typeof dataField === 'string') dataField = JSON.parse(dataField);
    
    dataField = {
      ...dataField,
      dgName: {
        en: "Shri. Suhas Warke",
        mr: "श्री. सुहास वारके"
      },
      dgDesignation: {
        en: "ADG & Director General",
        mr: "अपर पोलीस महासंचालक व महानिरीक्षक"
      },
      dgQuote: {
        mr: "सुरक्षितता, सुधारणा आणि पुनर्वसन ही आमची मुख्य सूत्रे आहेत. आम्ही बंदीवानांना कौशल्यपूर्ण प्रशिक्षण देऊन समाजाचा एक उपयुक्त घटक बनविण्यासाठी कटिबद्ध आहोत.",
        en: "Security, correction, and rehabilitation are our guiding pillars. We are committed to equipping inmates with skills to make them productive members of society."
      },
      dgPhoto: "https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2026/06/202606051649346751.jpeg",
      dgLink: "https://mahaprisons.gov.in/directors-message/"
    };
    
    await prisma.contentBlock.update({
      where: { id: heroBlock.id },
      data: { data: dataField }
    });
    console.log("Seeded DG Quote into HERO_CAROUSEL block successfully.");
  } else {
    console.log("HERO_CAROUSEL block not found");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
