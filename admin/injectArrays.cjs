const fs = require('fs');
let content = fs.readFileSync('src/utils/templateDummyData.ts', 'utf8');

const injection = `
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
`;

content = content.replace('const listItemsArray = [', injection + '\n  const listItemsArray = [');
fs.writeFileSync('src/utils/templateDummyData.ts', content);
