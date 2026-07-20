import React from 'react';
import { useAccessibility } from '../hooks/useAccessibility';

export const Header = () => {
  const { language } = useAccessibility();

  
  return (
    <header className="w-full bg-white/45 border-b border-gray-250/30 backdrop-blur-md text-gray-900 py-4 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4 dark-mode:bg-gray-900/35 dark-mode:text-gray-100 dark-mode:border-gray-800/40 smooth-transition relative z-10">

      {/* 1. LEFT SIDE: Emblem and Title Block */}
      <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
        {/* National Emblem of India */}
        <a
          href="https://www.india.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="focus:outline focus:outline-2 focus:outline-amber-500 rounded p-1 transition-all flex flex-col items-center gap-0.5"
        >
          <img
            src="https://mahaprisons.gov.in/wp-content/themes/sdo-theme/images/emblem.svg"
            alt={language === 'mr' ? "भारताचे राज्य चिन्ह" : "State Emblem of India"}
            className="h-14 w-auto dark-mode:invert"
          />
          <span className="text-[7.5px] font-bold text-gray-500 tracking-wider">सत्यमेव जयते</span>
        </a>

        {/* Division border */}
        <div className="hidden sm:block h-12 w-[1px] bg-gray-300 dark-mode:bg-gray-700" />

        {/* Title Texts (Concurrent rendering matching the reference site) */}
        <div className="flex flex-col">
          <span className="text-sm md:text-[15px] font-bold font-devanagari text-[#0F3D66] dark-mode:text-blue-300 leading-tight">
            महाराष्ट्र कारागृहे व सुधार सेवा
          </span>
          <h1 className="text-base md:text-lg lg:text-xl font-extrabold text-[#111827] dark-mode:text-white leading-tight font-inter">
            Maharashtra Prisons and Correctional Services
          </h1>
        </div>
      </div>

      {/* 2. RIGHT SIDE: Government Seal and Digital India Logos */}
      <div className="flex items-center gap-4 flex-wrap justify-center">
        {/* Maharashtra Government Seal */}
        <a
          href="https://www.maharashtra.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          // className="focus:outline focus:outline-2 focus:outline-amber-500 rounded p-1.5 bg-[#F1F5F9]/60 dark-mode:bg-gray-800/60 border border-gray-250/30 hover:shadow-md hover:scale-102 transition-all"
          title={language === 'mr' ? "महाराष्ट्र शासन अधिकृत संकेतस्थळ" : "Government of Maharashtra Portal"}
        >
          <img
            src="https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2026/01/20260109374693913.jpg"
            alt="Maharashtra Government Seal"
            className="h-18 w-auto rounded"
          />
        </a>

        {/* Digital India Logo */}
        <a
          href="https://digitalindia.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded px-2 bg-[#ffffff] dark-mode:bg-gray-800/60"
          title="Digital India Website"
        >
          <img
            src="https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2019/03/2019031587.png"
            alt="Digital India Logo"
            className="h-18 w-auto rounded object-contain"
          />
        </a>
      </div>

    </header>
  );
};
export default Header;
