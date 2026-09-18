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

export const HomePage = ({ pageData }) => {
  const location = useLocation();

  // Extract blocks from pageData
  const blocks = pageData?.contentBlocks || [];
  const getBlock = (type) => blocks.find(b => b.blockType === type)?.content || null;

  const heroCarouselData = getBlock('hero_carousel');
  const ministerProfilesData = getBlock('minister_profiles');
  const aboutSectionData = getBlock('about_section');
  const jailInsightsData = getBlock('jail_insights');
  const announcementsTabsData = getBlock('announcements_tabs');
  const holidayCalendarData = getBlock('holiday_calendar');
  const photoGalleryData = getBlock('photo_gallery');
  const quickServicesData = getBlock('quick_services');

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
        <HeroCarousel slidesData={heroCarouselData} />
      </div>
      <div id="ministers">
        <MinisterProfiles data={ministerProfilesData} />
      </div>

      <div id="about">
        <AboutSection data={aboutSectionData} />
      </div>

      <div id="insights">
        <JailInsights data={jailInsightsData} />
      </div>

      <div id="announcements">
        <AnnouncementsTabs data={announcementsTabsData} />
      </div>

      <div id="calendar">
        <HolidayCalendar data={holidayCalendarData} />
      </div>

      <div id="gallery">
        <PhotoGallery data={photoGalleryData} />
      </div>

      <div id="services">
        <QuickServices data={quickServicesData} />
      </div>
    </>
  );
};
export default HomePage;
