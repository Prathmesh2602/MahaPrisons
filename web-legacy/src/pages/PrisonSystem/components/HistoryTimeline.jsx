import React from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '../../../hooks/useAccessibility';
import { yerawadaOpenJailData } from '../../../data/yerawadaOpenJailData';
import { History } from 'lucide-react';

export const HistoryTimeline = () => {
  const { language } = useAccessibility();
  const data = yerawadaOpenJailData;
  const getTranslation = (obj) => obj[language] || obj.en;

  return (
    <section className="mb-20">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600 dark-mode:bg-gray-800 dark-mode:text-amber-500 mb-6 shadow-sm"
        >
          <History className="w-8 h-8" />
        </motion.div>
        <h3 className="text-2xl md:text-3xl font-semibold text-[#0F3D66] dark-mode:text-white mb-6">{getTranslation(data.timeline.title)}</h3>
        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto relative">
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-100 via-amber-200 to-blue-100 dark-mode:from-gray-800 dark-mode:via-amber-900/30 dark-mode:to-gray-800 md:-translate-x-1/2 rounded-full" />

        <div className="space-y-12">
          {data.timeline.events.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="w-full md:w-1/2 flex justify-start md:justify-end md:hidden">
              </div>

              <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-white dark-mode:bg-gray-900 border-4 border-amber-500 shadow-lg shadow-amber-500/20 z-10 flex items-center justify-center" />

              <div className="w-full md:w-1/2 pl-16 md:pl-0">
                <div className={`p-8 rounded-3xl bg-white dark-mode:bg-gray-850 shadow-xl shadow-blue-900/5 dark-mode:shadow-black/20 border border-gray-100 dark-mode:border-gray-800 hover:shadow-2xl hover:border-amber-200 dark-mode:hover:border-amber-900/50 transition-all duration-300 group ${idx % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                  <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark-mode:bg-gray-800 text-blue-700 dark-mode:text-amber-400 font-bold text-sm mb-4 group-hover:bg-amber-100 group-hover:text-amber-700 transition-colors">
                    {event.year}
                  </span>
                  <h4 className="text-xl font-semibold text-gray-900 dark-mode:text-gray-100 mb-3 group-hover:text-[#0F3D66] transition-colors">
                    {getTranslation(event.title)}
                  </h4>
                  <p className="text-sm text-gray-600 dark-mode:text-gray-400 leading-relaxed">
                    {getTranslation(event.desc)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HistoryTimeline;
