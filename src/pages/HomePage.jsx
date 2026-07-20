import React from 'react';
import { useAccessibility } from '../hooks/useAccessibility';
import { useScroll, useTransform, motion } from 'framer-motion';

import AccessibilityToolbar from '../components/AccessibilityToolbar';
import Header from '../components/Header';
import MegaMenu from '../components/MegaMenu';
import NewsTicker from '../components/NewsTicker';
import HeroCarousel from '../components/HeroCarousel';
import MinisterProfiles from '../components/MinisterProfiles';
import QuickServices from '../components/QuickServices';
import AboutSection from '../components/AboutSection';
import AnnouncementsTabs from '../components/AnnouncementsTabs';
import HolidayCalendar from '../components/HolidayCalendar';
import PhotoGallery from '../components/PhotoGallery';
import ImportantLinks from '../components/ImportantLinks';
import Footer from '../components/Footer';
import LiveWallpaperBg from '../components/LiveWallpaperBg';

export const HomePage = () => {
  const { language } = useAccessibility();

  // Scroll transforms for bottom section orbs
  const { scrollY } = useScroll();
  const yBlob3 = useTransform(scrollY, [0, 1800], [0, -120]);
  const yBlob4 = useTransform(scrollY, [0, 1800], [0, 80]);

  return (
    <div className={`w-full min-h-screen flex flex-col bg-[#F8FAFC] dark-mode:bg-[#080B11] smooth-transition relative overflow-hidden high-tech-grid ${
      language === 'mr' ? 'font-devanagari font-medium' : 'font-inter'
    }`}>
      
      {/* 1. GRAPHICAL LIVE WALLPAPER BACKGROUND (Covers sitemap to end of Hero section) */}
      <LiveWallpaperBg />

      {/* Bottom section decorative parallax blobs */}
      <motion.div 
        style={{ y: yBlob3 }} 
        className="glow-orb w-[600px] h-[600px] bg-indigo-400/5 bottom-[300px] -left-80 pointer-events-none" 
      />
      <motion.div 
        style={{ y: yBlob4 }} 
        className="glow-orb w-80 h-80 bg-amber-400/5 bottom-20 -right-20 pointer-events-none" 
      />

      {/* Accessibility Toolbar */}
      <AccessibilityToolbar />

      {/* Premium Title Branding Header */}
      <Header />

      {/* Desktop Light Gray / Sticky Accordion mega menu */}
      <MegaMenu />

      {/* Linear Gradient News Ticker */}
      <NewsTicker />

      {/* Main Content Body Slot */}
      <main id="main-content" className="flex-1 flex flex-col focus:outline-none relative z-10">
        
        {/* Carousel & Minister grid */}
        <HeroCarousel />

        {/* Dignitary card grid */}
        <MinisterProfiles />

        {/* Citizens Helplines grid */}
        <QuickServices />

        {/* Welcoming About department copy */}
        <AboutSection />

        {/* Tabbed Tenders & Notices */}
        <AnnouncementsTabs />

        {/* Interactive React month-by-month calendar */}
        <HolidayCalendar />

        {/* Slide Photo Gallery & map */}
        <PhotoGallery />

        {/* Redirection Links */}
        <ImportantLinks />

      </main>

      {/* NIC copyright footer list */}
      <Footer />
    </div>
  );
};
export default HomePage;
