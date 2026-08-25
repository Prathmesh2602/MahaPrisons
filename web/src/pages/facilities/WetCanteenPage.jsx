import React, { useLayoutEffect, useState } from 'react';
import { motion as fmotion, AnimatePresence } from 'framer-motion';
import { useAccessibility } from '../../hooks/useAccessibility';
import { facilitiesData } from '../../data/facilitiesData';
import { Coffee, TrendingUp, ShieldCheck, CreditCard, MapPin, Phone, Mail, ChevronDown } from 'lucide-react';

const iconMap = { Coffee, TrendingUp, ShieldCheck, CreditCard };

const WetCanteenPage = () => {
  const { language } = useAccessibility();
  const data = facilitiesData['wet-canteen'];
  const [activeCard, setActiveCard] = useState(null);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const getTranslation = (obj) => (obj ? obj[language] || obj.en : '');

  return (
    <div className="min-h-screen bg-[#FFFBF0] dark-mode:bg-[#1C1A17] font-poppins text-gray-800 dark-mode:text-gray-200">
      
      {/* Cafe Header */}
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-[#4A3219] dark-mode:bg-[#2A1D0E] overflow-hidden">
           <img src={data.heroImage} alt="Canteen" className="w-full h-full object-cover opacity-40 mix-blend-overlay" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#FFFBF0] dark-mode:from-[#1C1A17] to-transparent" />
        </div>
        <div className="relative z-10 px-4 max-w-3xl mx-auto -mt-8">
          <fmotion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex justify-center mb-6">
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[#FFFBF0]">
              <Coffee className="w-10 h-10" />
            </div>
          </fmotion.div>
          <fmotion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-5xl md:text-6xl font-black text-[#4A3219] dark-mode:text-[#D4A373] mb-4 drop-shadow-sm">
            {getTranslation(data.title)}
          </fmotion.h1>
          <fmotion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-[#8E6A45] dark-mode:text-[#A68A64] font-medium max-w-2xl mx-auto">
            {getTranslation(data.subtitle)}
          </fmotion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-20 pb-24">
        
        <fmotion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="bg-white dark-mode:bg-[#2A2621] p-8 md:p-12 rounded-3xl shadow-xl border border-[#F2E8D5] dark-mode:border-[#3D372E] max-w-4xl mx-auto -mt-16 mb-20 text-center">
          <p className="text-xl leading-relaxed text-[#5E4A35] dark-mode:text-[#CBB59C] font-medium">
            {getTranslation(data.description)}
          </p>
        </fmotion.div>

        {/* Menu/Feature Cards (Interactive) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 max-w-5xl mx-auto">
          {data.keyFunctions.map((func, idx) => {
            const Icon = iconMap[func.icon] || Coffee;
            const isActive = activeCard === idx;
            
            return (
              <fmotion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className={`bg-white dark-mode:bg-[#2A2621] rounded-3xl overflow-hidden shadow-lg border-2 cursor-pointer transition-colors duration-300 ${isActive ? 'border-[#D4A373]' : 'border-[#F2E8D5] dark-mode:border-[#3D372E] hover:border-[#D4A373]/50'}`}
                onClick={() => setActiveCard(isActive ? null : idx)}
              >
                <div className="p-8 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-[#FFFBF0] dark-mode:bg-[#1C1A17] rounded-full text-[#D4A373]">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#4A3219] dark-mode:text-[#E8DCC8]">{getTranslation(func.title)}</h3>
                  </div>
                  <ChevronDown className={`w-6 h-6 text-[#8E6A45] transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} />
                </div>
                
                {isActive && (
                  <fmotion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-8 pb-8">
                    <div className="pt-6 border-t border-[#F2E8D5] dark-mode:border-[#3D372E]">
                      <p className="text-lg text-[#5E4A35] dark-mode:text-[#CBB59C] leading-relaxed">
                        {getTranslation(func.desc)}
                      </p>
                    </div>
                  </fmotion.div>
                )}
              </fmotion.div>
            );
          })}
        </div>

        {/* Cafe Stats (Coffee beans style) */}
        <div className="flex flex-wrap justify-center gap-8 mb-24">
          {data.stats.map((stat, idx) => {
            const Icon = iconMap[stat.icon] || TrendingUp;
            return (
              <fmotion.div key={idx} initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} className="bg-[#4A3219] text-[#FFFBF0] p-8 rounded-[2rem] w-64 text-center shadow-2xl relative overflow-hidden group hover:bg-[#5E4A35] transition-colors">
                <div className="absolute -right-6 -top-6 text-[#FFFBF0]/5 group-hover:scale-110 transition-transform">
                  <Icon className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                  <Icon className="w-8 h-8 text-[#D4A373] mx-auto mb-4" />
                  <div className="text-4xl font-black mb-2">{stat.value}</div>
                  <div className="text-sm font-bold uppercase tracking-widest text-[#D4A373]">{getTranslation(stat.label)}</div>
                </div>
              </fmotion.div>
            );
          })}
        </div>

        {/* Cafe Footer */}
        <div className="max-w-3xl mx-auto bg-white dark-mode:bg-[#2A2621] p-8 rounded-3xl border border-[#F2E8D5] dark-mode:border-[#3D372E] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-3 text-[#5E4A35] dark-mode:text-[#CBB59C]">
            <MapPin className="w-5 h-5 text-[#D4A373]" />
            <span className="font-medium">{getTranslation(data.contactInfo.address)}</span>
          </div>
          <div className="flex gap-6 text-[#5E4A35] dark-mode:text-[#CBB59C]">
            <span className="flex items-center gap-2 font-medium"><Phone className="w-4 h-4 text-[#D4A373]"/> {data.contactInfo.phone}</span>
            <span className="flex items-center gap-2 font-medium"><Mail className="w-4 h-4 text-[#D4A373]"/> {data.contactInfo.email}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WetCanteenPage;
