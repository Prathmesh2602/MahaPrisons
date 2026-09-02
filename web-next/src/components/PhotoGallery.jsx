"use client";
import React from 'react';
import { useAccessibility } from '../hooks/useAccessibility';
import { mockHomepageData } from '../data/mockData';
import Link from 'next/link';
import { ArrowUpRight, Grid } from 'lucide-react';
import { galleryItems } from '../data/galleryData';

export const PhotoGallery = () => {
  const { language, t } = useAccessibility();

  const galleryInfo = mockHomepageData.gallery;

  // Interleave photos with relatable filler blocks to fill masonry gaps
  const mixedItems = [
    galleryItems[0],
    galleryItems[1],
    { type: 'filler', style: 'quote', text_mr: 'सुधारणा आणि पुनर्वसन', text_en: 'Reform and Rehabilitation' },
    galleryItems[2],
    galleryItems[3],
    galleryItems[4],
    { type: 'filler', style: 'stat', value: '1956', label_mr: 'स्थापना वर्ष', label_en: 'Established' },
    galleryItems[5],
    galleryItems[6],
    { type: 'filler', style: 'logo' },
    galleryItems[7],
    galleryItems[8],
    galleryItems[9],
    { type: 'filler', style: 'quote', text_mr: 'श्रमातून स्वावलंबन', text_en: 'Self-reliance through labor' },
    galleryItems[10],
    galleryItems[11],
    galleryItems[12],
    { type: 'filler', style: 'stat', value: '265+', label_mr: 'एकर परिसर', label_en: 'Acres Campus' },
    galleryItems[13],
    galleryItems[14],
    galleryItems[15],
  ];

  return (
    <div className="w-full bg-white dark-mode:bg-gray-950 py-8 border-b border-gray-200 dark-mode:border-gray-800 smooth-transition overflow-hidden">
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-reverse {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-marquee {
            animation: marquee 70s linear infinite;
          }
          .animate-marquee-reverse {
            animation: marquee-reverse 70s linear infinite;
          }
          .marquee-pause-hover:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-6">
        {/* Section title & View All action */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-gray-100 dark-mode:border-gray-800 pb-4">
          <div className="text-center sm:text-left">
            <span className="text-[10px] text-[#0F766E] dark-mode:text-teal-400 font-semibold uppercase tracking-widest block mb-2">
              {language === 'mr' ? 'दृश्य दालन' : 'Visual Gallery'}
            </span>
            <h2 className="text-xl md:text-2xl font-semibold text-[#0F3D66] dark-mode:text-blue-300 font-poppins">
              {t("छायाचित्र दालन")}
            </h2>
          </div>

          <Link
            to="/gallery"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white dark-mode:bg-gray-900 border-2 border-[#0F3D66] dark-mode:border-blue-400 text-[#0F3D66] dark-mode:text-blue-400 font-semibold text-sm hover:bg-[#0F3D66] hover:text-white dark-mode:hover:bg-blue-400 dark-mode:hover:text-gray-900 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 dark-mode:focus:ring-blue-900/30 shadow-sm hover:shadow-md"
          >
            <span>{t('सर्व पहा')}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      {/* Full Width Marquee Collage */}
      <div className="w-full overflow-hidden relative">
        {/* Gradient overlays for smooth fading edges */}
        <div className="absolute top-0 left-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white dark-mode:from-gray-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white dark-mode:from-gray-950 to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee">

          {/* First Block */}
          <div className="columns-3 sm:columns-4 lg:columns-5 xl:columns-6 gap-3 sm:gap-4 w-[150vw] sm:w-[120vw] lg:w-[100vw] px-2">
            {mixedItems.map((item, idx) => {
              if (item.type === 'filler') {
                if (item.style === 'quote') {
                  return (
                    <div key={`m1-f-${idx}`} className="break-inside-avoid relative rounded-xl overflow-hidden mb-3 sm:mb-4 shadow-sm bg-[#0F3D66] flex items-center justify-center p-6 min-h-[140px]">
                      <p className="text-white text-center font-medium font-poppins text-xs sm:text-sm leading-snug">
                        "{language === 'mr' ? item.text_mr : item.text_en}"
                      </p>
                    </div>
                  );
                }
                if (item.style === 'stat') {
                  return (
                    <div key={`m1-f-${idx}`} className="break-inside-avoid relative rounded-xl overflow-hidden mb-3 sm:mb-4 shadow-sm bg-amber-50 dark-mode:bg-amber-900/20 border border-amber-200 dark-mode:border-amber-700/30 flex flex-col items-center justify-center p-6 min-h-[140px]">
                      <span className="text-2xl md:text-3xl font-bold text-amber-700 dark-mode:text-amber-500 mb-1">{item.value}</span>
                      <span className="text-[10px] md:text-xs font-semibold text-amber-900/60 dark-mode:text-amber-400/60 uppercase tracking-widest text-center">{language === 'mr' ? item.label_mr : item.label_en}</span>
                    </div>
                  );
                }
                if (item.style === 'logo') {
                  return (
                    <div key={`m1-f-${idx}`} className="break-inside-avoid relative rounded-xl overflow-hidden mb-3 sm:mb-4 shadow-sm bg-gray-50 dark-mode:bg-gray-900 border border-gray-100 dark-mode:border-gray-800 flex items-center justify-center p-6 min-h-[140px]">
                      <img src="/logo.jpeg" alt="logo" className="w-16 h-auto opacity-40 mix-blend-multiply dark-mode:mix-blend-screen grayscale" />
                    </div>
                  );
                }
              }

              return (
                <div key={`m1-${idx}`} className="break-inside-avoid relative rounded-xl overflow-hidden mb-3 sm:mb-4 shadow-sm border border-gray-100 dark-mode:border-gray-800">
                  <img
                    src={item.img_src}
                    alt={item.img_alt}
                    className="w-full h-auto object-cover"
                  />
                </div>
              );
            })}
          </div>

          {/* Second Block (Duplicate for infinite loop) */}
          <div className="columns-3 sm:columns-4 lg:columns-5 xl:columns-6 gap-3 sm:gap-4 w-[150vw] sm:w-[120vw] lg:w-[100vw] px-2">
            {mixedItems.map((item, idx) => {
              if (item.type === 'filler') {
                if (item.style === 'quote') {
                  return (
                    <div key={`m2-f-${idx}`} className="break-inside-avoid relative rounded-xl overflow-hidden mb-3 sm:mb-4 shadow-sm bg-[#0F3D66] flex items-center justify-center p-6 min-h-[140px]">
                      <p className="text-white text-center font-medium font-poppins text-xs sm:text-sm leading-snug">
                        "{language === 'mr' ? item.text_mr : item.text_en}"
                      </p>
                    </div>
                  );
                }
                if (item.style === 'stat') {
                  return (
                    <div key={`m2-f-${idx}`} className="break-inside-avoid relative rounded-xl overflow-hidden mb-3 sm:mb-4 shadow-sm bg-amber-50 dark-mode:bg-amber-900/20 border border-amber-200 dark-mode:border-amber-700/30 flex flex-col items-center justify-center p-6 min-h-[140px]">
                      <span className="text-2xl md:text-3xl font-bold text-amber-700 dark-mode:text-amber-500 mb-1">{item.value}</span>
                      <span className="text-[10px] md:text-xs font-semibold text-amber-900/60 dark-mode:text-amber-400/60 uppercase tracking-widest text-center">{language === 'mr' ? item.label_mr : item.label_en}</span>
                    </div>
                  );
                }
                if (item.style === 'logo') {
                  return (
                    <div key={`m2-f-${idx}`} className="break-inside-avoid relative rounded-xl overflow-hidden mb-3 sm:mb-4 shadow-sm bg-gray-50 dark-mode:bg-gray-900 border border-gray-100 dark-mode:border-gray-800 flex items-center justify-center p-6 min-h-[140px]">
                      <img src="/logo.jpeg" alt="logo" className="w-16 h-auto opacity-40 mix-blend-multiply dark-mode:mix-blend-screen grayscale" />
                    </div>
                  );
                }
              }

              return (
                <div key={`m2-${idx}`} className="break-inside-avoid relative rounded-xl overflow-hidden mb-3 sm:mb-4 shadow-sm border border-gray-100 dark-mode:border-gray-800">
                  <img
                    src={item.img_src}
                    alt={item.img_alt}
                    className="w-full h-auto object-cover"
                  />
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};
export default PhotoGallery;


