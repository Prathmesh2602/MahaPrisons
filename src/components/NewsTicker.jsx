import React, { useState, useEffect } from 'react';
import { useAccessibility } from '../hooks/useAccessibility';
import { mockHomepageData } from '../data/mockData';
import { Megaphone, ArrowUpRight } from 'lucide-react';

export const NewsTicker = () => {
  const { language, t } = useAccessibility();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const items = mockHomepageData.news_ticker;

  useEffect(() => {
    if (isPaused || items.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, items.length]);

  return (
    <div
      className="w-full bg-gradient-to-r from-[#0F3D66]/85 via-[#1E5AA8]/80 to-[#0B665E]/80 backdrop-blur-md text-white py-2.5 px-4 md:px-8 border-b border-white/10 flex flex-col md:flex-row items-center gap-3 overflow-hidden text-sm relative smooth-transition shadow-sm"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. Ticker Title badge */}
      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wider shadow-inner animate-pulse flex-shrink-0">
        <Megaphone className="w-3.5 h-3.5 text-amber-300" />
        <span className="font-devanagari text-white">{t("ताजी बातमी")}</span>
      </div>

      {/* 2. Ticker Content Window */}
      <div className="relative w-full h-5 flex items-center overflow-hidden">
        {items.map((item, idx) => {
          const isActive = idx === activeIndex;

          // Clean text translations for news items
          const itemText = language === 'mr'
            ? item.text
            : idx === 0
              ? "Regarding publication of provisional service seniority list as of 01.01.2024 for Lower Grade posts in Prisons Department. NEW"
              : "Regarding the announcement of results of the qualifying examination conducted from 19.06.2024 to 21.06.2024 for clerical category employees. NEW";

          return (
            <div
              key={idx}
              className={`absolute inset-0 flex items-center transition-all duration-500 transform ${isActive
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-full opacity-0'
                }`}
              style={{ display: isActive ? 'flex' : 'none' }}
            >
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline flex items-center pl-2 gap-2 font-semibold text-white/95 hover:text-amber-300 w-full truncate focus:outline focus:outline-2 focus:outline-amber-500 rounded transition-colors"
              >
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0 animate-ping" />
                <span className="truncate">{itemText}</span>
                <ArrowUpRight className="w-4 h-4 text-blue-300 flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          );
        })}
      </div>

      {/* 3. Assistive Controls reminder */}
      <div className="hidden lg:block text-[11px] text-blue-200 whitespace-nowrap opacity-80">
        {language === 'mr' ? '(* विराम देण्यासाठी माउस वर ठेवा)' : '(* Hover to pause)'}
      </div>
    </div>
  );
};
export default NewsTicker;
