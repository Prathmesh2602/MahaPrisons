import React from 'react';
import { useAccessibility } from '../hooks/useAccessibility';
import { mockHomepageData } from '../data/mockData';

export const MinisterProfiles = () => {
  const { t } = useAccessibility();

  return (
    <div className="w-full py-16 px-4 md:px-8 bg-transparent relative overflow-hidden">
      {/* Decorative background ambient glows for the section */}
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-gradient-to-br from-[#1E5AA8]/15 to-transparent rounded-full blur-[80px] -z-10 mix-blend-multiply dark-mode:mix-blend-screen opacity-80 animate-pulse" style={{ animationDuration: '5s' }} />
      <div className="absolute bottom-0 right-1/4 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] bg-gradient-to-tl from-amber-500/15 to-transparent rounded-full blur-[60px] -z-10 mix-blend-multiply dark-mode:mix-blend-screen opacity-80 animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pt-8">
          {mockHomepageData.minister_profiles.map((profile, idx) => {
            return (
              <div
                key={idx}
                className="group relative flex flex-col items-center text-center transition-all duration-700 hover:-translate-y-3 z-10"
              >
                {/* Floating Cool Background Graphic / Orb */}
                {/* Static elegant highlight behind the portrait */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-48 h-64 bg-gradient-to-b from-white/60 dark-mode:from-white/5 to-transparent rounded-t-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 pointer-events-none" />

                {/* Dynamic animated organic orb */}
                <div
                  className="absolute top-8 left-1/2 -translate-x-1/2 w-40 h-40 sm:w-48 sm:h-48 bg-gradient-to-tr from-amber-400/20 via-[#1E5AA8]/15 to-transparent blur-xl group-hover:blur-2xl group-hover:scale-125 group-hover:rotate-90 transition-all duration-1000 ease-out -z-20 pointer-events-none"
                  style={{ borderRadius: idx % 2 === 0 ? "40% 60% 70% 30% / 40% 50% 60% 50%" : "60% 40% 30% 70% / 50% 50% 70% 50%" }}
                />

                {/* Profile Image with Sleek Gradient Ring */}
                <div className="relative mb-6">
                  {/* Glowing aura behind image */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-400 to-[#1E5AA8] rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 scale-125" />

                  {/* Image Wrapper */}
                  <div className="relative p-[3px] rounded-full bg-gradient-to-tr from-amber-300 via-orange-400 to-[#1E5AA8] shadow-lg group-hover:shadow-2xl transition-all duration-500 hover:scale-105">
                    <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-[4px] border-white dark-mode:border-gray-900 bg-white dark-mode:bg-gray-900 relative z-10 shadow-inner">
                      <img
                        src={profile.img_src}
                        alt={t(profile.img_alt)}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>

                {/* Dignitary Name */}
                <h3 className="text-xl sm:text-[22px] font-bold font-devanagari text-[#0F3D66] dark-mode:text-gray-100 mb-2 leading-tight group-hover:bg-gradient-to-r group-hover:from-[#1E5AA8] group-hover:to-amber-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 drop-shadow-sm">
                  {t(profile.name)}
                </h3>

                {/* Designation Text */}
                <p className="text-[11px] sm:text-xs font-semibold text-slate-600 dark-mode:text-gray-400 font-poppins uppercase">
                  {t(profile.desg)}
                </p>

                {/* Floating animated accent dot */}
                <div className="mt-4 w-1.5 h-1.5 rounded-full bg-amber-400 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default MinisterProfiles;
