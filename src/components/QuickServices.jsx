import React from 'react';
import { useAccessibility } from '../hooks/useAccessibility';
import { mockHomepageData } from '../data/mockData';
import { Phone, Shield, ShieldAlert, HeartHandshake, UserCheck, HelpCircle } from 'lucide-react';

export const QuickServices = () => {
  const { language, t } = useAccessibility();

  // Helper function to return relevant Lucide Icons for government services
  const getIcon = (idx) => {
    switch (idx) {
      case 0: return <UserCheck className="w-5 h-5 text-teal-600 dark-mode:text-teal-400" />;
      case 1: return <ShieldAlert className="w-5 h-5 text-red-600 dark-mode:text-red-400" />;
      case 2: return <Shield className="w-5 h-5 text-blue-600 dark-mode:text-blue-400" />;
      case 3: return <ShieldAlert className="w-5 h-5 text-amber-600 dark-mode:text-amber-400" />;
      case 4: return <HeartHandshake className="w-5 h-5 text-pink-650 dark-mode:text-pink-400" />;
      case 5: return <HelpCircle className="w-5 h-5 text-indigo-600 dark-mode:text-indigo-400" />;
      default: return <Phone className="w-5 h-5 text-gray-600" />;
    }
  };

  const getIconBg = (idx) => {
    switch (idx) {
      case 0: return 'bg-teal-50 dark-mode:bg-teal-950/25 border-teal-100 dark-mode:border-teal-900/40';
      case 1: return 'bg-red-50 dark-mode:bg-red-950/25 border-red-100 dark-mode:border-red-900/40';
      case 2: return 'bg-blue-50 dark-mode:bg-blue-950/25 border-blue-100 dark-mode:border-blue-900/40';
      case 3: return 'bg-amber-50 dark-mode:bg-amber-950/25 border-amber-100 dark-mode:border-amber-900/40';
      case 4: return 'bg-pink-50 dark-mode:bg-pink-950/25 border-pink-100 dark-mode:border-pink-900/40';
      case 5: return 'bg-indigo-50 dark-mode:bg-indigo-950/25 border-indigo-100 dark-mode:border-indigo-900/40';
      default: return 'bg-gray-50 border-gray-150';
    }
  };

  return (
    <div className="w-full py-16 px-4 md:px-8 bg-white dark-mode:bg-gray-950 smooth-transition relative overflow-hidden">
      {/* Decorative background blur objects */}
      <span className="absolute -top-32 -left-32 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      <span className="absolute -bottom-32 -right-32 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section title */}
        <div className="text-center mb-12">
          <span className={`text-[10px] text-[#0F766E] dark-mode:text-teal-400 font-extrabold uppercase block mb-2 ${language === 'mr' ? '' : 'tracking-widest'}`}>
            {t("नागरिकांविषयी")}
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F3D66] dark-mode:text-blue-300 font-devanagari relative inline-block pb-3">
            {t("मदत केंद्र")}
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-amber-500 rounded-full shadow-sm" />
          </h2>
        </div>

        {/* Services helpline grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockHomepageData.helpline_services.map((service, idx) => {
            const parts = service.text.split(':');
            const number = parts[1] ? parts[1].trim() : '';

            // Render translated version of helpline titles
            const translatedTitle = t(service.text).split(':')[0];
            const translatedNumber = t(service.text).split(':')[1] || number;

            return (
              <a
                key={idx}
                href={`tel:${number}`}
                className="group relative bg-gradient-to-tr from-[#F8FAFC] to-white border border-gray-200/60 rounded-3xl p-6 hover:from-white hover:to-white hover:border-[#0F3D66]/25 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 dark-mode:from-gray-900 dark-mode:to-gray-850 dark-mode:border-gray-800 dark-mode:hover:bg-gray-850 flex items-center gap-5 focus:outline focus:outline-2 focus:outline-amber-500 overflow-hidden"
              >
                {/* Subtle colored glow corner */}
                <span className="absolute -top-12 -right-12 w-28 h-28 bg-[#0F3D66]/3 group-hover:bg-[#0F3D66]/8 rounded-full blur-2xl transition-all duration-500" />

                {/* Icon wrapper */}
                <div className={`w-12 h-12 rounded-2xl border shadow-inner flex items-center justify-center group-hover:scale-108 transition-transform duration-300 ${getIconBg(idx)}`}>
                  {getIcon(idx)}
                </div>

                {/* Typography details */}
                <div className="flex flex-col">
                  <span className={`text-[10px] md:text-xs font-bold text-gray-500 dark-mode:text-gray-400 group-hover:text-amber-600 transition-colors uppercase ${language === 'mr' ? '' : 'tracking-wider'}`}>
                    {translatedTitle}
                  </span>
                  <span className="text-xl md:text-22px font-extrabold text-[#0F3D66] dark-mode:text-blue-300 font-poppins tracking-tight leading-snug">
                    {translatedNumber}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default QuickServices;
