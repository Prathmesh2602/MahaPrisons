import React, { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '../../hooks/useAccessibility';
import { facilitiesData } from '../../data/facilitiesData';
import { Phone, Clock, ShieldCheck, PhoneCall, Video, MapPin, Mail, Cpu } from 'lucide-react';

const iconMap = { Phone, Clock, ShieldCheck, PhoneCall, Video };

const SmartCardPhonePage = () => {
  const { language } = useAccessibility();
  const data = facilitiesData['smart-card-phone'];

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const getTranslation = (obj) => (obj ? obj[language] || obj.en : '');

  return (
    <div className="min-h-screen bg-[#050B14] text-gray-200 font-poppins relative overflow-hidden">
      
      {/* Tech Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay" />

      <div className="container mx-auto px-6 py-20 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-20 h-20 mx-auto bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.4)] mb-8"
          >
            <Cpu className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 mb-4 pb-4 pt-2 leading-snug"
          >
            {getTranslation(data.title)}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-xl text-blue-200/70"
          >
            {getTranslation(data.subtitle)}
          </motion.p>
        </div>

        {/* Hero Image & Description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
            className="relative rounded-3xl overflow-hidden p-1 bg-gradient-to-br from-cyan-500/30 to-blue-600/10 backdrop-blur-xl"
          >
            <div className="relative rounded-[22px] overflow-hidden">
              <img src={data.heroImage} alt="Smart Card" className="w-full h-auto aspect-video object-cover" />
              <div className="absolute inset-0 bg-blue-900/40 mix-blend-overlay" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
            className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-3xl backdrop-blur-md shadow-2xl"
          >
            <p className="text-lg leading-relaxed text-gray-300 mb-8">
              {getTranslation(data.description)}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {data.stats.map((stat, idx) => {
                const Icon = iconMap[stat.icon] || Cpu;
                return (
                  <div key={idx} className="flex flex-col gap-2">
                    <Icon className="w-6 h-6 text-cyan-400" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-widest">{getTranslation(stat.label)}</div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Glassmorphic Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {data.keyFunctions.map((func, idx) => {
            const Icon = iconMap[func.icon] || PhoneCall;
            return (
              <motion.div 
                key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.2 }}
                className="group relative bg-white/[0.03] border border-white/[0.05] hover:border-cyan-500/30 rounded-3xl p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(6,182,212,0.1)]"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{getTranslation(func.title)}</h3>
                <p className="text-gray-400 leading-relaxed">{getTranslation(func.desc)}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Minimalist Contact Footer */}
        <motion.div 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="border-t border-white/10 pt-12 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-3 text-gray-400">
            <MapPin className="w-5 h-5 text-cyan-500" />
            <span>{getTranslation(data.contactInfo.address)}</span>
          </div>
          <div className="flex items-center gap-8 text-sm font-medium">
            <span className="flex items-center gap-2 text-white"><Phone className="w-4 h-4 text-cyan-500"/> {data.contactInfo.phone}</span>
            <span className="flex items-center gap-2 text-white"><Mail className="w-4 h-4 text-cyan-500"/> {data.contactInfo.email}</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default SmartCardPhonePage;
