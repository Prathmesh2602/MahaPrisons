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
    description: { ...defaultDesc },
    image: placeholderImg,
  };

  const genericArray = [
    { _key: 'gen_1', title: { ...defaultTitle }, description: { ...defaultDesc }, icon: iconImg },
    { _key: 'gen_2', title: { ...defaultTitle }, description: { ...defaultDesc }, icon: 'Star' },
    { _key: 'gen_3', title: { ...defaultTitle }, description: { ...defaultDesc }, icon: 'Heart' },
  ];

  const statsArray = [
    { _key: 'stat_1', label: { en: 'Total Count', mr: 'एकूण संख्या' }, value: '1,234', icon: 'Users' },
    { _key: 'stat_2', label: { en: 'Active', mr: 'सक्रिय' }, value: '85%', icon: 'Activity' },
    { _key: 'stat_3', label: { en: 'Projects', mr: 'प्रकल्प' }, value: '42', icon: 'Folder' }
  ];

  const contactInfoWithValueArray = [
    { _key: 'contact_v_1', icon: 'MapPin', value: { en: '123 Head Office, Mumbai', mr: '१२३ मुख्य कार्यालय, मुंबई' } },
    { _key: 'contact_v_2', icon: 'Phone', value: { en: '+91 1234567890', mr: '+९१ १२३४५६७८९०' } },
    { _key: 'contact_v_3', icon: 'Mail', value: { en: 'contact@mahaprisons.gov.in', mr: 'contact@mahaprisons.gov.in' } }
  ];

  const contactInfoWithTextArray = [
    { _key: 'contact_t_1', icon: 'MapPin', text: { en: '123 Head Office, Mumbai', mr: '१२३ मुख्य कार्यालय, मुंबई' } },
    { _key: 'contact_t_2', icon: 'Phone', text: { en: '+91 1234567890', mr: '+९१ १२३४५६७८९०' } },
    { _key: 'contact_t_3', icon: 'Mail', text: { en: 'contact@mahaprisons.gov.in', mr: 'contact@mahaprisons.gov.in' } }
  ];

  const listItemsArray = [
    { _key: 'list_1', text: { ...defaultText } },
    { _key: 'list_2', text: { ...defaultText } },
    { _key: 'list_3', text: { ...defaultText } }
  ];

  const timingsArray = [
    { _key: 'timing_1', day: { en: 'Monday to Friday', mr: 'सोमवार ते शुक्रवार' }, hours: { en: '10:00 AM - 5:00 PM', mr: 'सकाळी १०:०० ते सायंकाळी ५:००' } },
    { _key: 'timing_2', day: { en: 'Saturday', mr: 'शनिवार' }, hours: { en: '10:00 AM - 1:00 PM', mr: 'सकाळी १०:०० ते दुपारी १:००' } }
  ];

  const clone = (obj: any) => JSON.parse(JSON.stringify(obj));

  switch (templateId) {
    case 'HeroFeaturesTimelineLayout':
      return {
        ...clone(baseContent),
        stats: clone(statsArray),
        keyFunctions: clone(genericArray),
        contactInfo: { email: 'sample@example.com', phone: '+91 1234567890', address: { en: '123 Sample St, Pune', mr: '१२३ नमुना रस्ता, पुणे' } }
      };
    case 'HeroStatsGrid':
      return {
        ...clone(baseContent),
        features: clone(genericArray),
        gallery: [
          { _key: 'gal_1', url: placeholderImg, caption: { ...defaultTitle } },
          { _key: 'gal_2', url: placeholderImg, caption: { ...defaultTitle } }
        ],
        timings: clone(timingsArray)
      };
    case 'HeroThreeColGrid':
      return {
        ...clone(baseContent),
        productionStats: clone(statsArray),
        activeProjects: clone(genericArray),
        impactStatement: { title: { ...defaultTitle }, desc: { ...defaultDesc } }
      };
    case 'HeroSplitTimeline':
      return {
        ...clone(baseContent),
        coreProtocols: clone(genericArray),
        infrastructure: clone(genericArray),
        alertMessage: { en: 'Important Notice here', mr: 'येथे महत्त्वाची सूचना' }
      };
    case 'HeroFeatureList':
      return {
        ...clone(baseContent),
        highlights: clone(genericArray),
        contentSections: clone(genericArray),
        features: clone(genericArray),
        listItems: clone(listItemsArray)
      };
    case 'GalleryLayout':
      return {
        ...clone(baseContent),
        gallery: [
          { _key: 'gal_1', url: placeholderImg, caption: { ...defaultTitle }, category: 'A' },
          { _key: 'gal_2', url: placeholderImg, caption: { ...defaultTitle }, category: 'B' },
          { _key: 'gal_3', url: placeholderImg, caption: { ...defaultTitle }, category: 'A' },
          { _key: 'gal_4', url: placeholderImg, caption: { ...defaultTitle }, category: 'B' }
        ]
      };
    case 'ProductsLayout':
      return {
        ...clone(baseContent),
        products: [
          { 
            _key: 'prod_1',
            name: { en: 'Sample Product 1', mr: 'नमुना उत्पादन १' }, 
            description: { ...defaultDesc }, 
            price: { en: '₹100', mr: '₹१००' }, 
            image: placeholderImg, 
            category: 'Category 1' 
          },
          { 
            _key: 'prod_2',
            name: { en: 'Sample Product 2', mr: 'नमुना उत्पादन २' }, 
            description: { ...defaultDesc }, 
            price: { en: '₹200', mr: '₹२००' }, 
            image: placeholderImg, 
            category: 'Category 2' 
          }
        ]
      };
    case 'BasicFeatureGrid':
      return { 
        ...clone(baseContent),
        keyFunctions: clone(genericArray),
        stats: clone(statsArray),
        contactInfo: clone(contactInfoWithTextArray), 
        features: clone(genericArray) 
      };
    case 'CardsAndVerticalTimeline':
      return { 
        ...clone(baseContent),
        keyFunctions: clone(genericArray),
        stats: clone(statsArray),
        contactInfo: clone(contactInfoWithTextArray), 
        cards: clone(genericArray), 
        timelineEvents: clone(genericArray) 
      };
    case 'ContactInfoGrid':
      return { 
        ...clone(baseContent), 
        stats: clone(statsArray),
        keyFunctions: clone(genericArray),
        contactInfo: clone(contactInfoWithTextArray) 
      };
    case 'ContentWithAccordion':
      return { 
        ...clone(baseContent),
        keyFunctions: clone(genericArray),
        stats: clone(statsArray),
        contactInfo: clone(contactInfoWithTextArray), 
        accordionItems: clone(genericArray) 
      };
    case 'ContentWithRightSidebar':
      return { 
        ...clone(baseContent), 
        stats: clone(statsArray),
        keyFunctions: clone(genericArray),
        contactInfo: clone(contactInfoWithValueArray)
      };
    case 'ContentWithTabs':
      return { 
        ...clone(baseContent),
        keyFunctions: clone(genericArray),
        stats: clone(statsArray),
        contactInfo: clone(contactInfoWithTextArray), 
        tabs: genericArray.map((g, i) => ({ _key: `tab_${i+1}`, id: `tab-${i}`, label: { ...g.title }, content: { ...g.description } })) 
      };
    case 'HeroBannerWithArticles':
      return { 
        ...clone(baseContent),
        keyFunctions: clone(genericArray),
        stats: clone(statsArray),
        contactInfo: clone(contactInfoWithTextArray), 
        articles: clone(genericArray) 
      };
    case 'HeroBannerWithBadges':
      return { 
        ...clone(baseContent),
        stats: clone(statsArray),
        keyFunctions: clone(genericArray),
        contactInfo: clone(contactInfoWithTextArray), 
        badges: clone(statsArray) 
      };
    case 'HeroBannerWithMedia':
      return { 
        ...clone(baseContent),
        stats: clone(statsArray),
        keyFunctions: clone(genericArray),
        contactInfo: clone(contactInfoWithTextArray), 
        mediaItems: [{ _key: 'media_1', type: 'image', url: placeholderImg, caption: { ...defaultTitle } }] 
      };
    case 'HeroWithMenuGrid':
      return { 
        ...clone(baseContent),
        menuHighlights: clone(genericArray), 
        menuItems: genericArray.map((g, idx) => ({ _key: `menu_${idx+1}`, label: { ...g.title }, href: '#', icon: g.icon })) 
      };
    case 'HeroWithPricingList':
      return { 
        ...clone(baseContent),
        services: clone(genericArray), 
        pricingPlans: genericArray.map((g, idx) => ({ _key: `plan_${idx+1}`, planName: { ...g.title }, price: {en: '₹999', mr: '₹९९९'}, features: clone(listItemsArray) })) 
      };
    case 'HeroWithProcessGrid':
      return { 
        ...clone(baseContent), 
        stats: clone(statsArray),
        technicalFocus: clone(genericArray)
      };
    case 'IconsListWithTimeline':
      return { 
        ...clone(baseContent),
        stats: clone(statsArray),
        keyFunctions: clone(genericArray),
        contactInfo: clone(contactInfoWithTextArray), 
        iconList: clone(genericArray), 
        timeline: clone(genericArray) 
      };
    case 'MinimalIconGrid':
      return { 
        ...clone(baseContent),
        stats: clone(statsArray),
        keyFunctions: clone(genericArray),
        contactInfo: clone(contactInfoWithTextArray), 
        gridItems: clone(genericArray) 
      };
    case 'SideBySideListCards':
      return { 
        ...clone(baseContent),
        stats: clone(statsArray),
        keyFunctions: clone(genericArray),
        contactInfo: clone(contactInfoWithTextArray), 
        listCards: clone(genericArray) 
      };
    case 'ThreeColServiceCards':
      return { 
        ...clone(baseContent),
        features: clone(genericArray), 
        services: clone(genericArray),
        gallery: [
          'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1200',
          'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=1200'
        ]
      };
    case 'TwoColEventCards':
      return { 
        ...clone(baseContent),
        venueFeatures: clone(genericArray), 
        events: genericArray.map((g, idx) => ({ _key: `event_${idx+1}`, ...clone(g), date: {en: '25 Oct 2026', mr: '२५ ऑक्टो २०२६'}, time: {en: '10:00 AM', mr: 'सकाळी १०:००'} })) 
      };
    default:
      return clone(baseContent);
  }
};
