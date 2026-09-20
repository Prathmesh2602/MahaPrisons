const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const administrativeData = {
  'administration': {
    template: 'A',
    heroImage: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&q=80',
    title: { mr: 'प्रशासन विभाग (खुले कारागृह)', en: 'Administration Department (Open Prison)' },
    subtitle: { mr: 'मुक्त वातावरणातील शिस्त आणि व्यवस्थापन', en: 'Discipline and Management in an Open Environment' },
    description: {
      mr: 'खुल्या कारागृहाचा प्रशासन विभाग कैद्यांवर विश्वासावर आधारित शिस्त लागू करण्यासाठी काम करतो. मध्यवर्ती कारागृहापेक्षा येथील व्यवस्थापन अधिक लवचिक असून कैद्यांच्या पुनर्वसनावर मुख्य भर दिला जातो.',
      en: 'The administration department of the open prison works to enforce trust-based discipline among inmates. The management here is more flexible than a central prison, with a primary focus on inmate rehabilitation.'
    },
    stats: [
      { label: { mr: 'कर्मचारी', en: 'Staff' }, value: '50+', icon: 'Users' },
      { label: { mr: 'खुले कारागृह कैदी', en: 'Open Prison Inmates' }, value: '300+', icon: 'FileText' },
      { label: { mr: 'पुनर्वसन योजना', en: 'Rehab Schemes' }, value: '5', icon: 'GitMerge' }
    ],
    keyFunctions: [
      {
        title: { mr: 'मुक्त शिस्त व्यवस्थापन', en: 'Open Discipline Management' },
        desc: { mr: 'कैद्यांना विश्वासावर स्वातंत्र्य देणे आणि नियमांचे पालन सुनिश्चित करणे.', en: 'Granting freedom on trust and ensuring compliance with open prison rules.' },
        icon: 'Briefcase'
      },
      {
        title: { mr: 'रोजगार समन्वय', en: 'Employment Coordination' },
        desc: { mr: 'कैद्यांना शेती आणि इतर व्यवसायांमध्ये सामावून घेणे.', en: 'Integrating inmates into agriculture and other allied activities.' },
        icon: 'PieChart'
      },
      {
        title: { mr: 'कल्याणकारी निर्णय', en: 'Welfare Decisions' },
        desc: { mr: 'सजा पूर्ण होत आलेल्या कैद्यांना समाजाच्या मुख्य प्रवाहात आणण्यासाठी योजना.', en: 'Schemes to bring inmates nearing completion of their sentence into the mainstream.' },
        icon: 'Network'
      }
    ],
    contactInfo: {
      email: 'admin.openjail@mahaprisons.gov.in',
      phone: '020-26682600',
      address: { mr: 'प्रशासकीय इमारत, खुले कारागृह, येरवडा, पुणे', en: 'Administrative Building, Open Prison, Yerawada, Pune' }
    }
  },
  'establishment': {
    template: 'A',
    heroImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80',
    title: { mr: 'आस्थापना विभाग', en: 'Establishment Department' },
    subtitle: { mr: 'खुल्या कारागृहाचे मनुष्यबळ', en: 'Manpower of the Open Prison' },
    description: {
      mr: 'खुल्या कारागृहातील कर्मचारी आणि अधिकाऱ्यांच्या सेवाविषयक बाबी हाताळण्याचे काम आस्थापना विभाग करतो. येथील कर्मचाऱ्यांना कैद्यांसोबत मित्रत्वाच्या आणि विश्वासाच्या वातावरणात काम करण्याचे विशेष प्रशिक्षण असते.',
      en: 'The Establishment Department handles service-related matters of the open prison staff and officers. The staff here are specially trained to work with inmates in an environment of friendship and trust.'
    },
    stats: [
      { label: { mr: 'एकूण पदे', en: 'Total Posts' }, value: '120', icon: 'Users' },
      { label: { mr: 'विशेष प्रशिक्षण', en: 'Special Training' }, value: '12/yr', icon: 'GraduationCap' },
      { label: { mr: 'कल्याणकारी योजना', en: 'Welfare Schemes' }, value: '4', icon: 'Heart' }
    ],
    keyFunctions: [
      {
        title: { mr: 'विशेष नियुक्ती', en: 'Special Appointments' },
        desc: { mr: 'खुल्या कारागृहासाठी योग्य मानसिकता असलेल्या कर्मचाऱ्यांची नेमणूक करणे.', en: 'Appointing staff with the right mindset suitable for an open prison.' },
        icon: 'UserPlus'
      },
      {
        title: { mr: 'सेवा नोंदवही', en: 'Service Records' },
        desc: { mr: 'सर्व कर्मचाऱ्यांच्या सेवा नोंदवही (Service Books) अद्ययावत ठेवणे.', en: 'Maintaining up-to-date service records of all employees.' },
        icon: 'BookOpen'
      },
      {
        title: { mr: 'वेतन आणि भत्ते', en: 'Salary and Allowances' },
        desc: { mr: 'कर्मचाऱ्यांचे मासिक वेतन आणि इतर भत्ते वेळेवर अदा करणे.', en: 'Timely disbursement of monthly salary and other allowances to employees.' },
        icon: 'CreditCard'
      }
    ],
    contactInfo: {
      email: 'est.openjail@mahaprisons.gov.in',
      phone: '020-26682601',
      address: { mr: 'कक्ष क्रमांक ३, खुले कारागृह कार्यालय', en: 'Room No. 3, Open Prison Office' }
    }
  },
  'judicial': {
    template: 'A',
    heroImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80',
    title: { mr: 'न्याय विभाग', en: 'Judicial Department' },
    subtitle: { mr: 'कायदेशीर प्रक्रिया आणि माफी (Remission)', en: 'Legal Procedures and Remission' },
    description: {
      mr: 'खुल्या कारागृहात कैद्यांना त्यांच्या चांगल्या वर्तणुकीबद्दल विशेष शिक्षा माफी (Remission) मिळते. न्याय विभाग या माफीचे काटेकोरपणे दस्तऐवजीकरण करतो आणि त्यांच्या सुटकेची कायदेशीर प्रक्रिया पार पाडतो.',
      en: 'In an open prison, inmates receive special remission for their good behavior. The Judicial Department strictly documents this remission and processes the legal formalities for their eventual release.'
    },
    stats: [
      { label: { mr: 'विशेष माफी', en: 'Special Remission' }, value: '30 Days/Yr', icon: 'Scale' },
      { label: { mr: 'वार्षिक सुटका', en: 'Annual Releases' }, value: '100+', icon: 'Clock' },
      { label: { mr: 'संचित रजा', en: 'Furlough/Parole' }, value: '100%', icon: 'ShieldCheck' }
    ],
    keyFunctions: [
      {
        title: { mr: 'माफीचे मूल्यांकन', en: 'Remission Evaluation' },
        desc: { mr: 'खुल्या कारागृहातील कामाच्या आधारावर कैद्यांना विशेष माफी मंजूर करणे.', en: 'Granting special remission to inmates based on their work in the open prison.' },
        icon: 'FileSignature'
      },
      {
        title: { mr: 'सुटकेची प्रक्रिया', en: 'Release Processing' },
        desc: { mr: 'कैद्यांची शिक्षा पूर्ण झाल्यावर त्यांना मुख्य प्रवाहात सोडण्याची कायदेशीर प्रक्रिया.', en: 'Legal procedures for releasing inmates into the mainstream after sentence completion.' },
        icon: 'Gavel'
      },
      {
        title: { mr: 'संचित रजा (Furlough)', en: 'Furlough Management' },
        desc: { mr: 'कैद्यांना त्यांच्या कुटुंबाला भेटण्यासाठी रजा मंजूर करण्याचे प्रस्ताव.', en: 'Proposals for granting leave to inmates to visit their families.' },
        icon: 'ClipboardList'
      }
    ],
    contactInfo: {
      email: 'judicial.openjail@mahaprisons.gov.in',
      phone: '020-26682602',
      address: { mr: 'न्याय शाखा, खुले कारागृह', en: 'Judicial Branch, Open Prison' }
    }
  }
};

async function seedGroup1() {
  const pages = [
    { slug: 'administrative/administration', dataId: 'administration', title: 'Administration' },
    { slug: 'administrative/establishment', dataId: 'establishment', title: 'Establishment' },
    { slug: 'administrative/judicial', dataId: 'judicial', title: 'Judicial' }
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
          layoutType: 'template_a',
          isActive: true
        }
      });
    } else {
      await prisma.pageNode.update({
        where: { id: pageNode.id },
        data: { layoutType: 'template_a' }
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

seedGroup1()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
