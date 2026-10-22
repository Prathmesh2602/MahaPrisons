import * as defaults from './templatePlaceholders';

export const normalizeTemplateData = (data, layoutType) => {
  const d = data || {};
  
  const getObj = (obj, fallback) => {
    if (!obj) return fallback;
    if (typeof obj === 'string') return obj.trim() === '' ? fallback : obj;
    if (typeof obj === 'object' && !Array.isArray(obj)) {
      if (Object.keys(obj).length === 0) return fallback;
      if (obj.en !== undefined || obj.mr !== undefined) {
        if ((!obj.en || obj.en.trim() === '') && (!obj.mr || obj.mr.trim() === '')) {
          return fallback;
        }
      }
    }
    return obj;
  };

  const getImg = (img, fallback) => {
    if (!img || img.trim() === '') return fallback;
    return img;
  };

  // Extract or fallback base fields, checking hero first then top level
  const title = getObj(d.hero?.title, getObj(d.title, defaults.defaultTitle));
  const subtitle = getObj(d.hero?.subtitle, getObj(d.subtitle, defaults.defaultSubtitle));
  const description = getObj(d.hero?.description, getObj(d.description, defaults.defaultDescription));
  const image = getImg(d.hero?.heroImage, getImg(d.image, defaults.defaultPlaceholderImage));

  // The components expect `data.hero.title`, so we provide it
  const base = {
    ...d,
    title,
    subtitle,
    description,
    image,
    hero: {
      ...d.hero,
      title,
      subtitle,
      description,
      heroImage: image,
    }
  };

  // Helper to fallback array
  const getArray = (arr, fallback) => {
    if (!Array.isArray(arr) || arr.length === 0) return fallback;
    return arr.map((item, index) => {
      if (typeof item === 'object' && item !== null) {
        let isEmpty = true;
        for (const key of Object.keys(item)) {
          if (key === '_key' || key === 'id') continue;
          const val = item[key];
          if (val !== undefined && val !== null) {
            if (typeof val === 'object') {
              if ((val.en && val.en.trim() !== '') || (val.mr && val.mr.trim() !== '')) {
                isEmpty = false;
                break;
              }
            } else if (typeof val === 'string' && val.trim() !== '') {
              isEmpty = false;
              break;
            } else if (typeof val === 'number' || typeof val === 'boolean') {
              isEmpty = false;
              break;
            }
          }
        }
        if (isEmpty && fallback && fallback[index]) {
          return fallback[index];
        }
      }
      return item;
    });
  };
  switch (layoutType) {
    case 'HeroFeaturesTimelineLayout':
      return {
        ...base,
        stats: getArray(d.stats, defaults.defaultStatsArray),
        keyFunctions: getArray(d.keyFunctions, defaults.defaultGenericArray),
        contactList: d.contactList,
        contactInfo: getObj(d.contactInfo, defaults.defaultContactInfo)
      };
    case 'HeroStatsGrid':
      return {
        ...base,
        stats: getArray(d.features, defaults.defaultGenericArray), // it uses features? wait
        features: getArray(d.features, defaults.defaultGenericArray),
        gallery: getArray(d.gallery, defaults.defaultGallery),
        timings: getArray(d.timings, defaults.defaultTimingsArray)
      };
    case 'HeroThreeColGrid':
      return {
        ...base,
        productionStats: getArray(d.productionStats, defaults.defaultStatsArray),
        activeProjects: getArray(d.activeProjects, defaults.defaultGenericArray),
        impactStatement: getObj(d.impactStatement, { title: defaults.defaultTitle, desc: defaults.defaultDescription })
      };
    case 'HeroSplitTimeline':
      return {
        ...base,
        coreProtocols: getArray(d.coreProtocols, defaults.defaultGenericArray),
        infrastructure: getArray(d.infrastructure, defaults.defaultGenericArray),
        alertMessage: getObj(d.alertMessage, { en: 'Important Alert Notice here', mr: 'येथे महत्त्वाची सूचना' })
      };
    case 'HeroFeatureList':
      return {
        ...base,
        highlights: getArray(d.highlights, defaults.defaultGenericArray),
        contentSections: getArray(d.contentSections, defaults.defaultGenericArray),
        features: getArray(d.features, defaults.defaultGenericArray),
        listItems: getArray(d.listItems, defaults.defaultListItemsArray)
      };
    case 'GalleryLayout':
      return {
        ...base,
        gallery: getArray(d.gallery, defaults.defaultGallery)
      };
    case 'ProductsLayout':
      return {
        ...base,
        products: getArray(d.products, defaults.defaultProducts)
      };
    case 'BasicFeatureGrid':
      return { ...base,
        keyFunctions: getArray(d.keyFunctions, defaults.defaultGenericArray),
        stats: getArray(d.stats, defaults.defaultStatsArray),
        contactInfo: getArray(d.contactInfo, defaults.defaultContactInfoWithTextArray), features: getArray(d.features, defaults.defaultGenericArray) };
    case 'CardsAndVerticalTimeline':
      return { ...base,
        keyFunctions: getArray(d.keyFunctions, defaults.defaultGenericArray),
        stats: getArray(d.stats, defaults.defaultStatsArray),
        contactInfo: getArray(d.contactInfo, defaults.defaultContactInfoWithTextArray), cards: getArray(d.cards, defaults.defaultGenericArray), timelineEvents: getArray(d.timelineEvents, defaults.defaultGenericArray) };
    case 'ContactInfoGrid':
      return { 
        ...base, 
        stats: getArray(d.stats, defaults.defaultStatsArray),
        keyFunctions: getArray(d.keyFunctions, defaults.defaultGenericArray),
        contactInfo: getArray(d.contactInfo, defaults.defaultContactInfoWithTextArray)
      };
    case 'ContentWithAccordion':
      return { ...base,
        keyFunctions: getArray(d.keyFunctions, defaults.defaultGenericArray),
        stats: getArray(d.stats, defaults.defaultStatsArray),
        contactInfo: getArray(d.contactInfo, defaults.defaultContactInfoWithTextArray), accordionItems: getArray(d.accordionItems, defaults.defaultGenericArray) };
    case 'ContentWithRightSidebar':
      return { 
        ...base, 
        stats: getArray(d.stats, defaults.defaultStatsArray),
        keyFunctions: getArray(d.keyFunctions, defaults.defaultGenericArray),
        contactInfo: getArray(d.contactInfo, defaults.defaultContactInfoWithValueArray)
      };
    case 'ContentWithTabs':
      return { ...base,
        keyFunctions: getArray(d.keyFunctions, defaults.defaultGenericArray),
        stats: getArray(d.stats, defaults.defaultStatsArray),
        contactInfo: getArray(d.contactInfo, defaults.defaultContactInfoWithTextArray), tabs: getArray(d.tabs, defaults.defaultTabs) };
    case 'HeroBannerWithArticles':
      return { ...base,
        keyFunctions: getArray(d.keyFunctions, defaults.defaultGenericArray),
        stats: getArray(d.stats, defaults.defaultStatsArray),
        contactInfo: getArray(d.contactInfo, defaults.defaultContactInfoWithTextArray), articles: getArray(d.articles, defaults.defaultGenericArray) };
    case 'HeroBannerWithBadges':
      return { ...base,
        stats: getArray(d.stats, defaults.defaultStatsArray),
        keyFunctions: getArray(d.keyFunctions, defaults.defaultGenericArray),
        contactInfo: getArray(d.contactInfo, defaults.defaultContactInfoWithTextArray), badges: getArray(d.badges, defaults.defaultStatsArray) };
    case 'HeroBannerWithMedia':
      return { ...base,
        stats: getArray(d.stats, defaults.defaultStatsArray),
        keyFunctions: getArray(d.keyFunctions, defaults.defaultGenericArray),
        contactInfo: getArray(d.contactInfo, defaults.defaultContactInfoWithTextArray), mediaItems: getArray(d.mediaItems, defaults.defaultMediaItems) };
    case 'HeroWithMenuGrid':
      return { ...base,
        menuHighlights: getArray(d.menuHighlights, defaults.defaultGenericArray), menuItems: getArray(d.menuItems, defaults.defaultGenericArray.map(g => ({ label: g.title, href: '#', icon: g.icon }))) };
    case 'HeroWithPricingList':
      return { ...base,
        services: getArray(d.services, defaults.defaultGenericArray), pricingPlans: getArray(d.pricingPlans, defaults.defaultPricingPlans) };
    case 'HeroWithProcessGrid':
      return { 
        ...base, 
        stats: getArray(d.stats, defaults.defaultStatsArray),
        technicalFocus: getArray(d.technicalFocus, defaults.defaultGenericArray) 
      };
    case 'IconsListWithTimeline':
      return { ...base,
        stats: getArray(d.stats, defaults.defaultStatsArray),
        keyFunctions: getArray(d.keyFunctions, defaults.defaultGenericArray),
        contactInfo: getArray(d.contactInfo, defaults.defaultContactInfoWithTextArray), iconList: getArray(d.iconList, defaults.defaultGenericArray), timeline: getArray(d.timeline, defaults.defaultGenericArray) };
    case 'MinimalIconGrid':
      return { ...base,
        stats: getArray(d.stats, defaults.defaultStatsArray),
        keyFunctions: getArray(d.keyFunctions, defaults.defaultGenericArray),
        contactInfo: getArray(d.contactInfo, defaults.defaultContactInfoWithTextArray), gridItems: getArray(d.gridItems, defaults.defaultGenericArray) };
    case 'SideBySideListCards':
      return { ...base,
        stats: getArray(d.stats, defaults.defaultStatsArray),
        keyFunctions: getArray(d.keyFunctions, defaults.defaultGenericArray),
        contactInfo: getArray(d.contactInfo, defaults.defaultContactInfoWithTextArray), listCards: getArray(d.listCards, defaults.defaultGenericArray) };
    case 'ThreeColServiceCards':
      return { ...base,
        features: getArray(d.features, defaults.defaultGenericArray), 
        services: getArray(d.services, defaults.defaultGenericArray),
        gallery: (Array.isArray(d.gallery) && d.gallery.length > 0)
          ? d.gallery
          : (d.heroImage1 || d.hero?.heroImage1 || d.heroImage2 || d.hero?.heroImage2
            ? [d.heroImage1 || d.hero?.heroImage1, d.heroImage2 || d.hero?.heroImage2].filter(Boolean)
            : [defaults.defaultPlaceholderImage, defaults.defaultPlaceholderImage])
      };
    case 'TwoColEventCards':
      return { ...base,
        venueFeatures: getArray(d.venueFeatures, defaults.defaultGenericArray), events: getArray(d.events, defaults.defaultEvents) };
    default:
      return base;
  }
};
