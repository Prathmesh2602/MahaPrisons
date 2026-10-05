import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { LayoutDashboard } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
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
import { getTemplateDummyData } from '../utils/templateDummyData';
import { API_URL } from '../config/api';


export const PageEditor = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const rawSlug = searchParams.get('slug') || '/';
  const slug = (rawSlug.startsWith('/') && rawSlug.length > 1) ? rawSlug.slice(1) : rawSlug;

  const [pageData, setPageData] = useState<any>(null);
  const [menuItemData, setMenuItemData] = useState<any>(null);
  const [pageNotFound, setPageNotFound] = useState(false);
  const [selectedBlockType, setSelectedBlockType] = useState<string>('');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const isFixedTemplatePage = ['/', 'yerawada-open-jail', 'gallery', 'our-products', 'contact'].includes(slug);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isIframeReady, setIsIframeReady] = useState(false);

  useEffect(() => {
    if (isIframeReady && iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: 'PREVIEW_UPDATE',
          component: 'Page',
          payload: { 
            blocks: pageData?.contentBlocks || [], 
            slug,
            layoutType: pageData?.layoutType 
          }
        },
        '*'
      );
    }
  }, [isIframeReady, pageData, slug]);

  useEffect(() => {
    setPageNotFound(false);
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
      const res = await axios.get(`${API_URL}/api/v1/pages/by-slug?slug=${slug}`);
      if (res.data) {
        const fetchedData = res.data;
        const templateBlock = fetchedData.contentBlocks?.find((b: any) => b.blockType === 'page_template_data');
        if (templateBlock?.content?._draft_layout_type) {
          fetchedData.layoutType = templateBlock.content._draft_layout_type;
          fetchedData._is_draft_layout = true;
        }
        
        setPageData(fetchedData);
        if (!selectedBlockType && fetchedData.contentBlocks?.length > 0) {
          setSelectedBlockType(fetchedData.contentBlocks[0].blockType);
        }
      }
      
      try {
        const menuRes = await axios.get(`${API_URL}/api/v1/menu`);
        if (menuRes.data) {
          let foundMenu = null;
          const findMenu = (items: any[]) => {
            for (const item of items) {
              if (item.href === `/${slug}` || item.href === slug) {
                foundMenu = item;
                return;
              }
              if (item.children && item.children.length > 0) findMenu(item.children);
              if (item.groups && item.groups.length > 0) {
                item.groups.forEach((g: any) => g.children && findMenu(g.children));
              }
            }
          };
          findMenu(menuRes.data);
          if (foundMenu) setMenuItemData(foundMenu);
        }
      } catch (menuError) {
        console.error('Failed to fetch menu data for editor title:', menuError);
      }
    } catch (error: any) {
      console.error('Failed to fetch page data:', error);
      if (error.response?.status === 404) {
        setPageNotFound(true);
      }
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
          if (!['title', 'subtitle', 'description', 'image', '_archived_data', '_previous_layout'].includes(key)) {
            currentSpecifics[key] = oldContent[key];
          }
        }
        if (Object.keys(currentSpecifics).length > 0) {
          newContent._archived_data[currentLayout] = currentSpecifics;
        }
        
        // Track the previous layout so we can Revert
        newContent._previous_layout = currentLayout;

        // Restore or initialize new layout specific data
        const archivedForNew = newContent._archived_data[templateId];
        const dummyData: any = getTemplateDummyData(templateId);

        if (!archivedForNew) {
          // Keep title/subtitle/description/image as empty or whatever it already is
          
          // Initialize arrays/objects with empty shapes matching dummy data length
          for (const key of Object.keys(dummyData)) {
            if (!['title', 'subtitle', 'description', 'image'].includes(key)) {
              if (Array.isArray(dummyData[key])) {
                newContent[key] = dummyData[key].map((item: any) => {
                  if (typeof item === 'object' && item !== null) {
                    const emptyItem: any = {};
                    for (const k of Object.keys(item)) {
                      if (typeof item[k] === 'object' && item[k] !== null) {
                        if ('en' in item[k] || 'mr' in item[k]) {
                          emptyItem[k] = { en: '', mr: '' };
                        } else {
                          emptyItem[k] = {};
                        }
                      } else {
                        emptyItem[k] = '';
                      }
                    }
                    return emptyItem;
                  }
                  return '';
                });
              } else if (typeof dummyData[key] === 'object' && dummyData[key] !== null) {
                newContent[key] = {};
              } else {
                newContent[key] = '';
              }
            }
          }
        } else {
          // Restore archived
          Object.assign(newContent, archivedForNew);
        }

        // Add draft layout type flag for local use
        newContent._draft_layout_type = templateId;

        // Update locally without saving to DB yet!
        setPageData((prev: any) => {
          const newData = JSON.parse(JSON.stringify(prev));
          const block = newData.contentBlocks?.find((b: any) => b.blockType === 'page_template_data');
          if (block) {
            block.content = newContent;
          }
          newData.layoutType = templateId;
          newData._is_draft_layout = true;
          return newData;
        });
        
        setIsTemplateModalOpen(false);
      }
    } catch (error) {
      console.error('Failed to change template:', error);
      alert('Failed to change template');
    }
  };

  const handleRevertTemplate = async () => {
    if (!pageData?.id) return;

    if (pageData._is_draft_layout) {
      if (confirm('Are you sure you want to cancel your layout changes and revert to the published version?\nतुम्हाला खात्री आहे की तुम्ही तुमचे लेआउट बदल रद्द करू इच्छिता आणि प्रकाशित आवृत्तीवर परत जाऊ इच्छिता?')) {
        fetchPageData();
      }
      return;
    }

    const templateBlock = pageData.contentBlocks?.find((b: any) => b.blockType === 'page_template_data');
    if (!templateBlock) return;
    
    const oldContent = templateBlock.content || {};
    const previousLayout = oldContent._previous_layout;
    
    if (previousLayout === undefined || previousLayout === null) {
      alert("No previous template data found to revert to.");
      return;
    }
    
    const layoutName = previousLayout === '' ? 'Blank Page' : previousLayout;
    if (confirm(`Are you sure you want to revert back to the previous template (${layoutName})?\nतुम्हाला खात्री आहे की तुम्ही मागील टेम्पलेटवर (${layoutName}) परत जाऊ इच्छिता?`)) {
      try {
        let newContent: any = {
          title: oldContent.title || { mr: '', en: '' },
          subtitle: oldContent.subtitle || { mr: '', en: '' },
          description: oldContent.description || { mr: '', en: '' },
          image: oldContent.image || '',
          _archived_data: { ...(oldContent._archived_data || {}) }
        };
        
        // Restore from archived
        const archivedForPrev = newContent._archived_data[previousLayout];
        if (archivedForPrev) {
          Object.assign(newContent, archivedForPrev);
        }
        
        // Clear previous_layout so you can't revert twice indefinitely
        newContent._previous_layout = null;

        const token = localStorage.getItem('token');
        await axios.put(`${API_URL}/api/v1/pages/blocks/${templateBlock.id}`, {
          content: newContent,
          changeSummary: `Reverted layout to ${previousLayout}`
        }, { headers: { Authorization: `Bearer ${token}` }});

        const res = await axios.put(`${API_URL}/api/v1/pages/${pageData.id}/layout`, {
          layoutType: previousLayout,
          changeSummary: `Reverted layout to ${previousLayout}`
        }, { headers: { Authorization: `Bearer ${token}` }});
        
        if (res.data.success) {
          fetchPageData();
        }
      } catch (error) {
        console.error('Failed to revert template:', error);
        alert('Failed to revert template');
      }
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
    if (pageNotFound) return (
      <div className="p-10 text-center flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Page Not Found</h2>
        <p className="text-slate-500 mb-6">The page "{slug}" does not exist in the database.</p>
        <button onClick={() => navigate('/pages')} className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors shadow-sm">
          Return to Pages
        </button>
      </div>
    );
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
        return <TemplateEditorRenderer key={pageData.layoutType} blockId={block.id} initialData={block.content} layoutType={pageData.layoutType} isDraftLayout={pageData._is_draft_layout} expandedSection={expandedSection} onPreviewUpdate={(content: any) => handlePreviewUpdate(selectedBlockType, content)} menuItemData={menuItemData} />;
      default:
        return (
          <div className="text-center text-slate-500 py-10 bg-slate-50 border border-slate-200 rounded-lg m-3">
            <p>Editor component not found for: {selectedBlockType}</p>
          </div>
        );
    }
  };

  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        // Force preview to perfectly fit the pane width
        const baseWidth = 1280;
        setScale(width / baseWidth);
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className="flex h-full w-full bg-slate-50 overflow-hidden">
      {/* LEFT PANE: Live Preview */}
      <div className="w-[70%] border-r border-slate-200 flex flex-col bg-slate-100 overflow-hidden">
        <div className="h-12 bg-white border-b border-slate-200 flex items-center justify-center text-sm font-medium text-slate-500 shadow-sm shrink-0">
          Live Preview {menuItemData ? `(${menuItemData.label_mr} / ${menuItemData.label_en})` : `(${slug})`}
        </div>
        <div className="flex-1 p-2 overflow-hidden relative" ref={containerRef}>
          <div 
            className="bg-white rounded-xl shadow-inner border border-slate-200 overflow-hidden relative origin-top-left"
            style={{ 
              width: '1280px', 
              height: scale > 0 ? `${100 / scale}%` : '100%', 
              transform: `scale(${scale})` 
            }}
          >
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
      <div className="w-[30%] flex flex-col bg-white shrink-0 overflow-y-auto relative border-l border-slate-200 shadow-[-4px_0_15px_-3px_rgba(0,0,0,0.05)]">
        {!isFixedTemplatePage && pageData?.layoutType ? (
          <div className="p-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between shrink-0 shadow-sm z-10 sticky top-0">
            <div className="flex flex-col max-w-[50%]">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Template</span>
              <span className="text-sm font-bold text-slate-800 truncate" title={pageData.layoutType}>
                {pageData.layoutType}
              </span>
            </div>
            <div className="flex gap-2">
              {(pageData._is_draft_layout || pageData.contentBlocks?.find((b: any) => b.blockType === 'page_template_data')?.content?._previous_layout !== undefined) && (
                <button 
                  onClick={handleRevertTemplate}
                  className="px-3 py-1.5 text-xs font-semibold text-amber-700 bg-amber-100 hover:bg-amber-200 rounded-md transition-colors shadow-sm flex items-center gap-1"
                >
                  {pageData._is_draft_layout ? 'Cancel Draft' : 'Revert'}
                </button>
              )}
              <button 
                onClick={() => setIsTemplateModalOpen(true)}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors shadow-sm flex items-center gap-1"
              >
                Change
              </button>
            </div>
          </div>
        ) : !isFixedTemplatePage && (
          <div className="p-6 flex flex-col items-center justify-center text-center border-b border-slate-200 bg-slate-50 shrink-0">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
              <LayoutDashboard size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">No Template Selected</h3>
            <p className="text-sm text-slate-500 mb-4 max-w-xs">This page is currently blank. Select a template from the library to start building.</p>
            <button 
              onClick={() => setIsTemplateModalOpen(true)}
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
            >
              Choose Template
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
