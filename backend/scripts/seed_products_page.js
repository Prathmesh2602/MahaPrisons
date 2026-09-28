const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const productsData = {
  hero: {
    title: { mr: 'आमची उत्पादने', en: 'Our Products' },
    subtitle: { 
      mr: 'कैद्यांनी त्यांच्या कौशल्य विकासाचा भाग म्हणून तयार केलेल्या दर्जेदार उत्पादनांची श्रेणी.', 
      en: 'A range of high-quality products crafted by inmates as part of their skill development.' 
    }
  },
  products: [
    {
      id: "1",
      title: { mr: 'फर्निचर', en: 'Furniture' },
      desc: { mr: 'तुरुंगातील सुतारकाम विभागाद्वारे तयार केलेले उच्च दर्जाचे लाकडी फर्निचर.', en: 'High-quality wooden furniture crafted by the carpentry section of the prison.' },
      image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80',
      icon: 'Package'
    },
    {
      id: "2",
      title: { mr: 'हातमाग आणि कापड', en: 'Handloom & Textiles' },
      desc: { mr: 'कैद्यांनी विणलेले सुंदर सूती कापड, चादरी, आणि सतरंज्या.', en: 'Beautiful cotton cloth, bedsheets, and rugs woven by inmates.' },
      image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&q=80',
      icon: 'Star'
    },
    {
      id: "3",
      title: { mr: 'शेती उत्पादने', en: 'Agricultural Products' },
      desc: { mr: 'ताजा भाजीपाला, फळे, आणि सेंद्रिय खत.', en: 'Fresh vegetables, fruits, and organic compost.' },
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80',
      icon: 'CheckCircle2'
    },
    {
      id: "4",
      title: { mr: 'बेकरी उत्पादने', en: 'Bakery Products' },
      desc: { mr: 'ताजे ब्रेड, बिस्किटे आणि खारी.', en: 'Fresh bread, biscuits, and khari.' },
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80',
      icon: 'ShoppingBag'
    },
    {
      id: "5",
      title: { mr: 'कला आणि हस्तकला', en: 'Arts & Crafts' },
      desc: { mr: 'सुंदर चित्रे, मूर्ती आणि सजावटीच्या वस्तू.', en: 'Beautiful paintings, idols, and decorative items.' },
      image: 'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?auto=format&fit=crop&q=80',
      icon: 'Star'
    },
    {
      id: "6",
      title: { mr: 'चामड्याच्या वस्तू', en: 'Leather Goods' },
      desc: { mr: 'बूट, बेल्ट आणि बॅग्ज.', en: 'Shoes, belts, and bags.' },
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80',
      icon: 'Package'
    }
  ],
  outlet: {
    title: { 
      mr: 'कारागृह विक्री केंद्र (MahaPrisons Outlet)', 
      en: 'Prison Sales Center (MahaPrisons Outlet)' 
    },
    desc: { 
      mr: 'ही सर्व उत्पादने कारागृहाबाहेरील विक्री केंद्रावर नागरिकांसाठी उपलब्ध आहेत. यातून मिळणारे उत्पन्न कैद्यांच्या कल्याणासाठी आणि शासनाच्या तिजोरीत जमा केले जाते.', 
      en: 'All these products are available for citizens at the sales center outside the prison. The income generated is used for the welfare of inmates and deposited into the government treasury.' 
    },
    btnText: { mr: 'विक्री केंद्राचा पत्ता', en: 'Outlet Location' }
  }
};

async function main() {
  const pageSlug = 'our-products';

  let pageNode = await prisma.pageNode.findUnique({
    where: { slug: pageSlug }
  });

  if (!pageNode) {
    pageNode = await prisma.pageNode.create({
      data: {
        slug: pageSlug,
        title: 'Our Products',
        layoutType: 'ProductsLayout',
        seoTitle: 'Our Products | MahaPrisons',
        seoDesc: 'Explore products crafted by inmates of MahaPrisons.',
        isActive: true,
      }
    });
    console.log('Created pageNode:', pageNode.slug);
  } else {
    pageNode = await prisma.pageNode.update({
      where: { slug: pageSlug },
      data: { layoutType: 'ProductsLayout' }
    });
    console.log('Updated pageNode:', pageNode.slug);
  }

  const existingBlock = await prisma.contentBlock.findFirst({
    where: { pageNodeId: pageNode.id, blockType: 'page_template_data' }
  });

  if (existingBlock) {
    await prisma.contentBlock.update({
      where: { id: existingBlock.id },
      data: { content: productsData }
    });
    console.log('Updated existing page_template_data block.');
  } else {
    await prisma.contentBlock.create({
      data: {
        pageNodeId: pageNode.id,
        blockType: 'page_template_data',
        order: 0,
        content: productsData
      }
    });
    console.log('Created new page_template_data block.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
