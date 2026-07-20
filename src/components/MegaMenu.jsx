import React, { useState, useEffect } from 'react';
import { useAccessibility } from '../hooks/useAccessibility';
import { mockHomepageData } from '../data/mockData';
import { Menu, X, ChevronDown, ChevronRight, Home, ChevronLeft } from 'lucide-react';

export const MegaMenu = () => {
  const { language, t } = useAccessibility();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // Desktop active top-level dropdown index
  const [activeSubMenu, setActiveSubMenu] = useState(null); // Desktop active sub flyout index
  const [isSticky, setIsSticky] = useState(false);

  // Monitor scroll to apply sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuClick = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleDropdownHover = (index) => {
    setActiveDropdown(index);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
    setActiveSubMenu(null);
  };

  const handleSubMenuHover = (subIndex) => {
    setActiveSubMenu(subIndex);
  };

  const toggleDropdownMobile = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  // Split navigation items: 10 primary items, remainder hidden under Hamburger panel on the right
  const primaryItems = mockHomepageData.navigation_menu.slice(0, 10);
  const moreItems = mockHomepageData.navigation_menu.slice(10);

  return (
    <nav 
      className={`w-full z-40 smooth-transition border-b ${
        isSticky 
          ? 'sticky top-0 bg-[#F3F4F6]/95 backdrop-blur-md shadow-md border-gray-300 text-gray-900' 
          : 'bg-[#F3F4F6]/40 backdrop-blur-md border-gray-250/30 text-gray-900'
      } dark-mode:bg-gray-900/35 dark-mode:text-gray-150 dark-mode:border-gray-800/40`}
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center h-12">
        
        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center justify-between gap-1 w-full text-xs font-bold">
          
          {/* Primary items */}
          {primaryItems.map((item, idx) => {
            const hasChildren = item.children && item.children.length > 0;
            const isDropdownActive = activeDropdown === idx;
            const isHome = item.text === "मुख्यपृष्ठ";

            return (
              <div 
                key={idx}
                className="relative h-12 flex items-center"
                onMouseEnter={() => handleDropdownHover(idx)}
                onMouseLeave={handleDropdownLeave}
              >
                <a
                  href={item.href}
                  className={`px-2.5 py-3.5 flex items-center gap-0.5 transition-all whitespace-nowrap focus:outline focus:outline-2 focus:outline-amber-500 h-full ${
                    isHome 
                      ? 'bg-amber-500 text-[#fff] font-[500] px-4 hover:bg-amber-600' 
                      : 'hover:bg-black/5 dark-mode:hover:bg-white/5 text-gray-900 dark-mode:text-gray-100'
                  }`}
                  aria-haspopup={hasChildren ? "true" : "false"}
                  aria-expanded={isDropdownActive ? "true" : "false"}
                >
                  {isHome && <Home className="w-3.5 h-3.5 mr-0.5" />}
                  <span>{t(item.text)}</span>
                  {hasChildren && <ChevronDown className="w-3.5 h-3.5 text-gray-500 dark-mode:text-gray-400 flex-shrink-0" />}
                </a>

                {/* Dropdown menu */}
                {hasChildren && isDropdownActive && (
                  <div className="absolute left-0 top-12 w-64 bg-white text-gray-900 border border-gray-250 shadow-xl rounded-b-lg py-2 z-50 glass-effect dark-mode:bg-gray-850 dark-mode:text-gray-100 dark-mode:border-gray-800 animate-in fade-in slide-in-from-top-2 duration-200">
                    {item.children.map((child, cIdx) => (
                      <a
                        key={cIdx}
                        href={child.href}
                        className="block px-4 py-2 text-xs font-semibold text-[#0F3D66] dark-mode:text-blue-300 hover:bg-gray-150 dark-mode:hover:bg-gray-800 flex items-center justify-between border-b border-gray-100 last:border-0 dark-mode:border-gray-800 transition-colors focus:outline focus:outline-2 focus:outline-amber-500"
                      >
                        <span>{t(child.text)}</span>
                        <ChevronRight className="w-3 h-3 text-gray-400" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Collapsible Hamburger Menu on the right (More links) */}
          {moreItems.length > 0 && (
            <div 
              className="relative h-12 flex items-center"
              onMouseEnter={() => handleDropdownHover(99)}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                className={`px-3.5 py-3.5 hover:bg-black/5 dark-mode:hover:bg-white/5 flex items-center gap-1 transition-all h-full text-gray-900 dark-mode:text-gray-100 focus:outline focus:outline-2 focus:outline-amber-500 cursor-pointer ${
                  activeDropdown === 99 ? 'bg-black/5 dark-mode:bg-white/5' : ''
                }`}
                aria-haspopup="true"
                aria-expanded={activeDropdown === 99 ? "true" : "false"}
                aria-label="Expand more menus"
              >
                <Menu className="w-4.5 h-4.5" />
              </button>

              {/* Collapsed Items Panel */}
              {activeDropdown === 99 && (
                <div className="absolute right-0 top-12 w-64 bg-white text-gray-900 border border-gray-250 shadow-xl rounded-b-lg py-2 z-50 glass-effect dark-mode:bg-gray-850 dark-mode:text-gray-100 dark-mode:border-gray-800 animate-in fade-in slide-in-from-top-2 duration-200">
                  {moreItems.map((item, mIdx) => {
                    const hasSubChildren = item.children && item.children.length > 0;
                    const isSubActive = activeSubMenu === mIdx;

                    return (
                      <div
                        key={mIdx}
                        className="relative"
                        onMouseEnter={() => handleSubMenuHover(mIdx)}
                      >
                        <a
                          href={item.href}
                          className={`block px-4 py-2.5 text-xs font-semibold text-gray-900 dark-mode:text-gray-100 hover:bg-gray-100 dark-mode:hover:bg-gray-800 flex items-center justify-between border-b border-gray-100 last:border-0 dark-mode:border-gray-800 transition-colors focus:outline focus:outline-2 focus:outline-amber-500 ${
                            isSubActive ? 'bg-gray-100 dark-mode:bg-gray-800' : ''
                          }`}
                        >
                          <span className="truncate max-w-[200px]">{t(item.text)}</span>
                          {hasSubChildren ? (
                            <ChevronLeft className="w-3.5 h-3.5 text-[#1E5AA8] dark-mode:text-blue-400" />
                          ) : (
                            <ChevronRight className="w-3 h-3 text-gray-400" />
                          )}
                        </a>

                        {/* Flyout Sub-menu (Opens to the left) */}
                        {hasSubChildren && isSubActive && (
                          <div className="absolute right-full top-0 mr-1 w-60 bg-white text-gray-900 border border-gray-250 shadow-2xl rounded-lg py-2 z-50 glass-effect dark-mode:bg-gray-850 dark-mode:text-gray-100 dark-mode:border-gray-800 animate-in fade-in slide-in-from-right-2 duration-150">
                            {item.children.map((subChild, scIdx) => (
                              <a
                                key={scIdx}
                                href={subChild.href}
                                className="block px-4 py-2 text-xs font-semibold text-[#0F3D66] dark-mode:text-blue-300 hover:bg-gray-150 dark-mode:hover:bg-gray-800 flex items-center justify-between border-b border-gray-100 last:border-0 dark-mode:border-gray-800 transition-colors focus:outline focus:outline-2 focus:outline-amber-500"
                              >
                                <span>{t(subChild.text)}</span>
                                <ChevronRight className="w-3 h-3 text-gray-400" />
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Brand identity for sticky navbar (Mobile) */}
        {isSticky && (
          <div className="lg:hidden flex items-center gap-2">
            <img 
              src="https://cdnbbsr.s3waas.gov.in/s32c6ae45a3e88aee548c0714fad7f8269/uploads/2026/01/20260109374693913.jpg"
              alt="MahaPrisons Logo"
              className="h-8 w-auto rounded"
            />
            <span className="text-xs font-bold font-devanagari tracking-wide text-amber-500">
              {language === 'mr' ? 'महाराष्ट्र कारागृह विभाग' : 'MahaPrisons'}
            </span>
          </div>
        )}

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={handleMenuClick}
          className="lg:hidden p-2 rounded-md hover:bg-black/5 transition-colors focus:outline focus:outline-2 focus:outline-amber-500 text-gray-900 cursor-pointer"
          aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
          aria-expanded={mobileMenuOpen ? "true" : "false"}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[108px] md:top-[128px] bg-black/60 z-30 transition-opacity animate-in fade-in duration-300">
          <div className="w-4/5 max-w-sm h-full bg-[#0F3D66] border-r border-[#1E5AA8]/30 shadow-2xl py-4 overflow-y-auto z-40 text-white animate-in slide-in-from-left duration-300">
            <div className="flex flex-col gap-1 px-3">
              {mockHomepageData.navigation_menu.map((item, idx) => {
                const hasChildren = item.children && item.children.length > 0;
                const isDropdownActive = activeDropdown === idx;

                return (
                  <div key={idx} className="border-b border-[#1E5AA8]/20 py-1.5 last:border-0">
                    <div 
                      className="flex items-center justify-between px-3 py-2 hover:bg-white/5 rounded transition-colors"
                      onClick={() => hasChildren && toggleDropdownMobile(idx)}
                    >
                      <a 
                        href={hasChildren ? undefined : item.href}
                        className="text-sm font-semibold flex items-center gap-2"
                        onClick={(e) => hasChildren && e.preventDefault()}
                      >
                        {item.text === "मुख्यपृष्ठ" && <Home className="w-4 h-4 text-amber-400" />}
                        <span>{t(item.text)}</span>
                      </a>
                      {hasChildren && (
                        <button className="p-1 focus:outline-none">
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownActive ? 'rotate-180 text-amber-400' : 'text-gray-400'}`} />
                        </button>
                      )}
                    </div>

                    {/* Mobile Dropdown Submenu */}
                    {hasChildren && isDropdownActive && (
                      <div className="mt-1 pl-6 flex flex-col gap-1 bg-[#092947]/50 rounded-md py-1 border-l-2 border-amber-500 animate-in slide-in-from-top duration-200">
                        {item.children.map((child, cIdx) => (
                          <a
                            key={cIdx}
                            href={child.href}
                            className="block px-3 py-1.5 text-xs font-semibold text-blue-200 hover:text-white transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {t(child.text)}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
export default MegaMenu;
