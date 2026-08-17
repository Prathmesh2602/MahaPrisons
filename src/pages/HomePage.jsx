import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroCarousel from '../components/HeroCarousel';
import MinisterProfiles from '../components/MinisterProfiles';
import QuickServices from '../components/QuickServices';
import AboutSection from '../components/AboutSection';
import AnnouncementsTabs from '../components/AnnouncementsTabs';
import HolidayCalendar from '../components/HolidayCalendar';
import PhotoGallery from '../components/PhotoGallery';
import JailInsights from '../components/JailInsights';

export const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <div id="hero">
        {/* Carousel & Minister grid */}
        <HeroCarousel />
        {/* Dignitary card grid */}
        <MinisterProfiles />
      </div>

      <div id="about">
        {/* Welcoming About department copy */}
        <AboutSection />
      </div>

      <div id="insights">
        {/* Jail Insights Section */}
        <JailInsights />
      </div>

      <div id="announcements">
        {/* Tabbed Tenders & Notices */}
        <AnnouncementsTabs />
      </div>

      <div id="calendar">
        {/* Interactive React month-by-month calendar */}
        <HolidayCalendar />
      </div>

      <div id="gallery">
        {/* Slide Photo Gallery & map */}
        <PhotoGallery />
      </div>

      <div id="services">
        {/* Quick Services & Links */}
        <QuickServices />
      </div>
    </>
  );
};
export default HomePage;
