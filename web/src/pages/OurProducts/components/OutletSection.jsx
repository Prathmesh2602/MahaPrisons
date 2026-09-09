import React from 'react';
import { Map } from 'lucide-react';
import { useAccessibility } from '../../../hooks/useAccessibility';

const OutletSection = () => {
  const { language } = useAccessibility();

  return (
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
  );
};

export default OutletSection;
