import React, { useEffect } from 'react';
import { useAccessibility } from '../hooks/useAccessibility';
import { ShoppingBag, Star, Package, CheckCircle2, Map } from 'lucide-react';

const productsData = [
  {
    id: 1,
    title: { mr: 'फर्निचर', en: 'Furniture' },
    desc: { mr: 'तुरुंगातील सुतारकाम विभागाद्वारे तयार केलेले उच्च दर्जाचे लाकडी फर्निचर.', en: 'High-quality wooden furniture crafted by the carpentry section of the prison.' },
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80',
    icon: Package
  },
  {
    id: 2,
    title: { mr: 'हातमाग आणि कापड', en: 'Handloom & Textiles' },
    desc: { mr: 'कैद्यांनी विणलेले सुंदर सूती कापड, चादरी, आणि सतरंज्या.', en: 'Beautiful cotton cloth, bedsheets, and rugs woven by inmates.' },
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&q=80',
    icon: Star
  },
  {
    id: 3,
    title: { mr: 'शेती उत्पादने', en: 'Agricultural Products' },
    desc: { mr: 'ताजा भाजीपाला, फळे, आणि सेंद्रिय खत.', en: 'Fresh vegetables, fruits, and organic compost.' },
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80',
    icon: CheckCircle2
  },
  {
    id: 4,
    title: { mr: 'बेकरी उत्पादने', en: 'Bakery Products' },
    desc: { mr: 'ताजे ब्रेड, बिस्किटे आणि खारी.', en: 'Fresh bread, biscuits, and khari.' },
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80',
    icon: ShoppingBag
  },
  {
    id: 5,
    title: { mr: 'कला आणि हस्तकला', en: 'Arts & Crafts' },
    desc: { mr: 'सुंदर चित्रे, मूर्ती आणि सजावटीच्या वस्तू.', en: 'Beautiful paintings, idols, and decorative items.' },
    image: 'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?auto=format&fit=crop&q=80',
    icon: Star
  },
  {
    id: 6,
    title: { mr: 'चामड्याच्या वस्तू', en: 'Leather Goods' },
    desc: { mr: 'बूट, बेल्ट आणि बॅग्ज.', en: 'Shoes, belts, and bags.' },
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80',
    icon: Package
  }
];

const OurProductsPage = () => {
  const { language, t } = useAccessibility();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark-mode:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80" 
            alt="Products Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 dark-mode:bg-black/80"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in-up">
          <div className="inline-flex items-center justify-center p-3 bg-amber-500 rounded-full mb-6 text-white shadow-lg">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-md">
            {language === 'mr' ? 'आमची उत्पादने' : 'Our Products'}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 font-medium">
            {language === 'mr' 
              ? 'कैद्यांच्या कौशल्यातून साकारलेली उत्कृष्ट आणि दर्जेदार उत्पादने' 
              : 'Excellent and high-quality products crafted by the skills of inmates'}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark-mode:text-white mb-4">
            {language === 'mr' ? 'उत्पादनांची श्रेणी' : 'Product Categories'}
          </h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productsData.map((product, index) => (
            <div 
              key={product.id} 
              className="group bg-white dark-mode:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark-mode:border-gray-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.title[language]} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <div className="bg-amber-500 p-2 rounded-lg text-white">
                    <product.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white drop-shadow-sm">
                    {product.title[language]}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 dark-mode:text-gray-300 leading-relaxed">
                  {product.desc[language]}
                </p>
                <div className="mt-6 pt-4 border-t border-gray-100 dark-mode:border-gray-700 flex justify-between items-center">
                  <span className="text-sm font-semibold text-amber-600 dark-mode:text-amber-400 uppercase tracking-wider">
                    {language === 'mr' ? 'अधिक माहिती' : 'Learn More'}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-amber-50 dark-mode:bg-gray-700 flex items-center justify-center text-amber-600 dark-mode:text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-blue-50 dark-mode:bg-gray-800 rounded-3xl p-8 md:p-12 text-center border border-blue-100 dark-mode:border-gray-700 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-[#0F3D66] dark-mode:text-blue-300 mb-6">
              {language === 'mr' 
                ? 'कारागृह विक्री केंद्र (MahaPrisons Outlet)' 
                : 'Prison Sales Center (MahaPrisons Outlet)'}
            </h3>
            <p className="text-lg text-gray-700 dark-mode:text-gray-300 mb-8 leading-relaxed">
              {language === 'mr' 
                ? 'ही सर्व उत्पादने कारागृहाबाहेरील विक्री केंद्रावर नागरिकांसाठी उपलब्ध आहेत. यातून मिळणारे उत्पन्न कैद्यांच्या कल्याणासाठी आणि शासनाच्या तिजोरीत जमा केले जाते.' 
                : 'All these products are available for citizens at the sales center outside the prison. The income generated is used for the welfare of inmates and deposited into the government treasury.'}
            </p>
            <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 inline-flex items-center gap-2">
              <Map className="w-5 h-5" />
              {language === 'mr' ? 'विक्री केंद्राचा पत्ता' : 'Outlet Location'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurProductsPage;
