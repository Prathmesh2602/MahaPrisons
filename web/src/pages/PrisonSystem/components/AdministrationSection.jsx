"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '../../../hooks/useAccessibility';
import { yerawadaOpenJailData } from '../../../data/yerawadaOpenJailData';
import { User } from 'lucide-react';

export const AdministrationSection = () => {
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
      <div className="bg-white dark-mode:bg-gray-850 rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-blue-900/5 dark-mode:shadow-black/20 border border-gray-100 dark-mode:border-gray-800">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-semibold text-[#0F3D66] dark-mode:text-white mb-6">{getTranslation(data.administration.title)}</h3>
          <p className="text-base text-gray-600 dark-mode:text-gray-400 leading-relaxed">
            {getTranslation(data.administration.description)}
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4"
          >
            {data.administration.staff.slice(0, 6).map((member, idx) => (
              <motion.div
                key={idx}
                variants={fadeUpVariant}
                className="bg-gray-50 dark-mode:bg-gray-800 rounded-2xl py-3 px-1 sm:py-4 sm:px-2 text-center group hover:bg-[#0F3D66] dark-mode:hover:bg-gray-700 transition-colors duration-300 flex flex-col items-center"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full shadow-md flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 overflow-hidden border-2 border-white dark-mode:border-gray-700 bg-white">
                  {member.img ? (
                    <img src={member.img} alt={getTranslation(member.name)} className="w-full h-full object-cover object-top" />
                  ) : (
                    <User className="w-8 h-8 sm:w-10 sm:h-10 text-[#94A3B8]" strokeWidth={2} />
                  )}
                </div>
                <h5 title={getTranslation(member.name)} className="text-[10px] sm:text-xs font-semibold text-gray-900 dark-mode:text-white mb-1 group-hover:!text-white line-clamp-2">
                  {getTranslation(member.name)}
                </h5>
                <p className="text-[9px] sm:text-[10px] font-medium text-amber-600 dark-mode:text-amber-400 tracking-wider group-hover:text-amber-300 leading-snug line-clamp-2">
                  {getTranslation(member.role)}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {data.administration.staff.length > 6 && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4"
            >
              {data.administration.staff.slice(6).map((member, idx) => (
                <motion.div
                  key={`row2-${idx}`}
                  variants={fadeUpVariant}
                  className="bg-gray-50 dark-mode:bg-gray-800 rounded-2xl py-3 px-1 sm:py-4 sm:px-2 text-center group hover:bg-[#0F3D66] dark-mode:hover:bg-gray-700 transition-colors duration-300 flex flex-col items-center"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full shadow-md flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 overflow-hidden border-2 border-white dark-mode:border-gray-700 bg-white">
                    {member.img ? (
                      <img src={member.img} alt={getTranslation(member.name)} className="w-full h-full object-cover object-top" />
                    ) : (
                      <User className="w-8 h-8 sm:w-10 sm:h-10 text-[#94A3B8]" strokeWidth={2} />
                    )}
                  </div>
                  <h5 title={getTranslation(member.name)} className="text-[10px] sm:text-xs font-semibold text-gray-900 dark-mode:text-white mb-1 group-hover:!text-white line-clamp-2">
                    {getTranslation(member.name)}
                  </h5>
                  <p className="text-[9px] sm:text-[10px] font-medium text-amber-600 dark-mode:text-amber-400 tracking-wider group-hover:text-amber-300 leading-snug line-clamp-2">
                    {getTranslation(member.role)}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdministrationSection;
