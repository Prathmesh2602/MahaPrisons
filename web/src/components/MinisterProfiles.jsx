import React from 'react';
import { useAccessibility } from '../hooks/useAccessibility';
import { mockHomepageData } from '../data/mockData';
import { User } from 'lucide-react';

export const MinisterProfiles = () => {
  const { t, language } = useAccessibility();

  return (
    <div className="w-full pt-[100px] pb-4 px-4 md:px-8 bg-transparent relative overflow-hidden">
      {/* Decorative background ambient glows for the section */}
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-gradient-to-br from-[#1E5AA8]/15 to-transparent rounded-full blur-[80px] -z-10 mix-blend-multiply dark-mode:mix-blend-screen opacity-80 animate-pulse" style={{ animationDuration: '5s' }} />
      <div className="absolute bottom-0 right-1/4 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] bg-gradient-to-tl from-amber-500/15 to-transparent rounded-full blur-[60px] -z-10 mix-blend-multiply dark-mode:mix-blend-screen opacity-80 animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }} />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-2 lg:gap-2">
        {[
          mockHomepageData.minister_profiles.slice(0, 4),
          mockHomepageData.minister_profiles.slice(4)
        ].map((row, rowIdx) => (
          <div key={rowIdx} className="w-full">
            {rowIdx === 1 && (
              <div className="flex flex-col items-center justify-center mb-8 mt-0">
                <div className="flex items-center opacity-90 hover:opacity-100 transition-opacity">
                  <div className="h-[2px] w-10 lg:w-16 bg-gradient-to-r from-transparent to-[#1E5AA8] mr-4 rounded-full"></div>
                  <h2 className="text-xl md:text-2xl font-medium text-[#0F3D66] dark-mode:text-gray-200 tracking-wider font-poppins">
                    {language === 'mr' ? 'वरिष्ठ अधिकारी' : 'Senior Officers'}
                  </h2>
                  <div className="h-[2px] w-10 lg:w-16 bg-gradient-to-l from-transparent to-[#1E5AA8] ml-4 rounded-full"></div>
                </div>
              </div>
            )}
            <div className="flex flex-wrap justify-center gap-10 lg:gap-8">
              {row.map((profile, idx) => {
                return (
                  <div
                    key={idx}
                    className="w-full sm:w-52 lg:w-56 group relative flex flex-col items-center text-center transition-all duration-700 hover:-translate-y-2 z-10"
                  >
                    {/* Floating Cool Background Graphic / Orb */}
                    {/* Static elegant highlight behind the portrait */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-40 h-48 bg-gradient-to-b from-white/60 dark-mode:from-white/5 to-transparent rounded-t-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 pointer-events-none" />

                    {/* Dynamic animated organic orb */}
                    <div
                      className="absolute top-8 left-1/2 -translate-x-1/2 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-tr from-amber-400/20 via-[#1E5AA8]/15 to-transparent blur-xl group-hover:blur-2xl group-hover:scale-125 group-hover:rotate-90 transition-all duration-1000 ease-out -z-20 pointer-events-none"
                      style={{ borderRadius: idx % 2 === 0 ? "40% 60% 70% 30% / 40% 50% 60% 50%" : "60% 40% 30% 70% / 50% 50% 70% 50%" }}
                    />

                    {/* Profile Image with Sleek Gradient Ring */}
                    <div className="relative mb-6">
                      {/* Glowing aura behind image */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-amber-400 to-[#1E5AA8] rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 scale-125" />

                      {/* Image Wrapper */}
                      <div className="relative p-[2px] rounded-full bg-gradient-to-tr from-amber-300 via-orange-400 to-[#1E5AA8] shadow-md group-hover:shadow-xl transition-all duration-500 hover:scale-105">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-[3px] border-white dark-mode:border-gray-900 bg-white dark-mode:bg-gray-900 relative z-10 shadow-inner">
                          {profile.img_src ? (
                            <img
                              src={profile.img_src}
                              alt={t(profile.img_alt)}
                              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full bg-white flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
                              <User className="w-12 h-12 sm:w-16 sm:h-16 text-[#94A3B8]" strokeWidth={2} />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Dignitary Name */}
                    <h3 className="text-base sm:text-lg font-medium font-poppins text-[#0F3D66] dark-mode:text-gray-100 mb-1 leading-tight group-hover:bg-gradient-to-r group-hover:from-[#1E5AA8] group-hover:to-amber-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 drop-shadow-sm">
                      {t(profile.name)}
                    </h3>

                    {/* Designation Text */}
                    <p className="text-[10px] sm:text-[11px] font-semibold text-slate-600 dark-mode:text-gray-400 font-poppins uppercase max-w-[160px] mx-auto leading-snug">
                      {t(profile.desg)}
                    </p>

                    {/* Floating animated accent dot */}
                    <div className="mt-4 w-1.5 h-1.5 rounded-full bg-amber-400 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MinisterProfiles;
