import React, { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '../../hooks/useAccessibility';
import { facilitiesData } from '../../data/facilitiesData';
import { Mail, IndianRupee, Search, MailOpen, CreditCard, MapPin, Phone, Send } from 'lucide-react';

const iconMap = { Mail, IndianRupee, Search, MailOpen, CreditCard };

const CorrespondencePage = () => {
  const { language } = useAccessibility();
  const data = facilitiesData['correspondence'];

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const getTranslation = (obj) => (obj ? obj[language] || obj.en : '');

  return (
    <div className="min-h-screen bg-[#FDFCF8] dark-mode:bg-[#1A1A1A] font-poppins text-gray-800 dark-mode:text-gray-200">
      
      {/* Top Banner Theme */}
      <div className="relative h-[45vh] min-h-[350px] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-amber-800 dark-mode:bg-gray-900 z-0">
          <img src={data.heroImage} alt="Post Office" className="w-full h-full object-cover opacity-30 mix-blend-luminosity" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FDFCF8] dark-mode:to-[#1A1A1A] z-10" />
        
        <div className="relative z-20 max-w-4xl mx-auto -mt-10">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <Send className="w-12 h-12 text-amber-500 mx-auto mb-6 opacity-80" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-amber-900 dark-mode:text-amber-500 mb-4 tracking-tight drop-shadow-sm">
              {getTranslation(data.title)}
            </h1>
            <h2 className="text-xl md:text-2xl italic text-amber-700/80 dark-mode:text-amber-400/80 font-medium">
              {getTranslation(data.subtitle)}
            </h2>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-30 -mt-10 md:-mt-20 pb-24">
        {/* Central Overlapping Card */}
        <motion.div 
          initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.7 }}
          className="bg-white dark-mode:bg-[#252525] p-8 md:p-12 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] dark-mode:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] rounded-sm border-t-[12px] border-amber-600 max-w-5xl mx-auto relative"
        >
          {/* Decorative stamp element */}
          <div className="absolute top-6 right-8 w-16 h-20 border-2 border-dashed border-gray-300 dark-mode:border-gray-600 opacity-50 hidden md:block">
            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">STAMP</div>
          </div>

          <p className="text-xl md:text-2xl leading-relaxed text-gray-700 dark-mode:text-gray-300 mb-12 font-medium max-w-3xl">
            {getTranslation(data.description)}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 border-t border-b border-gray-100 dark-mode:border-gray-800 py-8">
            {data.stats.map((stat, idx) => {
              const Icon = iconMap[stat.icon] || Mail;
              return (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-50 dark-mode:bg-amber-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-amber-600 dark-mode:text-amber-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark-mode:text-white">{stat.value}</div>
                    <div className="text-sm text-gray-500 uppercase tracking-widest">{getTranslation(stat.label)}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {data.keyFunctions.map((func, idx) => {
              const Icon = iconMap[func.icon] || Mail;
              return (
                <div key={idx} className="bg-[#FAF9F6] dark-mode:bg-[#1E1E1E] p-8 rounded-sm shadow-inner border border-gray-100 dark-mode:border-gray-800">
                  <div className="flex items-center gap-4 mb-4">
                    <Icon className="w-8 h-8 text-amber-700 dark-mode:text-amber-500" />
                    <h3 className="text-xl font-bold text-gray-800 dark-mode:text-gray-100">{getTranslation(func.title)}</h3>
                  </div>
                  <p className="text-gray-600 dark-mode:text-gray-400 leading-relaxed font-poppins">
                    {getTranslation(func.desc)}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-16 bg-amber-50 dark-mode:bg-amber-900/10 p-6 rounded-sm flex flex-col md:flex-row justify-between items-center gap-6 font-poppins border border-amber-100 dark-mode:border-amber-900/50">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-amber-600" />
              <span className="text-gray-700 dark-mode:text-gray-300 font-medium">{getTranslation(data.contactInfo.address)}</span>
            </div>
            <div className="flex gap-6">
              <span className="flex items-center gap-2 text-gray-700 dark-mode:text-gray-300 font-medium"><Phone className="w-4 h-4 text-amber-600"/> {data.contactInfo.phone}</span>
              <span className="flex items-center gap-2 text-gray-700 dark-mode:text-gray-300 font-medium"><Mail className="w-4 h-4 text-amber-600"/> {data.contactInfo.email}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CorrespondencePage;
