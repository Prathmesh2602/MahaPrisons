"use client";
import React, { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '../hooks/useAccessibility';
import { socialActivitiesData } from '../data/socialActivitiesData';
import * as LucideIcons from 'lucide-react';

const getIcon = (iconName, fallbackName) => {
  if (iconName && LucideIcons[iconName]) {
    return LucideIcons[iconName];
  }
  return LucideIcons[fallbackName] || LucideIcons.HelpCircle;
};

const TwoColEventCards = ({ dataId, data: dynamicData }) => {
  const { language } = useAccessibility();
  const data = dynamicData || socialActivitiesData[dataId];

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
      <div data-block-type="template_hero">
        <div className="container mx-auto px-6 lg:px-12 pt-24 pb-12 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
          className="w-6 h-6 bg-green-50 dark-mode:bg-green-900/30 rounded-full flex items-center justify-center mb-6 text-green-600 dark-mode:text-green-400"
        >
          {(() => {
            const HeroIcon = getIcon(data.sectionHeaders?.hero?.icon, 'Flower2');
            return <HeroIcon className="w-8 h-8" />;
          })()}
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl md:text-4xl font-extrabold text-gray-900 dark-mode:text-white mb-4"
        >
          {getTranslation(data.hero?.title)}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-base text-green-700 dark-mode:text-green-400 font-medium flex items-center gap-2"
        >
          {(() => {
            const SubtitleIcon = getIcon(data.sectionHeaders?.hero?.subtitleIcon, 'MapPin');
            return <SubtitleIcon className="w-5 h-5" />;
          })()} {getTranslation(data.hero?.subtitle)}
        </motion.p>
      </div>

      {/* Modern Asymmetric Image Showcase */}
      <div className="container mx-auto px-6 lg:px-12 pb-24">
        <div className="relative w-full max-w-5xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="w-full lg:w-4/5 ml-auto rounded-2xl overflow-hidden shadow-2xl relative"
          >
            <img src={data.heroImage || data.hero?.heroImage} alt="Mangal Lawn" className="w-full h-[400px] md:h-[500px] object-cover" />
            <div className="absolute inset-0 bg-black/10"></div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block absolute top-32 left-0 w-1/3 rounded-2xl overflow-hidden shadow-2xl border-8 border-[#FDFDFD] dark-mode:border-gray-950"
          >
            <img src={data.muralImage || data.gallery?.muralImage} alt="Traditional Murals" className="w-full h-[350px] object-cover" />
          </motion.div>
          
          {/* Mobile version of the second image */}
          <div className="block lg:hidden mt-8 rounded-2xl overflow-hidden shadow-xl">
            <img src={data.muralImage || data.gallery?.muralImage} alt="Traditional Murals" className="w-full h-[250px] object-cover" />
          </div>

        </div>
      </div>
      </div>

      {/* Clean Content Area */}
      <div className="bg-gray-50 dark-mode:bg-gray-900 py-10 border-t border-gray-100 dark-mode:border-gray-800">
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-6">
            
              <div data-block-type="template_about" className="w-full lg:w-1/2 flex flex-col gap-10">
                {!(data.introBlocks && data.introBlocks.length > 0) ? (
                  <div>
              <h2 className="text-xl font-bold text-gray-900 dark-mode:text-white mb-6">
                {data.sectionHeaders?.about?.title ? getTranslation(data.sectionHeaders.about.title) : (language === 'mr' ? 'निसर्ग आणि कला यांचा संगम' : 'A Blend of Nature and Art')}
              </h2>
              <div className="w-20 h-1 bg-green-500 rounded-full mb-8"></div>
              <p className="text-lg text-gray-600 dark-mode:text-gray-400 leading-relaxed">
                {getTranslation(data.about?.description || data.hero?.description || data.description)}
              </p>
                  </div>
                ) : (
                  data.introBlocks.map((block, idx) => (
                    <div key={idx}>
                      {(block.title?.mr || block.title?.en) && (
                        <>
                          <h2 className="text-xl font-bold text-gray-900 dark-mode:text-white mb-6">
                            {getTranslation(block.title)}
                          </h2>
                          <div className="w-20 h-1 bg-green-500 rounded-full mb-8"></div>
                        </>
                      )}
                      <p className="text-lg text-gray-600 dark-mode:text-gray-400 leading-relaxed whitespace-pre-wrap">
                        {getTranslation(block.description)}
                      </p>
                    </div>
                  ))
                )}
              </div>

            <div className="w-full lg:w-1/2">
              <div data-block-type="template_venueFeatures" className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {(data.venueFeatures || []).map((feature, idx) => {
                  const Icon = getIcon(feature.icon, 'Leaf');
                  return (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.1 }}
                      key={idx} className="bg-white dark-mode:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark-mode:border-gray-700 hover:shadow-md transition-shadow"
                    >
                      <div className="w-8 h-8 bg-green-50 dark-mode:bg-gray-900 rounded-full flex items-center justify-center mb-4 text-green-600 dark-mode:text-green-400">
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

export default TwoColEventCards;

