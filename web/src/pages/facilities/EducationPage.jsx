import React, { useLayoutEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccessibility } from '../../hooks/useAccessibility';
import { facilitiesData } from '../../data/facilitiesData';
import { BookOpen, GraduationCap, School, Pencil, MapPin, Phone, Mail } from 'lucide-react';

const iconMap = { BookOpen, GraduationCap, School, Pencil };

const EducationPage = () => {
  const { language } = useAccessibility();
  const data = facilitiesData['education'];
  const [activeTab, setActiveTab] = useState(0);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const getTranslation = (obj) => (obj ? obj[language] || obj.en : '');

  return (
    <div className="min-h-screen bg-[#F0F4F8] dark-mode:bg-gray-900 font-poppins text-gray-800 dark-mode:text-gray-200">
      
      {/* Academic Header */}
      <div className="bg-indigo-900 dark-mode:bg-indigo-950 pt-24 pb-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {/* Subtle grid pattern */}
          <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="inline-flex justify-center p-4 bg-indigo-800 rounded-2xl mb-6 shadow-lg border border-indigo-700">
            <GraduationCap className="w-12 h-12 text-indigo-300" />
          </motion.div>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {getTranslation(data.title)}
          </motion.h1>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl md:text-2xl text-indigo-200 font-medium max-w-2xl mx-auto leading-relaxed">
            {getTranslation(data.subtitle)}
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-20 -mt-20 pb-24">
        
        <div className="bg-white dark-mode:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-xl mb-16 border border-gray-100 dark-mode:border-gray-700">
          <p className="text-xl text-gray-700 dark-mode:text-gray-300 leading-relaxed text-center font-medium max-w-4xl mx-auto">
            {getTranslation(data.description)}
          </p>
        </div>

        {/* Tabbed Interface for Key Functions */}
        <div className="mb-24">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {data.keyFunctions.map((func, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                  activeTab === idx 
                    ? 'bg-indigo-600 text-white shadow-lg transform -translate-y-1' 
                    : 'bg-white dark-mode:bg-gray-800 text-gray-600 dark-mode:text-gray-400 hover:bg-indigo-50 dark-mode:hover:bg-gray-700 hover:text-indigo-600'
                }`}
              >
                {getTranslation(func.title)}
              </button>
            ))}
          </div>

          <div className="bg-white dark-mode:bg-gray-800 p-10 md:p-16 rounded-3xl shadow-lg border border-gray-100 dark-mode:border-gray-700 min-h-[300px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col md:flex-row items-center gap-12 w-full"
              >
                {data.keyFunctions[activeTab] && (() => {
                  const func = data.keyFunctions[activeTab];
                  const Icon = iconMap[func.icon] || BookOpen;
                  return (
                    <>
                      <div className="w-full md:w-1/3 flex justify-center">
                        <div className="w-48 h-48 rounded-full bg-indigo-50 dark-mode:bg-indigo-900/30 flex items-center justify-center border-8 border-white dark-mode:border-gray-800 shadow-inner">
                          <Icon className="w-20 h-20 text-indigo-600 dark-mode:text-indigo-400" />
                        </div>
                      </div>
                      <div className="w-full md:w-2/3 text-center md:text-left">
                        <h3 className="text-3xl font-bold text-gray-900 dark-mode:text-white mb-6">{getTranslation(func.title)}</h3>
                        <p className="text-xl text-gray-600 dark-mode:text-gray-300 leading-relaxed">
                          {getTranslation(func.desc)}
                        </p>
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {data.stats.map((stat, idx) => {
            const Icon = iconMap[stat.icon] || School;
            return (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-indigo-600 text-white p-8 rounded-2xl flex flex-col items-center justify-center text-center shadow-xl hover:bg-indigo-700 transition-colors">
                <Icon className="w-10 h-10 text-indigo-200 mb-4" />
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm font-medium uppercase tracking-widest text-indigo-200">{getTranslation(stat.label)}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Contact Footer */}
        <div className="bg-white dark-mode:bg-gray-800 py-6 px-10 rounded-2xl flex flex-col md:flex-row items-center justify-center gap-12 shadow-sm border border-gray-100 dark-mode:border-gray-700 text-gray-600 dark-mode:text-gray-400 font-medium">
          <div className="flex items-center gap-3"><MapPin className="w-5 h-5 text-indigo-500"/> {getTranslation(data.contactInfo.address)}</div>
          <div className="flex items-center gap-3"><Phone className="w-5 h-5 text-indigo-500"/> {data.contactInfo.phone}</div>
          <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-indigo-500"/> {data.contactInfo.email}</div>
        </div>

      </div>
    </div>
  );
};

export default EducationPage;
