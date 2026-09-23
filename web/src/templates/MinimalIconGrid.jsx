"use client";
import React, { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '../hooks/useAccessibility';
import { facilitiesData } from '../data/facilitiesData';
import { Heart, Smile, Stethoscope, Coffee, Puzzle, MapPin, Phone, Mail } from 'lucide-react';

const iconMap = { Heart, Smile, Stethoscope, Coffee, Puzzle };

const MinimalIconGrid = ({ dataId, data: dynamicData }) => {
  const { language } = useAccessibility();
  const data = dynamicData || facilitiesData[dataId];

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const getTranslation = (obj) => (obj ? obj[language] || obj.en : '');

  return (
    <div data-block-type="template" className="relative min-h-screen bg-[#FFF5F7] dark-mode:bg-[#2A1B1F] font-poppins text-gray-800 dark-mode:text-gray-200 overflow-hidden">
      
      {/* Soft Organic Header Background */}
      <div className="absolute top-0 left-0 w-full h-[60vh] bg-[#FFE4E8] dark-mode:bg-[#3D262B] rounded-b-[50%] md:rounded-b-[100%] transform scale-x-150 origin-top -z-10" />

      <div className="container mx-auto px-4 py-16 max-w-5xl relative z-10 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }} className="w-8 h-8 bg-white dark-mode:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl text-rose-500">
          <Heart className="w-6 h-6 fill-current" />
        </motion.div>
        
        <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-2xl md:text-3xl lg:text-4xl font-bold text-rose-900 dark-mode:text-rose-300 mb-4 tracking-tight">
          {getTranslation(data.hero?.title)}
        </motion.h1>
        
        <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-base text-rose-700 dark-mode:text-rose-400 font-medium">
          {getTranslation(data.hero?.subtitle)}
        </motion.p>
      </div>

      <div className="container mx-auto px-4 max-w-6xl pb-24">
        
        <div className="flex flex-col lg:flex-row items-center gap-6 mb-10">
          <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="w-full lg:w-1/2">
            <div className="bg-white dark-mode:bg-[#1E1416] p-6 md:p-6 rounded-2xl rounded-tl-none shadow-xl border border-rose-100 dark-mode:border-rose-900/30">
              <p className="text-base leading-relaxed text-gray-700 dark-mode:text-gray-300 font-medium">
                {getTranslation(data.hero?.description)}
              </p>
            </div>
          </motion.div>
          <motion.div initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="w-full lg:w-1/2 relative">
             <div className="absolute inset-0 bg-rose-200 dark-mode:bg-rose-900/50 rounded-2xl rounded-br-none transform translate-x-4 translate-y-4" />
             <img src={data.hero?.heroImage} alt="Hirkani Room" className="relative z-10 w-full h-[400px] object-cover rounded-2xl rounded-br-none shadow-lg" />
          </motion.div>
        </div>

        {/* Stats Circles */}
        <div data-block-type="template_stats" className="flex flex-wrap justify-center gap-6 mb-10">
          {data.stats.map((stat, idx) => {
            const Icon = iconMap[stat.icon] || Heart;
            return (
              <motion.div key={idx} initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, type: "spring" }} className="w-48 h-48 bg-white dark-mode:bg-[#1E1416] rounded-full flex flex-col items-center justify-center text-center shadow-lg border-8 border-[#FFF5F7] dark-mode:border-[#2A1B1F]">
                <Icon className="w-8 h-8 text-rose-500 mb-2" />
                <div className="text-lg font-bold text-gray-900 dark-mode:text-white mb-1">{stat.value}</div>
                <div className="text-xs font-bold text-gray-500 uppercase">{getTranslation(stat.label)}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Key Features (Soft Cards) */}
        <div data-block-type="template_keyFunctions" className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {data.keyFunctions.map((func, idx) => {
            const Icon = iconMap[func.icon] || Heart;
            return (
              <motion.div key={idx} initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-white dark-mode:bg-[#1E1416] rounded-2xl p-10 shadow-sm border border-rose-50 dark-mode:border-rose-900/20 hover:shadow-xl transition-shadow flex items-start gap-6">
                <div className="w-6 h-6 rounded-full bg-rose-100 dark-mode:bg-rose-900/40 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-8 h-8 text-rose-600 dark-mode:text-rose-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark-mode:text-gray-100 mb-3">{getTranslation(func.title)}</h3>
                  <p className="text-gray-600 dark-mode:text-gray-400 leading-relaxed">{getTranslation(func.desc)}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Contact Pill */}
        <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="bg-rose-100 dark-mode:bg-rose-900/30 rounded-full py-6 px-12 flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-6 border border-rose-200 dark-mode:border-rose-900/50 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 text-rose-900 dark-mode:text-rose-200 font-medium"><MapPin className="w-5 h-5 text-rose-500"/> {getTranslation(data.contactInfo.address)}</div>
          <div className="flex gap-6">
            <span className="flex items-center gap-2 text-rose-900 dark-mode:text-rose-200 font-medium"><Phone className="w-4 h-4 text-rose-500"/> {data.contactInfo.phone}</span>
            <span className="flex items-center gap-2 text-rose-900 dark-mode:text-rose-200 font-medium"><Mail className="w-4 h-4 text-rose-500"/> {data.contactInfo.email}</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default MinimalIconGrid;

