"use client";
import React from 'react';
import { useAccessibility } from '../hooks/useAccessibility';


export default function Footer({ settings = {} }) {
  const { language } = useAccessibility();

  const footerBanners = settings.footerBanners || [];

  // Yerawada Open Prison specific links
  const footerLinks = [
    { text: language === 'mr' ? 'मुख्यपृष्ठ' : 'Home', href: '#' },
    { text: language === 'mr' ? 'आमच्याबद्दल' : 'About Us', href: '#' },
    { text: language === 'mr' ? 'उपक्रम' : 'Activities', href: '#' },
    { text: language === 'mr' ? 'वेबसाइट धोरणे' : 'Website Policies', href: '#' },
    { text: language === 'mr' ? 'संपर्क साधा' : 'Contact Us', href: '#' },
    { text: language === 'mr' ? 'अभिप्राय' : 'Feedback', href: '#' }
  ];

  return (
    <footer className="w-full bg-[#111827] text-gray-400 text-xs smooth-transition">

      {/* 1. TOP SECTION: Logo Banners Carousel Container (White Background) */}
      <div className="w-full bg-white py-5 border-b border-gray-200 overflow-hidden relative flex items-center group">
        <style>
          {`
            @keyframes marquee {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee 30s linear infinite;
              display: flex;
              width: max-content;
            }
            .group:hover .animate-marquee {
              animation-play-state: paused;
            }
          `}
        </style>

        {/* Pause Indicator overlay (visible on hover to show it's paused) */}
        <div className="absolute left-4 z-10 bg-white shadow rounded p-1 cursor-default opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gray-400">
           <span className="text-base font-medium" title="Paused">⏸</span>
        </div>

        {/* Marquee Track */}
        <div className="animate-marquee gap-10 px-5 items-center">
          {/* Render the array twice for a seamless infinite scroll loop */}
          {[...footerBanners, ...footerBanners].map((banner, idx) => (
            <a
              key={idx}
              href={banner.href}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-90 hover:opacity-100 transition-all focus:outline focus:outline-2 focus:outline-amber-500 rounded p-1 shrink-0"
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
      <div className="w-full bg-[#1F2937] py-3.5 px-4 text-center border-t-4 border-amber-600 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs font-semibold text-white">
          {footerLinks.map((link, idx) => {
            return (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-gray-600">|</span>}
                <a
                  href={link.href}
                  className="hover:text-amber-400 hover:underline transition-colors focus:outline focus:outline-2 focus:outline-amber-500 rounded px-1"
                >
                  {link.text}
                </a>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* 3. CONTACT SECTION: Address and contact info */}
      <div className="w-full bg-[#1F2937] py-5 px-4 text-center border-b border-gray-800">
         <p className="text-gray-300 font-medium text-[13px] leading-relaxed">
           {language === 'mr' 
              ? 'येरवडा खुले कारागृह, विमानतळ रस्ता, पुणे, महाराष्ट्र ४११००६'
              : 'Yerawada Open Prison, Airport Road, Pune, Maharashtra 411006'}
           <br className="md:hidden" />
           <span className="hidden md:inline text-gray-500 mx-3">|</span>
           {language === 'mr' ? 'फोन: ०२०-२६६९४०५१' : 'Phone: 020-26694051'}
           <span className="hidden md:inline text-gray-500 mx-3">|</span>
           {language === 'mr' ? 'ई-मेल:' : 'Email:'} <a href="mailto:yerwadaop-mh@gov.in" className="hover:text-amber-400 hover:underline">yerwadaop-mh@gov.in</a>
         </p>
      </div>

      {/* 4. BOTTOM SECTION: Copyright & NIC details (Deep Black Background) */}
      <div className="w-full bg-[#0A0F1D] py-10 px-6 text-center text-white text-xs leading-relaxed border-t border-gray-900 select-none">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-8">

          {/* Centered Structured Copyright lines preventing overlaps */}
          <div className="flex flex-col gap-1.5 items-center text-[11.5px] md:text-[12px]">
            <div className="font-semibold text-white">
              {language === 'mr'
                ? 'मालकीची सामग्री येरवडा खुले कारागृह'
                : 'Contents owned and maintained by Yerawada Open Prison.'}
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



        </div>
      </div>

    </footer>
  );
};
export default Footer;


