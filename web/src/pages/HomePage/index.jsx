"use client";
import React, { useEffect } from 'react';
import { usePathname as useLocation } from 'next/navigation';
import HeroCarousel from './components/HeroCarousel';
import MinisterProfiles from './components/MinisterProfiles';
import QuickServices from './components/QuickServices';
import AboutSection from './components/AboutSection';
import AnnouncementsTabs from './components/AnnouncementsTabs';
import HolidayCalendar from './components/HolidayCalendar';
import PhotoGallery from './components/PhotoGallery';
import JailInsights from './components/JailInsights';

export const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const id = window.location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <div id="hero">
        <HeroCarousel />
        <MinisterProfiles />
      </div>

      <div id="about">
        <AboutSection />
      </div>

      <div id="insights">
        <JailInsights />
      </div>

      <div id="announcements">
        <AnnouncementsTabs />
      </div>

      <div id="calendar">
        <HolidayCalendar />
      </div>

      <div id="gallery">
        <PhotoGallery />
      </div>

      <div id="services">
        <QuickServices />
      </div>
    </>
  );
};
export default HomePage;
