const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const administrativeData = {
  'ration': {
    template: 'B',
    heroImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80',
    title: { mr: 'रेशन आणि धान्य विभाग', en: 'Ration & Provisions Department' },
    subtitle: { mr: 'अन्नधान्य पुरवठा आणि साठवणूक', en: 'Food Supply and Storage' },
    description: {
      mr: 'कारागृहातील सर्व कैद्यांना दररोज आवश्यक असणाऱ्या अन्नधान्याचा पुरवठा सुरळीत ठेवण्याची जबाबदारी रेशन विभागाची असते. येथे अन्नधान्याची गुणवत्ता तपासणी आणि सुरक्षित साठवणूक केली जाते.',
      en: 'The Ration Department is responsible for maintaining a smooth supply of essential food grains required daily by all inmates. The quality of food grains is checked and safely stored here.'
    },
    features: [
      {
        title: { mr: 'गुणवत्ता नियंत्रण', en: 'Quality Control' },
        desc: { mr: 'सर्व धान्याची प्रयोगशाळेत तपासणी करूनच स्वीकार.', en: 'Acceptance of all grains only after laboratory testing.' },
        icon: 'CheckCircle'
      },
      {
        title: { mr: 'ताजे भाजीपाला', en: 'Fresh Vegetables' },
        desc: { mr: 'कारागृहाच्या शेतीतून दररोज ताजा भाजीपाला पुरवठा.', en: 'Daily supply of fresh vegetables from the prison farm.' },
        icon: 'Apple'
      },
      {
        title: { mr: 'स्वच्छता', en: 'Hygiene' },
        desc: { mr: 'गोदामात आणि स्वयंपाकघरात सर्वोच्च दर्जाची स्वच्छता.', en: 'Highest standards of hygiene in the godown and kitchen.' },
        icon: 'Sparkles'
      }
    ],
    gallery: [
      { image: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&q=80', caption: { mr: 'धान्य कोठार', en: 'Grain Storage' } },
      { image: 'https://images.unsplash.com/photo-1615486171447-49f99231758c?auto=format&fit=crop&q=80', caption: { mr: 'ताजा भाजीपाला', en: 'Fresh Vegetables' } },
      { image: 'https://images.unsplash.com/photo-1590311825124-73ec5233cb0b?auto=format&fit=crop&q=80', caption: { mr: 'गुणवत्ता तपासणी', en: 'Quality Check' } }
    ],
    timings: [
      { day: { mr: 'धान्य वाटप (सकाळ)', en: 'Ration Distribution (Morning)' }, hours: '06:00 AM - 08:00 AM' },
      { day: { mr: 'धान्य वाटप (संध्याकाळ)', en: 'Ration Distribution (Evening)' }, hours: '03:00 PM - 05:00 PM' }
    ]
  },
  'canteen': {
    template: 'B',
    heroImage: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80',
    title: { mr: 'कारागृह कॅन्टीन', en: 'Prison Canteen' },
    subtitle: { mr: 'दैनंदिन गरजेच्या वस्तूंचा पुरवठा', en: 'Supply of Daily Necessities' },
    description: {
      mr: 'कैद्यांना त्यांच्या वैयक्तिक गरजेच्या वस्तू (उदा. साबण, तेल, बिस्किटे) खरेदी करण्यासाठी कारागृहात कॅन्टीन सुविधा उपलब्ध आहे. सर्व व्यवहार स्मार्ट कार्डच्या माध्यमातून कॅशलेस पद्धतीने केले जातात.',
      en: 'A canteen facility is available in the prison for inmates to purchase their personal daily necessities (e.g., soap, oil, biscuits). All transactions are made cashless through smart cards.'
    },
    features: [
      {
        title: { mr: 'कॅशलेस व्यवहार', en: 'Cashless Transactions' },
        desc: { mr: 'कैद्यांच्या खात्यावर पैसे जमा करून बायोमेट्रिक किंवा कार्डद्वारे खरेदी.', en: 'Purchases through biometric or cards by depositing money in inmates accounts.' },
        icon: 'CreditCard'
      },
      {
        title: { mr: 'रास्त भाव', en: 'Fair Prices' },
        desc: { mr: 'सर्व वस्तू एमआरपी (MRP) पेक्षा कमी दरात उपलब्ध.', en: 'All items available at prices lower than MRP.' },
        icon: 'Tag'
      },
      {
        title: { mr: 'पारदर्शकता', en: 'Transparency' },
        desc: { mr: 'प्रत्येक खरेदीची संगणकीकृत पावती दिली जाते.', en: 'Computerized receipts are provided for every purchase.' },
        icon: 'Receipt'
      }
    ],
    gallery: [
      { image: 'https://images.unsplash.com/photo-1601598851547-4302969d0614?auto=format&fit=crop&q=80', caption: { mr: 'कॅन्टीन काऊंटर', en: 'Canteen Counter' } },
      { image: 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&q=80', caption: { mr: 'दैनंदिन वस्तू', en: 'Daily Items' } },
      { image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80', caption: { mr: 'स्मार्ट कार्ड पेमेंट', en: 'Smart Card Payment' } }
    ],
    timings: [
      { day: { mr: 'सोमवार ते शुक्रवार', en: 'Monday to Friday' }, hours: '09:00 AM - 04:00 PM' },
      { day: { mr: 'शनिवार आणि रविवार', en: 'Saturday and Sunday' }, hours: 'बंद (Closed)' }
    ]
  },
  'hospital': {
    template: 'B',
    heroImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80',
    title: { mr: 'कारागृह रुग्णालय', en: 'Prison Hospital' },
    subtitle: { mr: '२४x७ आरोग्य सेवा', en: '24x7 Healthcare Services' },
    description: {
      mr: 'कारागृहातील रुग्णालयात सर्व प्राथमिक वैद्यकीय सुविधा उपलब्ध आहेत. तज्ज्ञ डॉक्टरांचे पथक, एक्स-रे मशीन, पॅथॉलॉजी लॅब आणि तातडीच्या उपचारांसाठी रुग्णवाहिका सदैव सज्ज असते.',
      en: 'All primary medical facilities are available in the prison hospital. A team of expert doctors, X-ray machine, pathology lab, and ambulances for emergency treatment are always ready.'
    },
    features: [
      {
        title: { mr: 'नियमित आरोग्य तपासणी', en: 'Regular Health Checkup' },
        desc: { mr: 'नवीन दाखल होणाऱ्या आणि जुन्या कैद्यांची नियमित वैद्यकीय तपासणी.', en: 'Regular medical examination of newly admitted and old inmates.' },
        icon: 'Stethoscope'
      },
      {
        title: { mr: 'मानसोपचार', en: 'Psychiatric Care' },
        desc: { mr: 'मानसिक आरोग्यासाठी विशेष समुपदेशन आणि उपचार.', en: 'Special counseling and treatment for mental health.' },
        icon: 'Brain'
      },
      {
        title: { mr: 'रुग्णवाहिका', en: 'Ambulance' },
        desc: { mr: 'गंभीर रुग्णांना ससून रुग्णालयात हलवण्यासाठी २४ तास सेवा.', en: '24-hour service to shift serious patients to Sassoon Hospital.' },
        icon: 'Ambulance'
      }
    ],
    gallery: [
      { image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80', caption: { mr: 'ओपीडी (OPD)', en: 'OPD' } },
      { image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80', caption: { mr: 'औषधालय', en: 'Dispensary' } },
      { image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80', caption: { mr: 'वॉर्ड', en: 'Ward' } }
    ],
    timings: [
      { day: { mr: 'ओपीडी (सकाळ)', en: 'OPD (Morning)' }, hours: '08:00 AM - 12:00 PM' },
      { day: { mr: 'ओपीडी (संध्याकाळ)', en: 'OPD (Evening)' }, hours: '03:00 PM - 05:00 PM' },
      { day: { mr: 'तातडीची सेवा', en: 'Emergency Services' }, hours: '24 x 7' }
    ]
  }
};

async function seedGroup2() {
  const pages = [
    { slug: 'administrative/ration', dataId: 'ration', title: 'Ration' },
    { slug: 'administrative/canteen', dataId: 'canteen', title: 'Canteen' },
    { slug: 'administrative/hospital', dataId: 'hospital', title: 'Hospital' }
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
          layoutType: 'template_b',
          isActive: true
        }
      });
    } else {
      await prisma.pageNode.update({
        where: { id: pageNode.id },
        data: { layoutType: 'template_b' }
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

seedGroup2()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
