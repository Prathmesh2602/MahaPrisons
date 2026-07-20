import React, { useState } from 'react';
import { useAccessibility } from '../hooks/useAccessibility';
import { mockHolidays2026 } from '../data/mockData';
import { ChevronLeft, ChevronRight, Calendar, Info } from 'lucide-react';

export const HolidayCalendar = () => {
  const { language, t } = useAccessibility();
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed

  const monthNamesMr = ["जानेवारी", "फेब्रुवारी", "मार्च", "एप्रिल", "मे", "जून", "जुलै", "ऑगस्ट", "सप्टेंबर", "ऑक्टोबर", "नोव्हेंबर", "डिसेंबर"];
  const monthNamesEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNamesMr = ["रवि", "सोम", "मंगळ", "बुध", "गुरु", "शुक्र", "शनि"];
  const dayNamesEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const monthName = language === 'mr' ? monthNamesMr[month] : monthNamesEn[month];
  const dayNames = language === 'mr' ? dayNamesMr : dayNamesEn;

  // Handle Month changes
  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Helper to generate calendar matrix
  const getDaysInMonth = (y, m) => {
    const startDay = new Date(y, m, 1).getDay();
    const totalDays = new Date(y, m + 1, 0).getDate();
    
    const days = [];
    // Pad initial blank days
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    // Populate active days
    for (let d = 1; d <= totalDays; d++) {
      days.push(d);
    }
    return days;
  };

  const daysMatrix = getDaysInMonth(year, month);

  // Holiday checks
  const getHolidayForDay = (day) => {
    if (!day) return null;
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return mockHolidays2026.find(h => h.date === dateString) || null;
  };

  // Check if a day index is weekend
  const isWeekendDay = (index) => {
    const dayOfWeek = index % 7;
    return dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday
  };

  // Get active month holidays list for side display
  const activeMonthHolidays = mockHolidays2026.filter(h => {
    const hDate = new Date(h.date);
    return hDate.getFullYear() === year && hDate.getMonth() === month;
  });

  return (
    <div className="w-full py-20 px-4 md:px-8 bg-[#F1F5F9] dark-mode:bg-gray-900 border-b border-gray-200/60 dark-mode:border-gray-850 smooth-transition">
      <div className="max-w-6xl mx-auto">
        
        {/* Section title */}
        <div className="text-center mb-10">
          <span className="text-[10px] text-[#0F766E] dark-mode:text-teal-400 font-extrabold uppercase tracking-widest block mb-1">
            {language === 'mr' ? 'कार्यालयीन दिनदर्शिका' : 'Office Calendar'}
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F3D66] dark-mode:text-blue-300 font-devanagari relative inline-block pb-3">
            {t("Holiday Calendar")}
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-amber-500 rounded-full" />
          </h2>
        </div>

        {/* 2 columns layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: The Calendar Widget */}
          <div className="lg:col-span-7 bg-white dark-mode:bg-gray-900 border border-gray-200/80 dark-mode:border-gray-800 rounded-3xl p-6 shadow-md">
            {/* Header selector */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold text-gray-800 dark-mode:text-gray-150 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#1E5AA8]" />
                <span className="font-devanagari font-bold">{monthName} {year}</span>
              </h3>
              
              <div className="flex gap-2">
                <button
                  onClick={handlePrevMonth}
                  className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-700 dark-mode:border-gray-850 dark-mode:hover:bg-gray-800 dark-mode:text-gray-300 transition-colors focus:outline focus:outline-2 focus:outline-amber-500 cursor-pointer"
                  title={t("मागील महिना")}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextMonth}
                  className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-700 dark-mode:border-gray-850 dark-mode:hover:bg-gray-800 dark-mode:text-gray-300 transition-colors focus:outline focus:outline-2 focus:outline-amber-500 cursor-pointer"
                  title={t("पुढचा महिना")}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Calendar Grid rendering */}
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold mb-4">
              {/* Day titles */}
              {dayNames.map((name, idx) => (
                <div 
                  key={idx} 
                  className={`py-2 border-b border-gray-100 dark-mode:border-gray-800 font-bold uppercase tracking-wide ${
                    idx === 0 ? 'text-red-500' : 'text-gray-500 dark-mode:text-gray-400'
                  }`}
                >
                  {name}
                </div>
              ))}

              {/* Day values */}
              {daysMatrix.map((day, idx) => {
                const holiday = getHolidayForDay(day);
                const isWeekend = isWeekendDay(idx);
                const isToday = day && new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year;

                let cellClass = "relative min-h-[44px] flex flex-col justify-center items-center rounded-xl transition-all duration-300 ";
                
                if (!day) {
                  cellClass += "opacity-0";
                } else {
                  cellClass += "border ";
                  
                  if (isToday) {
                    cellClass += "bg-[#1E5AA8] text-white border-[#1E5AA8] shadow-md font-bold ";
                  } else if (holiday) {
                    if (holiday.type === 'gazetted') {
                      cellClass += "bg-red-50 border-red-200 text-red-700 font-bold hover:bg-red-100/80 dark-mode:bg-red-950/20 dark-mode:border-red-900/50 dark-mode:text-red-300 ";
                    } else {
                      cellClass += "bg-amber-50 border-amber-200 text-amber-700 font-bold hover:bg-amber-100/80 dark-mode:bg-amber-950/20 dark-mode:border-amber-900/50 dark-mode:text-amber-300 ";
                    }
                  } else if (isWeekend) {
                    cellClass += "bg-[#F8FAFC] border-gray-100 text-red-550 dark-mode:bg-gray-800/40 dark-mode:border-gray-800/40 ";
                  } else {
                    cellClass += "bg-white border-gray-100 text-gray-700 hover:bg-gray-50 dark-mode:bg-gray-900 dark-mode:border-gray-800 dark-mode:text-gray-300 dark-mode:hover:bg-gray-800/60 ";
                  }
                }

                return (
                  <div 
                    key={idx} 
                    className={cellClass}
                    title={holiday ? holiday.title : undefined}
                  >
                    <span>{day}</span>
                    {holiday && (
                      <span className={`w-1.5 h-1.5 rounded-full absolute bottom-1.5 ${
                        holiday.type === 'gazetted' ? 'bg-red-500' : 'bg-amber-500'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Legend guide */}
            <div className="flex flex-wrap gap-4 border-t border-gray-100 dark-mode:border-gray-800 pt-4 text-[10px] font-bold uppercase tracking-wide justify-center text-gray-500 dark-mode:text-gray-400">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-red-50 dark-mode:bg-red-950/30 border border-red-200 dark-mode:border-red-900/50 rounded-sm" />
                <span>{t("राजपत्रित सुट्टी")}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-amber-50 dark-mode:bg-amber-950/30 border border-amber-200 dark-mode:border-amber-900/50 rounded-sm" />
                <span>{t("प्रतिबंधित सुट्टी")}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-[#F8FAFC] dark-mode:bg-gray-800/50 border border-gray-100 dark-mode:border-gray-800 rounded-sm" />
                <span>{t("Weekly Holiday")}</span>
              </div>
            </div>

          </div>

          {/* Column 2: Selected Month Holidays list */}
          <div className="lg:col-span-5 bg-white dark-mode:bg-gray-900 border border-gray-200/80 dark-mode:border-gray-800 rounded-3xl p-6 shadow-md flex flex-col h-full justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-800 dark-mode:text-gray-150 border-b border-gray-100 dark-mode:border-gray-800 pb-3 mb-4 flex items-center gap-2">
                <Info className="w-4.5 h-4.5 text-[#0F766E]" />
                <span>
                  {language === 'mr' 
                    ? `${monthName} मधील शासकीय सुट्ट्या` 
                    : `Government Holidays in ${monthName}`}
                </span>
              </h3>

              <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1">
                {activeMonthHolidays.length === 0 ? (
                  <p className="text-xs font-semibold text-gray-400 italic py-4 text-center">
                    {language === 'mr' ? 'या महिन्यात कोणतीही सुट्टी नाही.' : 'No holidays in this month.'}
                  </p>
                ) : (
                  activeMonthHolidays.map((h, idx) => {
                    const dateObj = new Date(h.date);
                    const dayVal = dateObj.getDate();
                    const dayString = language === 'mr' 
                      ? `${dayVal} ${monthName}` 
                      : `${monthName.substring(0, 3)} ${dayVal}`;

                    const isGazetted = h.type === 'gazetted';

                    return (
                      <div 
                        key={idx}
                        className={`p-3 border rounded-xl flex items-center justify-between gap-3 ${
                          isGazetted 
                            ? 'bg-red-50/40 border-red-100 dark-mode:bg-red-950/5 dark-mode:border-red-900/30' 
                            : 'bg-amber-50/40 border-amber-100 dark-mode:bg-amber-950/5 dark-mode:border-amber-900/30'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${isGazetted ? 'bg-red-500' : 'bg-amber-500'}`} />
                          <span className="text-xs font-bold text-gray-700 dark-mode:text-gray-250 leading-tight">
                            {h.title.split('/')[language === 'mr' ? 1 : 0].trim()}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-gray-500 dark-mode:text-gray-400 bg-white border border-gray-150 px-2 py-0.5 rounded-full whitespace-nowrap dark-mode:bg-gray-800 dark-mode:border-gray-700">
                          {dayString}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Extra guide detail */}
            <div className="mt-6 p-4 bg-[#F8FAFC] dark-mode:bg-gray-800/40 border border-gray-100 dark-mode:border-gray-800/60 rounded-2xl text-[11px] font-semibold text-gray-500 dark-mode:text-gray-400 leading-relaxed">
              {language === 'mr' 
                ? 'माहिती: शासकीय परिपत्रकानुसार सुट्ट्यांमध्ये बदल होऊ शकतो. अधिकृत अधिसूचनेचे अवलोकन करावे.' 
                : 'Note: Holidays are subject to change by government notification. Please refer to official circulars.'}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
export default HolidayCalendar;
