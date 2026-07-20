import React from 'react';
import { useAccessibility } from '../hooks/useAccessibility';
import { mockHomepageData } from '../data/mockData';

export const MinisterProfiles = () => {
  const { t } = useAccessibility();

  return (
    <div className="w-full py-20 px-4 md:px-8 bg-transparent smooth-transition relative overflow-hidden">
      {/* Decorative backdrop shapes */}
      <span className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#1E5AA8]/3 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockHomepageData.minister_profiles.map((profile, idx) => {
            return (
              <div 
                key={idx}
                className="bg-white border border-gray-200/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 dark-mode:bg-gray-800 dark-mode:border-gray-700 flex flex-col items-center p-6 text-center group"
              >
                {/* Profile Image with Golden Border Ring */}
                <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-amber-500/10 group-hover:ring-amber-500/40 shadow-md mb-5 transition-all duration-300">
                  <img
                    src={profile.img_src}
                    alt={t(profile.img_alt)}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-108"
                    loading="lazy"
                  />
                </div>

                {/* Dignitary Name */}
                <h3 className="text-base font-extrabold font-devanagari text-[#0F3D66] dark-mode:text-blue-300 mb-1 leading-snug tracking-wide group-hover:text-[#1E5AA8] transition-colors">
                  {t(profile.name)}
                </h3>

                {/* Designation */}
                <p className="text-xs font-semibold text-gray-700 dark-mode:text-gray-300 font-manrope">
                  {t(profile.desg)}
                </p>

                {/* Decorative expanding line from center */}
                <div className="w-8 h-[2px] bg-amber-500/30 group-hover:w-20 transition-all duration-300 mt-5 rounded-full" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default MinisterProfiles;
