import React, { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '../../hooks/useAccessibility';
import { socialActivitiesData } from '../../data/socialActivitiesData';
import { Leaf, Palette, Flower2, CalendarDays, MapPin } from 'lucide-react';

const iconMap = { Leaf, Palette, Flower2, CalendarDays };

const MangalLawnPage = () => {
  const { language } = useAccessibility();
  const data = socialActivitiesData.mangalLawn;

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
    <div className="min-h-screen bg-[#FDFDFD] dark-mode:bg-gray-950 text-gray-800 dark-mode:text-gray-200">
      
      {/* Botanical Header */}
      <div className="container mx-auto px-6 lg:px-12 pt-24 pb-12 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
          className="w-16 h-16 bg-green-50 dark-mode:bg-green-900/30 rounded-full flex items-center justify-center mb-6 text-green-600 dark-mode:text-green-400"
        >
          <Flower2 className="w-8 h-8" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold text-gray-900 dark-mode:text-white mb-4"
        >
          {getTranslation(data.title)}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-green-700 dark-mode:text-green-400 font-medium flex items-center gap-2"
        >
          <MapPin className="w-5 h-5" /> {getTranslation(data.subtitle)}
        </motion.p>
      </div>

      {/* Modern Asymmetric Image Showcase */}
      <div className="container mx-auto px-6 lg:px-12 pb-24">
        <div className="relative w-full max-w-5xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="w-full lg:w-4/5 ml-auto rounded-[2rem] overflow-hidden shadow-2xl relative"
          >
            <img src={data.heroImage} alt="Mangal Lawn" className="w-full h-[400px] md:h-[500px] object-cover" />
            <div className="absolute inset-0 bg-black/10"></div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block absolute top-32 left-0 w-1/3 rounded-[2rem] overflow-hidden shadow-2xl border-8 border-[#FDFDFD] dark-mode:border-gray-950"
          >
            <img src={data.muralImage} alt="Traditional Murals" className="w-full h-[350px] object-cover" />
          </motion.div>
          
          {/* Mobile version of the second image */}
          <div className="block lg:hidden mt-8 rounded-[2rem] overflow-hidden shadow-xl">
            <img src={data.muralImage} alt="Traditional Murals" className="w-full h-[250px] object-cover" />
          </div>

        </div>
      </div>

      {/* Clean Content Area */}
      <div className="bg-gray-50 dark-mode:bg-gray-900 py-24 border-t border-gray-100 dark-mode:border-gray-800">
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16">
            
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 dark-mode:text-white mb-6">
                {language === 'mr' ? 'निसर्ग आणि कला यांचा संगम' : 'A Blend of Nature and Art'}
              </h2>
              <div className="w-20 h-1 bg-green-500 rounded-full mb-8"></div>
              <p className="text-lg text-gray-600 dark-mode:text-gray-400 leading-relaxed">
                {getTranslation(data.description)}
              </p>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {data.venueFeatures.map((feature, idx) => {
                  const Icon = iconMap[feature.icon] || Leaf;
                  return (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.1 }}
                      key={idx} className="bg-white dark-mode:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark-mode:border-gray-700 hover:shadow-md transition-shadow"
                    >
                      <div className="w-12 h-12 bg-green-50 dark-mode:bg-gray-900 rounded-full flex items-center justify-center mb-4 text-green-600 dark-mode:text-green-400">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 dark-mode:text-white">
                        {getTranslation(feature.title)}
                      </h3>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default MangalLawnPage;
