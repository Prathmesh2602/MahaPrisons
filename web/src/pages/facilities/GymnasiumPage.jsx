import React, { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '../../hooks/useAccessibility';
import { facilitiesData } from '../../data/facilitiesData';
import { Dumbbell, Clock, UserCheck, Trophy, MapPin, Phone, Mail } from 'lucide-react';

const iconMap = { Dumbbell, Clock, UserCheck, Trophy };

const GymnasiumPage = () => {
  const { language } = useAccessibility();
  const data = facilitiesData['gymnasium'];

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const getTranslation = (obj) => (obj ? obj[language] || obj.en : '');

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-poppins uppercase">
      
      {/* Aggressive Header */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <img src={data.heroImage} alt="Gym" className="w-full h-full object-cover grayscale opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-transparent mix-blend-color" />
        </div>
        
        {/* Diagonal Cut out */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-[#0A0A0A] transform skew-y-2 origin-bottom-right z-10" />

        <div className="container mx-auto px-6 relative z-20">
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="border-l-8 border-red-600 pl-8">
            <h2 className="text-red-500 font-black tracking-[0.2em] text-xl mb-4">{getTranslation(data.subtitle)}</h2>
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-6 leading-none">
              {getTranslation(data.title)}
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-20 pb-24">
        
        {/* Description block (overlapping diagonal) */}
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="-mt-16 mb-24 max-w-4xl">
          <p className="text-2xl md:text-3xl font-light text-gray-300 leading-snug border-l-2 border-red-600 pl-6 normal-case">
            {getTranslation(data.description)}
          </p>
        </motion.div>

        {/* Heavy Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {data.stats.map((stat, idx) => {
            const Icon = iconMap[stat.icon] || Dumbbell;
            return (
              <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-[#141414] border border-gray-800 p-8 hover:border-red-600 transition-colors group">
                <Icon className="w-12 h-12 text-gray-700 group-hover:text-red-600 transition-colors mb-6" />
                <div className="text-5xl font-black text-white mb-2 tracking-tighter">{stat.value}</div>
                <div className="text-sm font-bold text-gray-500 tracking-[0.2em]">{getTranslation(stat.label)}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Feature Sections */}
        <div className="space-y-4">
          {data.keyFunctions.map((func, idx) => {
            const Icon = iconMap[func.icon] || Dumbbell;
            return (
              <motion.div key={idx} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-[#1A1A1A] flex flex-col md:flex-row items-center hover:bg-[#222] transition-colors border-l-4 border-transparent hover:border-red-600">
                <div className="p-8 md:p-12 md:w-1/3 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-800">
                  <Icon className="w-16 h-16 text-red-600 mb-4" />
                  <h3 className="text-2xl font-black text-center">{getTranslation(func.title)}</h3>
                </div>
                <div className="p-8 md:p-12 md:w-2/3">
                  <p className="text-xl text-gray-400 font-light normal-case leading-relaxed">
                    {getTranslation(func.desc)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Raw Contact Footer */}
        <div className="mt-32 pt-12 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-8 text-sm tracking-[0.1em] font-bold text-gray-500">
          <div className="flex items-center gap-4 hover:text-white transition-colors">
            <MapPin className="w-5 h-5 text-red-600" /> {getTranslation(data.contactInfo.address)}
          </div>
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2 hover:text-white transition-colors"><Phone className="w-4 h-4 text-red-600"/> {data.contactInfo.phone}</span>
            <span className="flex items-center gap-2 hover:text-white transition-colors normal-case"><Mail className="w-4 h-4 text-red-600"/> {data.contactInfo.email}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GymnasiumPage;
