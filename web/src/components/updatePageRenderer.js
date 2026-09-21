const fs = require('fs');
let code = fs.readFileSync('PageRenderer.tsx', 'utf8');

const newLayouts = [
  'ContactInfoGrid', 'ContentWithRightSidebar', 'ContentWithTabs', 'BasicFeatureGrid', 'CardsAndVerticalTimeline', 
  'IconsListWithTimeline', 'MinimalIconGrid', 'HeroBannerWithArticles', 'SideBySideListCards', 'HeroBannerWithBadges', 
  'HeroBannerWithMedia', 'ContentWithAccordion', 'ThreeColServiceCards', 'TwoColEventCards', 'HeroWithProcessGrid', 
  'HeroWithPricingList', 'HeroWithMenuGrid'
];

code = code.replace(
  "const templateLayouts = ['HeroFeaturesTimelineLayout', 'HeroStatsGrid', 'HeroThreeColGrid', 'HeroSplitTimeline', 'HeroFeatureList'];",
  `const templateLayouts = ['HeroFeaturesTimelineLayout', 'HeroStatsGrid', 'HeroThreeColGrid', 'HeroSplitTimeline', 'HeroFeatureList', ${newLayouts.map(l => "'" + l + "'").join(', ')}];`
);

const imports = newLayouts.map(l => `import ${l} from '../templates/${l}';`).join('\n');
code = imports + '\n' + code;

const cases = newLayouts.map(l => `    } else if (layoutType === '${l}') {\n      return <${l} dataId={slug.split('/').pop()} data={templateData} />;`).join('\n');

code = code.replace(
  "    } else if (layoutType === 'HeroFeatureList') {\n      return <HeroFeatureList dataId={slug} data={templateData} />;\n    }",
  "    } else if (layoutType === 'HeroFeatureList') {\n      return <HeroFeatureList dataId={slug} data={templateData} />;\n" + cases + "\n    }"
);

fs.writeFileSync('PageRenderer.tsx', code);
