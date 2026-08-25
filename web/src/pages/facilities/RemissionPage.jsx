import React, { useLayoutEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAccessibility } from '../../hooks/useAccessibility';
import { facilitiesData } from '../../data/facilitiesData';
import { Clock, Award, Heart, Briefcase, Flag, MapPin, Phone, Mail } from 'lucide-react';

const iconMap = { Clock, Award, Heart, Briefcase, Flag };

const RemissionPage = () => {
  const { language } = useAccessibility();
  const data = facilitiesData['remission'];
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const getTranslation = (obj) => (obj ? obj[language] || obj.en : '');

  return (
    <div className="min-h-screen bg-white dark-mode:bg-black text-gray-900 dark-mode:text-white font-poppins overflow-hidden">
      
      {/* Parallax Hero */}
      <div className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: y1 }} className="absolute inset-0 z-0 w-full h-[120%] -top-[10%]">
          <img src={data.heroImage} alt="Remission" className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-white dark-mode:to-black" />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="w-24 h-24 mx-auto border-4 border-yellow-400 rounded-full flex items-center justify-center backdrop-blur-md bg-black/20 mb-8 shadow-[0_0_50px_rgba(250,204,21,0.3)]">
            <Award className="w-12 h-12 text-yellow-400" />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-wider drop-shadow-2xl">
            {getTranslation(data.title)}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-2xl text-yellow-100 font-light max-w-2xl mx-auto drop-shadow-lg">
            {getTranslation(data.subtitle)}
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-20 pb-24">
        
        <div className="text-center max-w-3xl mx-auto -mt-10 mb-24 bg-white dark-mode:bg-gray-900 p-8 md:p-12 rounded-[3rem] shadow-2xl border border-gray-100 dark-mode:border-gray-800">
          <p className="text-xl md:text-2xl leading-relaxed text-gray-700 dark-mode:text-gray-300 font-medium">
            {getTranslation(data.description)}
          </p>
        </div>

        {/* Big Numbers Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          {data.stats.map((stat, idx) => {
            const Icon = iconMap[stat.icon] || Award;
            return (
              <motion.div key={idx} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.2, duration: 0.7 }} className="text-center">
                <Icon className="w-12 h-12 text-yellow-500 mx-auto mb-6" />
                <div className="text-6xl lg:text-7xl font-black text-gray-900 dark-mode:text-white mb-4 tracking-tighter">
                  {stat.value}
                </div>
                <div className="text-lg font-bold text-gray-500 dark-mode:text-gray-400 uppercase tracking-widest border-t border-gray-200 dark-mode:border-gray-800 pt-4 w-1/2 mx-auto">
                  {getTranslation(stat.label)}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Diagonal Cards for Key Functions */}
        <div className="space-y-32">
          {data.keyFunctions.map((func, idx) => {
            const Icon = iconMap[func.icon] || Briefcase;
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}>
                <motion.div initial={{ opacity: 0, x: isEven ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="w-full md:w-1/2 relative">
                  <div className={`absolute inset-0 bg-yellow-400/20 rounded-3xl transform ${isEven ? 'rotate-3' : '-rotate-3'} scale-105`} />
                  <div className="bg-white dark-mode:bg-gray-800 p-12 rounded-3xl shadow-xl relative border border-gray-100 dark-mode:border-gray-700">
                     <Icon className="w-16 h-16 text-yellow-500 mb-8" />
                     <h3 className="text-4xl font-bold mb-6 text-gray-900 dark-mode:text-white">{getTranslation(func.title)}</h3>
                     <p className="text-xl text-gray-600 dark-mode:text-gray-400 leading-relaxed">{getTranslation(func.desc)}</p>
                  </div>
                </motion.div>
                <div className="w-full md:w-1/2 flex justify-center text-gray-100 dark-mode:text-gray-900 opacity-50 select-none">
                  <div className="text-[200px] font-black leading-none">{idx + 1}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Simple elegant footer contact */}
        <div className="mt-32 border-t-2 border-gray-100 dark-mode:border-gray-800 pt-16 flex flex-col md:flex-row justify-center items-center gap-12 text-gray-500 dark-mode:text-gray-400 font-medium">
          <div className="flex items-center gap-3"><MapPin className="w-5 h-5 text-yellow-500"/> {getTranslation(data.contactInfo.address)}</div>
          <div className="flex items-center gap-3"><Phone className="w-5 h-5 text-yellow-500"/> {data.contactInfo.phone}</div>
          <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-yellow-500"/> {data.contactInfo.email}</div>
        </div>

      </div>
    </div>
  );
};

export default RemissionPage;
