"use client";
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAccessibility } from '../../../hooks/useAccessibility';
import { yerawadaOpenJailData } from '../../../data/yerawadaOpenJailData';
import { Activity } from 'lucide-react';

export const HeroSection = () => {
  const { language } = useAccessibility();
  const data = yerawadaOpenJailData;
  const getTranslation = (obj) => obj[language] || obj.en;

  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacityHero = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section className="relative h-[75vh] overflow-hidden flex items-center justify-center bg-[#0F3D66] dark-mode:bg-gray-950">
      <motion.div
        style={{ y: yHero, opacity: opacityHero }}
        className="absolute inset-0 z-0 bg-cover bg-center"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] via-[#0F3D66]/60 to-[#0F3D66]/80 dark-mode:from-[#080B11] dark-mode:via-gray-900/80 dark-mode:to-gray-900/90 z-10" />
        <img src="/gallary/rehab_hero.png" alt="Rehabilitation" className="w-full h-full object-cover opacity-60 dark-mode:opacity-40" />
      </motion.div>
      <div className="container mx-auto px-4 md:px-8 relative z-20 text-center max-w-5xl text-white mt-4 pb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl shadow-black/20 mb-8"
        >
          <Activity className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-semibold uppercase tracking-widest text-amber-50">
            {language === 'mr' ? 'सुधारणा आणि पुनर्वसन' : 'Correction & Rehabilitation'}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6 leading-tight drop-shadow-2xl"
        >
          {getTranslation(data.hero.title)}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl md:text-2xl font-medium text-amber-400 mb-8 drop-shadow-md"
        >
          {getTranslation(data.hero.subtitle)}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base md:text-lg text-blue-50/90 max-w-4xl mx-auto leading-relaxed font-light"
        >
          {getTranslation(data.hero.description)}
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;
