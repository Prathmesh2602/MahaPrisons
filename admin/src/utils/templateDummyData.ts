export const getTemplateDummyData = (templateId: string) => {
  const defaultText = { en: 'Lorem ipsum dolor sit amet', mr: 'लोरेम इप्सम डॉलर सिट अमेट' };
  const defaultTitle = { en: 'Sample Title', mr: 'नमुना शीर्षक' };
  const defaultDesc = { 
    en: 'This is a placeholder description. You can edit this text to add your own content. It gives a good idea of how the layout will look.', 
    mr: 'हे प्लेसहोल्डर वर्णन आहे. आपण आपली स्वतःची सामग्री जोडण्यासाठी हा मजकूर संपादित करू शकता. हे लेआउट कसे दिसेल याची चांगली कल्पना देते.' 
  };
  const placeholderImg = 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1200';
  const iconImg = 'Shield'; // Default lucide icon

  const baseContent = {
    title: { en: 'Sample Template Title', mr: 'नमुना टेम्पलेट शीर्षक' },
    subtitle: { en: 'Sample Subtitle Text', mr: 'नमुना उपशीर्षक मजकूर' },
    description: defaultDesc,
    image: placeholderImg,
  };

  const genericArray = [
    { title: defaultTitle, description: defaultDesc, icon: iconImg },
    { title: defaultTitle, description: defaultDesc, icon: 'Star' },
    { title: defaultTitle, description: defaultDesc, icon: 'Heart' },
  ];

  const statsArray = [
    { label: { en: 'Total Count', mr: 'एकूण संख्या' }, value: '1,234', icon: 'Users' },
    { label: { en: 'Active', mr: 'सक्रिय' }, value: '85%', icon: 'Activity' },
    { label: { en: 'Projects', mr: 'प्रकल्प' }, value: '42', icon: 'Folder' }
  ];

  
  const contactInfoWithValueArray = [
    { icon: 'MapPin', value: { en: '123 Head Office, Mumbai', mr: '१२३ मुख्य कार्यालय, मुंबई' } },
    { icon: 'Phone', value: { en: '+91 1234567890', mr: '+९१ १२३४५६७८९०' } },
    { icon: 'Mail', value: { en: 'contact@mahaprisons.gov.in', mr: 'contact@mahaprisons.gov.in' } }
  ];

  const contactInfoWithTextArray = [
    { icon: 'MapPin', text: { en: '123 Head Office, Mumbai', mr: '१२३ मुख्य कार्यालय, मुंबई' } },
    { icon: 'Phone', text: { en: '+91 1234567890', mr: '+९१ १२३४५६७८९०' } },
    { icon: 'Mail', text: { en: 'contact@mahaprisons.gov.in', mr: 'contact@mahaprisons.gov.in' } }
  ];

  const listItemsArray = [
    { text: defaultText }, { text: defaultText }, { text: defaultText }
  ];

  const timingsArray = [
    { day: { en: 'Monday to Friday', mr: 'सोमवार ते शुक्रवार' }, hours: { en: '10:00 AM - 5:00 PM', mr: 'सकाळी १०:०० ते सायंकाळी ५:००' } },
    { day: { en: 'Saturday', mr: 'शनिवार' }, hours: { en: '10:00 AM - 1:00 PM', mr: 'सकाळी १०:०० ते दुपारी १:००' } }
  ];

  switch (templateId) {
    case 'HeroFeaturesTimelineLayout':
      return {
        ...baseContent,
        stats: statsArray,
        keyFunctions: genericArray,
        contactInfo: { email: 'sample@example.com', phone: '+91 1234567890', address: { en: '123 Sample St, Pune', mr: '१२३ नमुना रस्ता, पुणे' } }
      };
    case 'HeroStatsGrid':
      return {
        ...baseContent,
        features: genericArray,
        gallery: [
          { url: placeholderImg, caption: defaultTitle },
          { url: placeholderImg, caption: defaultTitle }
        ],
        timings: timingsArray
      };
    case 'HeroThreeColGrid':
      return {
        ...baseContent,
        productionStats: statsArray,
        activeProjects: genericArray,
        impactStatement: { title: defaultTitle, desc: defaultDesc }
      };
    case 'HeroSplitTimeline':
      return {
        ...baseContent,
        coreProtocols: genericArray,
        infrastructure: genericArray,
        alertMessage: { en: 'Important Notice here', mr: 'येथे महत्त्वाची सूचना' }
      };
    case 'HeroFeatureList':
      return {
        ...baseContent,
        highlights: genericArray,
        contentSections: genericArray,
        features: genericArray,
        listItems: listItemsArray
      };
    case 'GalleryLayout':
      return {
        ...baseContent,
        gallery: [
          { url: placeholderImg, caption: defaultTitle, category: 'A' },
          { url: placeholderImg, caption: defaultTitle, category: 'B' },
          { url: placeholderImg, caption: defaultTitle, category: 'A' },
          { url: placeholderImg, caption: defaultTitle, category: 'B' }
        ]
      };
    case 'ProductsLayout':
      return {
        ...baseContent,
        products: [
          { 
            name: { en: 'Sample Product 1', mr: 'नमुना उत्पादन १' }, 
            description: defaultDesc, 
            price: { en: '₹100', mr: '₹१००' }, 
            image: placeholderImg, 
            category: 'Category 1' 
          },
          { 
            name: { en: 'Sample Product 2', mr: 'नमुना उत्पादन २' }, 
            description: defaultDesc, 
            price: { en: '₹200', mr: '₹२००' }, 
            image: placeholderImg, 
            category: 'Category 2' 
          }
        ]
      };
    case 'BasicFeatureGrid':
      return { ...baseContent,
        keyFunctions: genericArray,
        stats: statsArray,
        contactInfo: contactInfoWithTextArray, features: genericArray };
    case 'CardsAndVerticalTimeline':
      return { ...baseContent,
        keyFunctions: genericArray,
        stats: statsArray,
        contactInfo: contactInfoWithTextArray, cards: genericArray, timelineEvents: genericArray };
    case 'ContactInfoGrid':
      return { 
        ...baseContent, 
        stats: statsArray,
        keyFunctions: genericArray,
        contactInfo: contactInfoWithTextArray 
      };
    case 'ContentWithAccordion':
      return { ...baseContent,
        keyFunctions: genericArray,
        stats: statsArray,
        contactInfo: contactInfoWithTextArray, accordionItems: genericArray };
    case 'ContentWithRightSidebar':
      return { 
        ...baseContent, 
        stats: statsArray,
        keyFunctions: genericArray,
        contactInfo: contactInfoWithValueArray
      };
    case 'ContentWithTabs':
      return { ...baseContent,
        keyFunctions: genericArray,
        stats: statsArray,
        contactInfo: contactInfoWithTextArray, tabs: genericArray.map((g, i) => ({ id: `tab-${i}`, label: g.title, content: g.description })) };
    case 'HeroBannerWithArticles':
      return { ...baseContent,
        keyFunctions: genericArray,
        stats: statsArray,
        contactInfo: contactInfoWithTextArray, articles: genericArray };
    case 'HeroBannerWithBadges':
      return { ...baseContent,
        stats: statsArray,
        keyFunctions: genericArray,
        contactInfo: contactInfoWithTextArray, badges: statsArray };
    case 'HeroBannerWithMedia':
      return { ...baseContent,
        stats: statsArray,
        keyFunctions: genericArray,
        contactInfo: contactInfoWithTextArray, mediaItems: [{ type: 'image', url: placeholderImg, caption: defaultTitle }] };
    case 'HeroWithMenuGrid':
      return { ...baseContent,
        menuHighlights: genericArray, menuItems: genericArray.map(g => ({ label: g.title, href: '#', icon: g.icon })) };
    case 'HeroWithPricingList':
      return { ...baseContent,
        services: genericArray, pricingPlans: genericArray.map(g => ({ planName: g.title, price: {en: '₹999', mr: '₹९९९'}, features: listItemsArray })) };
    case 'HeroWithProcessGrid':
      return { 
        ...baseContent, 
        stats: statsArray,
        technicalFocus: genericArray
      };
    case 'IconsListWithTimeline':
      return { ...baseContent,
        stats: statsArray,
        keyFunctions: genericArray,
        contactInfo: contactInfoWithTextArray, iconList: genericArray, timeline: genericArray };
    case 'MinimalIconGrid':
      return { ...baseContent,
        stats: statsArray,
        keyFunctions: genericArray,
        contactInfo: contactInfoWithTextArray, gridItems: genericArray };
    case 'SideBySideListCards':
      return { ...baseContent,
        stats: statsArray,
        keyFunctions: genericArray,
        contactInfo: contactInfoWithTextArray, listCards: genericArray };
    case 'ThreeColServiceCards':
      return { ...baseContent,
        features: genericArray, services: genericArray };
    case 'TwoColEventCards':
      return { ...baseContent,
        venueFeatures: genericArray, events: genericArray.map(g => ({ ...g, date: {en: '25 Oct 2026', mr: '२५ ऑक्टो २०२६'}, time: {en: '10:00 AM', mr: 'सकाळी १०:००'} })) };
    default:
      return baseContent;
  }
};
