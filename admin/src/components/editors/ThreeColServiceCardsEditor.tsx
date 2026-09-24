import React, { useState } from 'react';
import { EditorBlockHeader } from '../EditorLayout';
import { PhoneticInput } from '../PhoneticInput';
import { IconPickerInput } from './shared/IconPickerInput';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { useBlockHistory } from '../../hooks/useBlockHistory';
import { MediaLibraryPopup } from '../MediaLibraryPopup';

interface ThreeColServiceCardsEditorProps {
  data: any;
  updateData: (data: any) => void;
  blockId: string;
  expandedSection?: string | null;
}

const FeatureEditorItem = ({ index, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, isExpanded, onToggle }: any) => {
  const defaultItem = { title: { mr: '', en: '' }, desc: { mr: '', en: '' }, icon: 'Droplets' };
  const itemHist = useBlockHistory(defaultItem, { ...itemData, icon: itemData?.icon || 'Droplets' }, (newItemData: any) => onUpdateFull(index, newItemData));
  const currentItem = itemHist.value;

  const handleLocalUpdate = (key: string, value: any) => {
    const newItem = JSON.parse(JSON.stringify(itemHist.value));
    newItem[key] = value;
    itemHist.update(newItem);
  };

  return (
    <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-3">
      <EditorBlockHeader
        title={currentItem.title?.mr || currentItem.title?.en || `Feature ${index + 1}`}
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

export const ThreeColServiceCardsEditor: React.FC<ThreeColServiceCardsEditorProps> = ({ data, updateData, blockId, expandedSection }) => {
  const [expandedItemIndex, setExpandedItemIndex] = useState<number>(0);
  const [expandedFixedBlocks, setExpandedFixedBlocks] = useState<Record<string, boolean>>({ hero_content: true });
  
  const [mediaOpen_heroImage1, setMediaOpen_heroImage1] = useState(false);
  const [mediaOpen_heroImage2, setMediaOpen_heroImage2] = useState(false);

  const activeSection = (expandedSection || 'hero').replace('template_', '');

  const safeData = {
    ...data
  };

  const handleChange = (field: string, value: any) => {
    updateData({ ...safeData, [field]: value });
  };

  const updateArrayItemFull = (field: string, index: number, newItemData: any) => {
    let arr = safeData[field] || [];
    if (!Array.isArray(arr)) arr = [arr].filter(Boolean);
    const newArray = [...arr];
    newArray[index] = newItemData;
    handleChange(field, newArray);
  };

  const removeArrayItem = (field: string, index: number) => {
    let arr = safeData[field] || [];
    if (!Array.isArray(arr)) arr = [arr].filter(Boolean);
    handleChange(field, arr.filter((_: any, i: number) => i !== index));
    if (expandedItemIndex === index) setExpandedItemIndex(0);
  };

  const moveArrayItem = (field: string, index: number, direction: number) => {
    let arr = safeData[field] || [];
    if (!Array.isArray(arr)) arr = [arr].filter(Boolean);
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
    let arr = safeData[field] || [];
    if (!Array.isArray(arr)) arr = [arr].filter(Boolean);
    handleChange(field, [...arr, defaultItem]);
    setExpandedItemIndex(arr.length);
  };

  const toggleFixedBlock = (blockName: string) => {
    setExpandedFixedBlocks(prev => ({ ...prev, [blockName]: !prev[blockName] }));
  };

  // Pre-seed gallery from legacy hero images if missing
  if (!safeData.gallery && (safeData.heroImage1 || safeData.heroImage2 || safeData.hero?.heroImage1 || safeData.hero?.heroImage2)) {
    safeData.gallery = [safeData.heroImage1 || safeData.hero?.heroImage1, safeData.heroImage2 || safeData.hero?.heroImage2].filter(Boolean);
  }

  const heroHist = useBlockHistory(
    {
      icon: 'Wind',
      title: { mr: '', en: '' },
      subtitle: { mr: '', en: '' },
      description: { mr: '', en: '' }
    },
    {
      icon: safeData.hero?.icon || 'Wind',
      title: safeData.hero?.title || safeData.title || { mr: '', en: '' },
      subtitle: safeData.hero?.subtitle || safeData.subtitle || { mr: '', en: '' },
      description: safeData.hero?.description || safeData.description || { mr: '', en: '' }
    },
    (newHero: any) => {
      handleChange('hero', {
        ...safeData.hero,
        icon: newHero.icon,
        title: newHero.title,
        subtitle: newHero.subtitle,
        description: newHero.description
      });
    }
  );
  const currentHero = heroHist.value;
  const updateHero = (key: string, value: any) => {
    heroHist.update({ ...currentHero, [key]: value });
  };


  if (activeSection === 'hero') {
    return (
      <div className="pb-10 space-y-4">
        <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-3 shadow-sm">
          <EditorBlockHeader 
            title="Hero Configuration" 
            isExpanded={!!expandedFixedBlocks['hero_content']} 
            onToggle={() => toggleFixedBlock('hero_content')} 
            history={heroHist}
          />
          {!!expandedFixedBlocks['hero_content'] && (
            <div className="p-4 space-y-4 bg-white border-t border-slate-200 mt-2 rounded-b-lg">
              <IconPickerInput 
                label="Hero Icon" 
                value={currentHero.icon || ''} 
                onChange={(val) => updateHero('icon', val)} 
              />
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Title</label>
                <PhoneticInput 
                  value={currentHero.title?.mr || ''} 
                  onChange={(val) => updateHero('title', { ...currentHero.title, mr: val })} 
                  onEnglishChange={(val) => updateHero('title', { ...currentHero.title, en: val })} 
                  englishValue={currentHero.title?.en || ''} 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Subtitle</label>
                <PhoneticInput 
                  value={currentHero.subtitle?.mr || ''} 
                  onChange={(val) => updateHero('subtitle', { ...currentHero.subtitle, mr: val })} 
                  onEnglishChange={(val) => updateHero('subtitle', { ...currentHero.subtitle, en: val })} 
                  englishValue={currentHero.subtitle?.en || ''} 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Description</label>
                <PhoneticInput 
                  value={currentHero.description?.mr || ''} 
                  onChange={(val) => updateHero('description', { ...currentHero.description, mr: val })} 
                  onEnglishChange={(val) => updateHero('description', { ...currentHero.description, en: val })} 
                  englishValue={currentHero.description?.en || ''} 
                  multiline
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeSection === 'gallery') {
    const galleryArray = Array.isArray(safeData.gallery) ? safeData.gallery : [];
    
    return (
      <div className="pb-10 space-y-4">
        <div className="space-y-4">
        {galleryArray.map((imgUrl: string, index: number) => (
          <div key={`gallery-${index}`} className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3 relative">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-500 uppercase">Image {index + 1}</span>
              <div className="flex gap-1">
                <button onClick={() => moveArrayItem('gallery', index, -1)} disabled={index === 0} className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30"><ArrowUp size={14} /></button>
                <button onClick={() => moveArrayItem('gallery', index, 1)} disabled={index === galleryArray.length - 1} className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30"><ArrowDown size={14} /></button>
                <button onClick={() => removeArrayItem('gallery', index)} className="p-1 text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
              </div>
            </div>
            
            <div
              className="w-full h-36 bg-white rounded-lg border border-slate-300 overflow-hidden relative group cursor-pointer"
              onClick={() => {
                // We'll reuse mediaOpen_heroImage1 for generic array editing hack
                setExpandedItemIndex(index);
                setMediaOpen_heroImage1(true);
              }}
            >
              {imgUrl ? (
                <>
                  <img src={imgUrl.startsWith('http') ? imgUrl : `http://localhost:5000${imgUrl.startsWith('/') ? '' : '/'}${imgUrl}`} className="w-full h-full object-cover" alt="Preview" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-sm font-medium">Click to change</span>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50">
                  <span className="text-2xl mb-1">🖼</span>
                  <span className="text-xs">Click to select</span>
                </div>
              )}
            </div>
          </div>
        ))}
        <MediaLibraryPopup
          isOpen={mediaOpen_heroImage1}
          onClose={() => setMediaOpen_heroImage1(false)}
          onSelect={(url: string) => { 
            updateArrayItemFull('gallery', expandedItemIndex, url); 
            setMediaOpen_heroImage1(false); 
          }}
        />
        <button onClick={() => addArrayItem('gallery', '')} className="mt-4 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-colors w-full flex justify-center items-center gap-2">
          <Plus size={16} /> Add Image
        </button>
        </div>
      </div>
    );
  }

  if (activeSection === 'features') {
    const featuresArray = Array.isArray(safeData.features) ? safeData.features : (safeData.serviceCards ? safeData.serviceCards : []);
    
    return (
      <div className="pb-10 space-y-4">
        <div className="space-y-2">
        {featuresArray.map((item: any, index: number) => (
          <FeatureEditorItem
            key={`item-${index}`} index={index} itemData={item}
            onUpdateFull={(i: number, newD: any) => updateArrayItemFull('features', i, newD)}
            onRemove={() => removeArrayItem('features', index)}
            onMoveUp={() => moveArrayItem('features', index, -1)}
            onMoveDown={() => moveArrayItem('features', index, 1)}
            isFirst={index === 0} isLast={index === featuresArray.length - 1}
            isExpanded={expandedItemIndex === index}
            onToggle={() => setExpandedItemIndex(expandedItemIndex === index ? -1 : index)}
          />
        ))}
        <button onClick={() => addArrayItem('features', { title: { mr: '', en: '' }, desc: { mr: '', en: '' }, icon: 'Droplets' })} className="mt-4 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors w-full flex justify-center items-center gap-2">
          <Plus size={16} /> Add Feature
        </button>
        </div>
      </div>
    );
  }

  return <div className="p-4 text-center text-slate-500">Select a section to edit</div>;
};
