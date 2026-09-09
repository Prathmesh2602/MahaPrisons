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
    where: { 
      menuItem: {
        href: '/'
      }
    }
  });

  if (!homePage) {
    homePage = await prisma.page.findFirst({
      where: { slug: 'home' }
    });
  }

  if (!homePage) {
    console.error('Home page not found!');
    return;
  }

  // 3. Clear existing blocks for home page
  await prisma.contentBlock.deleteMany({
    where: { pageId: homePage.id }
  });

  // 4. Create blocks with precise JSON structures
  
  // HERO CAROUSEL (Order: 1)
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
        },
        dgName: {
          mr: "श्री. सुहास वारके",
          en: "Shri. Suhas Warke"
        },
        dgDesignation: {
          mr: "अपर पोलीस महासंचालक व महानिरीक्षक",
          en: "ADG & Director General"
        },
        dgPhoto: "https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2026/06/202606051649346751.jpeg",
        dgLink: "https://mahaprisons.gov.in/directors-message/"
      }
    }
  });

  // MINISTER PROFILES (Order: 2)
  await prisma.contentBlock.create({
    data: {
      pageId: homePage.id,
      blockType: 'MINISTER_PROFILES',
      order: 2,
      data: {
        title: { en: "Dignitaries Profile", mr: "मान्यवर प्रोफाइल" },
        ministers: mockHomepageData.minister_profiles.slice(0, 4),
        seniorOfficers: mockHomepageData.minister_profiles.slice(4)
      }
    }
  });

  // ABOUT SECTION (Order: 3)
  await prisma.contentBlock.create({
    data: {
      pageId: homePage.id,
      blockType: 'ABOUT_SECTION',
      order: 3,
      data: {
        heading: {
          en: "Welcome to Yerwada Open District Prison",
          mr: "येरवडा खुले जिल्हा कारागृह मध्ये आपले स्वागत आहे"
        },
        content: {
          en: "The Yerwada Open Jail is a specialized rehabilitation facility located in the expansive campus of the historic Yerwada Central Jail in Pune. Established in 1956, it was the first 'Open Institution' in Maharashtra, marking a significant milestone in progressive prison administration. It primarily houses inmates serving life sentences who have demonstrated excellent conduct and successfully completed at least five years in the high-security central prison. Operating under minimal security without traditional confinement cells, the facility strongly emphasizes psychological reform and vocational empowerment. Inmates are actively engaged in productive activities such as extensive organic farming—supplying fresh produce to neighboring institutions—and animal husbandry. This progressive approach ensures inmates acquire vital livelihood skills, facilitating their successful and responsible reintegration into society upon release.",
          mr: "येरवडा खुले कारागृह हे पुण्याच्या ऐतिहासिक येरवडा मध्यवर्ती कारागृहाच्या विस्तीर्ण ५१२ एकर परिसरात वसलेले एक विशेष पुनर्वसन आणि सुधार केंद्र आहे. १९५६ मध्ये स्थापित झालेले हे महाराष्ट्रातील पहिले 'खुले कारागृह' होते, जे प्रगतशील कारागृह प्रशासनातील एक महत्त्वाचे पाऊल मानले जाते. येथे प्रामुख्याने जन्मठेपेची शिक्षा भोगत असलेल्या, चांगली वर्तणूक असलेल्या आणि मध्यवर्ती कारागृहात किमान ५ वर्षे पूर्ण केलेल्या बंदीवानांना ठेवले जाते. हे कारागृह पारंपारिक बंदिस्त कोठड्यांविना, कमीत कमी सुरक्षिततेवर चालते. येथे बंदीवानांच्या मानसिक सुधारणेवर आणि व्यावसायिक सक्षमीकरणावर विशेष भर दिला जातो. बंदीवानांना सेंद्रिय शेती आणि पशुपालन यांसारख्या उत्पादक कामांमध्ये सक्रियपणे गुंतवले जाते; येथील सेंद्रिय शेतीतून इतर कारागृहांनाही ताज्या भाज्यांचा पुरवठा केला जातो. या प्रगतशील दृष्टिकोनामुळे बंदीवानांना उपजीविकेचे महत्त्वपूर्ण कौशल्य प्राप्त होते, ज्यामुळे त्यांची समाजात एक जबाबदार नागरिक म्हणून यशस्वीपणे पुनर्रचना होण्यास मदत होते."
        },
        officers: [
          {
            name: { mr: "श्री. शामकांत शालन चंद्रकांत शेडगे", en: "Shri. Shamkant Shalan Chandrakant Shedge" },
            desg: { mr: "अधीक्षक, येरवडा खुले जिल्हा कारागृह, वर्ग-१", en: "Superintendent, Yerwada Open District Prison, Class-1" },
            img: "/gallary/Shamkant%20shedge.png"
          },
          {
            name: { mr: "श्री. नागेश एम. कांबळे", en: "Shri. Nagesh M. Kamble" },
            desg: { mr: "वरिष्ठ तुरुंग अधिकारी (प्रशासकीय व इतर) श्रेणी १", en: "Senior Jailor (Administrative & Other) Class 1" },
            img: "/gallary/Nagesh%20Kamble.png"
          },
          {
            name: { mr: "श्री. नागनाथ एन. भाणवसे", en: "Shri. Nagnath N. Bhanvase" },
            desg: { mr: "तुरुंग अधिकारी श्रेणी २", en: "Jailor Class 2" },
            img: ""
          },
          {
            name: { mr: "श्रीमती निशा डी. श्रेयेकर", en: "Smt. Nisha D. Shreyekar" },
            desg: { mr: "तुरुंग अधिकारी श्रेणी २", en: "Jailor Class 2" },
            img: "/gallary/nisha%20shreyekar.png"
          }
        ]
      }
    }
  });

  // JAIL INSIGHTS (Order: 4)
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

  // ANNOUNCEMENTS (Order: 5)
  await prisma.contentBlock.create({
    data: {
      pageId: homePage.id,
      blockType: 'ANNOUNCEMENTS',
      order: 5,
      data: {
        title: { en: "Latest Announcements", mr: "ताज्या घडामोडी" },
        tabs: mockHomepageData.announcements_tabs
      }
    }
  });

  // PHOTO GALLERY (Order: 6)
  await prisma.contentBlock.create({
    data: {
      pageId: homePage.id,
      blockType: 'PHOTO_GALLERY',
      order: 6,
      data: {
        title: { en: "Photo Gallery", mr: "फोटो गॅलरी" },
        gallery: mockHomepageData.gallery
      }
    }
  });

  // HOLIDAY CALENDAR (Order: 7)
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

  // QUICK SERVICES (Order: 8)
  await prisma.contentBlock.create({
    data: {
      pageId: homePage.id,
      blockType: 'QUICK_SERVICES',
      order: 8,
      data: {
        title: { en: "Quick Services & Important Links", mr: "जलद सेवा आणि महत्त्वाच्या लिंक्स" },
        subtitle: { en: "Important contact numbers and related government website links are available below for the convenience of citizens.", mr: "नागरिकांच्या सुविधेसाठी महत्त्वाचे संपर्क क्रमांक आणि संबंधित शासकीय संकेतस्थळांच्या लिंक्स खालीलप्रमाणे उपलब्ध आहेत." },
        helplines: mockHomepageData.helpline_services,
        links: mockHomepageData.important_links
      }
    }
  });

  console.log('Homepage blocks populated successfully with robust CMS schemas!');

  // 5. Populate Global Settings
  const settingsCount = await prisma.siteSettings.count();
  if (settingsCount === 0) {
    await prisma.siteSettings.create({
      data: {
        logoH1: "Yerwada Open District Prison Pune",
        logoSpans: ["येरवडा खुले जिल्हा कारागृह, पुणे"],
        topbarLinks: mockHomepageData.topbar_links,
        footerColumns: [
          { text: { en: 'Home', mr: 'मुख्यपृष्ठ' }, href: '#' },
          { text: { en: 'About Us', mr: 'आमच्याबद्दल' }, href: '#' },
          { text: { en: 'Activities', mr: 'उपक्रम' }, href: '#' },
          { text: { en: 'Website Policies', mr: 'वेबसाइट धोरणे' }, href: '#' },
          { text: { en: 'Contact Us', mr: 'संपर्क साधा' }, href: '#' },
          { text: { en: 'Feedback', mr: 'अभिप्राय' }, href: '#' }
        ],
        contactInfo: {
          address: {
            mr: 'येरवडा खुले कारागृह, विमानतळ रस्ता, पुणे, महाराष्ट्र ४११००६',
            en: 'Yerawada Open Prison, Airport Road, Pune, Maharashtra 411006'
          },
          phone: "020-26694051",
          email: "yerwadaop-mh@gov.in"
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
        logoH1: "Yerwada Open District Prison Pune",
        logoSpans: ["येरवडा खुले जिल्हा कारागृह, पुणे"],
        topbarLinks: mockHomepageData.topbar_links,
        footerColumns: [
          { text: { en: 'Home', mr: 'मुख्यपृष्ठ' }, href: '#' },
          { text: { en: 'About Us', mr: 'आमच्याबद्दल' }, href: '#' },
          { text: { en: 'Activities', mr: 'उपक्रम' }, href: '#' },
          { text: { en: 'Website Policies', mr: 'वेबसाइट धोरणे' }, href: '#' },
          { text: { en: 'Contact Us', mr: 'संपर्क साधा' }, href: '#' },
          { text: { en: 'Feedback', mr: 'अभिप्राय' }, href: '#' }
        ],
        contactInfo: {
          address: {
            mr: 'येरवडा खुले कारागृह, विमानतळ रस्ता, पुणे, महाराष्ट्र ४११००६',
            en: 'Yerawada Open Prison, Airport Road, Pune, Maharashtra 411006'
          },
          phone: "020-26694051",
          email: "yerwadaop-mh@gov.in"
        }
      }
    });
    console.log('Global Settings updated successfully!');
  }
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
