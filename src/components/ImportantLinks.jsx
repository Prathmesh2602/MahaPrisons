import React from 'react';
import { useAccessibility } from '../hooks/useAccessibility';
import { mockHomepageData } from '../data/mockData';
import { Link2, ArrowRight } from 'lucide-react';

export const ImportantLinks = () => {
  const { language, t } = useAccessibility();

  const links = mockHomepageData.important_links;

  return (
    <div className="w-full py-20 px-4 md:px-8 bg-[#F1F5F9] dark-mode:bg-gray-900 border-b border-gray-200/60 dark-mode:border-gray-850 smooth-transition">
      <div className="max-w-7xl mx-auto">
        
        {/* Section title */}
        <div className="text-center mb-12">
          <span className={`text-[10px] text-[#0F766E] dark-mode:text-teal-400 font-extrabold uppercase block mb-2 ${language === 'mr' ? '' : 'tracking-widest'}`}>
            {t("महत्त्वाच्या लिंक्स")}
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F3D66] dark-mode:text-blue-300 font-devanagari relative inline-block pb-3">
            {t("महत्त्वाच्या लिंक्स")}
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-amber-500 rounded-full" />
          </h2>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {links.map((link, idx) => {
            return (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white border border-gray-200/60 rounded-3xl p-5 hover:border-[#0F3D66]/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 dark-mode:bg-gray-900 dark-mode:border-gray-800 dark-mode:hover:bg-gray-850 flex items-center justify-between gap-3 focus:outline focus:outline-2 focus:outline-amber-500 overflow-hidden"
              >
                {/* Decorative hover bg element */}
                <span className="absolute inset-0 bg-[#0F3D66]/3 dark-mode:bg-white/3 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 dark-mode:bg-gray-800 flex items-center justify-center text-gray-500 group-hover:bg-[#0F3D66] group-hover:text-white transition-all duration-300">
                    <Link2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-gray-700 dark-mode:text-gray-300 group-hover:text-[#0F3D66] dark-mode:group-hover:text-blue-350 transition-colors leading-snug">
                    {t(link.text)}
                  </span>
                </div>

                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#0F3D66] dark-mode:group-hover:text-blue-300 group-hover:translate-x-1 transition-all flex-shrink-0" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default ImportantLinks;
