import React, { useState } from 'react';
import { GeneralSettingsBlock } from './shared/GeneralSettingsBlock';
import { EditorBlockHeader } from '../EditorLayout';
import { PhoneticInput } from '../PhoneticInput';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import * as icons from 'lucide-react';
import { MediaLibraryPopup } from '../MediaLibraryPopup';
import { useBlockHistory } from '../../hooks/useBlockHistory';
import { IconPicker } from '../IconPicker';

interface TemplateBEditorProps {
  data: any;
  updateData: (data: any) => void;
  blockId: string;
  expandedSection?: string | null;
}

const FeatureEditorItem = ({ index, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, isExpanded, onToggle }: any) => {
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
  const defaultFeature = { title: { mr: '', en: '' }, desc: { mr: '', en: '' }, icon: '' };
  const itemHist = useBlockHistory(defaultFeature, itemData, (newItemData) => onUpdateFull(index, newItemData));
  const currentItem = itemHist.value;

  const handleLocalUpdate = (key: string, value: any) => {
    const newItem = JSON.parse(JSON.stringify(itemHist.value));
    newItem[key] = value;
    itemHist.update(newItem);
  };

  return (
    <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-3">
      <EditorBlockHeader
        title={currentItem.title?.mr || `Feature ${index + 1}`}
        isExpanded={isExpanded}
        onToggle={onToggle}
        history={itemHist}
        rightAction={
          <div className="flex items-center gap-1 border border-slate-200 rounded-md overflow-hidden bg-white shadow-sm">
            <button onClick={onMoveUp} disabled={isFirst} className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200" title="Move Up"><ArrowUp size={14} /></button>
            <button onClick={onMoveDown} disabled={isLast} className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200" title="Move Down"><ArrowDown size={14} /></button>
            <button onClick={onRemove} className="p-1.5 text-red-500 hover:bg-red-50 transition-colors" title="Remove"><Trash2 size={14} /></button>
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
              placeholder="e.g. आरोग्य तपासणी"
              englishValue={currentItem.title?.en || ''}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Description</label>
            <PhoneticInput
              value={currentItem.desc?.mr || ''}
              onChange={(val) => handleLocalUpdate('desc', { ...currentItem.desc, mr: val })}
              onEnglishChange={(val) => handleLocalUpdate('desc', { ...currentItem.desc, en: val })}
              placeholder="e.g. सर्व कैद्यांची नियमित तपासणी"
              englishValue={currentItem.desc?.en || ''}
              multiline
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

const GalleryEditorItem = ({ index, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, isExpanded, onToggle }: any) => {
  const [isMediaPopupOpen, setIsMediaPopupOpen] = useState(false);
  const defaultGallery = { image: '', caption: { mr: '', en: '' } };
  const itemHist = useBlockHistory(defaultGallery, itemData, (newItemData) => onUpdateFull(index, newItemData));
  const currentItem = itemHist.value;

  const handleLocalUpdate = (key: string, value: any) => {
    const newItem = JSON.parse(JSON.stringify(itemHist.value));
    newItem[key] = value;
    itemHist.update(newItem);
  };

  return (
    <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-3">
      <EditorBlockHeader
        title={currentItem.caption?.mr || `Image ${index + 1}`}
        isExpanded={isExpanded}
        onToggle={onToggle}
        history={itemHist}
        rightAction={
          <div className="flex items-center gap-1 border border-slate-200 rounded-md overflow-hidden bg-white shadow-sm">
            <button onClick={onMoveUp} disabled={isFirst} className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200" title="Move Up"><ArrowUp size={14} /></button>
            <button onClick={onMoveDown} disabled={isLast} className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200" title="Move Down"><ArrowDown size={14} /></button>
            <button onClick={onRemove} className="p-1.5 text-red-500 hover:bg-red-50 transition-colors" title="Remove"><Trash2 size={14} /></button>
          </div>
        }
      />
      {isExpanded && (
        <div className="p-4 space-y-4 bg-white border border-t-0 border-slate-200 rounded-b-lg">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Image</label>
            <div
              className="w-32 h-24 bg-slate-200 rounded border border-slate-300 overflow-hidden relative group cursor-pointer mt-1"
              onClick={() => setIsMediaPopupOpen(true)}
            >
              {currentItem.image ? (
                <img 
                  src={currentItem.image} 
                  className="w-full h-full object-cover" 
                  alt="Preview"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                  <span className="text-[10px]">No Image</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xs font-medium">Change Image</span>
              </div>
            </div>
            <MediaLibraryPopup
              isOpen={isMediaPopupOpen}
              onClose={() => setIsMediaPopupOpen(false)}
              onSelect={(url) => { handleLocalUpdate('image', url); setIsMediaPopupOpen(false); }}
            />
          </div>
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Caption</label>
            <PhoneticInput
              value={currentItem.caption?.mr || ''}
              onChange={(val) => handleLocalUpdate('caption', { ...currentItem.caption, mr: val })}
              onEnglishChange={(val) => handleLocalUpdate('caption', { ...currentItem.caption, en: val })}
              placeholder="Caption"
              englishValue={currentItem.caption?.en || ''}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const TimingEditorItem = ({ index, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, isExpanded, onToggle }: any) => {
  const defaultTiming = { day: { mr: '', en: '' }, hours: { mr: '', en: '' } };
  const itemHist = useBlockHistory(defaultTiming, itemData, (newItemData) => onUpdateFull(index, newItemData));
  const currentItem = itemHist.value;

  const handleLocalUpdate = (key: string, value: any) => {
    const newItem = JSON.parse(JSON.stringify(itemHist.value));
    newItem[key] = value;
    itemHist.update(newItem);
  };

  return (
    <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-3">
      <EditorBlockHeader
        title={currentItem.day?.mr || `Timing ${index + 1}`}
        isExpanded={isExpanded}
        onToggle={onToggle}
        history={itemHist}
        rightAction={
          <div className="flex items-center gap-1 border border-slate-200 rounded-md overflow-hidden bg-white shadow-sm">
            <button onClick={onMoveUp} disabled={isFirst} className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200" title="Move Up"><ArrowUp size={14} /></button>
            <button onClick={onMoveDown} disabled={isLast} className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200" title="Move Down"><ArrowDown size={14} /></button>
            <button onClick={onRemove} className="p-1.5 text-red-500 hover:bg-red-50 transition-colors" title="Remove"><Trash2 size={14} /></button>
          </div>
        }
      />
      {isExpanded && (
        <div className="p-4 space-y-4 bg-white border border-t-0 border-slate-200 rounded-b-lg">
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Day/Period</label>
              <PhoneticInput
                value={currentItem.day?.mr || ''}
                onChange={(val) => handleLocalUpdate('day', { ...currentItem.day, mr: val })}
                onEnglishChange={(val) => handleLocalUpdate('day', { ...currentItem.day, en: val })}
                placeholder="e.g. सोमवार ते शुक्रवार"
                englishValue={currentItem.day?.en || ''}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Hours</label>
              <PhoneticInput
                value={currentItem.hours?.mr || currentItem.hours || ''}
                onChange={(val) => handleLocalUpdate('hours', { mr: val, en: currentItem.hours?.en || val })}
                onEnglishChange={(val) => handleLocalUpdate('hours', { ...currentItem.hours, en: val })}
                placeholder="e.g. 09:00 AM - 05:00 PM"
                englishValue={currentItem.hours?.en || currentItem.hours || ''}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const HeroStatsGridEditor: React.FC<TemplateBEditorProps> = ({ data, updateData, blockId, expandedSection }) => {
  const [expandedItemIndex, setExpandedItemIndex] = useState<number>(0);
  const activeSection = expandedSection || 'general';

  const safeData = {
    title: { mr: '', en: '' },
    subtitle: { mr: '', en: '' },
    description: { mr: '', en: '' },
    heroImage: '',
    features: [],
    gallery: [],
    timings: [],
    ...data
  };

  const handleChange = (field: string, value: any) => {
    updateData({ ...safeData, [field]: value });
  };

  const updateArrayItemFull = (field: 'features' | 'gallery' | 'timings', index: number, newItemData: any) => {
    const newArray = [...safeData[field]];
    newArray[index] = newItemData;
    handleChange(field, newArray);
  };

  const removeArrayItem = (field: 'features' | 'gallery' | 'timings', index: number) => {
    handleChange(field, safeData[field].filter((_: any, i: number) => i !== index));
    if (expandedItemIndex === index) setExpandedItemIndex(0);
  };

  const moveArrayItem = (field: 'features' | 'gallery' | 'timings', index: number, direction: 1 | -1) => {
    if (index + direction < 0 || index + direction >= safeData[field].length) return;
    const newArray = [...safeData[field]];
    const temp = newArray[index];
    newArray[index] = newArray[index + direction];
    newArray[index + direction] = temp;
    handleChange(field, newArray);
    if (expandedItemIndex === index) setExpandedItemIndex(index + direction);
    else if (expandedItemIndex === index + direction) setExpandedItemIndex(index);
  };

  const addArrayItem = (field: 'features' | 'gallery' | 'timings', defaultItem: any) => {
    handleChange(field, [...safeData[field], defaultItem]);
    setExpandedItemIndex(safeData[field].length);
  };

  if (activeSection === 'general') {
    return (
      <div className="pb-10 space-y-4">
        <div className="p-4 bg-white border border-slate-200 rounded-lg">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Section Title (Category)</label>
          <PhoneticInput
            value={safeData.labels?.category?.mr || 'दैनंदिन सुविधा'}
            onChange={(val) => updateData({ ...safeData, labels: { ...(safeData.labels || {}), category: { ...(safeData.labels?.category || {}), mr: val } } })}
            englishValue={safeData.labels?.category?.en || 'Daily Facilities'}
            onEnglishChange={(val) => updateData({ ...safeData, labels: { ...(safeData.labels || {}), category: { ...(safeData.labels?.category || {}), en: val } } })}
            placeholder="e.g. Daily Facilities"
          />
        </div>
        <GeneralSettingsBlock
          title="General Settings"
          description="Main title, subtitle, description, and hero image for the page."
          isExpanded={true}
          onToggle={() => {}}
          data={{ title: safeData.title, subtitle: safeData.subtitle, description: safeData.description, image: safeData.heroImage }}
          onChange={(gData: any) => updateData({ ...safeData, title: gData.title, subtitle: gData.subtitle, description: gData.description, heroImage: gData.image })}
        />
      </div>
    );
  }

  if (activeSection === 'features') {
    return (
      <div className="pb-10 space-y-4">
        <div className="p-4 bg-white border border-slate-200 rounded-lg">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Section Title (Features & Facilities)</label>
          <PhoneticInput
            value={safeData.labels?.features?.mr || 'वैशिष्ट्ये आणि सुविधा'}
            onChange={(val) => handleChange('labels', { ...safeData.labels, features: { ...(safeData.labels?.features || {}), mr: val } })}
            englishValue={safeData.labels?.features?.en || 'Features & Facilities'}
            onEnglishChange={(val) => handleChange('labels', { ...safeData.labels, features: { ...(safeData.labels?.features || {}), en: val } })}
            placeholder="e.g. Features & Facilities"
          />
        </div>
        <div className="space-y-2">
        {(safeData.features || []).map((feature: any, index: number) => (
          <FeatureEditorItem
            key={`feat-${index}`} index={index} itemData={feature}
            onUpdateFull={(i: number, newD: any) => updateArrayItemFull('features', i, newD)}
            onRemove={() => removeArrayItem('features', index)}
            onMoveUp={() => moveArrayItem('features', index, -1)}
            onMoveDown={() => moveArrayItem('features', index, 1)}
            isFirst={index === 0} isLast={index === safeData.features.length - 1}
            isExpanded={expandedItemIndex === index}
            onToggle={() => setExpandedItemIndex(expandedItemIndex === index ? -1 : index)}
          />
        ))}
        <button onClick={() => addArrayItem('features', { title: { mr: '', en: '' }, desc: { mr: '', en: '' }, icon: '' })} className="mt-4 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors w-full flex justify-center items-center gap-2">
          <Plus size={16} /> Add Feature
        </button>
        </div>
      </div>
    );
  }

  if (activeSection === 'gallery') {
    return (
      <div className="pb-10 space-y-4">
        <div className="p-4 bg-white border border-slate-200 rounded-lg">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Section Title (Gallery)</label>
          <PhoneticInput
            value={safeData.labels?.gallery?.mr || 'छायाचित्रे'}
            onChange={(val) => handleChange('labels', { ...safeData.labels, gallery: { ...(safeData.labels?.gallery || {}), mr: val } })}
            englishValue={safeData.labels?.gallery?.en || 'Gallery'}
            onEnglishChange={(val) => handleChange('labels', { ...safeData.labels, gallery: { ...(safeData.labels?.gallery || {}), en: val } })}
            placeholder="e.g. Gallery"
          />
        </div>
        <div className="space-y-2">
        {(safeData.gallery || []).map((item: any, index: number) => (
          <GalleryEditorItem
            key={`gal-${index}`} index={index} itemData={item}
            onUpdateFull={(i: number, newD: any) => updateArrayItemFull('gallery', i, newD)}
            onRemove={() => removeArrayItem('gallery', index)}
            onMoveUp={() => moveArrayItem('gallery', index, -1)}
            onMoveDown={() => moveArrayItem('gallery', index, 1)}
            isFirst={index === 0} isLast={index === safeData.gallery.length - 1}
            isExpanded={expandedItemIndex === index}
            onToggle={() => setExpandedItemIndex(expandedItemIndex === index ? -1 : index)}
          />
        ))}
        <button onClick={() => addArrayItem('gallery', { image: '', caption: { mr: '', en: '' } })} className="mt-4 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors w-full flex justify-center items-center gap-2">
          <Plus size={16} /> Add Image
        </button>
        </div>
      </div>
    );
  }

  if (activeSection === 'timings') {
    return (
      <div className="pb-10 space-y-4">
        <div className="p-4 bg-white border border-slate-200 rounded-lg">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Section Title (Timings)</label>
          <PhoneticInput
            value={safeData.labels?.timings?.mr || 'वेळापत्रक'}
            onChange={(val) => handleChange('labels', { ...safeData.labels, timings: { ...(safeData.labels?.timings || {}), mr: val } })}
            englishValue={safeData.labels?.timings?.en || 'Timings'}
            onEnglishChange={(val) => handleChange('labels', { ...safeData.labels, timings: { ...(safeData.labels?.timings || {}), en: val } })}
            placeholder="e.g. Timings"
          />
        </div>
        <div className="space-y-2">
        {(safeData.timings || []).map((timing: any, index: number) => (
          <TimingEditorItem
            key={`time-${index}`} index={index} itemData={timing}
            onUpdateFull={(i: number, newD: any) => updateArrayItemFull('timings', i, newD)}
            onRemove={() => removeArrayItem('timings', index)}
            onMoveUp={() => moveArrayItem('timings', index, -1)}
            onMoveDown={() => moveArrayItem('timings', index, 1)}
            isFirst={index === 0} isLast={index === safeData.timings.length - 1}
            isExpanded={expandedItemIndex === index}
            onToggle={() => setExpandedItemIndex(expandedItemIndex === index ? -1 : index)}
          />
        ))}
        <button onClick={() => addArrayItem('timings', { day: { mr: '', en: '' }, hours: '' })} className="mt-4 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors w-full flex justify-center items-center gap-2">
          <Plus size={16} /> Add Timing
        </button>
        </div>
      </div>
    );
  }

  return <div className="p-4 text-center text-slate-500">Select a section to edit</div>;
};
