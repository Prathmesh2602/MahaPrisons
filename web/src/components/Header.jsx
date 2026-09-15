"use client";
import React from 'react';
import { useAccessibility } from '../hooks/useAccessibility';

export const Header = ({ settingsData }) => {
  const { language } = useAccessibility();

  const titleEn = settingsData?.header_config?.title_en || 'Yerwada Open District Prison Pune';
  const titleMr = settingsData?.header_config?.title_mr || 'येरवडा खुले जिल्हा कारागृह, पुणे';
  const subtitleEn = settingsData?.header_config?.subtitle_en || 'Yerwada Open District Prison Pune';
  const subtitleMr = settingsData?.header_config?.subtitle_mr || 'येरवडा खुले जिल्हा कारागृह, पुणे';
  const logoSrc = settingsData?.header_config?.logo_src || 'http://localhost:5000/uploads/logo.jpeg';
  const logoLink = settingsData?.header_config?.logo_link || 'https://www.maharashtra.gov.in';
  
  // Backward compatibility fallback for legacy settings
  const legacyEmblemSrc = settingsData?.header_config?.state_emblem_src || 'http://localhost:5000/uploads/emblem.svg';
  const legacyEmblemLink = settingsData?.header_config?.emblem_link || 'https://www.india.gov.in';
  const legacyDigitalIndiaSrc = settingsData?.header_config?.digital_india_src || 'http://localhost:5000/uploads/digital_india.png';
  const legacyDigitalIndiaLink = settingsData?.header_config?.digital_india_link || 'https://digitalindia.gov.in';

  const rightLogos = settingsData?.header_config?.right_logos || [
    { src: legacyEmblemSrc, link: legacyEmblemLink },
    { src: legacyDigitalIndiaSrc, link: legacyDigitalIndiaLink }
  ];

  return (
    <header className="w-full bg-white/45 backdrop-blur-md text-gray-900 py-1.5 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4 dark-mode:bg-gray-900/35 dark-mode:text-gray-100 dark-mode:border-gray-800/40 smooth-transition relative z-10 devanagari-force">

      {/* 1. LEFT SIDE: Emblem and Title Block */}
      <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
        {/* Maharashtra Government Seal */}
        <a
          href={logoLink}
          target="_blank"
          rel="noopener noreferrer"
          title={language === 'mr' ? "महाराष्ट्र शासन अधिकृत संकेतस्थळ" : "Government of Maharashtra Portal"}
        >
          <img
            src={logoSrc}
            alt="Maharashtra Government Seal"
            className="h-12 md:h-14 w-auto rounded object-contain"
          />
        </a>

        {/* Division border */}
        <div className="hidden sm:block h-10 w-[1px] bg-gray-300 dark-mode:bg-gray-700" />

        {/* Title Texts */}
        <div className="flex flex-col">
          <span className="text-xs md:text-[14px] font-medium font-poppins text-[#0F3D66] dark-mode:text-blue-300 leading-tight mb-1">
            {language === 'mr' ? subtitleMr : subtitleEn}
          </span>
          <h1 className="text-base md:text-lg lg:text-xl font-semibold text-[#111827] dark-mode:text-white leading-tight">
            {language === 'mr' ? titleMr : titleEn}
          </h1>
        </div>

      </div>

      {/* 2. RIGHT SIDE: Dynamic Logos */}
      <div className="flex items-center gap-4 flex-wrap justify-center">
        {rightLogos.map((logo, idx) => {
          if (!logo.src) return null;
          return (
            <a
              key={idx}
              href={logo.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded px-2 py-1 bg-white/60 dark-mode:bg-gray-200 hover:bg-white transition-all flex items-center justify-center shadow-sm"
            >
              <img
                src={logo.src}
                alt={`Partner Logo ${idx + 1}`}
                className="h-10 md:h-12 w-auto object-contain"
              />
            </a>
          );
        })}
      </div>

    </header>
  );
};
export default Header;
