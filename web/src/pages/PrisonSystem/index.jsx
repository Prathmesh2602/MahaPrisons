"use client";
import React, { useLayoutEffect } from 'react';
import HeroSection from './components/HeroSection';
import OverviewStats from './components/OverviewStats';
import HistoryTimeline from './components/HistoryTimeline';
import AdministrationSection from './components/AdministrationSection';
import ActivitiesRehab from './components/ActivitiesRehab';

export const YerawadaOpenJailPage = () => {
  useLayoutEffect(() => {
    // Disable smooth scrolling temporarily
    const originalStyle = window.getComputedStyle(document.documentElement).scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    // Restore it after scroll
    document.documentElement.style.scrollBehavior = originalStyle;
  }, []);

  return (
    <div className="w-full bg-[#F8FAFC] dark-mode:bg-[#080B11] pb-24 font-poppins overflow-hidden">
      <HeroSection />
      <div className="container mx-auto px-4 md:px-8 -mt-10 relative z-30">
        <OverviewStats />
        <HistoryTimeline />
        <AdministrationSection />
        <ActivitiesRehab />
      </div>
    </div>
  );
};

export default YerawadaOpenJailPage;
