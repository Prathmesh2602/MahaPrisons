import React, { useState, useEffect } from 'react';
import { EditorBlockHeader } from '../EditorLayout';
import { IconPickerInput } from './shared/IconPickerInput';
import { PhoneticInput } from '../PhoneticInput';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { useBlockHistory } from '../../hooks/useBlockHistory';
import { MediaLibraryPopup } from '../MediaLibraryPopup';

interface HeroStatsGridEditorProps {
  data: any;
  updateData: (data: any) => void;
  blockId: string;
  expandedSection?: string | null;
}

const FeaturesEditorItem = ({ index, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, isExpanded, onToggle }: any) => {
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

const GalleryEditorItem = ({ index, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, isExpanded, onToggle }: any) => {
  const defaultItem = { image: '', caption: { mr: '', en: '' } };
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
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Caption</label>
            <PhoneticInput value={currentItem.caption?.mr || ''} onChange={(val) => handleLocalUpdate('caption', { ...currentItem.caption, mr: val })} onEnglishChange={(val) => handleLocalUpdate('caption', { ...currentItem.caption, en: val })} englishValue={currentItem.caption?.en || ''} />
          </div>
        </div>
      )}
    </div>
  );
};

const TimingsEditorItem = ({ index, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, isExpanded, onToggle }: any) => {
  const defaultItem = { day: { mr: '', en: '' }, hours: { mr: '', en: '' } };
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
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Day</label>
            <PhoneticInput value={currentItem.day?.mr || ''} onChange={(val) => handleLocalUpdate('day', { ...currentItem.day, mr: val })} onEnglishChange={(val) => handleLocalUpdate('day', { ...currentItem.day, en: val })} englishValue={currentItem.day?.en || ''} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Hours</label>
            <PhoneticInput 
              value={typeof currentItem.hours === 'string' ? currentItem.hours : currentItem.hours?.mr || ''} 
              onChange={(val) => handleLocalUpdate('hours', { ...currentItem.hours, mr: val })} 
              onEnglishChange={(val) => handleLocalUpdate('hours', { ...currentItem.hours, en: val })} 
              englishValue={typeof currentItem.hours === 'string' ? currentItem.hours : currentItem.hours?.en || ''} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export const HeroStatsGridEditor: React.FC<HeroStatsGridEditorProps> = ({ data, updateData, blockId, expandedSection }) => {
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

  const heroContentHist = useBlockHistory(
    { title: { mr: '', en: '' }, subtitle: { mr: '', en: '' }, description: { mr: '', en: '' }, heroImage: '' },
    safeData.hero || {},
    (newVal: any) => handleChange('hero', newVal)
  );

  const heroBadgeHist = useBlockHistory(
    { title: { mr: '', en: '' }, icon: '' },
    safeData.sectionHeaders?.category || {},
    (newVal: any) => handleChange('sectionHeaders', { ...safeData.sectionHeaders, category: newVal })
  );

  const featuresHeaderHist = useBlockHistory(
    { title: { mr: '', en: '' }, icon: '' },
    safeData.sectionHeaders?.features || {},
    (newVal: any) => handleChange('sectionHeaders', { ...safeData.sectionHeaders, features: newVal })
  );

  const galleryHeaderHist = useBlockHistory(
    { title: { mr: '', en: '' }, icon: '' },
    safeData.sectionHeaders?.gallery || {},
    (newVal: any) => handleChange('sectionHeaders', { ...safeData.sectionHeaders, gallery: newVal })
  );

  const timingsHeaderHist = useBlockHistory(
    { title: { mr: '', en: '' }, icon: '' },
    safeData.sectionHeaders?.timings || {},
    (newVal: any) => handleChange('sectionHeaders', { ...safeData.sectionHeaders, timings: newVal })
  );

  const timingsNoteHist = useBlockHistory(
    { mr: '', en: '' },
    safeData.timingsNote || {},
    (newVal: any) => handleChange('timingsNote', newVal)
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
            history={heroContentHist}
          />
          {!!expandedFixedBlocks['hero_content'] && (
            <div className="p-4 space-y-4 bg-white border-t border-slate-200 mt-2 rounded-b-lg">
              <div className="p-3 bg-amber-50/50 border border-amber-100 rounded-lg space-y-4 mb-4">
                <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wide">Section Badge (Left)</h4>
                <IconPickerInput 
                  label="Badge Icon" 
                  value={heroBadgeHist.value.icon || ''} 
                  onChange={(val) => heroBadgeHist.update({ ...heroBadgeHist.value, icon: val })} 
                />
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Badge Title</label>
                  <PhoneticInput 
                    value={heroBadgeHist.value.title?.mr || ''} 
                    onChange={(val) => heroBadgeHist.update({ ...heroBadgeHist.value, title: { ...heroBadgeHist.value.title, mr: val } })} 
                    onEnglishChange={(val) => heroBadgeHist.update({ ...heroBadgeHist.value, title: { ...heroBadgeHist.value.title, en: val } })} 
                    englishValue={heroBadgeHist.value.title?.en || ''} 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Title</label>
                <PhoneticInput value={heroContentHist.value.title?.mr || ''} onChange={(val) => heroContentHist.update({ ...heroContentHist.value, title: { ...heroContentHist.value.title, mr: val } })} onEnglishChange={(val) => heroContentHist.update({ ...heroContentHist.value, title: { ...heroContentHist.value.title, en: val } })} englishValue={heroContentHist.value.title?.en || ''} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Subtitle</label>
                <PhoneticInput value={heroContentHist.value.subtitle?.mr || ''} onChange={(val) => heroContentHist.update({ ...heroContentHist.value, subtitle: { ...heroContentHist.value.subtitle, mr: val } })} onEnglishChange={(val) => heroContentHist.update({ ...heroContentHist.value, subtitle: { ...heroContentHist.value.subtitle, en: val } })} englishValue={heroContentHist.value.subtitle?.en || ''} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Description</label>
                <PhoneticInput value={heroContentHist.value.description?.mr || ''} onChange={(val) => heroContentHist.update({ ...heroContentHist.value, description: { ...heroContentHist.value.description, mr: val } })} onEnglishChange={(val) => heroContentHist.update({ ...heroContentHist.value, description: { ...heroContentHist.value.description, en: val } })} englishValue={heroContentHist.value.description?.en || ''} multiline />
              </div>
              
              <div className="pt-2 border-t border-slate-100">
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Hero Image (Right)</label>
                <div
                  className="w-full h-36 bg-slate-100 rounded-lg border border-slate-300 overflow-hidden relative group cursor-pointer"
                  onClick={() => setMediaOpen_heroImage(true)}
                >
                  {heroContentHist.value.heroImage ? (
                    <img
                      src={heroContentHist.value.heroImage.startsWith('http') ? heroContentHist.value.heroImage : `http://localhost:5000${heroContentHist.value.heroImage.startsWith('/') ? '' : '/'}${heroContentHist.value.heroImage}`}
                      className="w-full h-full object-cover"
                      alt="Preview"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                      <span className="text-2xl mb-1">🖼</span>
                      <span className="text-xs">Click to select image</span>
                    </div>
                  )}
                </div>
                <MediaLibraryPopup
                  isOpen={mediaOpen_heroImage}
                  onClose={() => setMediaOpen_heroImage(false)}
                  onSelect={(url: string) => { heroContentHist.update({ ...heroContentHist.value, heroImage: url }); setMediaOpen_heroImage(false); }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeSection === 'features') {
    return (
      <div className="pb-10 space-y-4">

        <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-4 shadow-sm">
          <EditorBlockHeader 
            title="Section Header Configuration (Optional)" 
            isExpanded={!!expandedFixedBlocks['features_header']} 
            onToggle={() => toggleFixedBlock('features_header')} 
            history={featuresHeaderHist}
          />
          {!!expandedFixedBlocks['features_header'] && (
            <div className="p-4 space-y-4 bg-white border-t border-slate-200 mt-2 rounded-b-lg">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Section Title</label>
                <PhoneticInput 
                  value={featuresHeaderHist.value.title?.mr || ''} 
                  onChange={(val) => featuresHeaderHist.update({ ...featuresHeaderHist.value, title: { ...featuresHeaderHist.value.title, mr: val } })} 
                  onEnglishChange={(val) => featuresHeaderHist.update({ ...featuresHeaderHist.value, title: { ...featuresHeaderHist.value.title, en: val } })} 
                  englishValue={featuresHeaderHist.value.title?.en || ''} 
                />
              </div>
              <IconPickerInput 
                label="Section Icon" 
                value={featuresHeaderHist.value.icon || ''} 
                onChange={(val) => featuresHeaderHist.update({ ...featuresHeaderHist.value, icon: val })} 
              />
            </div>
          )}
        </div>
        <div className="px-1 mb-2">
          <h3 className="text-sm font-bold text-slate-700">Features</h3>
          <p className="text-xs text-slate-500 mt-0.5">{(safeData.features || []).length} item(s)</p>
        </div>
        <div className="space-y-2">
          {(safeData.features || []).map((item: any, index: number) => (
            <FeaturesEditorItem
              key={`item-${index}`} index={index} itemData={item}
              onUpdateFull={(i: number, newD: any) => updateArrayItemFull('features', i, newD)}
              onRemove={() => removeArrayItem('features', index)}
              onMoveUp={() => moveArrayItem('features', index, -1)}
              onMoveDown={() => moveArrayItem('features', index, 1)}
              isFirst={index === 0} isLast={index === (safeData.features || []).length - 1}
              isExpanded={expandedItemIndex === index}
              onToggle={() => setExpandedItemIndex(expandedItemIndex === index ? -1 : index)}
            />
          ))}
          <button onClick={() => addArrayItem('features', { title: { mr: '', en: '' }, desc: { mr: '', en: '' }, icon: '' })} className="mt-4 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors w-full flex justify-center items-center gap-2">
            <Plus size={16} /> Add Features Item
          </button>
        </div>
      </div>
    );
  }

  if (activeSection === 'gallery') {
    return (
      <div className="pb-10 space-y-4">

        <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-4 shadow-sm">
          <EditorBlockHeader 
            title="Section Header Configuration (Optional)" 
            isExpanded={!!expandedFixedBlocks['gallery_header']} 
            onToggle={() => toggleFixedBlock('gallery_header')} 
            history={galleryHeaderHist}
          />
          {!!expandedFixedBlocks['gallery_header'] && (
            <div className="p-4 space-y-4 bg-white border-t border-slate-200 mt-2 rounded-b-lg">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Section Title</label>
                <PhoneticInput 
                  value={galleryHeaderHist.value.title?.mr || ''} 
                  onChange={(val) => galleryHeaderHist.update({ ...galleryHeaderHist.value, title: { ...galleryHeaderHist.value.title, mr: val } })} 
                  onEnglishChange={(val) => galleryHeaderHist.update({ ...galleryHeaderHist.value, title: { ...galleryHeaderHist.value.title, en: val } })} 
                  englishValue={galleryHeaderHist.value.title?.en || ''} 
                />
              </div>
              <IconPickerInput 
                label="Section Icon" 
                value={galleryHeaderHist.value.icon || ''} 
                onChange={(val) => galleryHeaderHist.update({ ...galleryHeaderHist.value, icon: val })} 
              />
            </div>
          )}
        </div>
        <div className="px-1 mb-2">
          <h3 className="text-sm font-bold text-slate-700">Gallery</h3>
          <p className="text-xs text-slate-500 mt-0.5">{(safeData.gallery || []).length} item(s)</p>
        </div>
        <div className="space-y-2">
          {(safeData.gallery || []).map((item: any, index: number) => (
            <GalleryEditorItem
              key={`item-${index}`} index={index} itemData={item}
              onUpdateFull={(i: number, newD: any) => updateArrayItemFull('gallery', i, newD)}
              onRemove={() => removeArrayItem('gallery', index)}
              onMoveUp={() => moveArrayItem('gallery', index, -1)}
              onMoveDown={() => moveArrayItem('gallery', index, 1)}
              isFirst={index === 0} isLast={index === (safeData.gallery || []).length - 1}
              isExpanded={expandedItemIndex === index}
              onToggle={() => setExpandedItemIndex(expandedItemIndex === index ? -1 : index)}
            />
          ))}
          <button onClick={() => addArrayItem('gallery', { image: '', caption: { mr: '', en: '' } })} className="mt-4 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors w-full flex justify-center items-center gap-2">
            <Plus size={16} /> Add Gallery Item
          </button>
        </div>
      </div>
    );
  }

  if (activeSection === 'timings') {
    return (
      <div className="pb-10 space-y-4">

        <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-4 shadow-sm">
          <EditorBlockHeader 
            title="Section Header Configuration (Optional)" 
            isExpanded={!!expandedFixedBlocks['timings_header']} 
            onToggle={() => toggleFixedBlock('timings_header')} 
            history={timingsHeaderHist}
          />
          {!!expandedFixedBlocks['timings_header'] && (
            <div className="p-4 space-y-4 bg-white border-t border-slate-200 mt-2 rounded-b-lg">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Section Title</label>
                <PhoneticInput 
                  value={timingsHeaderHist.value.title?.mr || ''} 
                  onChange={(val) => timingsHeaderHist.update({ ...timingsHeaderHist.value, title: { ...timingsHeaderHist.value.title, mr: val } })} 
                  onEnglishChange={(val) => timingsHeaderHist.update({ ...timingsHeaderHist.value, title: { ...timingsHeaderHist.value.title, en: val } })} 
                  englishValue={timingsHeaderHist.value.title?.en || ''} 
                />
              </div>
              <IconPickerInput 
                label="Section Icon" 
                value={timingsHeaderHist.value.icon || ''} 
                onChange={(val) => timingsHeaderHist.update({ ...timingsHeaderHist.value, icon: val })} 
              />
            </div>
          )}
        </div>
        <div className="px-1 mb-2">
          <h3 className="text-sm font-bold text-slate-700">Timings</h3>
          <p className="text-xs text-slate-500 mt-0.5">{(safeData.timings || []).length} item(s)</p>
        </div>
        <div className="space-y-2">
          {(safeData.timings || []).map((item: any, index: number) => (
            <TimingsEditorItem
              key={`item-${index}`} index={index} itemData={item}
              onUpdateFull={(i: number, newD: any) => updateArrayItemFull('timings', i, newD)}
              onRemove={() => removeArrayItem('timings', index)}
              onMoveUp={() => moveArrayItem('timings', index, -1)}
              onMoveDown={() => moveArrayItem('timings', index, 1)}
              isFirst={index === 0} isLast={index === (safeData.timings || []).length - 1}
              isExpanded={expandedItemIndex === index}
              onToggle={() => setExpandedItemIndex(expandedItemIndex === index ? -1 : index)}
            />
          ))}
          <button onClick={() => addArrayItem('timings', { day: { mr: '', en: '' }, hours: { mr: '', en: '' } })} className="mt-4 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors w-full flex justify-center items-center gap-2">
            <Plus size={16} /> Add Timings Item
          </button>
        </div>
        
        <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-4 shadow-sm">
          <EditorBlockHeader 
            title="Timings Note" 
            isExpanded={!!expandedFixedBlocks['timings_note']} 
            onToggle={() => toggleFixedBlock('timings_note')} 
            history={timingsNoteHist}
          />
          {!!expandedFixedBlocks['timings_note'] && (
            <div className="p-4 space-y-4 bg-white border-t border-slate-200 mt-2 rounded-b-lg">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Footer Note Text</label>
                <PhoneticInput 
                  value={timingsNoteHist.value.mr || ''} 
                  onChange={(val) => timingsNoteHist.update({ ...timingsNoteHist.value, mr: val })} 
                  onEnglishChange={(val) => timingsNoteHist.update({ ...timingsNoteHist.value, en: val })} 
                  englishValue={timingsNoteHist.value.en || ''} 
                  multiline
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return <div className="p-4 text-center text-slate-500">Select a section to edit</div>;
};
