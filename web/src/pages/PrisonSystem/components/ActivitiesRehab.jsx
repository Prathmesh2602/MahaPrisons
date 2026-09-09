"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '../../../hooks/useAccessibility';
import { yerawadaOpenJailData } from '../../../data/yerawadaOpenJailData';
import { ChevronRight } from 'lucide-react';

export const ActivitiesRehab = () => {
  const { language } = useAccessibility();
  const data = yerawadaOpenJailData;
  const getTranslation = (obj) => obj[language] || obj.en;

  return (
    <section className="mb-20">
      <div className="text-center mb-16">
        <h3 className="text-2xl md:text-3xl font-semibold text-[#0F3D66] dark-mode:text-white mb-6">{getTranslation(data.activities.title)}</h3>
        <p className="text-base text-gray-600 dark-mode:text-gray-400 max-w-2xl mx-auto">{getTranslation(data.overview.description)}</p>
      </div>

      <div className="space-y-12 max-w-6xl mx-auto px-4 md:px-12 lg:px-24">
        {data.activities.list.map((activity, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`flex flex-col lg:flex-row gap-8 lg:gap-12 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-blue-900/10 group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={activity.image}
                  alt={getTranslation(activity.title)}
                  className="w-full h-[260px] md:h-[300px] object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="max-w-lg">
                <div className="w-10 h-1 bg-amber-500 rounded-full mb-4" />
                <h4 className="text-xl md:text-2xl font-bold text-gray-900 dark-mode:text-white mb-4 leading-tight">
                  {getTranslation(activity.title)}
                </h4>
                <p className="text-sm md:text-base text-gray-600 dark-mode:text-gray-400 leading-relaxed mb-6">
                  {getTranslation(activity.desc)}
                </p>
                <button className="inline-flex items-center gap-2 text-sm text-blue-600 dark-mode:text-amber-400 font-semibold hover:gap-3 transition-all focus:outline-none">
                  {language === 'mr' ? 'अधिक जाणून घ्या' : 'Learn more'} <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ActivitiesRehab;
