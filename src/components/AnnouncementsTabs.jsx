import React, { useState } from 'react';
import { useAccessibility } from '../hooks/useAccessibility';
import { mockHomepageData } from '../data/mockData';
import { Bell, ArrowRight, Download, FileText, Calendar } from 'lucide-react';

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
    <div className="w-full bg-white dark-mode:bg-gray-950 py-20 px-4 md:px-8 border-b border-gray-200/60 dark-mode:border-gray-850 smooth-transition">
      <div className="max-w-4xl mx-auto bg-white border border-gray-200/80 rounded-3xl shadow-md overflow-hidden dark-mode:bg-gray-900 dark-mode:border-gray-800">
        
        {/* Header containing tabs */}
        <div className="bg-gradient-to-r from-[#0F3D66] to-[#1E5AA8] text-white p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shadow-inner">
              <Bell className="w-5 h-5 text-amber-300 animate-swing" />
            </div>
            <div>
              <h2 className={`text-base font-extrabold font-devanagari tracking-wide ${language === 'mr' ? '' : 'tracking-wide'}`}>
                {t("ताज्या घडामोडी")}
              </h2>
              <span className="text-[10px] text-blue-200 uppercase font-bold tracking-widest block mt-0.5">
                Notices & Announcements
              </span>
            </div>
          </div>

          {/* Navigation tab links */}
          <div className="flex bg-[#092947]/60 rounded-full p-1 border border-white/5 backdrop-blur-sm">
            {tabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`px-4.5 py-1.5 rounded-full text-xs font-bold transition-all focus:outline-none cursor-pointer ${
                  idx === activeTab 
                    ? 'bg-amber-500 text-gray-950 shadow-md' 
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
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
        <div className="p-6">
          <div className="flex flex-col gap-4">
            {tabs[activeTab]?.items.map((item, idx) => {
              const text = getNoticeText(item.text, activeTab, idx);
              const isPdf = item.href.endsWith('.pdf');

              return (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-gray-100 rounded-2xl hover:bg-[#F8FAFC] hover:border-[#0F3D66]/20 transition-all duration-300 dark-mode:border-gray-800 dark-mode:hover:bg-gray-850 focus:outline focus:outline-2 focus:outline-amber-500"
                >
                  <div className="flex gap-3 items-start">
                    {/* Visual file/notif status icon */}
                    <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-150 flex items-center justify-center dark-mode:bg-gray-800 dark-mode:border-gray-700 flex-shrink-0 group-hover:bg-[#0F3D66] group-hover:text-white transition-all duration-300">
                      {isPdf ? <Download className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                    </div>

                    <div className="flex flex-col">
                      <h4 className="text-xs md:text-[13px] font-bold text-gray-850 dark-mode:text-gray-250 group-hover:text-[#0F3D66] dark-mode:group-hover:text-blue-300 leading-snug transition-colors duration-300">
                        {text}
                      </h4>
                      {/* Notice metadata */}
                      <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.date || 'Jul 2026'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Redirection indicator */}
                  <div className="flex items-center gap-1.5 text-[10.5px] font-extrabold text-[#0F766E] dark-mode:text-teal-400 opacity-80 group-hover:opacity-100 transition-opacity whitespace-nowrap self-end md:self-center">
                    <span>{isPdf ? t("डाउनलोड") : t("अधिक वाचा …")}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
export default AnnouncementsTabs;
