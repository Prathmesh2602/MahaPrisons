const { PrismaClient } = require('@prisma/client');
const path = require('path');
const url = require('url');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Home Page Blocks...');

  // 1. Import mock data
  const mockDataPath = path.resolve(__dirname, '../../web/src/data/mockData.js');
  const { mockHomepageData, mockHolidays2026 } = await import(url.pathToFileURL(mockDataPath).href);

  // 2. Ensure PageNode exists for slug '/'
  let pageNode = await prisma.pageNode.findUnique({
    where: { slug: '/' }
  });

  if (!pageNode) {
    pageNode = await prisma.pageNode.create({
      data: {
        slug: '/',
        title: 'Homepage',
        description: 'The main landing page for MahaPrisons',
        layoutType: 'homepage'
      }
    });
    console.log('Created PageNode for /');
  }

  // 3. Prepare default blocks
  // Since we don't have About/Jail Insights in mockData explicitly mapped to objects, 
  // I will create simple skeleton data for them so the editor can override it.

  const { galleryItems } = await import(url.pathToFileURL(path.resolve(__dirname, '../../web/src/data/galleryData.js')).href);

  const blocksToSeed = [
    { type: 'minister_profiles', order: 1, content: mockHomepageData.minister_profiles || [] },
    { type: 'about_section', order: 2, content: { 
      aboutText: {
        mr: "येरवडा खुले कारागृह हे पुण्याच्या ऐतिहासिक येरवडा मध्यवर्ती कारागृहाच्या विस्तीर्ण ५१२ एकर परिसरात वसलेले एक विशेष पुनर्वसन आणि सुधार केंद्र आहे.",
        en: "The Yerwada Open Jail is a specialized rehabilitation facility located in the expansive campus of the historic Yerwada Central Jail in Pune."
      },
      welcomeTitle: {
        mr: "येरवडा खुले जिल्हा कारागृह मध्ये आपले स्वागत आहे",
        en: "Welcome to Yerwada Open District Prison"
      },
      openJailOfficers: [
        { name: { mr: "श्री. शामकांत शालन चंद्रकांत शेडगे", en: "Shri. Shamkant Shedge" }, desg: { mr: "अधीक्षक, येरवडा खुले जिल्हा कारागृह, वर्ग-१", en: "Superintendent" }, img: "http://localhost:5000/uploads/Shamkant_shedge.png" },
        { name: { mr: "श्री. नागेश एम. कांबळे", en: "Shri. Nagesh M. Kamble" }, desg: { mr: "वरिष्ठ तुरुंग अधिकारी श्रेणी १", en: "Senior Prison Officer" }, img: "http://localhost:5000/uploads/Nagesh_Kamble.png" },
        { name: { mr: "श्रीमती निशा डी. श्रेयेकर", en: "Smt. Nisha D. Shreyekar" }, desg: { mr: "तुरुंग अधिकारी श्रेणी २", en: "Prison Officer Class 2" }, img: "http://localhost:5000/uploads/nisha_shreyekar.png" }
      ]
    }},
    { type: 'jail_insights', order: 3, content: { 
      youtubeUrl: "https://www.youtube.com/@CShamkant",
      cards: [
        { title: { mr: "सुधारणा आणि पुनर्वसन", en: "Reform and Rehabilitation" }, desc: { mr: "कैद्यांच्या सर्वांगीण विकासासाठी आणि त्यांना समाजाच्या मुख्य प्रवाहात आणण्यासाठी विशेष प्रयत्न.", en: "Special efforts for overall development of inmates." } },
        { title: { mr: "शेती आणि वृक्षारोपण", en: "Agriculture and Plantation" }, desc: { mr: "मोकळ्या जागेचा वापर करून शेती आणि पर्यावरण संवर्धनासाठी मोठ्या प्रमाणावर वृक्षारोपण.", en: "Farming in open spaces and large-scale plantation." } },
        { title: { mr: "कौशल्य विकास कार्यक्रम", en: "Skill Development" }, desc: { mr: "वेल्डिंग, सुतारकाम आणि अन्न प्रक्रिया यांसारख्या व्यावसायिक प्रशिक्षणातून स्वावलंबन.", en: "Self-reliance through vocational training." } },
        { title: { mr: "शृंखला उपहारगृह", en: "Chain Canteen" }, desc: { mr: "कैद्यांमार्फत चालवले जाणारे हॉटेल, जिथे त्यांना रोजगार आणि कौशल्य विकासाची संधी मिळते.", en: "Hotel run by inmates providing employment opportunities." } }
      ]
    }},
    { type: 'announcements_tabs', order: 4, content: mockHomepageData.announcements_tabs || [] },
    { type: 'holiday_calendar', order: 5, content: mockHolidays2026 || [] },
    { type: 'photo_gallery', order: 6, content: { items: galleryItems, view_all_href: mockHomepageData.gallery?.view_all_href || "http://preview.s3waas.gov.in/photo-gallery/" } },
    { type: 'quick_services', order: 7, content: { important_links: mockHomepageData.important_links || [], pdf_downloads: mockHomepageData.all_pdf_downloads || [] } }
  ];

  // 4. Insert or update the blocks
  for (const blockData of blocksToSeed) {
    const existingBlock = await prisma.contentBlock.findFirst({
      where: {
        pageNodeId: pageNode.id,
        blockType: blockData.type
      }
    });

    if (existingBlock) {
      console.log(`Block ${blockData.type} already exists. Skipping.`);
    } else {
      await prisma.contentBlock.create({
        data: {
          pageNodeId: pageNode.id,
          blockType: blockData.type,
          order: blockData.order,
          content: blockData.content
        }
      });
      console.log(`Created block: ${blockData.type}`);
    }
  }

  console.log('Done!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
