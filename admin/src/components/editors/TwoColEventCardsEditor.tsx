import React, { useState, useEffect } from 'react';
import { EditorBlockHeader } from '../EditorLayout';
import { IconPickerInput } from './shared/IconPickerInput';
import { PhoneticInput } from '../PhoneticInput';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { useBlockHistory } from '../../hooks/useBlockHistory';
import { MediaLibraryPopup } from '../MediaLibraryPopup';
import { API_URL } from '../../config/api';


interface TwoColEventCardsEditorProps {
  data: any;
  updateData: (data: any) => void;
  blockId: string;
  expandedSection?: string | null;
}

const VenueFeaturesEditorItem = ({ index, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, isExpanded, onToggle }: any) => {
  const defaultItem = { title: { mr: '', en: '' }, icon: '' };
  const itemHist = useBlockHistory(defaultItem, itemData, (newItemData: any) => onUpdateFull(index, newItemData));
  const currentItem = itemHist.value;

  const handleLocalUpdate = (key: string, value: any) => {
    const newItem = JSON.parse(JSON.stringify(itemHist.value));
    newItem[key] = value;
    itemHist.update(newItem);
  };

  return (
    <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-3 shadow-sm">
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
        <div className="p-4 space-y-4 bg-white border border-t-0 border-slate-200 rounded-b-lg mt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Title</label>
            <PhoneticInput value={currentItem.title?.mr || ''} onChange={(val) => handleLocalUpdate('title', { ...currentItem.title, mr: val })} onEnglishChange={(val) => handleLocalUpdate('title', { ...currentItem.title, en: val })} englishValue={currentItem.title?.en || ''} />
          </div>
          <IconPickerInput label="Icon" value={currentItem.icon || 'Leaf'} onChange={(val) => handleLocalUpdate('icon', val)} />
        </div>
      )}
    </div>
  );
};

const IntroBlockEditorItem = ({ index, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, isExpanded, onToggle }: any) => {
  const defaultItem = { title: { mr: '', en: '' }, description: { mr: '', en: '' } };
  const itemHist = useBlockHistory(defaultItem, itemData, (newItemData: any) => onUpdateFull(index, newItemData));
  const currentItem = itemHist.value;

  const handleLocalUpdate = (key: string, value: any) => {
    const newItem = JSON.parse(JSON.stringify(itemHist.value));
    newItem[key] = value;
    itemHist.update(newItem);
  };

  return (
    <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-3 shadow-sm">
      <EditorBlockHeader
        title={currentItem.title?.mr || `Intro Block ${index + 1}`}
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
        <div className="p-4 space-y-4 bg-white border border-t-0 border-slate-200 rounded-b-lg mt-2">
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

export const TwoColEventCardsEditor: React.FC<TwoColEventCardsEditorProps> = ({ data, updateData, blockId, expandedSection }) => {
  const [expandedItemIndex, setExpandedItemIndex] = useState<number | string | null>('hero');
  const activeSection = (expandedSection || 'hero').replace('template_', '');

  useEffect(() => {
    setExpandedItemIndex(activeSection === 'hero' ? 'hero' : (activeSection === 'about' ? 0 : 0));
  }, [activeSection]);

  const [mediaOpen_heroImage, setMediaOpen_heroImage] = useState(false);
  const [mediaOpen_muralImage, setMediaOpen_muralImage] = useState(false);

  const safeData = { ...data };

  const handleChange = (field: string, value: any) => {
    updateData({ ...safeData, [field]: value });
  };

  const updateArrayItemFull = (field: string, index: number, newItemData: any) => {
    const newArray = [...(safeData[field] || [])];
    newArray[index] = newItemData;
    handleChange(field, newArray);
  };

  const removeArrayItem = (field: string, index: number) => {
    let arr = safeData[field] || [];
    if (!Array.isArray(arr)) arr = [arr].filter(Boolean);
    handleChange(field, arr.filter((_: any, i: number) => i !== index));
    if (expandedItemIndex === index) setExpandedItemIndex(null);
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
  };

  const addArrayItem = (field: string, defaultItem: any) => {
    let arr = safeData[field] || [];
    if (!Array.isArray(arr)) arr = [arr].filter(Boolean);
    handleChange(field, [defaultItem, ...arr]);
  };

  // Migrations
  if (!safeData.about && (safeData.description || safeData.hero?.description)) {
    safeData.about = { description: safeData.hero?.description || safeData.description };
  }
  if (!safeData.sectionHeaders?.about?.title?.mr) {
    if (!safeData.sectionHeaders) safeData.sectionHeaders = {};
    if (!safeData.sectionHeaders.about) safeData.sectionHeaders.about = {};
    safeData.sectionHeaders.about.title = { mr: 'निसर्ग आणि कला यांचा संगम', en: 'A Blend of Nature and Art' };
  }
  if (!safeData.introBlocks || safeData.introBlocks.length === 0) {
    if (safeData.about?.description || safeData.hero?.description || safeData.description) {
      safeData.introBlocks = [{
        title: safeData.sectionHeaders?.about?.title || { mr: 'निसर्ग आणि कला यांचा संगम', en: 'A Blend of Nature and Art' },
        description: safeData.about?.description || safeData.hero?.description || safeData.description
      }];
    } else {
      safeData.introBlocks = [];
    }
  }
  if (!safeData.sectionHeaders?.hero?.icon) {
    if (!safeData.sectionHeaders) safeData.sectionHeaders = {};
    if (!safeData.sectionHeaders.hero) safeData.sectionHeaders.hero = {};
    safeData.sectionHeaders.hero.icon = 'Flower2';
    safeData.sectionHeaders.hero.subtitleIcon = 'MapPin';
  }

  const heroBannerHist = useBlockHistory(
    { title: { mr: '', en: '' }, subtitle: { mr: '', en: '' }, heroImage: '', muralImage: '', icon: 'Flower2', subtitleIcon: 'MapPin' },
    { 
      title: safeData.hero?.title || safeData.title || { mr: '', en: '' }, 
      subtitle: safeData.hero?.subtitle || safeData.subtitle || { mr: '', en: '' },
      heroImage: safeData.heroImage || safeData.hero?.heroImage || '',
      muralImage: safeData.muralImage || safeData.gallery?.muralImage || '',
      icon: safeData.sectionHeaders?.hero?.icon || 'Flower2',
      subtitleIcon: safeData.sectionHeaders?.hero?.subtitleIcon || 'MapPin'
    },
    (newData: any) => {
       handleChange('hero', { ...safeData.hero, title: newData.title, subtitle: newData.subtitle, heroImage: newData.heroImage });
       handleChange('heroImage', newData.heroImage);
       handleChange('muralImage', newData.muralImage);
       handleChange('sectionHeaders', { ...safeData.sectionHeaders, hero: { ...(safeData.sectionHeaders?.hero || {}), icon: newData.icon, subtitleIcon: newData.subtitleIcon } });
    }
  );

  if (activeSection === 'hero') {
    return (
      <div className="pb-10 space-y-4">
        <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-3 shadow-sm">
          <EditorBlockHeader 
            title="Hero Content" 
            isExpanded={expandedItemIndex === 'hero'} 
            onToggle={() => setExpandedItemIndex(expandedItemIndex === 'hero' ? null : 'hero')} 
            history={heroBannerHist}
          />
          {expandedItemIndex === 'hero' && (
            <div className="p-4 space-y-6 bg-white border-t border-slate-200 mt-2 rounded-b-lg">
              
              <div className="space-y-4">
                <IconPickerInput 
                  label="Hero Icon" 
                  value={heroBannerHist.value.icon || 'Flower2'} 
                  onChange={(val) => { const newD = JSON.parse(JSON.stringify(heroBannerHist.value)); newD.icon = val; heroBannerHist.update(newD); }} 
                />
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Title</label>
                  <PhoneticInput value={heroBannerHist.value.title?.mr || ''} onChange={(val) => { const newD = JSON.parse(JSON.stringify(heroBannerHist.value)); newD.title.mr = val; heroBannerHist.update(newD); }} onEnglishChange={(val) => { const newD = JSON.parse(JSON.stringify(heroBannerHist.value)); newD.title.en = val; heroBannerHist.update(newD); }} englishValue={heroBannerHist.value.title?.en || ''} />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <IconPickerInput 
                  label="Subtitle Icon" 
                  value={heroBannerHist.value.subtitleIcon || 'MapPin'} 
                  onChange={(val) => { const newD = JSON.parse(JSON.stringify(heroBannerHist.value)); newD.subtitleIcon = val; heroBannerHist.update(newD); }} 
                />
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Subtitle</label>
                  <PhoneticInput value={heroBannerHist.value.subtitle?.mr || ''} onChange={(val) => { const newD = JSON.parse(JSON.stringify(heroBannerHist.value)); newD.subtitle.mr = val; heroBannerHist.update(newD); }} onEnglishChange={(val) => { const newD = JSON.parse(JSON.stringify(heroBannerHist.value)); newD.subtitle.en = val; heroBannerHist.update(newD); }} englishValue={heroBannerHist.value.subtitle?.en || ''} />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Hero Image</label>
                  <div
                    className="w-full h-36 bg-slate-100 rounded-lg border border-slate-300 overflow-hidden relative group cursor-pointer"
                    onClick={() => setMediaOpen_heroImage(true)}
                  >
                    {heroBannerHist.value.heroImage ? (
                      <>
                        <img src={heroBannerHist.value.heroImage.startsWith('http') ? heroBannerHist.value.heroImage : `${API_URL}${heroBannerHist.value.heroImage.startsWith('/') ? '' : '/'}${heroBannerHist.value.heroImage}`} className="w-full h-full object-cover" alt="Preview" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><span className="text-white text-sm font-medium">Click to change</span></div>
                      </>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400"><span className="text-2xl mb-1">🖼</span><span className="text-xs">Click to select image</span></div>
                    )}
                  </div>
                  <MediaLibraryPopup isOpen={mediaOpen_heroImage} onClose={() => setMediaOpen_heroImage(false)} onSelect={(url: string) => { const newD = JSON.parse(JSON.stringify(heroBannerHist.value)); newD.heroImage = url; heroBannerHist.update(newD); setMediaOpen_heroImage(false); }} />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Mural/Side Image</label>
                  <div
                    className="w-full h-36 bg-slate-100 rounded-lg border border-slate-300 overflow-hidden relative group cursor-pointer"
                    onClick={() => setMediaOpen_muralImage(true)}
                  >
                    {heroBannerHist.value.muralImage ? (
                      <>
                        <img src={heroBannerHist.value.muralImage.startsWith('http') ? heroBannerHist.value.muralImage : `${API_URL}${heroBannerHist.value.muralImage.startsWith('/') ? '' : '/'}${heroBannerHist.value.muralImage}`} className="w-full h-full object-cover" alt="Preview" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><span className="text-white text-sm font-medium">Click to change</span></div>
                      </>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400"><span className="text-2xl mb-1">🖼</span><span className="text-xs">Click to select image</span></div>
                    )}
                  </div>
                  <MediaLibraryPopup isOpen={mediaOpen_muralImage} onClose={() => setMediaOpen_muralImage(false)} onSelect={(url: string) => { const newD = JSON.parse(JSON.stringify(heroBannerHist.value)); newD.muralImage = url; heroBannerHist.update(newD); setMediaOpen_muralImage(false); }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeSection === 'about') {
    return (
      <div className="pb-10 space-y-4">
        <div className="px-1 mb-2">
          <h3 className="text-sm font-bold text-slate-700">Intro Blocks</h3>
          <p className="text-xs text-slate-500 mt-0.5">{(safeData.introBlocks || []).length} item(s)</p>
        </div>
        <div className="space-y-2">
          <button onClick={() => addArrayItem('introBlocks', { title: { mr: '', en: '' }, description: { mr: '', en: '' } })} className="mb-4 px-4 py-3 bg-indigo-50/50 border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 rounded-lg text-sm font-bold shadow-sm transition-all duration-200 w-full flex justify-center items-center gap-2 shadow-indigo-100/50">
            <Plus size={16} /> Add Intro Block
          </button>
          {(safeData.introBlocks || []).map((item: any, index: number) => (
            <IntroBlockEditorItem
              key={`item-${index}`} index={index} itemData={item}
              onUpdateFull={(i: number, newD: any) => updateArrayItemFull('introBlocks', i, newD)}
              onRemove={() => removeArrayItem('introBlocks', index)}
              onMoveUp={() => moveArrayItem('introBlocks', index, -1)}
              onMoveDown={() => moveArrayItem('introBlocks', index, 1)}
              isFirst={index === 0} isLast={index === (safeData.introBlocks || []).length - 1}
              isExpanded={expandedItemIndex === index}
              onToggle={() => setExpandedItemIndex(expandedItemIndex === index ? null : index)}
            />
          ))}

        </div>
      </div>
    );
  }

  if (activeSection === 'motto') {
    return (
      <div className="pb-10 space-y-4">
        <div className="px-1 mb-2">
          <h3 className="text-sm font-bold text-slate-700">Venue Features</h3>
          <p className="text-xs text-slate-500 mt-0.5">{(safeData.venueFeatures || []).length} item(s)</p>
        </div>
        <div className="space-y-2">
          <button onClick={() => addArrayItem('venueFeatures', { title: { mr: '', en: '' }, icon: '' })} className="mb-4 px-4 py-3 bg-indigo-50/50 border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 rounded-lg text-sm font-bold shadow-sm transition-all duration-200 w-full flex justify-center items-center gap-2 shadow-indigo-100/50">
            <Plus size={16} /> Add Venue Feature
          </button>
          {(safeData.venueFeatures || []).map((item: any, index: number) => (
            <VenueFeaturesEditorItem
              key={`item-${index}`} index={index} itemData={item}
              onUpdateFull={(i: number, newD: any) => updateArrayItemFull('venueFeatures', i, newD)}
              onRemove={() => removeArrayItem('venueFeatures', index)}
              onMoveUp={() => moveArrayItem('venueFeatures', index, -1)}
              onMoveDown={() => moveArrayItem('venueFeatures', index, 1)}
              isFirst={index === 0} isLast={index === (safeData.venueFeatures || []).length - 1}
              isExpanded={expandedItemIndex === index}
              onToggle={() => setExpandedItemIndex(expandedItemIndex === index ? null : index)}
            />
          ))}

        </div>
      </div>
    );
  }

  return <div className="p-4 text-center text-slate-500">Select a section to edit</div>;
};
