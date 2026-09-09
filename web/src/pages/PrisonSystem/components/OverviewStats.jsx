import React from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '../../../hooks/useAccessibility';
import { yerawadaOpenJailData } from '../../../data/yerawadaOpenJailData';
import { MapPin, CheckCircle2, Award } from 'lucide-react';

export const OverviewStats = () => {
  const { language } = useAccessibility();
  const data = yerawadaOpenJailData;
  const getTranslation = (obj) => obj[language] || obj.en;

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <section className="mb-20">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {data.overview.stats.map((stat, idx) => (
          <motion.div
            key={idx}
            variants={fadeUpVariant}
            className="bg-white/80 dark-mode:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-blue-900/10 dark-mode:shadow-black/40 border border-white/50 dark-mode:border-gray-700 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-500 hover:bg-white dark-mode:hover:bg-gray-800"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark-mode:bg-blue-900/30 flex items-center justify-center text-blue-600 dark-mode:text-blue-400 mb-6 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-amber-50 group-hover:text-amber-500 transition-all duration-500 shadow-inner">
              {idx === 0 ? <MapPin className="w-8 h-8" /> : idx === 1 ? <CheckCircle2 className="w-8 h-8" /> : <Award className="w-8 h-8" />}
            </div>
            <h4 className="text-xs font-bold text-gray-400 dark-mode:text-gray-500 uppercase tracking-widest mb-2">
              {getTranslation(stat.label)}
            </h4>
            <p className="text-2xl font-bold text-[#0F3D66] dark-mode:text-white">
              {getTranslation(stat.value)}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default OverviewStats;
