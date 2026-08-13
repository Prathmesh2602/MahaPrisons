import React, { useState, useEffect, useRef } from 'react';
import { useAccessibility } from '../hooks/useAccessibility';
import { mockHomepageData } from '../data/mockData';
import { Menu, X, ChevronDown, ChevronRight, Home, ChevronLeft, Shield, Briefcase, Sprout, HeartHandshake, LayoutGrid, Palette, Award, Map, Package, PhoneCall } from 'lucide-react';

const iconMap = {
  Home, Shield, Briefcase, Sprout, HeartHandshake, LayoutGrid, Palette, Award, Map, Package, PhoneCall
};

const iconColorMap = {
  Home: 'text-amber-600',
  Shield: 'text-blue-600',
  Briefcase: 'text-emerald-600',
  Sprout: 'text-green-600',
  HeartHandshake: 'text-rose-600',
  LayoutGrid: 'text-indigo-600',
  Palette: 'text-fuchsia-600',
  Award: 'text-yellow-600',
  Map: 'text-teal-600',
  Package: 'text-orange-600',
  PhoneCall: 'text-sky-600'
};

export const MegaMenu = () => {
  const { language, t } = useAccessibility();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // Desktop active top-level dropdown index
  const [activeSubMenu, setActiveSubMenu] = useState(null); // Desktop active sub flyout index
  const [isSticky, setIsSticky] = useState(false);
  const [splitIndex, setSplitIndex] = useState(mockHomepageData.navigation_menu.length);
  const [toolbarHeight, setToolbarHeight] = useState(41);
  const containerRef = useRef(null);
  const measuringRef = useRef(null);

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

  // Use ResizeObserver for absolutely perfect sub-pixel height tracking of the toolbar
  useEffect(() => {
    const tb = document.getElementById('accessibility-toolbar');
    if (!tb) return;

    const updateHeight = () => {
      // Subtract 0.5px to completely eliminate visual hairline gaps
      setToolbarHeight(Math.max(0, tb.getBoundingClientRect().height - 0.5));
    };

    const observer = new ResizeObserver(() => {
      updateHeight();
    });

    observer.observe(tb);
    updateHeight(); // Initial measurement

    if (document.fonts) {
      document.fonts.ready.then(updateHeight);
    }

    return () => observer.disconnect();
  }, [language, t]);



  // Dynamically calculate how many items fit in the navbar
  useEffect(() => {
    const measure = () => {
      if (!measuringRef.current || !containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const itemNodes = Array.from(measuringRef.current.children);

      if (itemNodes.length === 0 || containerWidth === 0) return;

      let totalWidth = 0;
      let newSplitIndex = itemNodes.length - 1; // default to all items (excluding more button)

      // Last child is the More button
      const moreButtonWidth = itemNodes[itemNodes.length - 1].offsetWidth;
      const availableWidth = containerWidth - moreButtonWidth - 15; // 15px safety buffer

      for (let i = 0; i < itemNodes.length - 1; i++) {
        totalWidth += itemNodes[i].offsetWidth;
        if (i > 0) totalWidth += 4; // gap-1 is 4px

        if (totalWidth > availableWidth) {
          newSplitIndex = i;
          break;
        }
      }

      // Check if all items can fit WITHOUT needing the More button
      let fullWidthWithoutMore = 0;
      for (let i = 0; i < itemNodes.length - 1; i++) {
        fullWidthWithoutMore += itemNodes[i].offsetWidth;
        if (i > 0) fullWidthWithoutMore += 4;
      }

      if (fullWidthWithoutMore <= containerWidth) {
        newSplitIndex = itemNodes.length - 1;
      }

      setSplitIndex(newSplitIndex);
    };

    // Run measurement immediately
    measure();

    // Also run after fonts are loaded to ensure correct widths
    if (document.fonts) {
      document.fonts.ready.then(measure);
    }

    window.addEventListener('resize', measure);
    // Add a small delay to handle any CSS transitions or layout shifts
    const timer = setTimeout(measure, 300);
    return () => {
      window.removeEventListener('resize', measure);
      clearTimeout(timer);
    };
  }, [language, t]);

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

  // Split navigation items dynamically based on available width
  const primaryItems = mockHomepageData.navigation_menu.slice(0, splitIndex);
  const moreItems = mockHomepageData.navigation_menu.slice(splitIndex);

  return (
    <nav
      style={{ top: `${toolbarHeight}px` }}
      className={`w-full z-40 smooth-transition sticky ${isSticky
        ? 'bg-[#F3F4F6]/95 backdrop-blur-md shadow-md border-y border-gray-300/50 text-gray-900'
        : 'bg-white/45 backdrop-blur-md border-y border-transparent text-gray-900'
        } dark-mode:bg-gray-900/35 dark-mode:text-gray-150 dark-mode:border-gray-800/40`}
      aria-label="Main Navigation"
    >
      <div className="w-full px-4 md:px-8 flex justify-between items-center min-h-[2.5rem] relative">

        {/* Hidden measuring container for dynamic split */}
        <div
          ref={measuringRef}
          className="absolute top-0 left-0 h-0 overflow-hidden invisible flex items-center gap-1 text-[13px] font-semibold w-max"
          aria-hidden="true"
        >
          {mockHomepageData.navigation_menu.map((item, idx) => {
            const hasChildren = (item.children && item.children.length > 0) || (item.groups && item.groups.length > 0);
            const isHome = item.text === "मुख्यपृष्ठ";
            const IconComponent = item.icon ? iconMap[item.icon] : null;
            const iconColor = item.icon ? iconColorMap[item.icon] : 'text-gray-500';
            return (
              <div key={idx} className={`px-2 py-2 flex items-center gap-1.5 whitespace-nowrap ${isHome ? 'px-3' : ''}`}>
                {IconComponent && <IconComponent className={`w-3.5 h-3.5 ${isHome ? 'mr-1' : iconColor}`} />}
                <span>{t(item.text)}</span>
                {hasChildren && <ChevronDown className="w-3 h-3" />}
              </div>
            );
          })}
          <div className="px-3 py-2 flex items-center gap-1">
            <Menu className="w-4 h-4" />
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div ref={containerRef} className="hidden lg:flex items-center justify-between gap-1 w-full text-[13px] font-semibold">

          {/* Primary items */}
          {primaryItems.map((item, idx) => {
            const hasChildren = (item.children && item.children.length > 0) || (item.groups && item.groups.length > 0);
            const isDropdownActive = activeDropdown === idx;
            const isHome = item.text === "मुख्यपृष्ठ";
            const IconComponent = item.icon ? iconMap[item.icon] : null;

            return (
              <div
                key={idx}
                className="relative h-10 flex items-center"
                onMouseEnter={() => handleDropdownHover(idx)}
                onMouseLeave={handleDropdownLeave}
              >
                <a
                  href={item.href}
                  className={`px-2 py-2.5 flex items-center gap-1.5 transition-all whitespace-nowrap focus:outline focus:outline-2 focus:outline-amber-500 h-full ${isHome
                    ? 'bg-amber-500 rounded text-[#fff] font-[500] px-3 hover:bg-amber-600'
                    : 'hover:bg-black/5 rounded dark-mode:hover:bg-white/5 text-gray-900 dark-mode:text-gray-100'
                    }`}
                  aria-haspopup={hasChildren ? "true" : "false"}
                  aria-expanded={isDropdownActive ? "true" : "false"}
                >
                  {IconComponent && <IconComponent className={`w-3.5 h-3.5 ${isHome ? 'mr-1' : (item.icon ? iconColorMap[item.icon] : 'text-gray-500')}`} />}
                  <span>{t(item.text)}</span>
                  {hasChildren && <ChevronDown className="w-3 h-3 text-gray-500 dark-mode:text-gray-400 flex-shrink-0" />}
                </a>

                {/* Regular Dropdown menu */}
                {hasChildren && !item.isMegaMenu && isDropdownActive && (
                  <div className={`absolute top-full w-64 bg-white text-gray-900 shadow-lg shadow-black/10 rounded-b-lg py-2 z-50 glass-effect dark-mode:bg-gray-850 dark-mode:text-gray-100 dark-mode:shadow-black/40 animate-in fade-in slide-in-from-top-2 duration-200 ${idx > primaryItems.length / 2 ? 'right-0' : 'left-0'}`}>
                    {item.children?.map((child, cIdx) => (
                      <a
                        key={cIdx}
                        href={child.href}
                        className="w-full px-4 py-2 text-[13px] font-medium text-[#0F3D66] dark-mode:text-blue-300 hover:bg-blue-50 hover:text-blue-700 dark-mode:hover:bg-gray-800 flex items-start gap-2 justify-between border-b border-gray-100 last:border-0 dark-mode:border-gray-800 transition-colors focus:outline focus:outline-2 focus:outline-amber-500"
                      >
                        <span className="flex-1 text-left whitespace-normal leading-snug">{t(child.text)}</span>
                        <ChevronRight className="w-3 h-3 text-gray-400 flex-shrink-0 mt-0.5" />
                      </a>
                    ))}
                  </div>
                )}

                {/* Mega Menu Dropdown */}
                {hasChildren && item.isMegaMenu && isDropdownActive && (
                  <div className={`absolute top-full min-w-[750px] lg:min-w-[850px] max-w-6xl bg-white text-gray-900 shadow-lg shadow-black/10 rounded-b-lg py-3 px-5 z-50 glass-effect dark-mode:bg-gray-850 dark-mode:text-gray-100 dark-mode:shadow-black/40 animate-in fade-in slide-in-from-top-2 duration-200 grid grid-cols-2 lg:grid-cols-3 gap-5 ${idx >= primaryItems.length / 2 ? 'right-0' : 'left-0'}`}>
                    {item.groups?.map((group, gIdx) => (
                      <div key={gIdx} className="flex flex-col gap-1.5">
                        <h3 className="text-[14px] font-medium text-amber-600 dark-mode:text-amber-500 border-b border-gray-200 dark-mode:border-gray-700 pb-0.5 mb-1 whitespace-normal leading-snug">
                          {t(group.groupTitle)}
                        </h3>
                        <div className="flex flex-col gap-0.5">
                          {group.children.map((child, cIdx) => {
                            const hasSub = child.children && child.children.length > 0;
                            return (
                              <div key={cIdx} className="relative group/sub">
                                <a
                                  href={hasSub ? undefined : child.href}
                                  className="text-[13px] font-medium text-[#0F3D66] dark-mode:text-blue-300 hover:bg-blue-50 hover:text-blue-700 dark-mode:hover:bg-gray-800 transition-colors py-1 px-1.5 rounded flex items-start gap-1 cursor-pointer w-full justify-between"
                                >
                                  <div className="flex items-start gap-1 flex-1">
                                    <ChevronRight className="w-2.5 h-2.5 text-gray-400 flex-shrink-0 mt-0.5" />
                                    <span className="whitespace-normal leading-tight text-left">{t(child.text)}</span>
                                  </div>
                                  {hasSub && <ChevronRight className="w-2.5 h-2.5 text-gray-400 flex-shrink-0 mt-0.5" />}
                                </a>
                                {hasSub && (
                                  <div className="absolute left-[90%] top-0 ml-1 min-w-[180px] bg-white text-gray-900 shadow-lg shadow-black/10 rounded-lg py-1.5 z-50 glass-effect dark-mode:bg-gray-850 dark-mode:text-gray-100 dark-mode:shadow-black/40 hidden group-hover/sub:block animate-in fade-in slide-in-from-left-2 duration-150">
                                    {child.children.map((subChild, scIdx) => (
                                      <a
                                        key={scIdx}
                                        href={subChild.href}
                                        className="w-full px-3 py-1.5 text-[12px] font-normal text-[#374151] dark-mode:text-gray-300 hover:bg-blue-50 hover:text-blue-700 dark-mode:hover:bg-gray-800 transition-colors flex items-start"
                                      >
                                        <span className="whitespace-normal leading-tight text-left">{t(subChild.text)}</span>
                                      </a>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
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
                className={`px-3.5 py-3.5 hover:bg-black/5 dark-mode:hover:bg-white/5 flex items-center gap-1 transition-all h-full text-gray-900 dark-mode:text-gray-100 focus:outline focus:outline-2 focus:outline-amber-500 cursor-pointer ${activeDropdown === 99 ? 'bg-black/5 dark-mode:bg-white/5' : ''
                  }`}
                aria-haspopup="true"
                aria-expanded={activeDropdown === 99 ? "true" : "false"}
                aria-label="Expand more menus"
              >
                <Menu className="w-4.5 h-4.5" />
              </button>

              {/* Collapsed Items Panel */}
              {activeDropdown === 99 && (
                <div className="absolute right-0 top-full w-64 bg-white text-gray-900 shadow-lg shadow-black/10 rounded-b-lg py-2 z-50 glass-effect dark-mode:bg-gray-850 dark-mode:text-gray-100 dark-mode:shadow-black/40 animate-in fade-in slide-in-from-top-2 duration-200">
                  {moreItems.map((item, mIdx) => {
                    const hasSubChildren = (item.children && item.children.length > 0) || (item.groups && item.groups.length > 0);
                    const isSubActive = activeSubMenu === mIdx;

                    return (
                      <div
                        key={mIdx}
                        className="relative"
                        onMouseEnter={() => handleSubMenuHover(mIdx)}
                      >
                        <a
                          href={item.href}
                          className={`w-full px-4 py-2 text-[13px] font-medium text-gray-900 dark-mode:text-gray-100 hover:bg-gray-100 dark-mode:hover:bg-gray-800 flex items-start gap-2 justify-between border-b border-gray-100 last:border-0 dark-mode:border-gray-800 transition-colors focus:outline focus:outline-2 focus:outline-amber-500 ${isSubActive ? 'bg-gray-100 dark-mode:bg-gray-800' : ''
                            }`}
                        >
                          <span className="flex-1 whitespace-normal leading-snug text-left max-w-[200px]">{t(item.text)}</span>
                          {hasSubChildren ? (
                            <ChevronLeft className="w-3.5 h-3.5 text-[#1E5AA8] dark-mode:text-blue-400 flex-shrink-0 mt-0.5" />
                          ) : (
                            <ChevronRight className="w-3 h-3 text-gray-400 flex-shrink-0 mt-0.5" />
                          )}
                        </a>

                        {/* Flyout Sub-menu (Opens to the left) */}
                        {hasSubChildren && isSubActive && (
                          <div className="absolute right-full top-0 mr-1 min-w-[240px] max-h-[80vh] overflow-y-auto bg-white text-gray-900 shadow-lg shadow-black/10 rounded-lg py-2 z-50 glass-effect dark-mode:bg-gray-850 dark-mode:text-gray-100 dark-mode:shadow-black/40 animate-in fade-in slide-in-from-right-2 duration-150 custom-scrollbar">
                            {!item.isMegaMenu && item.children?.map((subChild, scIdx) => (
                              <a
                                key={scIdx}
                                href={subChild.href}
                                className="w-full px-4 py-1.5 text-[12px] font-normal text-[#374151] dark-mode:text-gray-300 hover:bg-blue-50 hover:text-blue-700 dark-mode:hover:bg-gray-800 flex items-start gap-2 justify-between border-b border-gray-100 last:border-0 dark-mode:border-gray-800 transition-colors focus:outline focus:outline-2 focus:outline-amber-500"
                              >
                                <span className="flex-1 text-left whitespace-normal leading-snug">{t(subChild.text)}</span>
                                <ChevronRight className="w-3 h-3 text-gray-400 flex-shrink-0 mt-0.5" />
                              </a>
                            ))}
                            {item.isMegaMenu && item.groups?.map((group, gIdx) => (
                              <div key={gIdx} className="mb-2 last:mb-0">
                                <div className="px-4 py-1.5 text-[14px] font-medium text-amber-600 dark-mode:text-amber-500 bg-gray-50 dark-mode:bg-gray-800/50 whitespace-normal leading-snug">
                                  {t(group.groupTitle)}
                                </div>
                                {group.children?.map((subChild, scIdx) => (
                                  <a
                                    key={scIdx}
                                    href={subChild.href || '#'}
                                    className="w-full px-4 py-1.5 text-[12px] font-normal text-[#374151] dark-mode:text-gray-300 hover:bg-blue-50 hover:text-blue-700 dark-mode:hover:bg-gray-800 flex items-start transition-colors border-b border-gray-100 last:border-0 dark-mode:border-gray-800"
                                  >
                                    <span className="whitespace-normal leading-snug text-left">{t(subChild.text)}</span>
                                  </a>
                                ))}
                              </div>
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
            <span className="text-xs font-medium font-poppins tracking-wide text-amber-500">
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
                const hasChildren = (item.children && item.children.length > 0) || (item.groups && item.groups.length > 0);
                const isDropdownActive = activeDropdown === idx;
                const isHome = item.text === "मुख्यपृष्ठ";
                const IconComponent = item.icon ? iconMap[item.icon] : null;

                return (
                  <div key={idx} className="border-b border-[#1E5AA8]/20 py-1.5 last:border-0">
                    <div
                      className="flex items-center justify-between px-3 py-2 hover:bg-white/5 rounded transition-colors cursor-pointer"
                      onClick={() => hasChildren ? toggleDropdownMobile(idx) : null}
                    >
                      <a
                        href={hasChildren ? undefined : item.href}
                        className="text-sm font-semibold flex items-center gap-2.5"
                        onClick={(e) => hasChildren && e.preventDefault()}
                      >
                        {IconComponent && <IconComponent className={`w-4 h-4 ${item.icon ? iconColorMap[item.icon] : 'text-blue-200'}`} />}
                        <span>{t(item.text)}</span>
                      </a>
                      {hasChildren && (
                        <button className="p-1 focus:outline-none">
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownActive ? 'rotate-180 text-amber-400' : 'text-gray-400'}`} />
                        </button>
                      )}
                    </div>

                    {/* Mobile Dropdown Submenu */}
                    {hasChildren && !item.isMegaMenu && isDropdownActive && (
                      <div className="mt-1 pl-6 flex flex-col gap-1 bg-[#092947]/50 rounded-md py-1 border-l-2 border-amber-500 animate-in slide-in-from-top duration-200">
                        {item.children?.map((child, cIdx) => (
                          <a
                            key={cIdx}
                            href={child.href}
                            className="block px-3 py-1.5 text-[13px] font-medium text-blue-200 hover:bg-white/10 hover:text-white rounded transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {t(child.text)}
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Mobile Mega Menu Groups */}
                    {hasChildren && item.isMegaMenu && isDropdownActive && (
                      <div className="mt-1 pl-4 flex flex-col gap-3 bg-[#092947]/50 rounded-md py-2 border-l-2 border-amber-500 animate-in slide-in-from-top duration-200">
                        {item.groups?.map((group, gIdx) => (
                          <div key={gIdx} className="flex flex-col gap-1">
                            <h4 className="text-[14px] font-medium text-amber-400 px-3 mb-1 whitespace-normal leading-snug">
                              {t(group.groupTitle)}
                            </h4>
                            {group.children.map((child, cIdx) => {
                              const hasSub = child.children && child.children.length > 0;
                              return (
                                <div key={cIdx}>
                                  <a
                                    href={hasSub ? undefined : child.href}
                                    className="block px-3 py-1 text-[13px] font-medium text-blue-200 hover:bg-white/10 hover:text-white rounded transition-colors"
                                    onClick={(e) => {
                                      if (hasSub) {
                                        // Simple toggler logic can just rely on not closing menu, 
                                        // For now, let's keep it visible.
                                      } else {
                                        setMobileMenuOpen(false);
                                      }
                                    }}
                                  >
                                    - {t(child.text)}
                                  </a>
                                  {hasSub && (
                                    <div className="pl-4 flex flex-col mt-0.5 mb-1">
                                      {child.children.map((subChild, scIdx) => (
                                        <a
                                          key={scIdx}
                                          href={subChild.href}
                                          className="block px-3 py-1 text-[12px] font-normal text-gray-300 hover:bg-white/10 hover:text-white rounded transition-colors"
                                          onClick={() => setMobileMenuOpen(false)}
                                        >
                                          • {t(subChild.text)}
                                        </a>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
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
