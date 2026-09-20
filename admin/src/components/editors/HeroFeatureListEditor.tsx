import React, { useState } from 'react';
interface TemplateDEditorProps {
  data: any;
  updateData: (data: any) => void;
  blockId: string;
  expandedSection?: string | null;
}

import { GeneralSettingsBlock } from './shared/GeneralSettingsBlock';
import { PhoneticInput } from '../PhoneticInput';
import { ImagePlus, Plus, Trash2, ChevronDown, ChevronUp, ArrowUp, ArrowDown } from 'lucide-react';

import { EditorBlockHeader } from '../EditorLayout';
import { useBlockHistory } from '../../hooks/useBlockHistory';
import * as icons from 'lucide-react';
import { IconPicker } from '../IconPicker';
import { MediaLibraryPopup } from '../MediaLibraryPopup';

export const HighlightEditorItem = ({ index, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, isExpanded, onToggle }: any) => {
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
  const defaultHighlight = { title: { mr: '', en: '' }, desc: { mr: '', en: '' }, icon: '' };
  
  const itemHist = useBlockHistory(
    defaultHighlight,
    itemData,
    (newItemData) => {
      onUpdateFull(index, newItemData);
    }
  );

  const handleLocalUpdate = (key: string, value: any) => {
    const newItem = JSON.parse(JSON.stringify(itemHist.value));
    newItem[key] = value;
    itemHist.update(newItem);
  };

  const currentItem = itemHist.value;

  return (
    <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-3">
      <EditorBlockHeader
        title={currentItem.title?.mr || currentItem.title?.en || `Highlight ${index + 1}`}
        isExpanded={isExpanded}
        onToggle={onToggle}
        history={itemHist}
        rightAction={
          <div className="flex items-center gap-1 border border-slate-200 rounded-md overflow-hidden bg-white shadow-sm">
            <button onClick={onMoveUp} disabled={isFirst} className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200 transition-colors" title="Move Up"><ArrowUp size={14} /></button>
            <button onClick={onMoveDown} disabled={isLast} className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200 transition-colors" title="Move Down"><ArrowDown size={14} /></button>
            <button onClick={onRemove} className="p-1.5 text-red-500 hover:bg-red-50 disabled:opacity-30 transition-colors" title="Remove"><Trash2 size={14} /></button>
          </div>
        }
      />

      {isExpanded && (
        <div className="p-4 space-y-4 bg-white border border-t-0 border-slate-200 rounded-b-lg">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Title</label>
            <PhoneticInput
              value={currentItem.title?.mr || ''}
              onChange={(val) => handleLocalUpdate('title', { ...currentItem.title, mr: val })}
              onEnglishChange={(val) => handleLocalUpdate('title', { ...currentItem.title, en: val })}
              placeholder="e.g. Title"
              englishValue={currentItem.title?.en || ''}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Description</label>
            <PhoneticInput
              value={currentItem.desc?.mr || ''}
              onChange={(val) => handleLocalUpdate('desc', { ...currentItem.desc, mr: val })}
              onEnglishChange={(val) => handleLocalUpdate('desc', { ...currentItem.desc, en: val })}
              placeholder="e.g. Description..."
              englishValue={currentItem.desc?.en || ''}
              multiline={true}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Icon</label>
            <div className="flex flex-col gap-2 p-2 bg-white border border-slate-200 rounded-lg shadow-sm border-l-4 border-l-amber-500">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex items-center justify-center w-10 h-10 bg-slate-100 rounded-md border border-slate-200 text-blue-500 shrink-0">
                  {currentItem.icon && (icons as any)[currentItem.icon] ? 
                    React.createElement((icons as any)[currentItem.icon], { size: 20 }) : 
                    <icons.CheckCircle size={20} />
                  }
                </div>
                <button type="button" onClick={() => setIsIconPickerOpen(true)} className="px-3 py-1 bg-white border border-slate-300 text-slate-700 text-xs font-medium rounded hover:bg-slate-50">
                  Change Icon
                </button>
              </div>
              <IconPicker 
                isOpen={isIconPickerOpen} 
                onClose={() => setIsIconPickerOpen(false)} 
                selectedIcon={currentItem.icon}
                onSelect={(iconName) => handleLocalUpdate('icon', iconName)} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const SectionEditorItem = ({ index, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, isExpanded, onToggle }: any) => {
  const [isMediaPopupOpen, setIsMediaPopupOpen] = useState(false);
  const defaultSection = { title: { mr: '', en: '' }, description: { mr: '', en: '' }, image: '', imagePosition: 'left' };
  
  const itemHist = useBlockHistory(
    defaultSection,
    itemData,
    (newItemData) => onUpdateFull(index, newItemData)
  );

  const handleLocalUpdate = (key: string, value: any) => {
    const newItem = JSON.parse(JSON.stringify(itemHist.value));
    newItem[key] = value;
    itemHist.update(newItem);
  };

  const currentItem = itemHist.value;
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-3">
      <EditorBlockHeader
        title={currentItem.title?.mr || currentItem.title?.en || `Content Section ${index + 1}`}
        isExpanded={isExpanded}
        onToggle={onToggle}
        history={itemHist}
        rightAction={
          <div className="flex items-center gap-1 border border-slate-200 rounded-md overflow-hidden bg-white shadow-sm">
            <button onClick={onMoveUp} disabled={isFirst} className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200 transition-colors" title="Move Up"><ArrowUp size={14} /></button>
            <button onClick={onMoveDown} disabled={isLast} className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200 transition-colors" title="Move Down"><ArrowDown size={14} /></button>
            <button onClick={onRemove} className="p-1.5 text-red-500 hover:bg-red-50 disabled:opacity-30 transition-colors" title="Remove"><Trash2 size={14} /></button>
          </div>
        }
      />
      
      {isExpanded && (
        <div className="p-5 border-t border-slate-200 bg-white space-y-6">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Image</label>
            <div
              className="w-full h-40 bg-slate-100 rounded border border-slate-300 overflow-hidden relative group cursor-pointer mt-1"
              onClick={() => setIsMediaPopupOpen(true)}
            >
              {currentItem?.image ? (
                <img 
                  src={currentItem.image.startsWith('http') ? currentItem.image : `http://localhost:3000${currentItem.image.startsWith('/') ? '' : '/'}${currentItem.image}`} 
                  className="w-full h-full object-cover" 
                  alt="Section Image"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                  <ImagePlus size={24} className="mb-1" />
                  <span className="text-xs">No Image</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xs font-medium">Change Image</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Title</label>
              <PhoneticInput
                value={currentItem?.title?.mr || ''}
                onChange={(val) => handleLocalUpdate('title', { ...currentItem?.title, mr: val })}
                englishValue={currentItem?.title?.en || ''}
                onEnglishChange={(val) => handleLocalUpdate('title', { ...currentItem?.title, en: val })}
                placeholder="Section Title"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Description</label>
              <PhoneticInput
                value={currentItem?.description?.mr || ''}
                onChange={(val) => handleLocalUpdate('description', { ...currentItem?.description, mr: val })}
                englishValue={currentItem?.description?.en || ''}
                onEnglishChange={(val) => handleLocalUpdate('description', { ...currentItem?.description, en: val })}
                placeholder="Section Description"
                multiline={true}
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Image Position</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleLocalUpdate('imagePosition', 'left')}
                  className={`flex-1 py-2 rounded-md border text-sm font-medium ${currentItem?.imagePosition !== 'right' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                  Image on Left
                </button>
                <button
                  type="button"
                  onClick={() => handleLocalUpdate('imagePosition', 'right')}
                  className={`flex-1 py-2 rounded-md border text-sm font-medium ${currentItem?.imagePosition === 'right' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                  Image on Right
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <MediaLibraryPopup
        isOpen={isMediaPopupOpen}
        onClose={() => setIsMediaPopupOpen(false)}
        onSelect={(url) => {
          handleLocalUpdate('image', url);
          setIsMediaPopupOpen(false);
        }}
      />
    </div>
  );
};

export const HeroFeatureListEditor: React.FC<TemplateDEditorProps> = ({ data, updateData, blockId, expandedSection }) => {
  const [expandedItemIndex, setExpandedItemIndex] = useState<number>(0);
  const activeSection = expandedSection || 'general';

  const safeData = {
    title: { mr: '', en: '' },
    description: { mr: '', en: '' },
    heroImage: '',
    highlights: [],
    contentSections: [],
    ...data
  };

  const handleChange = (field: string, value: any) => {
    updateData({ ...safeData, [field]: value });
  };

  const updateArrayItemFull = (field: string, index: number, newItemData: any) => {
    const newArray = [...((safeData as any)[field] || [])];
    newArray[index] = newItemData;
    handleChange(field, newArray);
  };

  const removeArrayItem = (field: string, index: number) => {
    handleChange(field, ((safeData as any)[field] || []).filter((_: any, i: number) => i !== index));
    if (expandedItemIndex === index) setExpandedItemIndex(0);
  };

  const moveArrayItem = (field: string, index: number, direction: 1 | -1) => {
    const arr = (safeData as any)[field] || [];
    if (index + direction < 0 || index + direction >= arr.length) return;
    const newArray = [...arr];
    const temp = newArray[index];
    newArray[index] = newArray[index + direction];
    newArray[index + direction] = temp;
    handleChange(field, newArray);
    if (expandedItemIndex === index) setExpandedItemIndex(index + direction);
    else if (expandedItemIndex === index + direction) setExpandedItemIndex(index);
  };

  const addArrayItem = (field: string, defaultItem: any) => {
    const arr = (safeData as any)[field] || [];
    handleChange(field, [...arr, defaultItem]);
    setExpandedItemIndex(arr.length);
  };

  if (activeSection === 'general') {
    return (
      <div className="pb-10 space-y-4">
        <GeneralSettingsBlock
          title="General Settings"
          description="Main title, description, and hero image for the page."
          isExpanded={true}
          onToggle={() => {}}
          data={{ title: safeData.title, subtitle: {mr: '', en: ''}, description: safeData.description, image: safeData.heroImage }}
          onChange={(gData: any) => updateData({ ...safeData, title: gData.title, description: gData.description, heroImage: gData.image })}
        />
      </div>
    );
  }

  if (activeSection === 'highlights') {
    return (
      <div className="pb-10 space-y-2">
        {(safeData.highlights || []).map((highlight: any, index: number) => (
          <HighlightEditorItem
            key={`high-${index}`} index={index} itemData={highlight}
            onUpdateFull={(i: number, newD: any) => updateArrayItemFull('highlights', i, newD)}
            onRemove={() => removeArrayItem('highlights', index)}
            onMoveUp={() => moveArrayItem('highlights', index, -1)}
            onMoveDown={() => moveArrayItem('highlights', index, 1)}
            isFirst={index === 0} isLast={index === (safeData.highlights || []).length - 1}
            isExpanded={expandedItemIndex === index}
            onToggle={() => setExpandedItemIndex(expandedItemIndex === index ? -1 : index)}
          />
        ))}
        <button onClick={() => addArrayItem('highlights', { title: { mr: '', en: '' }, desc: { mr: '', en: '' }, icon: '' })} className="mt-4 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors w-full flex justify-center items-center gap-2">
          <Plus size={16} /> Add Highlight
        </button>
      </div>
    );
  }

  if (activeSection === 'contentSections' || activeSection === 'detailsSection' || activeSection === 'impactSection') {
    return (
      <div className="pb-10 space-y-2">
        {(safeData.contentSections || []).map((section: any, index: number) => (
          <SectionEditorItem
            key={`contentSec-${index}`} index={index} itemData={section}
            onUpdateFull={(i: number, newD: any) => updateArrayItemFull('contentSections', i, newD)}
            onRemove={() => removeArrayItem('contentSections', index)}
            onMoveUp={() => moveArrayItem('contentSections', index, -1)}
            onMoveDown={() => moveArrayItem('contentSections', index, 1)}
            isFirst={index === 0} isLast={index === (safeData.contentSections || []).length - 1}
            isExpanded={expandedItemIndex === index}
            onToggle={() => setExpandedItemIndex(expandedItemIndex === index ? -1 : index)}
          />
        ))}
        <button onClick={() => addArrayItem('contentSections', { title: { mr: '', en: '' }, description: { mr: '', en: '' }, image: '', imagePosition: 'left' })} className="mt-4 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors w-full flex justify-center items-center gap-2">
          <Plus size={16} /> Add Content Section
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 text-center text-slate-500">
      Select a section from the preview to edit its content.
    </div>
  );
};
