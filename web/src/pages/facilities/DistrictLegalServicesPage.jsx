import React, { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '../../hooks/useAccessibility';
import { facilitiesData } from '../../data/facilitiesData';
import { Scale, Handshake, Users, Gavel, HeartHandshake, MapPin, Phone, Mail, ChevronRight } from 'lucide-react';

const iconMap = { Scale, Handshake, Users, Gavel, HeartHandshake };

const DistrictLegalServicesPage = () => {
  const { language } = useAccessibility();
  const data = facilitiesData['district-legal-services'];

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const getTranslation = (obj) => (obj ? obj[language] || obj.en : '');

  return (
    <div className="min-h-screen bg-[#F3F4F6] dark-mode:bg-gray-950 font-poppins py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header section outside grid */}
        <div className="text-center mb-12">
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark-mode:bg-emerald-900/30 text-emerald-700 dark-mode:text-emerald-400 font-bold tracking-wide text-sm mb-6">
            <Scale className="w-4 h-4" /> DLSA
          </motion.div>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark-mode:text-white mb-4">
            {getTranslation(data.title)}
          </motion.h1>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-gray-600 dark-mode:text-gray-400 max-w-2xl mx-auto">
            {getTranslation(data.subtitle)}
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[250px]">
          
          {/* Main Large Image Block */}
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }} className="md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2 rounded-[2rem] overflow-hidden relative group shadow-lg">
            <img src={data.heroImage} alt="DLSA" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <p className="text-white text-lg md:text-xl font-medium leading-relaxed drop-shadow-md">
                "{getTranslation(data.description)}"
              </p>
            </div>
          </motion.div>

          {/* Stats Blocks */}
          {data.stats.map((stat, idx) => {
            const Icon = iconMap[stat.icon] || Scale;
            return (
              <motion.div key={idx} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 + (idx * 0.1) }} className="bg-white dark-mode:bg-gray-800 rounded-[2rem] p-8 flex flex-col justify-between shadow-lg border border-gray-100 dark-mode:border-gray-700 hover:bg-emerald-50 dark-mode:hover:bg-emerald-900/20 transition-colors">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark-mode:bg-emerald-900/40 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-emerald-600 dark-mode:text-emerald-400" />
                </div>
                <div>
                  <div className="text-4xl font-black text-gray-900 dark-mode:text-white mb-1">{stat.value}</div>
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">{getTranslation(stat.label)}</div>
                </div>
              </motion.div>
            );
          })}

          {/* Contact Block (takes up 2 columns in some layouts) */}
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }} className="md:col-span-3 lg:col-span-1 rounded-[2rem] bg-emerald-600 p-8 text-white flex flex-col justify-between shadow-lg relative overflow-hidden">
            <div className="absolute -right-10 -top-10 opacity-10">
              <MapPin className="w-40 h-40" />
            </div>
            <h3 className="text-2xl font-bold mb-4 relative z-10">{language === 'mr' ? 'संपर्क' : 'Contact'}</h3>
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-3"><Phone className="w-5 h-5 opacity-80"/> <span className="font-medium">{data.contactInfo.phone}</span></div>
              <div className="flex items-center gap-3"><Mail className="w-5 h-5 opacity-80"/> <span className="text-sm">{data.contactInfo.email}</span></div>
              <div className="flex items-start gap-3 mt-4 pt-4 border-t border-emerald-500/50">
                <MapPin className="w-5 h-5 opacity-80 mt-1 shrink-0"/> 
                <span className="text-sm leading-snug">{getTranslation(data.contactInfo.address)}</span>
              </div>
            </div>
          </motion.div>

          {/* Key Functions Blocks (wide) */}
          {data.keyFunctions.map((func, idx) => {
            const Icon = iconMap[func.icon] || Gavel;
            return (
              <motion.div key={idx} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 + (idx * 0.1) }} className="md:col-span-3 lg:col-span-2 bg-white dark-mode:bg-gray-800 rounded-[2rem] p-8 shadow-lg border border-gray-100 dark-mode:border-gray-700 flex flex-col justify-center group cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-4 bg-gray-50 dark-mode:bg-gray-700 rounded-2xl group-hover:bg-emerald-100 dark-mode:group-hover:bg-emerald-900/30 transition-colors">
                    <Icon className="w-8 h-8 text-gray-700 dark-mode:text-gray-300 group-hover:text-emerald-600 dark-mode:group-hover:text-emerald-400" />
                  </div>
                  <div className="w-10 h-10 rounded-full border border-gray-200 dark-mode:border-gray-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white dark-mode:bg-gray-800">
                    <ChevronRight className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark-mode:text-white mb-2">{getTranslation(func.title)}</h3>
                <p className="text-gray-600 dark-mode:text-gray-400 leading-relaxed">{getTranslation(func.desc)}</p>
              </motion.div>
            );
          })}

        </div>
      </div>
    </div>
  );
};

export default DistrictLegalServicesPage;
