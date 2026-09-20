const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const administrativeData = {
  'factory': {
    template: 'C',
    heroImage: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&q=80',
    title: { mr: 'कारागृह कारखाना', en: 'Prison Factory' },
    description: {
      mr: 'कारागृहातील कारखान्यात सुतारकाम, लोहारकाम आणि शिवणकाम असे विविध उद्योग चालतात. या माध्यमातून कैद्यांना रोजगार मिळतो आणि त्यांच्यात नवीन कौशल्ये विकसित होतात, ज्यामुळे त्यांची शिक्षा पूर्ण झाल्यावर पुनर्वसन सोपे होते.',
      en: 'Various industries like carpentry, smithy, and tailoring operate in the prison factory. This provides employment to the inmates and develops new skills in them, making their rehabilitation easier after sentence completion.'
    },
    productionStats: [
      { label: { mr: 'वार्षिक उत्पादन', en: 'Annual Prod.' }, value: '5', unit: 'Cr+' },
      { label: { mr: 'रोजगार निर्मिती', en: 'Employment' }, value: '500+', unit: 'Inmates' },
      { label: { mr: 'विविध उत्पादने', en: 'Product Types' }, value: '50+', unit: 'Items' }
    ],
    activeProjects: [
      {
        title: { mr: 'सुतारकाम विभाग (Carpentry)', en: 'Carpentry Section' },
        desc: { mr: 'येथे दर्जेदार लाकडी फर्निचर, खुर्च्या आणि टेबल बनवले जातात. सरकारी कार्यालयांना याचा मोठा पुरवठा होतो.', en: 'High-quality wooden furniture, chairs, and tables are made here, with major supplies going to government offices.' },
        image: 'https://images.unsplash.com/photo-1610996898711-20a2cc47781b?auto=format&fit=crop&q=80'
      },
      {
        title: { mr: 'लोहारकाम विभाग (Smithy)', en: 'Smithy Section' },
        desc: { mr: 'लोखंडी कपाटे, पलंग आणि इतर लोखंडी वस्तूंची निर्मिती येथे कुशल कैद्यांकडून केली जाते.', en: 'Steel cupboards, beds, and other metal items are manufactured here by skilled inmates.' },
        image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80'
      },
      {
        title: { mr: 'शिवणकाम (Tailoring)', en: 'Tailoring Section' },
        desc: { mr: 'कैद्यांचे गणवेश, रुग्णालयाचे कपडे आणि खादी वस्त्रे शिवण्याचे काम या विभागात चालते.', en: 'Stitching of inmate uniforms, hospital clothes, and khadi garments is carried out in this section.' },
        image: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&q=80'
      }
    ],
    impactStatement: {
      mr: 'श्रमातून नवनिर्मिती आणि कौशल्य विकासातून कैद्यांचे यशस्वी पुनर्वसन.',
      en: 'Successful rehabilitation of inmates through creation from labor and skill development.'
    }
  },
  'agriculture': {
    template: 'C',
    heroImage: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c6913?auto=format&fit=crop&q=80',
    title: { mr: 'शेती विभाग', en: 'Agriculture Department' },
    description: {
      mr: 'खुल्या कारागृहाच्या १०० एकरांहून अधिक जागेत विस्तृत शेती केली जाते. येथे सेंद्रिय पद्धतीने भाजीपाला, फळे आणि धान्य पिकवले जाते. यातून कारागृहाला आवश्यक अन्नधान्य मिळते.',
      en: 'Extensive farming is done on over 100 acres of the open prison land. Vegetables, fruits, and grains are grown organically here, providing the necessary food for the prison.'
    },
    productionStats: [
      { label: { mr: 'शेती क्षेत्र', en: 'Farming Area' }, value: '100+', unit: 'Acres' },
      { label: { mr: 'वार्षिक उत्पन्न', en: 'Annual Yield' }, value: '200+', unit: 'Tons' },
      { label: { mr: 'सेंद्रिय शेती', en: 'Organic Farming' }, value: '100', unit: '%' }
    ],
    activeProjects: [
      {
        title: { mr: 'सेंद्रिय भाजीपाला (Organic Veggies)', en: 'Organic Vegetables' },
        desc: { mr: 'संपूर्ण कारागृहासाठी दररोज लागणारा ताजा भाजीपाला येथे रसायनमुक्त पद्धतीने पिकवला जातो.', en: 'Fresh vegetables required daily for the entire prison are grown here without chemicals.' },
        image: 'https://images.unsplash.com/photo-1574316071802-0d684efa7be5?auto=format&fit=crop&q=80'
      },
      {
        title: { mr: 'फळबाग (Orchards)', en: 'Orchards' },
        desc: { mr: 'आंबा, पेरू, पपई आणि केळीच्या बागांमधून मोठ्या प्रमाणावर फळ उत्पादन घेतले जाते.', en: 'Large-scale fruit production is carried out from mango, guava, papaya, and banana orchards.' },
        image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&q=80'
      }
    ],
    impactStatement: {
      mr: 'निसर्गाशी जोडले गेल्यामुळे कैद्यांच्या मानसिक आरोग्यात सकारात्मक बदल होतो.',
      en: 'Connecting with nature brings a positive change in the mental health of inmates.'
    }
  },
  'industry': {
    template: 'C',
    heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
    title: { mr: 'उद्योग विभाग', en: 'Industry Department' },
    description: {
      mr: 'लघु उद्योगांच्या माध्यमातून कैद्यांना स्वावलंबी बनवण्याचे काम उद्योग विभाग करतो. बेकरी, हस्तकला आणि चर्मोद्योग यांसारखे उद्योग येथे चालतात, ज्याची उत्पादने खुल्या बाजारातही विकली जातात.',
      en: 'The Industry Department makes inmates self-reliant through small-scale industries. Industries like bakery, handicrafts, and leatherwork operate here, and their products are sold in the open market.'
    },
    productionStats: [
      { label: { mr: 'लघु उद्योग', en: 'Small Industries' }, value: '10+', unit: 'Units' },
      { label: { mr: 'वार्षिक नफा', en: 'Annual Profit' }, value: '50+', unit: 'Lakhs' },
      { label: { mr: 'रोजगार प्राप्त', en: 'Employed' }, value: '200+', unit: 'Inmates' }
    ],
    activeProjects: [
      {
        title: { mr: 'कारागृह बेकरी (Prison Bakery)', en: 'Prison Bakery' },
        desc: { mr: 'येथील बेकरीत पाव, बिस्किटे आणि केक बनवले जातात, जे चवीसाठी आणि स्वच्छतेसाठी प्रसिद्ध आहेत.', en: 'The bakery produces bread, biscuits, and cakes known for their taste and hygiene.' },
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80'
      },
      {
        title: { mr: 'हस्तकला आणि चर्मोद्योग (Handicrafts & Leather)', en: 'Handicrafts & Leather' },
        desc: { mr: 'लाकडी खेळणी, शोभेच्या वस्तू आणि उच्च दर्जाची चामड्याची पादत्राणे (Shoes) येथे बनतात.', en: 'Wooden toys, decorative items, and high-quality leather footwear are crafted here.' },
        image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80'
      }
    ],
    impactStatement: {
      mr: 'स्वतःच्या हाताने वस्तू निर्माण करण्याचा आनंद कैद्यांना नवी ऊर्जा आणि आत्मविश्वास देतो.',
      en: 'The joy of creating things with their own hands gives inmates new energy and confidence.'
    }
  }
};

async function seedGroup3() {
  const pages = [
    { slug: 'administrative/factory', dataId: 'factory', title: 'Factory' },
    { slug: 'administrative/agriculture', dataId: 'agriculture', title: 'Agriculture' },
    { slug: 'administrative/industry', dataId: 'industry', title: 'Industry' }
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
          layoutType: 'template_c',
          isActive: true
        }
      });
    } else {
      await prisma.pageNode.update({
        where: { id: pageNode.id },
        data: { layoutType: 'template_c' }
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

seedGroup3()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
