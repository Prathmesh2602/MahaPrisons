import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { HeroCarouselEditor } from '../components/editors/HeroCarouselEditor';
import { MinisterProfilesEditor } from '../components/editors/MinisterProfilesEditor';
import { AboutSectionEditor } from '../components/editors/AboutSectionEditor';
import { JailInsightsEditor } from '../components/editors/JailInsightsEditor';
import { AnnouncementsTabsEditor } from '../components/editors/AnnouncementsTabsEditor';
import { HolidayCalendarEditor } from '../components/editors/HolidayCalendarEditor';
import { PhotoGalleryEditor } from '../components/editors/PhotoGalleryEditor';
import { QuickServicesEditor } from '../components/editors/QuickServicesEditor';

export const PageEditor = () => {
  const [searchParams] = useSearchParams();
  const slug = searchParams.get('slug') || '/';

  const [pageData, setPageData] = useState<any>(null);
  const [selectedBlockType, setSelectedBlockType] = useState<string>('hero_carousel');
  
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isIframeReady, setIsIframeReady] = useState(false);

  useEffect(() => {
    if (isIframeReady && pageData && iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: 'PREVIEW_UPDATE',
          component: 'Page',
          payload: { blocks: pageData.contentBlocks || [] }
        },
        '*'
      );
    }
  }, [isIframeReady, pageData]);

  useEffect(() => {
    fetchPageData();

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'PREVIEW_READY') {
        setIsIframeReady(true);
      } else if (event.data?.type === 'BLOCK_SELECTED') {
        setSelectedBlockType(event.data.blockType);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [slug]);

  const fetchPageData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/pages/by-slug?slug=${slug}`);
      if (res.data) {
        setPageData(res.data);
      }
    } catch (error) {
      console.error('Failed to fetch page data:', error);
    }
  };

  const handlePreviewUpdate = (blockType: string, updatedContent: any) => {
    if (!isIframeReady || !iframeRef.current?.contentWindow || !pageData) return;

    const blocks = pageData.contentBlocks?.map((b: any) => {
      if (b.blockType === blockType) return { ...b, content: updatedContent };
      return b;
    }) || [];

    iframeRef.current.contentWindow.postMessage(
      {
        type: 'PREVIEW_UPDATE',
        component: 'Page',
        payload: { blocks }
      },
      '*'
    );
  };

  const renderEditor = () => {
    if (!pageData || !pageData.contentBlocks) return <div className="p-4 text-center text-slate-500">Loading...</div>;

    const block = pageData.contentBlocks.find((b: any) => b.blockType === selectedBlockType);
    if (!block) {
      return (
        <div className="text-center text-slate-500 py-10 bg-slate-50 border border-slate-200 rounded-lg m-3">
          <p>No editor available for this block yet. Selected: {selectedBlockType}</p>
        </div>
      );
    }

    switch (selectedBlockType) {
      case 'hero_carousel':
        return <HeroCarouselEditor blockId={block.id} initialData={block.content} onPreviewUpdate={(content: any) => handlePreviewUpdate(selectedBlockType, content)} />;
      case 'minister_profiles':
        return <MinisterProfilesEditor blockId={block.id} initialData={block.content} onPreviewUpdate={(content: any) => handlePreviewUpdate(selectedBlockType, content)} />;
      case 'about_section':
        return <AboutSectionEditor blockId={block.id} initialData={block.content} onPreviewUpdate={(content: any) => handlePreviewUpdate(selectedBlockType, content)} />;
      case 'jail_insights':
        return <JailInsightsEditor blockId={block.id} initialData={block.content} onPreviewUpdate={(content: any) => handlePreviewUpdate(selectedBlockType, content)} />;
      case 'announcements_tabs':
        return <AnnouncementsTabsEditor blockId={block.id} initialData={block.content} onPreviewUpdate={(content: any) => handlePreviewUpdate(selectedBlockType, content)} />;
      case 'holiday_calendar':
        return <HolidayCalendarEditor blockId={block.id} initialData={block.content} onPreviewUpdate={(content: any) => handlePreviewUpdate(selectedBlockType, content)} />;
      case 'photo_gallery':
        return <PhotoGalleryEditor blockId={block.id} initialData={block.content} onPreviewUpdate={(content: any) => handlePreviewUpdate(selectedBlockType, content)} />;
      case 'quick_services':
        return <QuickServicesEditor blockId={block.id} initialData={block.content} onPreviewUpdate={(content: any) => handlePreviewUpdate(selectedBlockType, content)} />;
      default:
        return (
          <div className="text-center text-slate-500 py-10 bg-slate-50 border border-slate-200 rounded-lg m-3">
            <p>Editor component not found for: {selectedBlockType}</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-full w-full bg-slate-50 overflow-hidden">
      {/* LEFT PANE: Live Preview */}
      <div className="w-[70%] border-r border-slate-200 flex flex-col bg-slate-100 overflow-hidden">
        <div className="h-12 bg-white border-b border-slate-200 flex items-center justify-center text-sm font-medium text-slate-500 shadow-sm shrink-0">
          Live Preview ({slug})
        </div>
        <div className="flex-1 p-2 overflow-hidden relative">
          <div className="w-full h-full bg-white rounded-xl shadow-inner border border-slate-200 overflow-hidden flex flex-col">
            <iframe
              ref={iframeRef}
              src="http://localhost:3000/preview"
              className="w-full h-full border-0"
              title="Live Preview"
            />
          </div>
        </div>
      </div>

      {/* RIGHT PANE: Forms */}
      <div className="w-[30%] flex flex-col bg-white shrink-0 overflow-y-auto relative">
        <div className="p-3 flex flex-col gap-4">
          {renderEditor()}
        </div>
      </div>
    </div>
  );
};
