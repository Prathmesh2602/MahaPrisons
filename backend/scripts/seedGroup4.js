const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const administrativeData = {
  'internal-security': {
    template: 'D',
    heroImage: 'https://images.unsplash.com/photo-1549497042-32b0c360a7de?auto=format&fit=crop&q=80',
    title: { mr: 'अंतर्गत सुरक्षा विभाग', en: 'Internal Security Department' },
    description: {
      mr: 'खुल्या कारागृहात भौतिक भिंती नसतात, तरीही कैद्यांच्या हालचालींवर आणि कारागृहाच्या परिसरावर बारीक लक्ष ठेवण्याचे काम अंतर्गत सुरक्षा विभाग करतो. विश्वासावर आधारित शिस्त टिकवून ठेवण्यासाठी हा विभाग महत्त्वाची भूमिका बजावतो.',
      en: 'Even though the open prison does not have physical walls, the Internal Security Department keeps a close watch on the movements of inmates and the prison premises. This department plays a crucial role in maintaining trust-based discipline.'
    },
    coreProtocols: [
      {
        title: { mr: 'परिसर गस्त (Patrolling)', en: 'Premises Patrolling' },
        desc: { mr: '१०० एकरांहून अधिक परिसरात नियमित आणि अचानक गस्त घालणे.', en: 'Regular and surprise patrolling across the 100+ acre premises.' }
      },
      {
        title: { mr: 'हजेरी (Roll Call)', en: 'Roll Call' },
        desc: { mr: 'दिवसातून ठराविक वेळी सर्व कैद्यांची हजेरी घेणे.', en: 'Taking roll call of all inmates at scheduled times of the day.' }
      },
      {
        title: { mr: 'झडती (Searches)', en: 'Searches' },
        desc: { mr: 'प्रतिबंधित वस्तू कारागृहात येऊ नयेत यासाठी अचानक झडती सत्रे राबवणे.', en: 'Conducting surprise searches to prevent prohibited items from entering the prison.' }
      }
    ],
    infrastructure: [
      {
        name: { mr: 'CCTV नियंत्रण कक्ष', en: 'CCTV Control Room' },
        details: { mr: 'संपूर्ण परिसरावर २४ तास लक्ष ठेवणारी अद्ययावत प्रणाली.', en: 'Advanced system for 24-hour surveillance of the entire premises.' },
        image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80'
      },
      {
        name: { mr: 'वॉच टॉवर्स', en: 'Watch Towers' },
        details: { mr: 'परिसराच्या सीमांवर लक्ष ठेवण्यासाठी उभारलेले मनोरे.', en: 'Towers erected at the premises boundaries for surveillance.' },
        image: 'https://images.unsplash.com/photo-1506459225024-1428097a7e18?auto=format&fit=crop&q=80'
      }
    ],
    alertMessage: {
      mr: 'कारागृहाच्या नियमांचे उल्लंघन केल्यास कैद्याची खुल्या कारागृहातील सवलत रद्द करून पुन्हा मध्यवर्ती कारागृहात रवानगी केली जाते.',
      en: 'Violation of prison rules results in the cancellation of open prison privileges, and the inmate is sent back to the central prison.'
    }
  },
  'construction': {
    template: 'D',
    heroImage: 'https://images.unsplash.com/photo-1541888081622-19e34c9f13eb?auto=format&fit=crop&q=80',
    title: { mr: 'बांधकाम आणि देखभाल', en: 'Construction & Maintenance' },
    description: {
      mr: 'कारागृहातील जुन्या इमारतींची देखभाल, दुरुस्ती आणि नवीन आवश्यक संरचनांची उभारणी करण्याचे काम बांधकाम विभागामार्फत केले जाते. यात बऱ्याचदा कैद्यांच्या श्रमाचा विधायक वापर केला जातो.',
      en: 'The Construction Department carries out the maintenance and repair of old prison buildings and the construction of necessary new structures. Inmates constructive labor is often utilized in these activities.'
    },
    coreProtocols: [
      {
        title: { mr: 'नियमित देखभाल', en: 'Regular Maintenance' },
        desc: { mr: 'बॅरेक्स, रुग्णालये आणि प्रशासकीय इमारतींची रंगरंगोटी आणि दुरुस्ती.', en: 'Painting and repairing of barracks, hospitals, and administrative buildings.' }
      },
      {
        title: { mr: 'पाणी आणि वीज पुरवठा', en: 'Water & Power Supply' },
        desc: { mr: 'विद्युत पुरवठा, जनरेटर आणि पाणी शुद्धीकरण प्रकल्पांची निगा राखणे.', en: 'Maintenance of electrical supply, generators, and water purification plants.' }
      },
      {
        title: { mr: 'स्वच्छता गृहे', en: 'Sanitation' },
        desc: { mr: 'कैद्यांच्या वापरासाठी असलेल्या प्रसाधनगृहांची आणि सांडपाणी व्यवस्थापनाची दुरुस्ती.', en: 'Repair and maintenance of toilets and drainage systems used by inmates.' }
      }
    ],
    infrastructure: [
      {
        name: { mr: 'पाणी शुद्धीकरण प्रकल्प', en: 'Water Purification Plant' },
        details: { mr: 'कैद्यांना पिण्यायोग्य शुद्ध पाणी पुरवण्यासाठीचा प्रकल्प.', en: 'Project to provide safe drinking water to the inmates.' },
        image: 'https://images.unsplash.com/photo-1584984214532-62ce9d0b3c6f?auto=format&fit=crop&q=80'
      },
      {
        name: { mr: 'सौर ऊर्जा प्रकल्प', en: 'Solar Power Plant' },
        details: { mr: 'कारागृहाची विजेची गरज अंशतः पूर्ण करण्यासाठी सौर पॅनेल्स.', en: 'Solar panels to partially fulfill the electricity needs of the prison.' },
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80'
      }
    ],
    alertMessage: {
      mr: 'पाणी आणि विजेचा अपव्यय टाळण्यासाठी सर्व कैद्यांना आणि कर्मचाऱ्यांना सक्त सूचना देण्यात आल्या आहेत.',
      en: 'Strict instructions have been given to all inmates and staff to prevent the wastage of water and electricity.'
    }
  }
};

async function seedGroup4() {
  const pages = [
    { slug: 'administrative/internal-security', dataId: 'internal-security', title: 'Internal Security' },
    { slug: 'administrative/construction', dataId: 'construction', title: 'Construction' }
  ];

  for (const page of pages) {
    const data = administrativeData[page.dataId];
    
    console.log(`Seeding ${page.slug}...`);

    let pageNode = await prisma.pageNode.findUnique({ where: { slug: page.slug } });
    
    if (!pageNode) {
      pageNode = await prisma.pageNode.create({
        data: {
          slug: page.slug,
          title: page.title,
          layoutType: 'template_d',
          isActive: true
        }
      });
    } else {
      await prisma.pageNode.update({
        where: { id: pageNode.id },
        data: { layoutType: 'template_d' }
      });
      await prisma.contentBlock.deleteMany({
        where: { pageNodeId: pageNode.id }
      });
    }

    await prisma.contentBlock.create({
      data: {
        pageNodeId: pageNode.id,
        blockType: 'page_template_data',
        order: 0,
        content: data
      }
    });

    console.log(`Finished seeding ${page.slug}.`);
  }
}

seedGroup4()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
