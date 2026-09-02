import { fetchPage, fetchAnnouncements } from '@/lib/api';
import { notFound } from 'next/navigation';

import HeroCarousel from '@/components/HeroCarousel';
import AboutSection from '@/components/AboutSection';
import AnnouncementsTabs from '@/components/AnnouncementsTabs';
import HolidayCalendar from '@/components/HolidayCalendar';
import QuickServices from '@/components/QuickServices';
import PhotoGallery from '@/components/PhotoGallery';

export default async function DynamicPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug ? resolvedParams.slug.join('/') : '/';

  if (slug === '/') {
    return (
      <div className="flex flex-col gap-12 w-full">
        <HeroCarousel />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row gap-8">
           <div className="w-full lg:w-2/3">
             <AboutSection />
           </div>
           <div className="w-full lg:w-1/3">
             <AnnouncementsTabs />
           </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <QuickServices />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <HolidayCalendar />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <PhotoGallery />
        </div>
      </div>
    );
  }

  // Normal CMS dynamically rendered pages
  const page = await fetchPage(slug);
  
  if (!page) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
      <h1 className="text-4xl font-bold mb-8 text-[#0F3D66]">{page.titleEn}</h1>
      <div className="flex flex-col gap-8">
        {page.blocks.map((block: any) => (
          <div key={block.id} className="p-4 bg-white rounded shadow glass-card">
            <h3 className="font-semibold text-lg">{block.blockType}</h3>
            <pre className="text-xs overflow-auto bg-gray-50 p-2 mt-2">{JSON.stringify(block.data, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
