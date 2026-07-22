import React, { useState, useRef, useEffect } from 'react';
import { useAccessibility } from '../hooks/useAccessibility';
import { Search, GitFork, Settings2, ChevronDown, Check, Sun, Moon, Volume2, VolumeX, Type } from 'lucide-react';

export const AccessibilityToolbar = () => {
  const {
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    contrast,
    setContrast,
    language,
    toggleLanguage,
    bhashiniVoiceActive: speechActive,
    setBhashiniVoiceActive,
    t
  } = useAccessibility();

  const toggleSpeech = () => setBhashiniVoiceActive(!speechActive);
  const fontSizeIndex = fontSize;

  const [panelOpen, setPanelOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setPanelOpen(false);
      }
    };
    
    if (panelOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [panelOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.open(`https://mahaprisons.gov.in/?s=${encodeURIComponent(searchQuery)}`, '_blank');
    }
  };

  const getContrastLabel = (mode) => {
    switch (mode) {
      case 'standard': return language === 'mr' ? 'प्रमाणित' : 'Standard';
      case 'high': return language === 'mr' ? 'उच्च विरोधाभास' : 'High Contrast';
      case 'dark': return language === 'mr' ? 'गडद थीम' : 'Dark Theme';
      case 'inverted': return language === 'mr' ? 'कलर इनव्हर्जन' : 'Color Inversion';
      default: return '';
    }
  };

  return (
    <div className="w-full bg-white/40 border-b border-gray-300/40 py-1 px-4 md:px-8 text-xs font-semibold text-gray-700 flex flex-wrap justify-between items-center z-50 relative smooth-transition select-none">

      {/* 1. LEFT SIDE: Static Government Title */}
      <div className="flex items-center gap-2 text-[10.5px] uppercase font-bold tracking-wide text-gray-700">
        <div className="flex items-center gap-2">
          <span>महाराष्ट्र शासन</span>
          <span className="text-gray-400">|</span>
          <span>Government of Maharashtra</span>
        </div>
        <span className="hidden md:block text-gray-300 mx-2">|</span>
        <div className="hidden md:flex flex-row items-center gap-2">
          <span className="text-[11px] font-bold font-devanagari text-[#0F3D66] dark-mode:text-blue-300 leading-tight">
            महाराष्ट्र कारागृहे व सुधार सेवा
          </span>
          <span className="text-gray-400">|</span>
          <span className="text-[11px] font-semibold text-[#111827] dark-mode:text-white leading-tight font-poppins">
            Maharashtra Prisons and Correctional Services
          </span>
        </div>
      </div>

      {/* 2. RIGHT SIDE: Clean Usability Icons */}
      <div className="flex items-center gap-4 relative">

        {/* Toggleable Search Box */}
        {searchOpen && (
          <form onSubmit={handleSearchSubmit} className="flex items-center relative animate-in slide-in-from-right-3 duration-200">
            <input
              type="text"
              placeholder={language === 'mr' ? 'येथे शोधा...' : 'Search...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-3 pr-8 py-1 w-40 bg-white border border-gray-300 rounded-lg text-[10.5px] focus:outline-none focus:border-[#0F3D66] text-gray-900"
              autoFocus
            />
            <button type="submit" className="absolute right-2.5 text-gray-500 hover:text-gray-900 cursor-pointer">
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        {/* Search Icon */}
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className={`p-1.5 rounded-md hover:bg-black/5 cursor-pointer transition-colors flex items-center gap-1.5 ${searchOpen ? 'text-[#0F3D66] bg-black/5' : 'text-gray-700 hover:text-gray-900'}`}
          title={t("Search")}
        >
          <Search className="w-5 h-5" strokeWidth={1.5} />
        </button>

        {/* Sitemap Link Icon */}
        <a
          href="https://mahaprisons.gov.in/%e0%a4%b8%e0%a4%be%e0%a4%87%e0%a4%9f%e0%a4%ae%e0%a5%85%e0%a4%aa/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-md hover:bg-black/5 text-gray-700 hover:text-gray-900 transition-colors flex items-center gap-1.5"
          title={t("Sitemap")}
        >
          <GitFork className="w-5 h-5" strokeWidth={1.5} />
        </a>

        {/* Accessibility Wrapper */}
        <div ref={dropdownRef} className="relative flex items-center">
          {/* Accessibility Panel Trigger */}
          <button
            onClick={() => setPanelOpen(!panelOpen)}
            className={`p-1.5 rounded-md hover:bg-black/5 cursor-pointer transition-colors flex items-center gap-1.5 ${panelOpen ? 'text-[#0F3D66] bg-black/5' : 'text-gray-700 hover:text-gray-900'}`}
            title={t("Accessibility Options")}
            aria-expanded={panelOpen ? "true" : "false"}
          >
            <Settings2 className="w-5 h-5" strokeWidth={1.5} />
            <ChevronDown className="w-3.5 h-3.5 text-gray-500" strokeWidth={3} />
          </button>

          {/* Floating Accessibility Settings Card Popover */}
          {panelOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white/95 backdrop-blur-md text-gray-800 border border-gray-250 shadow-2xl rounded-xl p-4 z-50 text-[11.5px] select-none animate-in fade-in slide-in-from-top-3 duration-200">
            <h4 className="font-bold text-[#0F3D66] mb-3 text-xs border-b border-gray-150 pb-1.5 flex items-center gap-1">
              <Settings2 className="w-4 h-4" />
              <span>{language === 'mr' ? 'सुगम्यता पर्याय' : 'Accessibility Options'}</span>
            </h4>

            {/* Font Resize Tools */}
            <div className="mb-4">
              <span className="block font-bold text-gray-500 mb-1.5 uppercase tracking-wide text-[9.5px]">
                {language === 'mr' ? 'अक्षर आकार' : 'Font Size Control'}
              </span>
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-1 border border-gray-200">
                <button
                  onClick={decreaseFontSize}
                  className="px-2.5 py-1 bg-white hover:bg-gray-100 rounded text-[10px] font-bold text-gray-700 shadow-sm transition-all cursor-pointer"
                  title={language === 'mr' ? 'अक्षर आकार कमी करा' : 'Decrease text size'}
                >
                  A-
                </button>
                <button
                  onClick={resetFontSize}
                  className="px-3 py-1 bg-white hover:bg-gray-100 rounded text-[10px] font-bold text-[#0F3D66] shadow-sm transition-all cursor-pointer flex items-center gap-1"
                  title={language === 'mr' ? 'मूळ आकार' : 'Reset text size'}
                >
                  <Type className="w-3 h-3" />
                  <span>{fontSizeIndex === 0 ? '100%' : fontSizeIndex === 1 ? '112.5%' : fontSizeIndex === 2 ? '125%' : '87.5%'}</span>
                </button>
                <button
                  onClick={increaseFontSize}
                  className="px-2.5 py-1 bg-white hover:bg-gray-100 rounded text-[10px] font-bold text-gray-700 shadow-sm transition-all cursor-pointer"
                  title={language === 'mr' ? 'अक्षर आकार वाढवा' : 'Increase text size'}
                >
                  A+
                </button>
              </div>
            </div>

            {/* Contrast Theme Selectors */}
            <div className="mb-4">
              <span className="block font-bold text-gray-500 mb-1.5 uppercase tracking-wide text-[9.5px]">
                {language === 'mr' ? 'रंगसंगती (विरोधाभास)' : 'Contrast & Color Schemes'}
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {['standard', 'high', 'dark', 'inverted'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setContrast(mode)}
                    className={`px-2 py-1.5 rounded-lg border text-left font-bold flex items-center justify-between cursor-pointer transition-all ${contrast === mode
                      ? 'border-[#0F3D66] bg-[#0F3D66]/5 text-[#0F3D66]'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                      }`}
                  >
                    <span>{getContrastLabel(mode)}</span>
                    {contrast === mode && <Check className="w-3.5 h-3.5 text-[#0F3D66]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Bhashini Screen Reader Narrator Voice */}
            <div className="border-t border-gray-150 pt-3 mt-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="block font-bold text-gray-700 text-[11px] leading-tight">
                    {language === 'mr' ? 'भाषिणी आवाज वाचक' : 'Bhashini Voice Narrator'}
                  </span>
                  <span className="text-[9.5px] text-gray-400 block mt-0.5">
                    {speechActive
                      ? (language === 'mr' ? 'मजकूर-ते-आवाज सुरू आहे' : 'Speech narration is active')
                      : (language === 'mr' ? 'आवाज वाचक बंद आहे' : 'Click to enable screen reader')}
                  </span>
                </div>
                <button
                  onClick={toggleSpeech}
                  className={`p-2 rounded-full cursor-pointer transition-all ${speechActive
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-500'
                    }`}
                  title={speechActive ? 'Mute' : 'Speak Page Content'}
                >
                  {speechActive ? <Volume2 className="w-4 h-4 animate-bounce" /> : <VolumeX className="w-4 h-4" />}
                </button>
              </div>

              {/* Speech Waveform Visualization */}
              {speechActive && (
                <div className="flex items-center gap-0.5 mt-2 justify-center bg-emerald-50/50 py-1.5 rounded-lg border border-emerald-100">
                  <span className="w-1 h-3 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="w-1 h-5 bg-emerald-500 rounded-full animate-pulse delay-75" />
                  <span className="w-1 h-2 bg-emerald-500 rounded-full animate-pulse delay-150" />
                  <span className="w-1 h-6 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="w-1 h-4 bg-emerald-500 rounded-full animate-pulse delay-75" />
                  <span className="w-1 h-2 bg-emerald-500 rounded-full animate-pulse delay-150" />
                </div>
              )}
            </div>

          </div>
        )}
        </div>

        {/* Language Toggler (अ / A) */}
        <button
          onClick={toggleLanguage}
          className="ml-2 px-3 py-1 border-2 border-gray-400 hover:border-[#0F3D66] hover:text-[#0F3D66] rounded-md text-[11px] font-extrabold text-gray-800 flex items-center gap-1.5 cursor-pointer transition-all hover:bg-white hover:shadow-sm"
          title={language === 'mr' ? 'Switch to English' : 'मराठीत बदला'}
        >
          <span className="font-devanagari text-[13px]">अ</span>
          <span className="text-gray-300">|</span>
          <span className="text-[12px]">A</span>
        </button>

      </div>
    </div>
  );
};
export default AccessibilityToolbar;
