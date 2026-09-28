const fs = require('fs');
let content = fs.readFileSync('src/utils/templateDummyData.ts', 'utf8');

const missingMap = {
  'BasicFeatureGrid': ['keyFunctions', 'stats', 'contactInfo'],
  'CardsAndVerticalTimeline': ['keyFunctions', 'stats', 'contactInfo'],
  'ContentWithAccordion': ['keyFunctions', 'stats', 'contactInfo'],
  'ContentWithTabs': ['keyFunctions', 'stats', 'contactInfo'],
  'HeroBannerWithArticles': ['keyFunctions', 'stats', 'contactInfo'],
  'HeroBannerWithBadges': ['stats', 'keyFunctions', 'contactInfo'],
  'HeroBannerWithMedia': ['stats', 'keyFunctions', 'contactInfo'],
  'HeroFeatureList': ['highlights', 'contentSections'],
  'HeroWithMenuGrid': ['menuHighlights'],
  'HeroWithPricingList': ['services'],
  'IconsListWithTimeline': ['stats', 'keyFunctions', 'contactInfo'],
  'MinimalIconGrid': ['stats', 'keyFunctions', 'contactInfo'],
  'SideBySideListCards': ['stats', 'keyFunctions', 'contactInfo'],
  'ThreeColServiceCards': ['features'],
  'TwoColEventCards': ['venueFeatures']
};

for (const [template, missing] of Object.entries(missingMap)) {
  const caseRegex = new RegExp(`(case '${template}':\\s*return \\{\\s*\\.\\.\\.baseContent,)`);
  
  let newFields = '';
  for (const m of missing) {
    if (m === 'stats' || m === 'productionStats') newFields += `\n        ${m}: statsArray,`;
    else if (m === 'contactInfo') newFields += `\n        ${m}: contactInfoWithTextArray,`;
    else newFields += `\n        ${m}: genericArray,`;
  }
  
  content = content.replace(caseRegex, `$1${newFields}`);
}

fs.writeFileSync('src/utils/templateDummyData.ts', content);
