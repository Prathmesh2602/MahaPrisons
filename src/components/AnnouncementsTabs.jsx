import React, { useState } from 'react';
import { useAccessibility } from '../hooks/useAccessibility';
import { mockHomepageData } from '../data/mockData';
import { Bell, ArrowRight, Download, FileText, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const pastelColors = [
  'bg-rose-50 dark-mode:bg-rose-950/40 border-rose-100/80 dark-mode:border-rose-900/50',
  'bg-blue-50 dark-mode:bg-blue-950/40 border-blue-100/80 dark-mode:border-blue-900/50',
  'bg-emerald-50 dark-mode:bg-emerald-950/40 border-emerald-100/80 dark-mode:border-emerald-900/50',
  'bg-amber-50 dark-mode:bg-amber-950/40 border-amber-100/80 dark-mode:border-amber-900/50',
  'bg-violet-50 dark-mode:bg-violet-950/40 border-violet-100/80 dark-mode:border-violet-900/50',
  'bg-teal-50 dark-mode:bg-teal-950/40 border-teal-100/80 dark-mode:border-teal-900/50'
];

export const AnnouncementsTabs = () => {
  const { language, t } = useAccessibility();
  const [activeTab, setActiveTab] = useState(0);

  const tabs = mockHomepageData.announcements_tabs;

  // English translation map for tab items since data starts in Marathi
  const getTabTitle = (title) => {
    if (title === "भरती") return t("भरती");
    if (title === "निविदा") return t("निविदा");
    if (title === "कागदपत्रे") return t("कागदपत्रे");
    return t(title);
  };

  // English translations for notice items
  const getNoticeText = (text, tabIdx, itemIdx) => {
    if (language === 'mr') return text;

    // Recruitment Translations
    if (tabIdx === 0) {
      switch (itemIdx) {
        case 0: return "Instructions to candidates - verification of original documents of 38 candidates who remained absent out of 102 candidates in final waiting list";
        case 1: return "Karvatya (Sawer)";
        case 2: return "Document Verification - Prison Sepoy Recruitment - Western Region, Pune";
        case 3: return "Katari (Turner)";
        case 4: return "Prison Sepoy Recruitment - Last chance for document verification - Ch. Sambhajinagar";
        case 5: return "Prison Sepoy Recruitment - Ch. Sambhajinagar - Third and final notice to absent candidates for original document verification";
        case 6: return "Prison Sepoy Recruitment Year 2022-23 - attendance of 07 candidates in final waiting list for original document verification...";
        default: return text;
      }
    }

    // Tenders Translations
    if (tabIdx === 1) {
      switch (itemIdx) {
        case 0: return "Yerwada Central Jail _ Scrap Auction _ Photos";
        case 1: return "Yerwada Central Jail _ Scrap Materials _ Scrap Item _ Weight _ Price _ Photo _ Description";
        case 2: return "Eligibility criteria for participating in the auction";
        case 3: return "Sale Registration _ Yerwada Central Jail _ Details";
        case 4: return "Auction of scrap materials in Yerwada Central Prison";
        default: return text;
      }
    }

    // Documents Translations
    if (tabIdx === 2) {
      switch (itemIdx) {
        case 0: return "Clerk Post Provisional Seniority List Year 2026";
        case 1: return "Provisional Seniority List _ Prison Officer Grade-1 _ Dated 01.01.1993 to 31.12.2026";
        case 2: return "Provisional Seniority List _ Senior Clerk _ As of 01.01.2026";
        case 3: return "Regarding publication of provisional seniority list as of 01.01.2026 of stenographer cadre posts in Prisons Department..";
        case 4: return "Regarding publication of provisional seniority list as of 01.01.2026 of promotional posts in technical cadre of Prisons Department";
        default: return text;
      }
    }

    return text;
  };

  return (
    <div className="w-full bg-slate-50 dark-mode:bg-gray-950 py-20 px-4 md:px-8 border-b border-gray-200/60 dark-mode:border-gray-850 smooth-transition">
      <div className="max-w-7xl mx-auto">
        
        {/* Section title & Tabs */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-10 border-b border-gray-200 dark-mode:border-gray-800 pb-6">
          <div className="text-center md:text-left">
            <span className="text-[10px] text-[#0F766E] dark-mode:text-teal-400 font-extrabold uppercase tracking-widest block mb-2">
              {language === 'mr' ? 'सूचना आणि घोषणा' : 'Notices & Announcements'}
            </span>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark-mode:bg-amber-900/30 flex items-center justify-center">
                <Bell className="w-5 h-5 text-amber-600 dark-mode:text-amber-400 animate-swing" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F3D66] dark-mode:text-blue-300 font-devanagari">
                {t("ताज्या घडामोडी")}
              </h2>
            </div>
          </div>

          {/* Navigation tab links */}
          <div className="flex bg-white dark-mode:bg-gray-900 rounded-full p-1.5 border border-gray-200 dark-mode:border-gray-800 shadow-sm self-center md:self-end">
            {tabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all focus:outline-none cursor-pointer ${
                  idx === activeTab 
                    ? 'bg-[#0F3D66] text-white shadow-md dark-mode:bg-blue-600' 
                    : 'text-gray-500 hover:text-[#0F3D66] hover:bg-gray-100 dark-mode:text-gray-400 dark-mode:hover:bg-gray-800 dark-mode:hover:text-blue-300'
                }`}
                aria-selected={idx === activeTab ? "true" : "false"}
                role="tab"
              >
                {getTabTitle(tab.tab_title)}
              </button>
            ))}
          </div>
        </div>

        {/* Notices items container */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {tabs[activeTab]?.items.map((item, idx) => {
                const text = getNoticeText(item.text, activeTab, idx);
                const isPdf = item.href.endsWith('.pdf');
                const cardColorClass = pastelColors[idx % pastelColors.length];

                return (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex flex-col justify-between p-5 ${cardColorClass} border rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus:outline focus:outline-2 focus:outline-amber-500 relative overflow-hidden`}
                  >
                    {/* Subtle gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#0F3D66]/5 dark-mode:to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] dark-mode:bg-gray-800 border border-gray-150 dark-mode:border-gray-700 flex items-center justify-center group-hover:bg-[#0F3D66] group-hover:text-white dark-mode:group-hover:bg-blue-600 transition-colors duration-300 shadow-sm">
                          {isPdf ? <Download className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-500 dark-mode:text-gray-400 font-bold uppercase tracking-wider bg-gray-50 dark-mode:bg-gray-850 px-2.5 py-1 rounded-full border border-gray-100 dark-mode:border-gray-800">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{item.date || 'Jul 2026'}</span>
                        </div>
                      </div>

                      <h4 className="text-[13px] font-bold text-gray-800 dark-mode:text-gray-200 group-hover:text-[#0F3D66] dark-mode:group-hover:text-blue-300 leading-snug transition-colors duration-300 line-clamp-3">
                        {text}
                      </h4>
                    </div>

                    {/* Redirection indicator */}
                    <div className="mt-4 pt-3 border-t border-gray-100 dark-mode:border-gray-800 flex items-center justify-between text-xs font-extrabold text-[#0F766E] dark-mode:text-teal-400 group-hover:text-[#1E5AA8] dark-mode:group-hover:text-blue-400 transition-colors">
                      <span>{isPdf ? t("डाउनलोड") : t("अधिक वाचा")}</span>
                      <div className="w-7 h-7 rounded-full bg-[#0F766E]/10 dark-mode:bg-teal-400/10 flex items-center justify-center group-hover:bg-[#1E5AA8]/20 dark-mode:group-hover:bg-blue-400/20 transition-colors">
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </a>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
export default AnnouncementsTabs;
