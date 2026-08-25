import React, { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '../../hooks/useAccessibility';
import { facilitiesData } from '../../data/facilitiesData';
import { Book, Newspaper, Users, BookOpen, Library, MapPin, Phone, Mail } from 'lucide-react';

const iconMap = { Book, Newspaper, Users, BookOpen, Library };

const LibraryPage = () => {
  const { language } = useAccessibility();
  const data = facilitiesData['library'];

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const getTranslation = (obj) => (obj ? obj[language] || obj.en : '');

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark-mode:bg-[#1A1814] font-poppins text-[#3A332C] dark-mode:text-[#E6DFD5]">
      
      {/* Classic Elegant Header */}
      <div className="border-b border-[#E6DFD5] dark-mode:border-[#3A332C]">
        <div className="container mx-auto px-6 py-20 lg:py-32 flex flex-col items-center text-center max-w-4xl">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <BookOpen className="w-16 h-16 text-[#8B7355] dark-mode:text-[#C1A88B]" />
          </motion.div>
          
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            {getTranslation(data.title)}
          </motion.h1>
          
          <motion.div initial={{ width: 0 }} animate={{ width: '100px' }} transition={{ delay: 0.2, duration: 0.8 }} className="h-1 bg-[#8B7355] dark-mode:bg-[#C1A88B] mb-8" />
          
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-2xl italic text-[#8B7355] dark-mode:text-[#C1A88B]">
            {getTranslation(data.subtitle)}
          </motion.h2>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        
        {/* Intro Paragraph */}
        <div className="max-w-3xl mx-auto mb-24">
          <p className="text-2xl leading-relaxed text-center font-light">
            <span className="text-6xl text-[#8B7355] dark-mode:text-[#C1A88B] font-bold leading-none float-left mr-4 mt-2">
              {getTranslation(data.description).charAt(0)}
            </span>
            {getTranslation(data.description).substring(1)}
          </p>
        </div>

        {/* Masonry-like Layout for Features & Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-center">
          
          {/* Left Column (Features) */}
          <div className="lg:col-span-5 space-y-12">
            {data.keyFunctions.map((func, idx) => {
              const Icon = iconMap[func.icon] || Book;
              return (
                <motion.div key={idx} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.2 }} className="group">
                  <div className="flex items-center gap-4 mb-4">
                    <Icon className="w-8 h-8 text-[#8B7355] dark-mode:text-[#C1A88B] transition-transform group-hover:scale-110" />
                    <h3 className="text-2xl font-bold">{getTranslation(func.title)}</h3>
                  </div>
                  <p className="text-lg text-[#5A534C] dark-mode:text-[#B6AFA5] leading-relaxed pl-12 font-poppins">
                    {getTranslation(func.desc)}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column (Hero Image) */}
          <div className="lg:col-span-7 relative">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative z-10 p-4 bg-white dark-mode:bg-[#2A2621] shadow-2xl">
              <img src={data.heroImage} alt="Library" className="w-full h-auto object-cover grayscale-[30%] sepia-[20%]" />
            </motion.div>
            <div className="absolute -inset-4 border border-[#8B7355]/30 dark-mode:border-[#C1A88B]/30 z-0 translate-x-8 translate-y-8 hidden md:block" />
          </div>

        </div>

        {/* Stats Strip */}
        <div className="border-t border-b border-[#E6DFD5] dark-mode:border-[#3A332C] py-16 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[#E6DFD5] dark-mode:divide-[#3A332C]">
            {data.stats.map((stat, idx) => {
              const Icon = iconMap[stat.icon] || Book;
              return (
                <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="flex flex-col items-center pt-8 md:pt-0">
                  <Icon className="w-8 h-8 text-[#8B7355] dark-mode:text-[#C1A88B] mb-4" />
                  <div className="text-5xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm font-poppins tracking-[0.2em] uppercase text-[#8B7355] dark-mode:text-[#C1A88B]">{getTranslation(stat.label)}</div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Elegant Footer */}
        <div className="max-w-2xl mx-auto text-center font-poppins">
          <h4 className="text-sm tracking-[0.2em] uppercase text-[#8B7355] dark-mode:text-[#C1A88B] mb-6">
            {language === 'mr' ? 'संपर्क माहिती' : 'Contact Information'}
          </h4>
          <div className="flex flex-col items-center gap-4 text-[#5A534C] dark-mode:text-[#B6AFA5]">
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4"/> {getTranslation(data.contactInfo.address)}</span>
            <span className="flex items-center gap-2"><Phone className="w-4 h-4"/> {data.contactInfo.phone}</span>
            <span className="flex items-center gap-2"><Mail className="w-4 h-4"/> {data.contactInfo.email}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LibraryPage;
