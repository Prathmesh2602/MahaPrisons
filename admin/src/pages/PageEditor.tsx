import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { TemplateSelectorModal } from '../components/TemplateSelectorModal';
import { HeroCarouselEditor } from '../components/editors/HeroCarouselEditor';
import { MinisterProfilesEditor } from '../components/editors/MinisterProfilesEditor';
import { AboutSectionEditor } from '../components/editors/AboutSectionEditor';
import { JailInsightsEditor } from '../components/editors/JailInsightsEditor';
import { AnnouncementsTabsEditor } from '../components/editors/AnnouncementsTabsEditor';
import { HolidayCalendarEditor } from '../components/editors/HolidayCalendarEditor';
import { PhotoGalleryEditor } from '../components/editors/PhotoGalleryEditor';
import { QuickServicesEditor } from '../components/editors/QuickServicesEditor';
import { PrisonHeroEditor } from '../components/editors/PrisonHeroEditor';
import { HeroFeatureListEditor } from '../components/editors/HeroFeatureListEditor';
import { PrisonOverviewEditor } from '../components/editors/PrisonOverviewEditor';
import { PrisonTimelineEditor } from '../components/editors/PrisonTimelineEditor';
import { PrisonAdministrationEditor } from '../components/editors/PrisonAdministrationEditor';
import { PrisonActivitiesEditor } from '../components/editors/PrisonActivitiesEditor';
import { TemplateEditorRenderer } from '../components/editors/TemplateEditorRenderer';

export const PageEditor = () => {
  const [searchParams] = useSearchParams();
  const rawSlug = searchParams.get('slug') || '/';
  const slug = (rawSlug.startsWith('/') && rawSlug.length > 1) ? rawSlug.slice(1) : rawSlug;

  const [pageData, setPageData] = useState<any>(null);
  const [selectedBlockType, setSelectedBlockType] = useState<string>('');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isIframeReady, setIsIframeReady] = useState(false);

  useEffect(() => {
    if (isIframeReady && pageData && iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: 'PREVIEW_UPDATE',
          component: 'Page',
          payload: { 
            blocks: pageData.contentBlocks || [], 
            slug,
            layoutType: pageData.layoutType 
          }
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
        const type = event.data.blockType;
        if (type.startsWith('template_') && type !== 'page_template_data') {
          setSelectedBlockType('page_template_data');
          setExpandedSection(type.replace('template_', ''));
        } else {
          setSelectedBlockType(type);
        }
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
        if (!selectedBlockType && res.data.contentBlocks?.length > 0) {
          setSelectedBlockType(res.data.contentBlocks[0].blockType);
        }
      }
    } catch (error) {
      console.error('Failed to fetch page data:', error);
    }
  };

  const handleTemplateChange = async (templateId: string) => {
    if (!pageData?.id) return;
    try {
      // 1. Find the page_template_data block
      const templateBlock = pageData.contentBlocks?.find((b: any) => b.blockType === 'page_template_data');
      if (templateBlock && pageData.layoutType !== templateId) {
        let oldContent = templateBlock.content || {};
        let newContent: any = {
          title: oldContent.title || { mr: '', en: '' },
          subtitle: oldContent.subtitle || { mr: '', en: '' },
          description: oldContent.description || { mr: '', en: '' },
          image: oldContent.image || '',
          _archived_data: { ...(oldContent._archived_data || {}) }
        };

        // Archive old layout specific data
        const currentLayout = pageData.layoutType;
        const currentSpecifics: any = {};
        for (const key of Object.keys(oldContent)) {
          if (!['title', 'subtitle', 'description', 'image', '_archived_data'].includes(key)) {
            currentSpecifics[key] = oldContent[key];
          }
        }
        if (Object.keys(currentSpecifics).length > 0) {
          newContent._archived_data[currentLayout] = currentSpecifics;
        }

        // Restore or initialize new layout specific data
        const archivedForNew = newContent._archived_data[templateId];
        
        // Simple heuristic mapping if no archived data exists
        if (!archivedForNew) {
          if (templateId === 'HeroFeaturesTimelineLayout') {
            newContent.stats = currentSpecifics.features || currentSpecifics.productionStats || [];
            newContent.keyFunctions = currentSpecifics.timings || currentSpecifics.activeProjects || [];
            newContent.contactInfo = currentSpecifics.impactStatement || { email: '', phone: '', address: '' };
          } else if (templateId === 'HeroStatsGrid') {
            newContent.features = currentSpecifics.stats || currentSpecifics.productionStats || [];
            newContent.gallery = [];
            newContent.timings = currentSpecifics.keyFunctions || currentSpecifics.activeProjects || [];
          } else if (templateId === 'HeroThreeColGrid') {
            newContent.productionStats = currentSpecifics.stats || currentSpecifics.features || [];
            newContent.activeProjects = currentSpecifics.keyFunctions || currentSpecifics.timings || [];
            newContent.impactStatement = currentSpecifics.contactInfo || { title: { mr: '', en: '' }, desc: { mr: '', en: '' } };
          } else if (templateId === 'HeroSplitTimeline') {
            newContent.coreProtocols = currentSpecifics.keyFunctions || currentSpecifics.timings || [];
            newContent.infrastructure = currentSpecifics.stats || currentSpecifics.features || [];
            newContent.alertMessage = { mr: '', en: '' };
          } else if (templateId === 'HeroFeatureList') {
            newContent.features = currentSpecifics.features || currentSpecifics.stats || [];
            newContent.listItems = currentSpecifics.listItems || [];
          }
        } else {
          // Restore archived
          Object.assign(newContent, archivedForNew);
        }

        const token = localStorage.getItem('token');
        await axios.put(`http://localhost:5000/api/v1/pages/blocks/${templateBlock.id}`, {
          content: newContent
        }, { headers: { Authorization: `Bearer ${token}` }});
      }

      const token = localStorage.getItem('token');
      const res = await axios.put(`http://localhost:5000/api/v1/pages/${pageData.id}/layout`, {
        layoutType: templateId
      }, { headers: { Authorization: `Bearer ${token}` }});
      
      if (res.data.success) {
        setIsTemplateModalOpen(false);
        fetchPageData();
      }
    } catch (error) {
      console.error('Failed to change template:', error);
      alert('Failed to change template');
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
        payload: { 
          blocks, 
          slug,
          layoutType: pageData.layoutType 
        }
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
      case 'prison_hero':
        return <PrisonHeroEditor blockId={block.id} initialData={block.content} onPreviewUpdate={(content: any) => handlePreviewUpdate(selectedBlockType, content)} />;
      case 'prison_overview':
        return <PrisonOverviewEditor blockId={block.id} initialData={block.content} onPreviewUpdate={(content: any) => handlePreviewUpdate(selectedBlockType, content)} />;
      case 'prison_timeline':
        return <PrisonTimelineEditor blockId={block.id} initialData={block.content} onPreviewUpdate={(content: any) => handlePreviewUpdate(selectedBlockType, content)} />;
      case 'prison_administration':
        return <PrisonAdministrationEditor blockId={block.id} initialData={block.content} onPreviewUpdate={(content: any) => handlePreviewUpdate(selectedBlockType, content)} />;
      case 'prison_activities':
        return <PrisonActivitiesEditor blockId={block.id} initialData={block.content} onPreviewUpdate={(content: any) => handlePreviewUpdate(selectedBlockType, content)} />;
      case 'page_template_data':
        return <TemplateEditorRenderer blockId={block.id} initialData={block.content} layoutType={pageData.layoutType} expandedSection={expandedSection} onPreviewUpdate={(content: any) => handlePreviewUpdate(selectedBlockType, content)} />;
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
        {pageData?.layoutType && ['HeroFeaturesTimelineLayout', 'HeroStatsGrid', 'HeroThreeColGrid', 'HeroSplitTimeline', 'HeroFeatureList'].includes(pageData.layoutType) && (
          <div className="p-3 border-b border-slate-200 bg-slate-50 flex justify-between items-center shrink-0">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-0.5">Current Layout</p>
              <p className="text-sm font-medium text-slate-800">
                {pageData.layoutType === 'HeroFeaturesTimelineLayout' && 'Hero Features Timeline'}
                {pageData.layoutType === 'HeroStatsGrid' && 'Hero Stats Grid'}
                {pageData.layoutType === 'HeroThreeColGrid' && 'Hero Three Column Grid'}
                {pageData.layoutType === 'HeroSplitTimeline' && 'Hero Split Timeline'}
                {pageData.layoutType === 'HeroFeatureList' && 'Hero Feature List'}
              </p>
            </div>
            <button 
              onClick={() => setIsTemplateModalOpen(true)}
              className="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-md transition-colors"
            >
              Change Template
            </button>
          </div>
        )}
        <div className="p-3 flex flex-col gap-4">
          {renderEditor()}
        </div>
      </div>
      
      <TemplateSelectorModal 
        isOpen={isTemplateModalOpen}
        currentTemplate={pageData?.layoutType || ''}
        onClose={() => setIsTemplateModalOpen(false)}
        onSelect={handleTemplateChange}
      />
    </div>
  );
};
