import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BlockWrapper } from '../components/VisualEditor/BlockWrapper';
import { HeroCarousel } from '../components/HeroCarousel';
import AboutSection from '../components/AboutSection';
import AnnouncementsTabs from '../components/AnnouncementsTabs';
import HolidayCalendar from '../components/HolidayCalendar';
import PhotoGallery from '../components/PhotoGallery';
import JailInsights from '../components/JailInsights';
import QuickServices from '../components/QuickServices';
import MinisterProfiles from '../components/MinisterProfiles';
import { HomePage } from './HomePage';

const COMPONENT_MAP = {
  'HERO_CAROUSEL': HeroCarousel,
  'MINISTER_PROFILES': MinisterProfiles,
  'ABOUT_SECTION': AboutSection,
  'JAIL_INSIGHTS': JailInsights,
  'ANNOUNCEMENTS': AnnouncementsTabs,
  'HOLIDAY_CALENDAR': HolidayCalendar,
  'PHOTO_GALLERY': PhotoGallery,
  'QUICK_SERVICES': QuickServices,
  'RICH_TEXT': ({ data }) => <div className="max-w-4xl mx-auto p-8 prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: data?.html || '<h1>Empty Rich Text</h1><p>Start typing...</p>' }} />
};

const BLOCK_ID_MAP = {
  'HERO_CAROUSEL': 'hero',
  'MINISTER_PROFILES': '', // no ID needed or let it be part of flow
  'ABOUT_SECTION': 'about',
  'JAIL_INSIGHTS': 'insights',
  'ANNOUNCEMENTS': 'announcements',
  'HOLIDAY_CALENDAR': 'calendar',
  'PHOTO_GALLERY': 'gallery',
  'QUICK_SERVICES': 'services',
};

export const PageRenderer = () => {
  const location = useLocation();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previewBlocks, setPreviewBlocks] = useState(null);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === 'UPDATE_PREVIEW_BLOCKS') {
        setPreviewBlocks(event.data.payload.blocks);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      try {
        let slug = location.pathname.replace(/^\//, '');
        if (slug === '') slug = 'home';
        
        const searchParams = new URLSearchParams(location.search);
        const previewSlug = searchParams.get('previewSlug');
        if (previewSlug) {
          slug = previewSlug;
        }

        const url = `${import.meta.env.VITE_API_URL}/public/pages/${slug}`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setPageData(data);
        } else {
          setPageData(null);
        }
      } catch (err) {
        console.error(err);
        setPageData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, [location.pathname, location.search]);

  if (loading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (!pageData) {
    if (location.pathname === '/') return <HomePage />;
    return <div className="min-h-screen flex items-center justify-center text-gray-500">404 - Page Not Found</div>;
  }

  const blocksToRender = previewBlocks || pageData.blocks || [];

  if (blocksToRender.length === 0) {
    // If it's a completely blank template and no blocks yet
    const isPreview = new URLSearchParams(location.search).get('preview') === 'true';
    if (isPreview) {
      return (
        <div className="min-h-[400px] m-8 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50">
          <p className="text-gray-400 font-medium">Page is empty. Add blocks from the Admin Builder.</p>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="flex flex-col w-full">
      {blocksToRender.map((block) => {
        const Component = COMPONENT_MAP[block.blockType];
        if (!Component) return <div key={block.id || Math.random()} className="p-4 bg-red-100 text-red-700">Unknown block: {block.blockType}</div>;
        
        const blockIdAttr = BLOCK_ID_MAP[block.blockType];

        return (
          <div key={block.id || Math.random()} id={blockIdAttr}>
            <BlockWrapper blockId={block.id} blockType={block.blockType}>
              <Component data={block.data} />
            </BlockWrapper>
          </div>
        );
      })}
    </div>
  );
};
