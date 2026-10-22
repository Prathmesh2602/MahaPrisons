import React, { useState, useEffect } from 'react';
import { useBlockEditorState } from '../../hooks/useBlockEditorState';
import { useAuth } from '../../context/AuthContext';
import { EditorFormHeader } from '../EditorLayout';
import { Save, Send } from 'lucide-react';
import { BasicFeatureGridEditor } from './BasicFeatureGridEditor';
import { CardsAndVerticalTimelineEditor } from './CardsAndVerticalTimelineEditor';
import { ContactInfoGridEditor } from './ContactInfoGridEditor';
import { ContentWithAccordionEditor } from './ContentWithAccordionEditor';
import { ContentWithRightSidebarEditor } from './ContentWithRightSidebarEditor';
import { ContentWithTabsEditor } from './ContentWithTabsEditor';
import { HeroBannerWithArticlesEditor } from './HeroBannerWithArticlesEditor';
import { HeroBannerWithBadgesEditor } from './HeroBannerWithBadgesEditor';
import { HeroBannerWithMediaEditor } from './HeroBannerWithMediaEditor';
import { HeroWithMenuGridEditor } from './HeroWithMenuGridEditor';
import { HeroWithPricingListEditor } from './HeroWithPricingListEditor';
import { HeroWithProcessGridEditor } from './HeroWithProcessGridEditor';
import { IconsListWithTimelineEditor } from './IconsListWithTimelineEditor';
import { MinimalIconGridEditor } from './MinimalIconGridEditor';
import { SideBySideListCardsEditor } from './SideBySideListCardsEditor';
import { ThreeColServiceCardsEditor } from './ThreeColServiceCardsEditor';
import { TwoColEventCardsEditor } from './TwoColEventCardsEditor';
import { HeroFeaturesTimelineLayoutEditor } from './HeroFeaturesTimelineLayoutEditor';
import { HeroStatsGridEditor } from './HeroStatsGridEditor';
import { HeroThreeColGridEditor } from './HeroThreeColGridEditor';
import { HeroSplitTimelineEditor } from './HeroSplitTimelineEditor';
import { HeroFeatureListEditor } from './HeroFeatureListEditor';
import { GalleryLayoutEditor } from './GalleryLayoutEditor';
import { ProductsLayoutEditor } from './ProductsLayoutEditor';
import ContactUsLayoutEditor from './ContactUsLayoutEditor';

export interface TemplateSectionInfo {
  id: string;
  label: string;
  labelMr?: string;
}

export const TEMPLATE_SECTIONS: Record<string, TemplateSectionInfo[]> = {
  BasicFeatureGrid: [
    { id: 'hero', label: 'Header Banner', labelMr: 'हेडर बॅनर' },
    { id: 'description', label: 'Main Content', labelMr: 'मुख्य मजकूर' },
    { id: 'keyFunctions', label: 'Key Features', labelMr: 'प्रमुख वैशिष्ट्ये' },
    { id: 'stats', label: 'Stats Widget', labelMr: 'आकडेवारी' },
    { id: 'contactInfo', label: 'Contact Details', labelMr: 'संपर्क तपशील' },
  ],
  CardsAndVerticalTimeline: [
    { id: 'hero', label: 'Header Banner', labelMr: 'हेडर बॅनर' },
    { id: 'description', label: 'Description', labelMr: 'वर्णन' },
    { id: 'keyFunctions', label: 'Timeline Items', labelMr: 'टाइमलाइन घटक' },
    { id: 'stats', label: 'Statistics', labelMr: 'आकडेवारी' },
    { id: 'contactInfo', label: 'Contact Details', labelMr: 'संपर्क तपशील' },
  ],
  HeroFeaturesTimelineLayout: [
    { id: 'hero', label: 'Hero Banner', labelMr: 'हिरो बॅनर' },
    { id: 'stats', label: 'Stats Widget', labelMr: 'आकडेवारी' },
    { id: 'keyFunctions', label: 'Key Functions', labelMr: 'प्रमुख कार्ये' },
    { id: 'contactInfo', label: 'Contact Details', labelMr: 'संपर्क तपशील' },
  ],
  HeroStatsGrid: [
    { id: 'hero', label: 'Hero Content', labelMr: 'हिरो मजकूर' },
    { id: 'features', label: 'Features Grid', labelMr: 'वैशिष्ट्ये' },
    { id: 'gallery', label: 'Photo Gallery', labelMr: 'छायाचित्रे' },
    { id: 'timings', label: 'Timings', labelMr: 'वेळापत्रक' },
  ],
  HeroThreeColGrid: [
    { id: 'hero', label: 'Hero Content', labelMr: 'हिरो मजकूर' },
    { id: 'productionStats', label: 'Production Stats', labelMr: 'उत्पादन आकडेवारी' },
    { id: 'activeProjects', label: 'Active Projects', labelMr: 'सक्रिय प्रकल्प' },
    { id: 'impactStatement', label: 'Impact Statement', labelMr: 'सामाजिक प्रभाव' },
  ],
  HeroSplitTimeline: [
    { id: 'hero', label: 'Hero Content', labelMr: 'हिरो मजकूर' },
    { id: 'coreProtocols', label: 'Core Protocols', labelMr: 'प्रमुख नियम' },
    { id: 'infrastructure', label: 'Infrastructure', labelMr: 'पायाभूत सुविधा' },
  ],
  HeroFeatureList: [
    { id: 'hero', label: 'Hero Banner', labelMr: 'हिरो बॅनर' },
    { id: 'highlights', label: 'Highlights', labelMr: 'ठळक वैशिष्ट्ये' },
    { id: 'contentSections', label: 'Content Sections', labelMr: 'मजकूर विभाग' },
  ],
  ContactInfoGrid: [
    { id: 'hero', label: 'Header Banner', labelMr: 'हेडर बॅनर' },
    { id: 'description', label: 'Description', labelMr: 'वर्णन' },
    { id: 'stats', label: 'Stats Widget', labelMr: 'आकडेवारी' },
    { id: 'keyFunctions', label: 'Functions', labelMr: 'कार्ये' },
    { id: 'contactInfo', label: 'Contact Details', labelMr: 'संपर्क तपशील' },
  ],
  ContentWithRightSidebar: [
    { id: 'hero', label: 'Header Banner', labelMr: 'हेडर बॅनर' },
    { id: 'description', label: 'Feature & Quote', labelMr: 'वैशिष्ट्य आणि विचार' },
    { id: 'keyFunctions', label: 'Key Functions', labelMr: 'प्रमुख कार्ये' },
    { id: 'sidebar', label: 'Sidebar (Stats & Contact)', labelMr: 'साइडबार' },
  ],
  ContentWithTabs: [
    { id: 'hero', label: 'Header & Overview', labelMr: 'हेडर आणि सारांश' },
    { id: 'keyFunctions', label: 'Tabbed Sections', labelMr: 'टॅब विभाग' },
    { id: 'stats', label: 'Stats Grid', labelMr: 'आकडेवारी' },
    { id: 'contactInfo', label: 'Contact Footer', labelMr: 'संपर्क' },
  ],
  ContentWithAccordion: [
    { id: 'hero', label: 'Header & Overview', labelMr: 'हेडर आणि सारांश' },
    { id: 'keyFunctions', label: 'Accordion Q&A', labelMr: 'प्रश्नोत्तरे' },
    { id: 'stats', label: 'Stats Widget', labelMr: 'आकडेवारी' },
    { id: 'contactInfo', label: 'Contact Details', labelMr: 'संपर्क तपशील' },
  ],
  HeroBannerWithArticles: [
    { id: 'hero', label: 'Hero Banner', labelMr: 'हिरो बॅनर' },
    { id: 'keyFunctions', label: 'Articles List', labelMr: 'लेख यादी' },
    { id: 'stats', label: 'Stats Widget', labelMr: 'आकडेवारी' },
    { id: 'contactInfo', label: 'Contact Details', labelMr: 'संपर्क तपशील' },
  ],
  HeroBannerWithBadges: [
    { id: 'hero', label: 'Hero Banner', labelMr: 'हिरो बॅनर' },
    { id: 'stats', label: 'Badges & Stats', labelMr: 'बॅज आणि आकडेवारी' },
    { id: 'keyFunctions', label: 'Key Features', labelMr: 'प्रमुख वैशिष्ट्ये' },
    { id: 'contactInfo', label: 'Contact Details', labelMr: 'संपर्क तपशील' },
  ],
  HeroBannerWithMedia: [
    { id: 'hero', label: 'Hero Banner', labelMr: 'हिरो बॅनर' },
    { id: 'stats', label: 'Stats Widget', labelMr: 'आकडेवारी' },
    { id: 'keyFunctions', label: 'Features', labelMr: 'वैशिष्ट्ये' },
    { id: 'contactInfo', label: 'Contact Details', labelMr: 'संपर्क तपशील' },
  ],
  HeroWithMenuGrid: [
    { id: 'hero', label: 'Hero Content', labelMr: 'हिरो मजकूर' },
    { id: 'about', label: 'Intro & About', labelMr: 'परिचय आणि माहिती' },
    { id: 'menuHighlights', label: 'Menu Highlights', labelMr: 'मेनू ठळक' },
  ],
  HeroWithPricingList: [
    { id: 'hero', label: 'Hero Content', labelMr: 'हिरो मजकूर' },
    { id: 'services', label: 'Services', labelMr: 'सेवा' },
    { id: 'impact', label: 'Impact', labelMr: 'प्रभाव' },
  ],
  HeroWithProcessGrid: [
    { id: 'hero', label: 'Hero Content', labelMr: 'हिरो मजकूर' },
    { id: 'stats', label: 'Process Stats', labelMr: 'प्रक्रिया आकडेवारी' },
    { id: 'technicalFocus', label: 'Technical Focus', labelMr: 'तांत्रिक भर' },
  ],
  IconsListWithTimeline: [
    { id: 'hero', label: 'Hero Banner', labelMr: 'हिरो बॅनर' },
    { id: 'stats', label: 'Stats Widget', labelMr: 'आकडेवारी' },
    { id: 'keyFunctions', label: 'Key Functions', labelMr: 'प्रमुख कार्ये' },
    { id: 'contactInfo', label: 'Contact Details', labelMr: 'संपर्क तपशील' },
  ],
  MinimalIconGrid: [
    { id: 'hero', label: 'Hero Banner', labelMr: 'हिरो बॅनर' },
    { id: 'stats', label: 'Stats Widget', labelMr: 'आकडेवारी' },
    { id: 'keyFunctions', label: 'Key Functions', labelMr: 'प्रमुख कार्ये' },
    { id: 'contactInfo', label: 'Contact Details', labelMr: 'संपर्क तपशील' },
  ],
  SideBySideListCards: [
    { id: 'hero', label: 'Hero Banner', labelMr: 'हिरो बॅनर' },
    { id: 'stats', label: 'Stats Widget', labelMr: 'आकडेवारी' },
    { id: 'keyFunctions', label: 'Key Functions', labelMr: 'प्रमुख कार्ये' },
    { id: 'contactInfo', label: 'Contact Details', labelMr: 'संपर्क तपशील' },
  ],
  ThreeColServiceCards: [
    { id: 'hero', label: 'Hero Content', labelMr: 'हिरो मजकूर' },
    { id: 'features', label: 'Features List', labelMr: 'वैशिष्ट्ये यादी' },
    { id: 'gallery', label: 'Showcase Images', labelMr: 'छायाचित्रे गॅलरी' },
  ],
  TwoColEventCards: [
    { id: 'hero', label: 'Hero Content', labelMr: 'हिरो मजकूर' },
    { id: 'about', label: 'Intro & Description', labelMr: 'परिचय आणि वर्णन' },
    { id: 'venueFeatures', label: 'Venue Features', labelMr: 'ठिकाण वैशिष्ट्ये' },
  ],
  GalleryLayout: [
    { id: 'hero', label: 'Hero Content', labelMr: 'हिरो मजकूर' },
    { id: 'gallery', label: 'Photo Gallery', labelMr: 'छायाचित्रे' },
  ],
  ProductsLayout: [
    { id: 'hero', label: 'Hero Content', labelMr: 'हिरो मजकूर' },
    { id: 'products', label: 'Products List', labelMr: 'उत्पादने यादी' },
  ],
  ContactUsLayout: [
    { id: 'hero', label: 'Hero & Details', labelMr: 'माहिती व संपर्क' },
  ]
};

interface TemplateEditorRendererProps {
  blockId: string;
  initialData: any;
  layoutType: string;
  expandedSection?: string | null;
  onPreviewUpdate: (content: any) => void;
  menuItemData?: any;
  isDraftLayout?: boolean;
  onSaved?: () => void;
}

export const TemplateEditorRenderer: React.FC<TemplateEditorRendererProps> = ({
  blockId,
  initialData,
  layoutType,
  expandedSection,
  onPreviewUpdate,
  menuItemData,
  isDraftLayout,
  onSaved
}) => {
  const { user } = useAuth();
  const { 
    data, 
    setData, 
    historyIndex,
    historyLength,
    updateHistoryState,
    handleUndo,
    handleRedo,
    handleReset,
    handleSave,
    hasChanges 
  } = useBlockEditorState(blockId, initialData, onPreviewUpdate);

  const sections = TEMPLATE_SECTIONS[layoutType] || [{ id: 'hero', label: 'Content' }];
  const [activeSection, setActiveSection] = useState<string>(() => {
    if (expandedSection) return expandedSection.replace('template_', '');
    return sections[0]?.id || 'hero';
  });

  // Sync section when user clicks a block in the live preview iframe
  useEffect(() => {
    if (expandedSection) {
      const clean = expandedSection.replace('template_', '');
      setActiveSection(clean);
    }
  }, [expandedSection]);

  const handleSelectSection = (sectionId: string) => {
    setActiveSection(sectionId);
    // Tell parent to scroll live preview to this block
    window.postMessage({ type: 'EDITOR_SCROLL_TO_BLOCK', blockType: `template_${sectionId}` }, '*');
  };

  const updateData = (newDataOrFn: any) => {
    setData((prev: any) => {
      const base = typeof newDataOrFn === 'function' ? newDataOrFn(prev) : { ...prev, ...newDataOrFn };
      const merged = { ...base };
      
      // Keep hero and top-level synchronized!
      if (merged.hero) {
        if (merged.hero.title !== undefined) merged.title = merged.hero.title;
        if (merged.hero.subtitle !== undefined) merged.subtitle = merged.hero.subtitle;
        if (merged.hero.description !== undefined) merged.description = merged.hero.description;
        if (merged.hero.heroImage !== undefined) merged.image = merged.hero.heroImage;
      } else if (merged.title || merged.subtitle || merged.description || merged.image) {
        merged.hero = {
          title: merged.title || { mr: '', en: '' },
          subtitle: merged.subtitle || { mr: '', en: '' },
          description: merged.description || { mr: '', en: '' },
          heroImage: merged.image || '',
        };
      }
      return merged;
    });
  };

  const renderEditor = () => {
    switch (layoutType) {
      case 'BasicFeatureGrid':
        return <BasicFeatureGridEditor data={data} updateData={updateData} blockId={blockId} expandedSection={activeSection} />;
      case 'CardsAndVerticalTimeline':
        return <CardsAndVerticalTimelineEditor data={data} updateData={updateData} blockId={blockId} expandedSection={activeSection} />;
      case 'ContactInfoGrid':
        return <ContactInfoGridEditor data={data} updateData={updateData} blockId={blockId} expandedSection={activeSection} />;
      case 'ContentWithAccordion':
        return <ContentWithAccordionEditor data={data} updateData={updateData} blockId={blockId} expandedSection={activeSection} />;
      case 'ContentWithRightSidebar':
        return <ContentWithRightSidebarEditor data={data} updateData={updateData} blockId={blockId} expandedSection={activeSection} />;
      case 'ContentWithTabs':
        return <ContentWithTabsEditor data={data} updateData={updateData} blockId={blockId} expandedSection={activeSection} />;
      case 'HeroBannerWithArticles':
        return <HeroBannerWithArticlesEditor data={data} updateData={updateData} blockId={blockId} expandedSection={activeSection} />;
      case 'HeroBannerWithBadges':
        return <HeroBannerWithBadgesEditor data={data} updateData={updateData} blockId={blockId} expandedSection={activeSection} />;
      case 'HeroBannerWithMedia':
        return <HeroBannerWithMediaEditor data={data} updateData={updateData} blockId={blockId} expandedSection={activeSection} />;
      case 'HeroWithMenuGrid':
        return <HeroWithMenuGridEditor data={data} updateData={updateData} blockId={blockId} expandedSection={activeSection} />;
      case 'HeroWithPricingList':
        return <HeroWithPricingListEditor data={data} updateData={updateData} blockId={blockId} expandedSection={activeSection} />;
      case 'HeroWithProcessGrid':
        return <HeroWithProcessGridEditor data={data} updateData={updateData} blockId={blockId} expandedSection={activeSection} />;
      case 'IconsListWithTimeline':
        return <IconsListWithTimelineEditor data={data} updateData={updateData} blockId={blockId} expandedSection={activeSection} />;
      case 'MinimalIconGrid':
        return <MinimalIconGridEditor data={data} updateData={updateData} blockId={blockId} expandedSection={activeSection} />;
      case 'SideBySideListCards':
        return <SideBySideListCardsEditor data={data} updateData={updateData} blockId={blockId} expandedSection={activeSection} />;
      case 'ThreeColServiceCards':
        return <ThreeColServiceCardsEditor data={data} updateData={updateData} blockId={blockId} expandedSection={activeSection} />;
      case 'TwoColEventCards':
        return <TwoColEventCardsEditor data={data} updateData={updateData} blockId={blockId} expandedSection={activeSection} />;
      case 'HeroFeaturesTimelineLayout':
        return <HeroFeaturesTimelineLayoutEditor data={data} updateData={updateData} blockId={blockId} expandedSection={activeSection} />;
      case 'HeroStatsGrid':
        return <HeroStatsGridEditor data={data} updateData={updateData} blockId={blockId} expandedSection={activeSection} />;
      case 'HeroThreeColGrid':
        return <HeroThreeColGridEditor data={data} updateData={updateData} blockId={blockId} expandedSection={activeSection} />;
      case 'HeroSplitTimeline':
        return <HeroSplitTimelineEditor data={data} updateData={updateData} blockId={blockId} expandedSection={activeSection} />;
      case 'HeroFeatureList':
        return <HeroFeatureListEditor data={data} updateData={updateData} blockId={blockId} expandedSection={activeSection} />;
      case 'GalleryLayout':
        return <GalleryLayoutEditor data={data} updateData={updateData} blockId={blockId} expandedSection={activeSection} />;
      case 'ProductsLayout':
        return <ProductsLayoutEditor data={data} updateData={updateData} blockId={blockId} expandedSection={activeSection} />;
      case 'ContactUsLayout':
        return <ContactUsLayoutEditor data={data} updateData={updateData} blockId={blockId} expandedSection={activeSection} />;
      default:
        return (
          <div className="p-4 bg-red-50 text-red-600 rounded-md">
            Unknown template type: {layoutType}
          </div>
        );
    }
  };

  const generateSummary = () => {
    let summary = `Updated ${layoutType}`;
    if (layoutType === 'GalleryLayout') {
      const oldLen = initialData?.gallery?.length || 0;
      const newLen = data?.gallery?.length || 0;
      if (newLen > oldLen) summary = `Added new image to Gallery`;
      else if (newLen < oldLen) summary = `Removed image from Gallery`;
      else {
        for (let i = 0; i < newLen; i++) {
          if (JSON.stringify(data.gallery[i]) !== JSON.stringify(initialData?.gallery?.[i])) {
             const rawTitle = data.gallery[i].title?.mr || data.gallery[i].title?.en || `Item ${i+1}`;
             const title = (rawTitle.includes('a?') || rawTitle.includes('??')) ? (data.gallery[i].title?.en || `Item ${i+1}`) : rawTitle;
             summary = `'${title}' img changed in Gallery page`;
             break;
          }
        }
      }
    }
    return summary;
  };

  const handleSaveWithSummary = async () => {
    const success = await handleSave(user?.role, generateSummary());
    if (success && onSaved) {
      onSaved();
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <EditorFormHeader
        className="sticky top-[-1px] z-20 bg-white/95 backdrop-blur pb-4 pt-3 -mx-3 px-2 -mt-3 border-b border-slate-200 shadow-[0_4px_6px_-6px_rgba(0,0,0,0.1)]"
        title={menuItemData ? `Edit ${menuItemData.label_en}` : "Edit Page Template"}
        onUndo={handleUndo}
        canUndo={historyIndex > 0}
        onRedo={handleRedo}
        canRedo={historyIndex < historyLength - 1}
        onReset={handleReset}
        onSave={handleSaveWithSummary}
        isSaveDisabled={!hasChanges && !isDraftLayout}
        saveText={user?.role === 'MAKER' ? 'Send for Review' : 'Save & Publish'}
        saveIcon={user?.role === 'MAKER' ? <Send size={14} /> : <Save size={14} />}
      />

      {/* Section Selector Tab Bar */}
      {sections.length > 1 && (
        <div className="flex flex-wrap gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 mb-2 sticky top-[48px] z-10 backdrop-blur shadow-xs">
          {sections.map((sec) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => handleSelectSection(sec.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                activeSection === sec.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              <span>{sec.label}</span>
            </button>
          ))}
        </div>
      )}

      {renderEditor()}
    </div>
  );
};
