import React, { useState, useEffect } from 'react';
import { EditorBlockHeader } from '../EditorLayout';
import { IconPickerInput } from './shared/IconPickerInput';
import { PhoneticInput } from '../PhoneticInput';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { useBlockHistory } from '../../hooks/useBlockHistory';
import { MediaLibraryPopup } from '../MediaLibraryPopup';

interface HeroFeatureListEditorProps {
  data: any;
  updateData: (data: any) => void;
  blockId: string;
  expandedSection?: string | null;
}

const HighlightsEditorItem = ({ index, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, isExpanded, onToggle }: any) => {
  const defaultItem = { title: { mr: '', en: '' }, desc: { mr: '', en: '' }, icon: '' };
  const itemHist = useBlockHistory(defaultItem, itemData, (newItemData: any) => onUpdateFull(index, newItemData));
  const currentItem = itemHist.value;


  const handleLocalUpdate = (key: string, value: any) => {
    const newItem = JSON.parse(JSON.stringify(itemHist.value));
    newItem[key] = value;
    itemHist.update(newItem);
  };

  return (
    <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-3">
      <EditorBlockHeader
        title={currentItem.title?.mr || currentItem.label?.mr || currentItem.name?.mr || currentItem.mr || `Item ${index + 1}`}
        isExpanded={isExpanded}
        onToggle={onToggle}
        history={itemHist}
        rightAction={
          <div className="flex items-center gap-1 border border-slate-200 rounded-md overflow-hidden bg-white shadow-sm">
            <button onClick={onMoveUp} disabled={isFirst} className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200"><ArrowUp size={14} /></button>
            <button onClick={onMoveDown} disabled={isLast} className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200"><ArrowDown size={14} /></button>
            <button onClick={onRemove} className="p-1.5 text-red-500 hover:bg-red-50 transition-colors"><Trash2 size={14} /></button>
          </div>
        }
      />
      {isExpanded && (
        <div className="p-4 space-y-4 bg-white border border-t-0 border-slate-200 rounded-b-lg">
          <IconPickerInput label="Icon" value={currentItem.icon || ''} onChange={(val) => handleLocalUpdate('icon', val)} />
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Title</label>
            <PhoneticInput value={currentItem.title?.mr || ''} onChange={(val) => handleLocalUpdate('title', { ...currentItem.title, mr: val })} onEnglishChange={(val) => handleLocalUpdate('title', { ...currentItem.title, en: val })} englishValue={currentItem.title?.en || ''} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Description</label>
            <PhoneticInput value={currentItem.desc?.mr || ''} onChange={(val) => handleLocalUpdate('desc', { ...currentItem.desc, mr: val })} onEnglishChange={(val) => handleLocalUpdate('desc', { ...currentItem.desc, en: val })} englishValue={currentItem.desc?.en || ''} multiline />
          </div>
        </div>
      )}
    </div>
  );
};

const ContentSectionsEditorItem = ({ index, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, isExpanded, onToggle }: any) => {
  const defaultItem = { image: '', imagePosition: '', title: { mr: '', en: '' }, description: { mr: '', en: '' } };
  const itemHist = useBlockHistory(defaultItem, itemData, (newItemData: any) => onUpdateFull(index, newItemData));
  const currentItem = itemHist.value;
  const [mediaOpen_image, setMediaOpen_image] = useState(false);

  const handleLocalUpdate = (key: string, value: any) => {
    const newItem = JSON.parse(JSON.stringify(itemHist.value));
    newItem[key] = value;
    itemHist.update(newItem);
  };

  return (
    <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-3">
      <EditorBlockHeader
        title={currentItem.title?.mr || currentItem.label?.mr || currentItem.name?.mr || currentItem.mr || `Item ${index + 1}`}
        isExpanded={isExpanded}
        onToggle={onToggle}
        history={itemHist}
        rightAction={
          <div className="flex items-center gap-1 border border-slate-200 rounded-md overflow-hidden bg-white shadow-sm">
            <button onClick={onMoveUp} disabled={isFirst} className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200"><ArrowUp size={14} /></button>
            <button onClick={onMoveDown} disabled={isLast} className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200"><ArrowDown size={14} /></button>
            <button onClick={onRemove} className="p-1.5 text-red-500 hover:bg-red-50 transition-colors"><Trash2 size={14} /></button>
          </div>
        }
      />
      {isExpanded && (
        <div className="p-4 space-y-4 bg-white border border-t-0 border-slate-200 rounded-b-lg">
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Image</label>
            <div
              className="w-full h-36 bg-slate-100 rounded-lg border border-slate-300 overflow-hidden relative group cursor-pointer"
              onClick={() => setMediaOpen_image(true)}
            >
              {currentItem.image ? (
                <img
                  src={currentItem.image.startsWith('http') ? currentItem.image : `http://localhost:5000${currentItem.image.startsWith('/') ? '' : '/'}${currentItem.image}`}
                  className="w-full h-full object-cover"
                  alt="Preview"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                  <span className="text-2xl mb-1">🖼</span>
                  <span className="text-xs">Click to select image</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xs font-medium">Change Image</span>
              </div>
            </div>
            <MediaLibraryPopup
              isOpen={mediaOpen_image}
              onClose={() => setMediaOpen_image(false)}
              onSelect={(url: string) => { handleLocalUpdate('image', url); setMediaOpen_image(false); }}
            />
          </div>
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Image Position</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleLocalUpdate('imagePosition', 'left')}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium border transition-colors ${currentItem.imagePosition === 'left' || !currentItem.imagePosition ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white text-slate-600 border-slate-300 hover:border-emerald-300'}`}
              >
                ◀ Left
              </button>
              <button
                type="button"
                onClick={() => handleLocalUpdate('imagePosition', 'right')}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium border transition-colors ${currentItem.imagePosition === 'right' ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white text-slate-600 border-slate-300 hover:border-emerald-300'}`}
              >
                Right ▶
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Title</label>
            <PhoneticInput value={currentItem.title?.mr || ''} onChange={(val) => handleLocalUpdate('title', { ...currentItem.title, mr: val })} onEnglishChange={(val) => handleLocalUpdate('title', { ...currentItem.title, en: val })} englishValue={currentItem.title?.en || ''} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Description</label>
            <PhoneticInput value={currentItem.description?.mr || ''} onChange={(val) => handleLocalUpdate('description', { ...currentItem.description, mr: val })} onEnglishChange={(val) => handleLocalUpdate('description', { ...currentItem.description, en: val })} englishValue={currentItem.description?.en || ''} multiline />
          </div>
        </div>
      )}
    </div>
  );
};

export const HeroFeatureListEditor: React.FC<HeroFeatureListEditorProps> = ({ data, updateData, blockId, expandedSection }) => {
  const [expandedItemIndex, setExpandedItemIndex] = useState<number>(0);
  const activeSection = (expandedSection || 'hero').replace('template_', '');

  const [expandedFixedBlocks, setExpandedFixedBlocks] = useState<Record<string, boolean>>({
    hero_content: true,
    motto_content: true,
    contactInfo_content: true,
    category_header: true,
    general_header: true,
    production_header: true,
    partnership_header: true,
    training_header: true,
    organization_header: true,
    [`${activeSection}_header`]: true
  });

  const toggleFixedBlock = (key: string) => {
    setExpandedFixedBlocks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    setExpandedItemIndex(0);
  }, [activeSection]);

  const [mediaOpen_heroImage, setMediaOpen_heroImage] = useState(false);

  const safeData = {
    ...data
  };

  const handleChange = (field: string, value: any) => {
    updateData({ ...safeData, [field]: value });
  };

  const defaultBadge = { title: { mr: 'शेती व पूरक व्यवसाय', en: 'Agriculture & Allied Activities' }, icon: 'Sprout' };

  const heroCombinedHist = useBlockHistory(
    { 
      hero: { title: { mr: '', en: '' }, description: { mr: '', en: '' }, heroImage: '' },
      badge: defaultBadge
    },
    { 
      hero: safeData.hero || {}, 
      badge: { ...defaultBadge, ...(safeData.sectionHeaders?.general || {}) }
    },
    (newVal: any) => {
      updateData({
        ...safeData,
        hero: newVal.hero,
        sectionHeaders: {
          ...safeData.sectionHeaders,
          general: newVal.badge
        }
      });
    }
  );

  const updateArrayItemFull = (field: string, index: number, newItemData: any) => {
    const newArray = [...(safeData[field] || [])];
    newArray[index] = newItemData;
    handleChange(field, newArray);
  };

  const removeArrayItem = (field: string, index: number) => {
    const arr = safeData[field] || [];
    handleChange(field, arr.filter((_: any, i: number) => i !== index));
    if (expandedItemIndex === index) setExpandedItemIndex(0);
  };

  const moveArrayItem = (field: string, index: number, direction: number) => {
    const arr = safeData[field] || [];
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
    const arr = safeData[field] || [];
    handleChange(field, [...arr, defaultItem]);
    setExpandedItemIndex(arr.length);
  };

  if (activeSection === 'hero') {
    return (
      <div className="pb-10 space-y-4">
        <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-3 shadow-sm">
          <EditorBlockHeader 
            title="Hero Content" 
            isExpanded={!!expandedFixedBlocks['hero_content']} 
            onToggle={() => toggleFixedBlock('hero_content')} 
            history={heroCombinedHist}
          />
          {!!expandedFixedBlocks['hero_content'] && (
            <div className="p-4 space-y-4 bg-white border-t border-slate-200 mt-2 rounded-b-lg">
              <div className="mb-6 p-4 border border-emerald-100 bg-emerald-50/50 rounded-lg space-y-4">
                <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">Badge Configuration</h4>
                <IconPickerInput 
                  label="Badge Icon" 
                  value={heroCombinedHist.value.badge.icon || ''} 
                  onChange={(val) => { const n = { ...heroCombinedHist.value, badge: { ...heroCombinedHist.value.badge, icon: val } }; heroCombinedHist.update(n); }} 
                />
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Badge Title</label>
                  <PhoneticInput 
                    value={heroCombinedHist.value.badge.title?.mr || ''} 
                    onChange={(val) => { const n = { ...heroCombinedHist.value, badge: { ...heroCombinedHist.value.badge, title: { ...heroCombinedHist.value.badge.title, mr: val } } }; heroCombinedHist.update(n); }} 
                    onEnglishChange={(val) => { const n = { ...heroCombinedHist.value, badge: { ...heroCombinedHist.value.badge, title: { ...heroCombinedHist.value.badge.title, en: val } } }; heroCombinedHist.update(n); }} 
                    englishValue={heroCombinedHist.value.badge.title?.en || ''} 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Title</label>
                <PhoneticInput value={heroCombinedHist.value.hero.title?.mr || ''} onChange={(val) => { const n = { ...heroCombinedHist.value, hero: { ...heroCombinedHist.value.hero, title: { ...heroCombinedHist.value.hero.title, mr: val } } }; heroCombinedHist.update(n); }} onEnglishChange={(val) => { const n = { ...heroCombinedHist.value, hero: { ...heroCombinedHist.value.hero, title: { ...heroCombinedHist.value.hero.title, en: val } } }; heroCombinedHist.update(n); }} englishValue={heroCombinedHist.value.hero.title?.en || ''} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Description</label>
                <PhoneticInput value={heroCombinedHist.value.hero.description?.mr || ''} onChange={(val) => { const n = { ...heroCombinedHist.value, hero: { ...heroCombinedHist.value.hero, description: { ...heroCombinedHist.value.hero.description, mr: val } } }; heroCombinedHist.update(n); }} onEnglishChange={(val) => { const n = { ...heroCombinedHist.value, hero: { ...heroCombinedHist.value.hero, description: { ...heroCombinedHist.value.hero.description, en: val } } }; heroCombinedHist.update(n); }} englishValue={heroCombinedHist.value.hero.description?.en || ''} multiline />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Hero Image</label>
                <div
                  className="w-full h-36 bg-slate-100 rounded-lg border border-slate-300 overflow-hidden relative group cursor-pointer"
                  onClick={() => setMediaOpen_heroImage(true)}
                >
                  {heroCombinedHist.value.hero.heroImage ? (
                    <img
                      src={heroCombinedHist.value.hero.heroImage.startsWith('http') ? heroCombinedHist.value.hero.heroImage : `http://localhost:5000${heroCombinedHist.value.hero.heroImage.startsWith('/') ? '' : '/'}${heroCombinedHist.value.hero.heroImage}`}
                      className="w-full h-full object-cover"
                      alt="Preview"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                      <span className="text-2xl mb-1">🖼</span>
                      <span className="text-xs">Click to select image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="text-white text-xs font-medium">Change Image</span>
                  </div>
                </div>
                <MediaLibraryPopup
                  isOpen={mediaOpen_heroImage}
                  onClose={() => setMediaOpen_heroImage(false)}
                  onSelect={(url: string) => { const n = { ...heroCombinedHist.value, hero: { ...heroCombinedHist.value.hero, heroImage: url } }; heroCombinedHist.update(n); setMediaOpen_heroImage(false); }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeSection === 'highlights') {
    return (
      <div className="pb-10 space-y-4">

        <div className="px-1 mb-2">
          <h3 className="text-sm font-bold text-slate-700">Highlights</h3>
          <p className="text-xs text-slate-500 mt-0.5">{(safeData.highlights || []).length} item(s)</p>
        </div>
        <div className="space-y-2">
          {(safeData.highlights || []).map((item: any, index: number) => (
            <HighlightsEditorItem
              key={`item-${index}`} index={index} itemData={item}
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
            <Plus size={16} /> Add Highlights Item
          </button>
        </div>
      </div>
    );
  }

  if (activeSection === 'contentSections') {
    return (
      <div className="pb-10 space-y-4">

        <div className="px-1 mb-2">
          <h3 className="text-sm font-bold text-slate-700">Content Sections</h3>
          <p className="text-xs text-slate-500 mt-0.5">{(safeData.contentSections || []).length} item(s)</p>
        </div>
        <div className="space-y-2">
          {(safeData.contentSections || []).map((item: any, index: number) => (
            <ContentSectionsEditorItem
              key={`item-${index}`} index={index} itemData={item}
              onUpdateFull={(i: number, newD: any) => updateArrayItemFull('contentSections', i, newD)}
              onRemove={() => removeArrayItem('contentSections', index)}
              onMoveUp={() => moveArrayItem('contentSections', index, -1)}
              onMoveDown={() => moveArrayItem('contentSections', index, 1)}
              isFirst={index === 0} isLast={index === (safeData.contentSections || []).length - 1}
              isExpanded={expandedItemIndex === index}
              onToggle={() => setExpandedItemIndex(expandedItemIndex === index ? -1 : index)}
            />
          ))}
          <button onClick={() => addArrayItem('contentSections', { image: '', imagePosition: '', title: { mr: '', en: '' }, description: { mr: '', en: '' } })} className="mt-4 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors w-full flex justify-center items-center gap-2">
            <Plus size={16} /> Add Content Sections Item
          </button>
        </div>
      </div>
    );
  }

  return <div className="p-4 text-center text-slate-500">Select a section to edit</div>;
};
