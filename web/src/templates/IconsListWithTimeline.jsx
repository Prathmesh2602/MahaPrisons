"use client";
import React, { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '../hooks/useAccessibility';
import { facilitiesData } from '../data/facilitiesData';
import * as LucideIcons from 'lucide-react';

const getIcon = (iconName, fallbackName) => {
  if (iconName && LucideIcons[iconName]) {
    return LucideIcons[iconName];
  }
  return LucideIcons[fallbackName] || LucideIcons.HelpCircle;
};

const IconsListWithTimeline = ({ dataId, data: dynamicData }) => {
  const { language } = useAccessibility();
  const data = dynamicData || facilitiesData[dataId];

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const getTranslation = (obj) => (obj ? obj[language] || obj.en : '');

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-poppins uppercase">
      
      {/* Aggressive Header */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <img src={data.hero?.heroImage} alt="Gym" className="w-full h-full object-cover grayscale opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-transparent mix-blend-color" />
        </div>
        
        {/* Diagonal Cut out */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-[#0A0A0A] transform skew-y-2 origin-bottom-right z-10" />

        <div className="container mx-auto px-6 relative z-20">
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="border-l-8 border-red-600 pl-8">
            <h2 className="text-red-500 font-black tracking-[0.2em] text-base mb-4">{getTranslation(data.hero?.subtitle)}</h2>
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-6 leading-none">
              {getTranslation(data.hero?.title)}
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-20 pb-24">
        
        {/* Description block (overlapping diagonal) */}
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="-mt-16 mb-10 max-w-4xl">
          <p className="text-lg md:text-xl font-light text-gray-300 leading-snug border-l-2 border-red-600 pl-6 normal-case">
            {getTranslation(data.hero?.description)}
          </p>
        </motion.div>

        {/* Heavy Stats */}
        <div data-block-type="template_stats" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {(data.stats || []).map((stat, idx) => {
            const Icon = iconMap[stat.icon] || Dumbbell;
            return (
              <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-[#141414] border border-gray-800 p-6 hover:border-red-600 transition-colors group">
                <Icon className="w-8 h-8 text-gray-700 group-hover:text-red-600 transition-colors mb-6" />
                <div className="text-3xl font-black text-white mb-2 tracking-tighter">{stat.value}</div>
                <div className="text-sm font-bold text-gray-500 tracking-[0.2em]">{getTranslation(stat.label)}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Feature Sections */}
        <div data-block-type="template_keyFunctions" className="space-y-4">
          {(data.keyFunctions || []).map((func, idx) => {
            const Icon = iconMap[func.icon] || Dumbbell;
            return (
              <motion.div key={idx} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-[#1A1A1A] flex flex-col md:flex-row items-center hover:bg-[#222] transition-colors border-l-4 border-transparent hover:border-red-600">
                <div className="p-6 md:p-6 md:w-1/3 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-800">
                  <Icon className="w-6 h-6 text-red-600 mb-4" />
                  <h3 className="text-lg font-black text-center">{getTranslation(func.title)}</h3>
                </div>
                <div className="p-6 md:p-6 md:w-2/3">
                  <p className="text-base text-gray-400 font-light normal-case leading-relaxed">
                    {getTranslation(func.desc)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Raw Contact Footer */}
        <div className="mt-32 pt-12 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6 text-sm tracking-[0.1em] font-bold text-gray-500">
          <div className="flex items-center gap-4 hover:text-white transition-colors">
            <MapPin className="w-5 h-5 text-red-600" /> {getTranslation(data.contactInfo.address)}
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 hover:text-white transition-colors"><Phone className="w-4 h-4 text-red-600"/> {data.contactInfo.phone}</span>
            <span className="flex items-center gap-2 hover:text-white transition-colors normal-case"><Mail className="w-4 h-4 text-red-600"/> {data.contactInfo.email}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default IconsListWithTimeline;

