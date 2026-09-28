const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const pagesToSeed = [
  { slug: 'cultural/awareness-programs', title: 'Awareness Programs' },
  { slug: 'cultural/de-addiction', title: 'De-Addiction' },
  { slug: 'cultural/kirtan-bhajan', title: 'Kirtan Bhajan' },
  { slug: 'cultural/pranic-healing', title: 'Pranic Healing' },
  { slug: 'cultural/vocational-training', title: 'Vocational Training' },
  { slug: 'cultural/yoga-meditation', title: 'Yoga & Meditation' },
  { slug: 'notable-work/awards-honors', title: 'Awards & Honors' },
  { slug: 'notable-work/best-practices', title: 'Best Practices' },
  { slug: 'notable-work/important-projects', title: 'Important Projects' },
  { slug: 'notable-work/initiatives', title: 'Notable Initiatives' },
  { slug: 'notable-work/success-stories', title: 'Success Stories' },
  { slug: 'tours-visits/departmental-visits', title: 'Departmental Visits' },
  { slug: 'tours-visits/dignitary-visits', title: 'Dignitary Visits' },
  { slug: 'tours-visits/educational-visits', title: 'Educational Visits' },
  { slug: 'tours-visits/inspection-tours', title: 'Inspection Tours' },
  { slug: 'tours-visits/institutional-visits', title: 'Institutional Visits' },
  { slug: 'tours-visits/official-tours', title: 'Official Tours' },
  { slug: 'contact', title: 'Contact' }
];

async function main() {
  for (const page of pagesToSeed) {
    const existing = await prisma.pageNode.findUnique({ where: { slug: page.slug } });
    if (!existing) {
      await prisma.pageNode.create({
        data: {
          slug: page.slug,
          title: page.title,
          layoutType: '', // Blank so it forces the template selector
          contentBlocks: {
            create: [
              {
                blockType: 'page_template_data',
                content: {}
              }
            ]
          }
        }
      });
      console.log(`Created page: ${page.slug}`);
    } else {
      console.log(`Page already exists: ${page.slug}`);
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
