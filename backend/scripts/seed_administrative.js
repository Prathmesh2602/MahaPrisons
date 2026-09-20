const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const departments = [
  { slug: '/administrative/administration', titleEn: 'Administration', titleMr: 'प्रशासन' },
  { slug: '/administrative/establishment', titleEn: 'Establishment', titleMr: 'आस्थापना' },
  { slug: '/administrative/judicial', titleEn: 'Judicial', titleMr: 'न्यायालयीन' },
  { slug: '/administrative/ration', titleEn: 'Ration', titleMr: 'शिधा' },
  { slug: '/administrative/canteen', titleEn: 'Canteen', titleMr: 'कॅन्टीन' },
  { slug: '/administrative/interview', titleEn: 'Interview', titleMr: 'मुलाखत' },
  { slug: '/administrative/hospital', titleEn: 'Hospital', titleMr: 'रुग्णालय' },
  { slug: '/administrative/factory', titleEn: 'Factory', titleMr: 'कारखाना' },
  { slug: '/administrative/agriculture', titleEn: 'Agriculture', titleMr: 'शेती' },
  { slug: '/administrative/industry', titleEn: 'Industry', titleMr: 'उद्योग' },
  { slug: '/administrative/internal-security', titleEn: 'Internal Security', titleMr: 'अंतर्गत सुरक्षा' },
  { slug: '/administrative/construction', titleEn: 'Construction', titleMr: 'बांधकाम' },
];

async function seedDepartments() {
  console.log('Seeding Administrative Departments...');

  for (const dept of departments) {
    const existing = await prisma.pageNode.findUnique({
      where: { slug: dept.slug }
    });

    if (existing) {
      console.log(`- Skipping ${dept.slug}, already exists.`);
      continue;
    }

    const initialContent = {
      title: { en: dept.titleEn, mr: dept.titleMr },
      subtitle: { en: `Department of ${dept.titleEn}`, mr: `${dept.titleMr} विभाग` },
      description: {
        en: `Welcome to the ${dept.titleEn} department page. This page is currently under construction.`,
        mr: `${dept.titleMr} विभाग पृष्ठावर आपले स्वागत आहे. हे पृष्ठ सध्या तयार होत आहे.`
      },
      image: 'https://images.unsplash.com/photo-1541888081622-14066113b2ce?w=800&q=80',
      stats: [
        { title: { en: 'Placeholder Stat', mr: 'नमुना' }, desc: { en: '100+', mr: '१००+' } }
      ],
      keyFunctions: [
        { title: { en: 'Function 1', mr: 'कार्य १' }, desc: { en: 'Description goes here.', mr: 'येथे वर्णन असेल.' } }
      ],
      contactInfo: { email: 'contact@mahaprisons.gov.in', phone: '020-12345678', address: 'Pune, Maharashtra' }
    };

    await prisma.pageNode.create({
      data: {
        slug: dept.slug,
        title: dept.titleEn,
        description: `Department of ${dept.titleEn}`,
        layoutType: 'HeroFeaturesTimelineLayout',
        contentBlocks: {
          create: [
            {
              blockType: 'page_template_data',
              order: 0,
              isActive: true,
              content: initialContent
            }
          ]
        }
      }
    });
    console.log(`- Created ${dept.slug}`);
  }

  console.log('Done!');
}

seedDepartments()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
