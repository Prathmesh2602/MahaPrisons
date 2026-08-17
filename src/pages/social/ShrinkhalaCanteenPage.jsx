import React, { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '../../hooks/useAccessibility';
import { socialActivitiesData } from '../../data/socialActivitiesData';
import { Coffee, UtensilsCrossed, Utensils, HeartHandshake } from 'lucide-react';

const ShrinkhalaCanteenPage = () => {
  const { language } = useAccessibility();
  const data = socialActivitiesData.canteen;

  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.documentElement).scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = originalStyle;
  }, []);

  const getTranslation = (obj) => {
    if (!obj) return '';
    return obj[language] || obj.en;
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5] dark-mode:bg-[#2C1810] text-amber-950 dark-mode:text-amber-50">
      
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-orange-950/40 z-10"></div>
        <motion.img 
          initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }}
          src={data.heroImage} alt="Shrinkhala Canteen" className="absolute inset-0 w-full h-full object-cover z-0" 
        />
        
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="w-20 h-20 bg-orange-500/20 backdrop-blur-md rounded-full flex items-center justify-center mb-6 border border-orange-300/30"
          >
            <UtensilsCrossed className="w-10 h-10 text-orange-200" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg"
          >
            {getTranslation(data.title)}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-3xl text-orange-200 font-medium italic drop-shadow-md"
          >
            {getTranslation(data.subtitle)}
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-6 py-20 -mt-10 relative z-30">
        
        {/* Intro Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white dark-mode:bg-[#3E2316] rounded-3xl p-10 md:p-16 shadow-2xl border border-orange-100 dark-mode:border-[#523020] text-center max-w-4xl mx-auto mb-20"
        >
          <HeartHandshake className="w-12 h-12 text-orange-500 mx-auto mb-6" />
          <p className="text-xl md:text-2xl leading-relaxed text-amber-900/80 dark-mode:text-amber-100/90">
            "{getTranslation(data.description)}"
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Menu Section */}
          <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-1 bg-orange-500 rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-bold">
                {language === 'mr' ? 'खास आकर्षणे' : 'Menu Highlights'}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {data.menuHighlights.map((item, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.1 }}
                  key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-orange-50 dark-mode:bg-[#3E2316] hover:bg-orange-100 dark-mode:hover:bg-[#523020] transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-white dark-mode:bg-[#2C1810] shadow-sm flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                    {idx % 2 === 0 ? <Utensils className="w-6 h-6" /> : <Coffee className="w-6 h-6" />}
                  </div>
                  <span className="text-lg font-semibold">{getTranslation(item)}</span>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12 p-6 rounded-2xl bg-orange-500 text-white text-center italic text-xl font-medium shadow-lg shadow-orange-500/30">
              "{getTranslation(data.motto)}"
            </div>
          </div>

          {/* Secondary Image */}
          <div className="w-full lg:w-1/2 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border-[10px] border-white dark-mode:border-[#3E2316]"
            >
              <img src={data.secondaryImage} alt="Canteen Food" className="w-full h-auto object-cover aspect-square md:aspect-[4/3] hover:scale-105 transition-transform duration-700" />
            </motion.div>
            
            {/* Decoration */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[url('https://www.transparenttextures.com/patterns/food.png')] bg-orange-200 dark-mode:bg-orange-900 rounded-full z-[-1] opacity-50"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-[url('https://www.transparenttextures.com/patterns/food.png')] bg-orange-300 dark-mode:bg-orange-800 rounded-full z-[-1] opacity-50"></div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ShrinkhalaCanteenPage;
