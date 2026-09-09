import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useAccessibility } from '../../../hooks/useAccessibility';

const HeroSection = () => {
  const { language } = useAccessibility();

  return (
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
  );
};

export default HeroSection;
