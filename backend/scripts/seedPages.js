const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const hero_carousel = [
  {
    img_src: "http://localhost:5000/uploads/rehab_hero.png",
    img_alt: "येरवडा खुले कारागृह",
    category: { mr: "पुनर्वसन", en: "Rehabilitation" },
    title: { mr: "येरवडा खुले कारागृह", en: "Yerawada Open Prison" },
    statement: { mr: "श्रमातून परिवर्तनाची वाट.", en: "Path of transformation through labor." },
    description: { mr: "शिस्त, कौशल्य, श्रम आणि स्वावलंबनाच्या माध्यमातून पुनर्वसनाची नवी दिशा.", en: "A new direction in rehabilitation through discipline, skills, labor, and self-reliance." },
    cta1: { mr: "आमचा प्रवास", en: "Our Journey", href: "#" },
    cta2: { mr: "उपक्रम पहा", en: "View Initiatives", href: "#" }
  },
  {
    img_src: "http://localhost:5000/uploads/farming_hero.png",
    img_alt: "शेती उपक्रम",
    category: { mr: "शेती", en: "Agriculture" },
    title: { mr: "मातीशी नातं", en: "Bond with Soil" },
    statement: { mr: "स्वावलंबनाकडे वाटचाल.", en: "Stepping towards self-reliance." },
    description: { mr: "शेती आणि पूरक उपक्रमांच्या माध्यमातून कौशल्य आणि जबाबदारीची जडणघडण.", en: "Building skills and responsibility through farming and allied activities." },
    cta1: { mr: "शेती उपक्रम", en: "Farming Activities", href: "#" },
    cta2: null
  },
  {
    img_src: "http://localhost:5000/uploads/skills_hero.png",
    img_alt: "कौशल्य विकास केंद्र",
    category: { mr: "कौशल्य विकास", en: "Skill Development" },
    title: { mr: "कौशल्यातून आत्मनिर्भरतेकडे", en: "Self-reliance through Skills" },
    statement: { mr: "नव्या संधींची तयारी.", en: "Preparing for new opportunities." },
    description: { mr: "व्यावसायिक प्रशिक्षण आणि उत्पादनाच्या माध्यमातून नव्या संधींची तयारी.", en: "Empowerment through vocational training and productive activities." },
    cta1: { mr: "प्रशिक्षण पहा", en: "View Training", href: "#" },
    cta2: null
  },
  {
    img_src: "http://localhost:5000/uploads/industry_hero.png",
    img_alt: "उद्योग विभाग",
    category: { mr: "उत्पादन व उद्योग", en: "Production & Industry" },
    title: { mr: "श्रमाला संधी, भविष्याला दिशा.", en: "Opportunity for Labor, Direction for Future." },
    statement: { mr: "शिस्त आणि आत्मविश्वासाचा विकास.", en: "Developing discipline and confidence." },
    description: { mr: "उत्पादक कामातून कौशल्य, शिस्त आणि आत्मविश्वासाचा विकास.", en: "Fostering skill, discipline, and self-belief through productive work." },
    cta1: { mr: "उद्योग उपक्रम", en: "Industrial Activities", href: "#" },
    cta2: null
  },
  {
    img_src: "http://localhost:5000/uploads/reintegration_hero.png",
    img_alt: "पुनर्वसन उपक्रम",
    category: { mr: "पुनर्वसन", en: "Reintegration" },
    title: { mr: "नव्या आयुष्याची तयारी", en: "Preparing for a New Life" },
    statement: { mr: "समाजात पुनर्स्थापना.", en: "Reintegration into society." },
    description: { mr: "जबाबदारी आणि स्वावलंबनाच्या माध्यमातून समाजात पुनर्स्थापनेची तयारी.", en: "Getting ready for reintegration into society through responsibility and self-sufficiency." },
    cta1: { mr: "आमची उत्पादने", en: "Our Products", href: "#" },
    cta2: null
  }
];

async function main() {
  console.log('Seeding Pages...');

  let homePage = await prisma.pageNode.findUnique({
    where: { slug: '/' }
  });

  if (!homePage) {
    homePage = await prisma.pageNode.create({
      data: {
        slug: '/',
        title: 'Homepage',
        description: 'The main landing page for MahaPrisons',
        layoutType: 'homepage',
        isActive: true
      }
    });
    console.log('Created Homepage Node:', homePage.id);
  } else {
    console.log('Homepage Node already exists:', homePage.id);
  }

  const existingHero = await prisma.contentBlock.findFirst({
    where: {
      pageNodeId: homePage.id,
      blockType: 'hero_carousel'
    }
  });

  if (!existingHero) {
    await prisma.contentBlock.create({
      data: {
        pageNodeId: homePage.id,
        blockType: 'hero_carousel',
        order: 0,
        content: hero_carousel,
        isActive: true
      }
    });
    console.log('Created hero_carousel block for Homepage');
  } else {
    console.log('hero_carousel block already exists for Homepage');
  }

  console.log('Seeding complete.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
