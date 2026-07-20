import React from 'react';
import { useAccessibility } from '../hooks/useAccessibility';
import { mockHomepageData } from '../data/mockData';

export const Footer = () => {
  const { language, t } = useAccessibility();

  const footerLinks = mockHomepageData.footer_links;
  const footerBanners = mockHomepageData.footer_banners;

  // Render clean text helper
  const getCleanFooterText = (text) => {
    return t(text);
  };

  return (
    <footer className="w-full bg-[#111827] text-gray-400 text-xs smooth-transition">

      {/* 1. TOP SECTION: Logo Banners Carousel Container (White Background) */}
      <div className="w-full bg-white py-5 px-4 md:px-8 border-b border-gray-200 flex justify-center items-center">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-6 md:gap-10 select-none">
          {/* Pause Indicator mock matching the screenshot */}
          <button className="text-gray-400 hover:text-gray-900 transition-colors p-1" title="Pause Carousel">
            <span className="text-base font-bold">⏸</span>
          </button>

          {footerBanners.map((banner, idx) => (
            <a
              key={idx}
              href={banner.href}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-90 hover:opacity-100 transition-all focus:outline focus:outline-2 focus:outline-amber-500 rounded p-1 hover:scale-105"
              title={banner.img_alt}
            >
              <img
                src={banner.img_src}
                alt={banner.img_alt}
                className="h-10 md:h-13 w-auto object-contain"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>

      {/* 2. MIDDLE SECTION: Central Links Navigation (Dark Gray Background) */}
      <div className="w-full bg-[#1F2937] py-3.5 px-4 text-center border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs font-semibold text-white">
          {footerLinks.map((link, idx) => {
            if (!link.text || idx >= 6) return null; // Only render the first 6 main links as in the screenshot
            return (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-gray-600">|</span>}
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 hover:underline transition-colors focus:outline focus:outline-2 focus:outline-amber-500 rounded px-1"
                >
                  {getCleanFooterText(link.text)}
                </a>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* 3. BOTTOM SECTION: Copyright & NIC details (Deep Black Background) */}
      <div className="w-full bg-[#0A0F1D] py-10 px-6 text-center text-white text-xs leading-relaxed border-t border-gray-900 select-none">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-8">

          {/* Centered Structured Copyright lines preventing overlaps */}
          <div className="flex flex-col gap-1.5 items-center text-[11.5px] md:text-[12px]">
            <div className="font-semibold text-white">
              {language === 'mr'
                ? 'मालकीची सामग्री महाराष्ट्र कारागृह विभाग'
                : 'Contents owned and maintained by Maharashtra Prisons Department.'}
            </div>
            <div className="font-medium text-white/85">
              {language === 'mr'
                ? 'राष्ट्रीय माहिती विज्ञान केंद्र,'
                : 'Developed and hosted by National Informatics Centre,'}
            </div>
            <div className="font-medium text-white/85">
              {language === 'mr'
                ? 'भारत सरकारचे इलेक्ट्रॉनिक्स आणि माहिती तंत्रज्ञान मंत्रालय द्वारे विकसित आणि होस्ट केलेले.'
                : 'Ministry of Electronics & Information Technology, Government of India.'}
            </div>
            <div className="mt-1.5 text-[9.5px] font-medium text-white/60 uppercase tracking-wider">
              {language === 'mr' ? 'शेवटचे अद्ययावत: जुलै ०३, २०२६' : 'Last Updated: Jul 03, 2026'}
            </div>
          </div>

          {/* Centered S3WaaS, NIC and Digital India Logos separated by dividers */}
          <div className="flex items-center justify-center gap-6 border-t border-gray-800/60 pt-6 w-full max-w-md">
            {/* S3WaaS Logo */}
            <a
              href="https://s3waas.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="focus:outline focus:outline-2 focus:outline-amber-500 rounded p-1 hover:opacity-100 transition-opacity"
            >
              <img
                src="https://mahaprisons.gov.in/wp-content/themes/sdo-theme/images/S3WaaS.svg"
                alt="S3WaaS"
                className="h-9 w-auto dark-mode:brightness-125"
              />
            </a>

            <div className="w-[1px] h-6 bg-gray-800" />

            {/* NIC Logo */}
            <a
              href="https://www.nic.in"
              target="_blank"
              rel="noopener noreferrer"
              className="focus:outline focus:outline-2 focus:outline-amber-500 rounded p-1 hover:opacity-100 transition-opacity"
            >
              <img
                src="https://mahaprisons.gov.in/wp-content/themes/sdo-theme/images/NIC.svg"
                alt="NIC"
                className="h-9 w-auto dark-mode:brightness-125"
              />
            </a>

            <div className="w-[1px] h-6 bg-gray-800" />

            {/* Digital India Logo */}
            <a
              href="https://www.digitalindia.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="focus:outline focus:outline-2 focus:outline-amber-500 rounded p-1 hover:opacity-100 transition-opacity"
            >
              <img
                src="https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2019/03/2019031587.png"
                alt="Digital India"
                className="h-14 w-auto"
              />
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
};
export default Footer;
