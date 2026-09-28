import { Shield, Star, Heart, Users, Activity, Folder, ChevronRight, Check } from 'lucide-react';

export const defaultTitle = { en: 'Sample Layout Title', mr: 'नमुना लेआउट शीर्षक' };
export const defaultSubtitle = { en: 'Sample Subtitle Here', mr: 'येथे नमुना उपशीर्षक' };
export const defaultDescription = { 
  en: 'This is a placeholder description. Once you update the database, this text will be replaced automatically. It gives you an idea of the structure.', 
  mr: 'हे प्लेसहोल्डर वर्णन आहे. आपण डेटाबेस अद्यतनित केल्यानंतर, हा मजकूर स्वयंचलितपणे बदलला जाईल. हे आपल्याला संरचनेची कल्पना देते.' 
};
export const defaultPlaceholderImage = 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1200';

export const defaultGenericItem = { title: defaultTitle, description: defaultDescription, icon: 'Shield' };

export const defaultGenericArray = [
  { title: defaultTitle, description: defaultDescription, icon: 'Shield' },
  { title: defaultTitle, description: defaultDescription, icon: 'Star' },
  { title: defaultTitle, description: defaultDescription, icon: 'Heart' },
];

export const defaultStatsArray = [
  { label: { en: 'Total Count', mr: 'एकूण संख्या' }, value: '1,234', icon: 'Users' },
  { label: { en: 'Active', mr: 'सक्रिय' }, value: '85%', icon: 'Activity' },
  { label: { en: 'Projects', mr: 'प्रकल्प' }, value: '42', icon: 'Folder' }
];

export const defaultTimingsArray = [
  { day: { en: 'Monday to Friday', mr: 'सोमवार ते शुक्रवार' }, hours: { en: '10:00 AM - 5:00 PM', mr: 'सकाळी १०:०० ते सायंकाळी ५:००' } },
  { day: { en: 'Saturday', mr: 'शनिवार' }, hours: { en: '10:00 AM - 1:00 PM', mr: 'सकाळी १०:०० ते दुपारी १:००' } }
];

export const defaultContactInfoWithValueArray = [
  { icon: 'MapPin', value: { en: '123 Head Office, Mumbai', mr: '१२३ मुख्य कार्यालय, मुंबई' } },
  { icon: 'Phone', value: { en: '+91 1234567890', mr: '+९१ १२३४५६७८९०' } },
  { icon: 'Mail', value: { en: 'contact@mahaprisons.gov.in', mr: 'contact@mahaprisons.gov.in' } }
];

export const defaultContactInfoWithTextArray = [
  { icon: 'MapPin', text: { en: '123 Head Office, Mumbai', mr: '१२३ मुख्य कार्यालय, मुंबई' } },
  { icon: 'Phone', text: { en: '+91 1234567890', mr: '+९१ १२३४५६७८९०' } },
  { icon: 'Mail', text: { en: 'contact@mahaprisons.gov.in', mr: 'contact@mahaprisons.gov.in' } }
];

export const defaultListItemsArray = [
  { text: { en: 'First list item placeholder', mr: 'पहिली यादी आयटम प्लेसहोल्डर' } },
  { text: { en: 'Second list item placeholder', mr: 'दुसरी यादी आयटम प्लेसहोल्डर' } },
  { text: { en: 'Third list item placeholder', mr: 'तिसरी यादी आयटम प्लेसहोल्डर' } }
];

export const defaultContactInfo = { 
  email: 'sample@example.com', 
  phone: '+91 1234567890', 
  address: { en: '123 Sample St, Pune', mr: '१२३ नमुना रस्ता, पुणे' } 
};

export const defaultGallery = [
  { url: defaultPlaceholderImage, caption: defaultTitle, category: 'General' },
  { url: defaultPlaceholderImage, caption: defaultTitle, category: 'General' },
  { url: defaultPlaceholderImage, caption: defaultTitle, category: 'Events' },
  { url: defaultPlaceholderImage, caption: defaultTitle, category: 'Events' }
];

export const defaultProducts = [
  { 
    name: { en: 'Sample Product 1', mr: 'नमुना उत्पादन १' }, 
    description: defaultDescription, 
    price: { en: '₹100', mr: '₹१००' }, 
    image: defaultPlaceholderImage, 
    category: 'Category 1' 
  },
  { 
    name: { en: 'Sample Product 2', mr: 'नमुना उत्पादन २' }, 
    description: defaultDescription, 
    price: { en: '₹200', mr: '₹२००' }, 
    image: defaultPlaceholderImage, 
    category: 'Category 2' 
  }
];

export const defaultPricingPlans = [
  { planName: defaultTitle, price: {en: '₹999', mr: '₹९९९'}, features: defaultListItemsArray },
  { planName: defaultTitle, price: {en: '₹1999', mr: '₹१९९९'}, features: defaultListItemsArray },
];

export const defaultEvents = [
  { ...defaultGenericItem, date: {en: '25 Oct 2026', mr: '२५ ऑक्टो २०२६'}, time: {en: '10:00 AM', mr: 'सकाळी १०:००'} },
  { ...defaultGenericItem, date: {en: '26 Oct 2026', mr: '२६ ऑक्टो २०२६'}, time: {en: '11:00 AM', mr: 'सकाळी ११:००'} }
];

export const defaultTabs = [
  { id: 'tab-0', label: defaultTitle, content: defaultDescription },
  { id: 'tab-1', label: defaultTitle, content: defaultDescription }
];

export const defaultMediaItems = [
  { type: 'image', url: defaultPlaceholderImage, caption: defaultTitle }
];
