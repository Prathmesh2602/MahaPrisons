const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const navigation_menu = [
  {
    text: "मुख्यपृष्ठ",
    icon: "Home",
    href: "/",
    title: "मुख्यपृष्ठ",
    children: [
      { text: "परिचय", href: "/#about", title: "About", children: [] },
      { text: "घोषणा आणि निविदा", href: "/#announcements", title: "Announcements", children: [] },
      { text: "सुट्ट्यांचे कॅलेंडर", href: "/#calendar", title: "Calendar", children: [] },
      { text: "फोटो गॅलरी", href: "/#gallery", title: "Gallery", children: [] },
      { text: "जलद सेवा", href: "/#services", title: "Services", children: [] }
    ]
  },
  {
    text: "कारागृह व्यवस्था",
    icon: "Shield",
    href: "/yerawada-open-jail",
    title: "कारागृह व्यवस्था",
    children: []
  },
  {
    text: "प्रशासकीय विभाग",
    icon: "Briefcase",
    href: "#",
    title: "प्रशासकीय विभाग",
    isMegaMenu: true,
    groups: [
      {
        groupTitle: "प्रशासन व कर्मचारी",
        children: [
          { text: "प्रशासन", href: "/administrative/administration", title: "प्रशासन", children: [] },
          { text: "आस्थापना", href: "/administrative/establishment", title: "आस्थापना", children: [] },
          { text: "न्याय विभाग", href: "/administrative/judicial", title: "न्याय विभाग", children: [] }
        ]
      },
      {
        groupTitle: "दैनंदिन सुविधा",
        children: [
          { text: "रेशन", href: "/administrative/ration", title: "रेशन", children: [] },
          { text: "उपाहारगृह", href: "/administrative/canteen", title: "उपाहारगृह", children: [] },
          { text: "मुलाखत", href: "/administrative/interview", title: "मुलाखत", children: [] },
          { text: "दवाखाना", href: "/administrative/hospital", title: "दवाखाना", children: [] }
        ]
      },
      {
        groupTitle: "उत्पादन व उपक्रम",
        children: [
          { text: "कारखाना", href: "/administrative/factory", title: "कारखाना", children: [] },
          { text: "शेती", href: "/administrative/agriculture", title: "शेती", children: [] },
          { text: "उद्योग", href: "/administrative/industry", title: "उद्योग", children: [] }
        ]
      },
      {
        groupTitle: "सुरक्षा व पायाभूत सुविधा",
        children: [
          { text: "अंतर्गत सुरक्षा", href: "/administrative/internal-security", title: "अंतर्गत सुरक्षा", children: [] },
          { text: "बांधकाम", href: "/administrative/construction", title: "बांधकाम", children: [] }
        ]
      }
    ]
  },
  {
    text: "शेती व पूरक व्यवसाय",
    icon: "Sprout",
    href: "#",
    title: "शेती व पूरक व्यवसाय",
    children: [
      { text: "रोपवाटिका", href: "/agriculture/nursery", title: "रोपवाटिका", children: [] },
      { text: "कुक्कुटपालन", href: "/agriculture/poultry-farming", title: "कुक्कुटपालन", children: [] },
      { text: "दुग्धव्यवसाय", href: "/agriculture/dairy-farming", title: "दुग्धव्यवसाय", children: [] },
      { text: "शेळीपालन", href: "/agriculture/goat-farming", title: "शेळीपालन", children: [] },
      { text: "मशरूम प्रकल्प", href: "/agriculture/mushroom-project", title: "मशरूम प्रकल्प", children: [] },
      { text: "गांडूळखत प्रकल्प", href: "/agriculture/vermicompost-project", title: "गांडूळखत प्रकल्प", children: [] },
      { text: "नाविन्यपूर्ण उपक्रम व उत्पादने", href: "/agriculture/innovative-activities", title: "नाविन्यपूर्ण उपक्रम व उत्पादने", children: [] }
    ]
  },
  {
    text: "सामाजिक उपक्रम",
    icon: "HeartHandshake",
    href: "#",
    title: "सामाजिक उपक्रम",
    children: [
      { text: "केशकर्तनालय", href: "/social/salon", title: "केशकर्तनालय", children: [] },
      { text: "धुलाईगृह", href: "/social/laundry", title: "धुलाईगृह", children: [] },
      { text: "श्रृंखला उपाहारगृह", href: "/social/shrinkhala-canteen", title: "श्रृंखला उपाहारगृह", children: [] },
      { text: "के. के. मंगल लॉन", href: "/social/mangal-lawn", title: "के. के. मंगल लॉन", children: [] },
      { text: "मिंडा युनिट", href: "/social/minda-unit", title: "मिंडा युनिट", children: [] }
    ]
  },
  {
    text: "सोयी-सुविधा",
    icon: "LayoutGrid",
    href: "#",
    title: "सोयी-सुविधा",
    isMegaMenu: true,
    groups: [
      {
        groupTitle: "भेट व संपर्क",
        children: [
          {
            text: "बंदी मुलाखत", href: "/facilities/prisoner-interview", title: "बंदी मुलाखत", children: [
              { text: "प्रत्यक्ष मुलाखत", href: "/facilities/prisoner-interview", title: "प्रत्यक्ष मुलाखत", children: [] },
              { text: "ई-मुलाखत", href: "/facilities/prisoner-interview", title: "ई-मुलाखत", children: [] }
            ]
          },
          {
            text: "ॲलेन स्मार्ट कार्ड फोन सुविधा", href: "/facilities/smart-card-phone", title: "ॲलेन स्मार्ट कार्ड फोन सुविधा", children: [
              { text: "ऑडिओ", href: "/facilities/smart-card-phone", title: "ऑडिओ", children: [] },
              { text: "व्हिडिओ", href: "/facilities/smart-card-phone", title: "व्हिडिओ", children: [] }
            ]
          },
          { text: "पत्रव्यवहार व मनीऑर्डर सुविधा", href: "/facilities/correspondence", title: "पत्रव्यवहार व मनीऑर्डर सुविधा", children: [] }
        ]
      },
      {
        groupTitle: "कायदेशीर व प्रशासकीय सुविधा",
        children: [
          { text: "मोफत कायदेशीर मदत", href: "/facilities/free-legal-aid", title: "मोफत कायदेशीर मदत", children: [] },
          { text: "जिल्हा विधी सेवा प्राधिकरण", href: "/facilities/district-legal-services", title: "जिल्हा विधी सेवा प्राधिकरण", children: [] },
          { text: "संचित व अभिवाचन रजा", href: "/facilities/furlough-parole", title: "संचित व अभिवाचन रजा", children: [] },
          { text: "माफी", href: "/facilities/remission", title: "माफी", children: [] }
        ]
      },
      {
        groupTitle: "आरोग्य व दैनंदिन सुविधा",
        children: [
          { text: "हिरकणी कक्ष", href: "/facilities/hirkani-room", title: "हिरकणी कक्ष", children: [] },
          { text: "व्यायामशाळा", href: "/facilities/gymnasium", title: "व्यायामशाळा", children: [] },
          { text: "वेट कॅन्टीन", href: "/facilities/wet-canteen", title: "वेट कॅन्टीन", children: [] }
        ]
      },
      {
        groupTitle: "शिक्षण व विकास",
        children: [
          { text: "शैक्षणिक सुविधा", href: "/facilities/education", title: "शैक्षणिक सुविधा", children: [] },
          { text: "ग्रंथालय", href: "/facilities/library", title: "ग्रंथालय", children: [] }
        ]
      }
    ]
  },
  {
    text: "सांस्कृतिक उपक्रम",
    icon: "Palette",
    href: "#",
    title: "सांस्कृतिक उपक्रम",
    isMegaMenu: true,
    groups: [
      {
        groupTitle: "प्रबोधन व जनजागृती",
        children: [
          { text: "प्रबोधन कार्यक्रम", href: "#", title: "प्रबोधन कार्यक्रम", children: [] },
          { text: "व्यसनमुक्ती कार्यक्रम", href: "#", title: "व्यसनमुक्ती कार्यक्रम", children: [] }
        ]
      },
      {
        groupTitle: "प्रशिक्षण व व्यक्तिमत्त्व विकास",
        children: [
          { text: "व्यावसायिक प्रशिक्षण", href: "#", title: "व्यावसायिक प्रशिक्षण", children: [] }
        ]
      },
      {
        groupTitle: "योग व आध्यात्मिक उपक्रम",
        children: [
          { text: "योग, ध्यान व धारणा", href: "#", title: "योग, ध्यान व धारणा", children: [] },
          { text: "प्राणिक हीलिंग", href: "#", title: "प्राणिक हीलिंग", children: [] },
          { text: "कीर्तन व भजन", href: "#", title: "कीर्तन व भजन", children: [] }
        ]
      }
    ]
  },
  {
    text: "उल्लेखनीय कार्य",
    icon: "Award",
    href: "#",
    title: "उल्लेखनीय कार्य",
    children: [
      { text: "उल्लेखनीय उपक्रम", href: "#", title: "उल्लेखनीय उपक्रम", children: [] },
      { text: "महत्त्वपूर्ण प्रकल्प", href: "#", title: "महत्त्वपूर्ण प्रकल्प", children: [] },
      { text: "पुरस्कार व गौरव", href: "#", title: "पुरस्कार व गौरव", children: [] },
      { text: "उत्कृष्ट कार्यपद्धती", href: "#", title: "उत्कृष्ट कार्यपद्धती", children: [] },
      { text: "परिणाम व यशोगाथा", href: "#", title: "परिणाम व यशोगाथा", children: [] }
    ]
  },
  {
    text: "दौरे व भेटी",
    icon: "Map",
    href: "#",
    title: "दौरे व भेटी",
    isMegaMenu: true,
    groups: [
      {
        groupTitle: "अभ्यासभेटी",
        children: [
          { text: "शैक्षणिक अभ्यासभेट", href: "#", title: "शैक्षणिक अभ्यासभेट", children: [] },
          { text: "संस्थात्मक अभ्यासभेट", href: "#", title: "संस्थात्मक अभ्यासभेट", children: [] }
        ]
      },
      {
        groupTitle: "प्रशासकीय दौरे",
        children: [
          { text: "अधिकारी दौरे", href: "#", title: "अधिकारी दौरे", children: [] },
          { text: "मान्यवर भेटी", href: "#", title: "मान्यवर भेटी", children: [] },
          { text: "निरीक्षण दौरे", href: "#", title: "निरीक्षण दौरे", children: [] },
          { text: "विभागीय भेटी", href: "#", title: "विभागीय भेटी", children: [] }
        ]
      }
    ]
  },
  {
    text: "आमची उत्पादने",
    icon: "Package",
    href: "/our-products",
    title: "आमची उत्पादने",
    children: []
  },
  {
    text: "संपर्क",
    icon: "PhoneCall",
    href: "#",
    title: "संपर्क",
    children: []
  }
];

// In the old UI, 'text' served as both the English translation key and the Marathi string.
// We will assume labelEn = labelMr for now, admins can edit translations in the CMS later.
async function createNode(item, parentId, order) {
  const isMegaGroup = item.isGroup === true;
  
  const created = await prisma.menuItem.create({
    data: {
      parentId: parentId,
      labelEn: item.title || item.text,
      labelMr: item.text,
      href: item.href || '#',
      icon: item.icon || null,
      order: order,
      isMegaGroup: isMegaGroup,
      visible: true
    }
  });

  if (item.children && item.children.length > 0) {
    for (let i = 0; i < item.children.length; i++) {
      await createNode(item.children[i], created.id, i);
    }
  }

  if (item.groups && item.groups.length > 0) {
    for (let i = 0; i < item.groups.length; i++) {
      const g = item.groups[i];
      await createNode({
        text: g.groupTitle,
        title: g.groupTitle, // En equivalent roughly
        isGroup: true, // we use this flag internally to pass to createNode
        children: g.children
      }, created.id, i);
    }
  }
}

async function main() {
  console.log('Clearing old menu items...');
  await prisma.menuItem.deleteMany({});
  
  console.log('Seeding navigation menu...');
  for (let i = 0; i < navigation_menu.length; i++) {
    await createNode(navigation_menu[i], null, i);
  }
  
  console.log('Menu seeded successfully!');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
