import React, { useState, useEffect } from 'react';
import { useBlockEditorState } from '../../hooks/useBlockEditorState';
import { useAuth } from '../../context/AuthContext';
import { EditorFormHeader } from '../EditorLayout';
import { Save, Send } from 'lucide-react';
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
}

export const TemplateEditorRenderer: React.FC<TemplateEditorRendererProps> = ({
  blockId,
  initialData,
  layoutType,
  expandedSection,
  onPreviewUpdate
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
        title="Edit Page Template"
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
