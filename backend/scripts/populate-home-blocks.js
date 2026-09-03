const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

async function main() {
  console.log('Populating Home Page blocks and Global Settings with comprehensive mock data...');

  // 1. Read mock data file
  const filePath = path.join(__dirname, '../../web/src/data/mockData.js');
  let content = fs.readFileSync(filePath, 'utf-8');
  content = content.replace(/export const /g, 'global.');
  
  eval(content);

  const mockHomepageData = global.mockHomepageData;
  const mockHolidays2026 = global.mockHolidays2026;

  // 2. Ensure home page exists
  let homePage = await prisma.page.findFirst({
    where: { slug: 'home' }
  });

  if (!homePage) {
    console.error('Home page not found!');
    return;
  }

  // 3. Clear existing blocks for home page
  await prisma.contentBlock.deleteMany({
    where: { pageId: homePage.id }
  });

  // 4. Create blocks with precise JSON structures
  
  // HERO CAROUSEL
  await prisma.contentBlock.create({
    data: {
      pageId: homePage.id,
      blockType: 'HERO_CAROUSEL',
      order: 1,
      data: {
        slides: mockHomepageData.hero_carousel,
        slideDuration: 6000,
        dgQuote: {
          mr: "सुरक्षितता, सुधारणा आणि पुनर्वसन ही आमची मुख्य सूत्रे आहेत. आम्ही बंदीवानांना कौशल्यपूर्ण प्रशिक्षण देऊन समाजाचा एक उपयुक्त घटक बनविण्यासाठी कटिबद्ध आहोत.",
          en: "Security, correction, and rehabilitation are our guiding pillars. We are committed to equipping inmates with skills to make them productive members of society."
        }
      }
    }
  });

  // ABOUT SECTION
  await prisma.contentBlock.create({
    data: {
      pageId: homePage.id,
      blockType: 'ABOUT_SECTION',
      order: 2,
      data: {
        heading: {
          en: "ABOUT YERWADA OPEN JAIL",
          mr: "येरवडा खुल्या कारागृहाविषयी"
        },
        content: {
          en: "The Prison Department in Maharashtra plays a crucial role in maintaining law and order while focusing on the reform and rehabilitation of inmates.",
          mr: "महाराष्ट्र कारागृह विभाग कायदा आणि सुव्यवस्था राखण्यात तसेच बंदीवानांच्या सुधारणा आणि पुनर्वसनावर लक्ष केंद्रित करण्यात महत्त्वपूर्ण भूमिका बजावतो."
        }
      }
    }
  });

  // QUICK SERVICES
  await prisma.contentBlock.create({
    data: {
      pageId: homePage.id,
      blockType: 'QUICK_SERVICES',
      order: 3,
      data: {
        title: { en: "Quick Services & Important Links", mr: "जलद सेवा आणि महत्त्वाच्या लिंक्स" },
        subtitle: { en: "Important contact numbers and related government website links are available below for the convenience of citizens.", mr: "नागरिकांच्या सुविधेसाठी महत्त्वाचे संपर्क क्रमांक आणि संबंधित शासकीय संकेतस्थळांच्या लिंक्स खालीलप्रमाणे उपलब्ध आहेत." },
        helplines: mockHomepageData.helpline_services,
        links: mockHomepageData.important_links
      }
    }
  });

  // JAIL INSIGHTS
  await prisma.contentBlock.create({
    data: {
      pageId: homePage.id,
      blockType: 'JAIL_INSIGHTS',
      order: 4,
      data: {
        title: { en: "Yerwada Open Prison: At a Glance", mr: "येरवडा खुले कारागृह: एक दृष्टिक्षेप" },
        subtitle: { en: "For more information", mr: "अधिक माहितीसाठी" },
        youtubeLink: "https://www.youtube.com/@CShamkant",
        cards: [
          { icon: "HeartHandshake", title: {en: "Rehabilitation", mr: "सुधारणा आणि पुनर्वसन"}, description: {en: "Special efforts for overall development.", mr: "कैद्यांच्या सर्वांगीण विकासासाठी विशेष प्रयत्न."} },
          { icon: "Sprout", title: {en: "Agriculture", mr: "शेती आणि वृक्षारोपण"}, description: {en: "Large scale plantation.", mr: "पर्यावरण संवर्धनासाठी वृक्षारोपण."} },
          { icon: "Wrench", title: {en: "Skill Development", mr: "कौशल्य विकास कार्यक्रम"}, description: {en: "Vocational training.", mr: "व्यावसायिक प्रशिक्षणातून स्वावलंबन."} },
          { icon: "Utensils", title: {en: "Restaurant", mr: "शृंखला उपहारगृह"}, description: {en: "Hotel run by inmates.", mr: "कैद्यांमार्फत चालवले जाणारे हॉटेल."} },
          { icon: "Landmark", title: {en: "Historical Heritage", mr: "ऐतिहासिक वारसा"}, description: {en: "Great history.", mr: "मोठा इतिहास लाभला असून महात्मा गांधी..."} },
          { icon: "BookOpen", title: {en: "Education", mr: "शिक्षण आणि साक्षरता"}, description: {en: "Basic literacy.", mr: "मूलभूत साक्षरता आणि उच्च शिक्षण."} }
        ]
      }
    }
  });

  // MINISTER PROFILES
  await prisma.contentBlock.create({
    data: {
      pageId: homePage.id,
      blockType: 'MINISTER_PROFILES',
      order: 5,
      data: {
        title: { en: "Dignitaries Profile", mr: "मान्यवर प्रोफाइल" },
        profiles: mockHomepageData.minister_profiles
      }
    }
  });

  // ANNOUNCEMENTS
  await prisma.contentBlock.create({
    data: {
      pageId: homePage.id,
      blockType: 'ANNOUNCEMENTS',
      order: 6,
      data: {
        title: { en: "Latest Announcements", mr: "ताज्या घडामोडी" },
        tabs: mockHomepageData.announcements_tabs
      }
    }
  });

  // HOLIDAY CALENDAR
  await prisma.contentBlock.create({
    data: {
      pageId: homePage.id,
      blockType: 'HOLIDAY_CALENDAR',
      order: 7,
      data: {
        title: { en: "Holiday Calendar", mr: "सुट्ट्यांचे कॅलेंडर" },
        holidays: mockHolidays2026
      }
    }
  });

  // PHOTO GALLERY
  await prisma.contentBlock.create({
    data: {
      pageId: homePage.id,
      blockType: 'PHOTO_GALLERY',
      order: 8,
      data: {
        title: { en: "Photo Gallery", mr: "फोटो गॅलरी" },
        gallery: mockHomepageData.gallery
      }
    }
  });

  console.log('Homepage blocks populated successfully with robust CMS schemas!');

  // 5. Populate Global Settings
  const settingsCount = await prisma.siteSettings.count();
  if (settingsCount === 0) {
    await prisma.siteSettings.create({
      data: {
        logoH1: mockHomepageData.logo_h1,
        logoSpans: mockHomepageData.logo_spans,
        topbarLinks: mockHomepageData.topbar_links,
        footerColumns: mockHomepageData.footer_links, // just an example structure
        contactInfo: {
          address: "Yerwada Open District Prison, Pune, Maharashtra",
          phone: "020-26682663",
          email: "supdt.odpyerawada-mh@gov.in"
        },
        socialLinks: [
          { platform: "Facebook", href: "https://www.facebook.com/mahaprisondepartment/" },
          { platform: "Twitter", href: "https://x.com/mahaprison" }
        ]
      }
    });
    console.log('Global Settings populated successfully!');
  } else {
    // Update existing settings
    const setting = await prisma.siteSettings.findFirst();
    await prisma.siteSettings.update({
      where: { id: setting.id },
      data: {
        logoH1: mockHomepageData.logo_h1,
        logoSpans: mockHomepageData.logo_spans,
        topbarLinks: mockHomepageData.topbar_links,
      }
    });
    console.log('Global Settings updated successfully!');
  }
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
