import React from 'react';
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

interface TemplateEditorRendererProps {
  blockId: string;
  initialData: any;
  layoutType: string;
  expandedSection?: string | null;
  onPreviewUpdate: (content: any) => void;
  menuItemData?: any;
}

export const TemplateEditorRenderer: React.FC<TemplateEditorRendererProps> = ({
  blockId,
  initialData,
  layoutType,
  expandedSection,
  onPreviewUpdate,
  menuItemData
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

  const updateData = (newData: any) => {
    setData(newData);
    updateHistoryState(newData);
  };

  const renderEditor = () => {
    switch (layoutType) {
      case 'BasicFeatureGrid':
        return <BasicFeatureGridEditor data={data} updateData={updateData} blockId={blockId} expandedSection={expandedSection} />;
      case 'CardsAndVerticalTimeline':
        return <CardsAndVerticalTimelineEditor data={data} updateData={updateData} blockId={blockId} expandedSection={expandedSection} />;
      case 'ContactInfoGrid':
        return <ContactInfoGridEditor data={data} updateData={updateData} blockId={blockId} expandedSection={expandedSection} />;
      case 'ContentWithAccordion':
        return <ContentWithAccordionEditor data={data} updateData={updateData} blockId={blockId} expandedSection={expandedSection} />;
      case 'ContentWithRightSidebar':
        return <ContentWithRightSidebarEditor data={data} updateData={updateData} blockId={blockId} expandedSection={expandedSection} />;
      case 'ContentWithTabs':
        return <ContentWithTabsEditor data={data} updateData={updateData} blockId={blockId} expandedSection={expandedSection} />;
      case 'HeroBannerWithArticles':
        return <HeroBannerWithArticlesEditor data={data} updateData={updateData} blockId={blockId} expandedSection={expandedSection} />;
      case 'HeroBannerWithBadges':
        return <HeroBannerWithBadgesEditor data={data} updateData={updateData} blockId={blockId} expandedSection={expandedSection} />;
      case 'HeroBannerWithMedia':
        return <HeroBannerWithMediaEditor data={data} updateData={updateData} blockId={blockId} expandedSection={expandedSection} />;
      case 'HeroWithMenuGrid':
        return <HeroWithMenuGridEditor data={data} updateData={updateData} blockId={blockId} expandedSection={expandedSection} />;
      case 'HeroWithPricingList':
        return <HeroWithPricingListEditor data={data} updateData={updateData} blockId={blockId} expandedSection={expandedSection} />;
      case 'HeroWithProcessGrid':
        return <HeroWithProcessGridEditor data={data} updateData={updateData} blockId={blockId} expandedSection={expandedSection} />;
      case 'IconsListWithTimeline':
        return <IconsListWithTimelineEditor data={data} updateData={updateData} blockId={blockId} expandedSection={expandedSection} />;
      case 'MinimalIconGrid':
        return <MinimalIconGridEditor data={data} updateData={updateData} blockId={blockId} expandedSection={expandedSection} />;
      case 'SideBySideListCards':
        return <SideBySideListCardsEditor data={data} updateData={updateData} blockId={blockId} expandedSection={expandedSection} />;
      case 'ThreeColServiceCards':
        return <ThreeColServiceCardsEditor data={data} updateData={updateData} blockId={blockId} expandedSection={expandedSection} />;
      case 'TwoColEventCards':
        return <TwoColEventCardsEditor data={data} updateData={updateData} blockId={blockId} expandedSection={expandedSection} />;
      case 'HeroFeaturesTimelineLayout':
        return <HeroFeaturesTimelineLayoutEditor data={data} updateData={updateData} blockId={blockId} expandedSection={expandedSection} />;
      case 'HeroStatsGrid':
        return <HeroStatsGridEditor data={data} updateData={updateData} blockId={blockId} expandedSection={expandedSection} />;
      case 'HeroThreeColGrid':
        return <HeroThreeColGridEditor data={data} updateData={updateData} blockId={blockId} expandedSection={expandedSection} />;
      case 'HeroSplitTimeline':
        return <HeroSplitTimelineEditor data={data} updateData={updateData} blockId={blockId} expandedSection={expandedSection} />;
      case 'HeroFeatureList':
        return <HeroFeatureListEditor data={data} updateData={updateData} blockId={blockId} expandedSection={expandedSection} />;
      default:
        return (
          <div className="p-4 bg-red-50 text-red-600 rounded-md">
            Unknown template type: {layoutType}
          </div>
        );
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
        onSave={handleSave}
        isSaveDisabled={!hasChanges}
        saveText={user?.role === 'MAKER' ? 'Send for Review' : 'Save & Publish'}
        saveIcon={user?.role === 'MAKER' ? <Send size={14} /> : <Save size={14} />}
      />
      {renderEditor()}
    </div>
  );
};
