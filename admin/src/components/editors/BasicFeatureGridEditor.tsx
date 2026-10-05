import React, { useState, useEffect } from 'react';
import { EditorBlockHeader } from '../EditorLayout';
import { PhoneticInput } from '../PhoneticInput';
import { IconPickerInput } from './shared/IconPickerInput';
import { useBlockHistory } from '../../hooks/useBlockHistory';
import { MediaLibraryPopup } from '../MediaLibraryPopup';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { API_URL } from '../../config/api';


interface BasicFeatureGridEditorProps {
  data: any;
  updateData: (data: any) => void;
  blockId: string;
  expandedSection?: string;
}

// ---------------------- Array Item Components ----------------------
const StatsEditorItem = ({ index, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, isExpanded, onToggle }: any) => {
  const defaultItem = { value: '', label: { mr: '', en: '' }, icon: '' };
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
          <IconPickerInput label="Icon" value={currentItem.icon || 'Users'} onChange={(val) => handleLocalUpdate('icon', val)} />
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Value</label>
            <input type="text" value={currentItem.value || ''} onChange={(e) => handleLocalUpdate('value', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Label</label>
            <PhoneticInput value={currentItem.label?.mr || ''} onChange={(val) => handleLocalUpdate('label', { ...currentItem.label, mr: val })} onEnglishChange={(val) => handleLocalUpdate('label', { ...currentItem.label, en: val })} englishValue={currentItem.label?.en || ''} />
          </div>
        </div>
      )}
    </div>
  );
};

const KeyFunctionsEditorItem = ({ index, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, isExpanded, onToggle }: any) => {
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
          <IconPickerInput label="Icon" value={currentItem.icon || 'Scale'} onChange={(val) => handleLocalUpdate('icon', val)} />
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


const ContactInfoEditorItem = ({ index, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, isExpanded, onToggle }: any) => {
  const defaultItem = { value: { mr: '', en: '' }, icon: 'Phone' };
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
        title={currentItem.title?.mr || currentItem.label?.mr || currentItem.name?.mr || currentItem.mr || currentItem.value?.mr || `Item ${index + 1}`}
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
          <IconPickerInput label="Icon" value={currentItem.icon || 'Phone'} onChange={(val) => handleLocalUpdate('icon', val)} />
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Value</label>
            <PhoneticInput value={currentItem.value?.mr || ''} onChange={(val) => handleLocalUpdate('value', { ...currentItem.value, mr: val })} onEnglishChange={(val) => handleLocalUpdate('value', { ...currentItem.value, en: val })} englishValue={currentItem.value?.en || ''} multiline />
          </div>
        </div>
      )}
    </div>
  );
};


// ---------------------- Main Editor Component ----------------------
export const BasicFeatureGridEditor: React.FC<BasicFeatureGridEditorProps> = ({ data, updateData, blockId, expandedSection }) => {
  const [expandedItemIndex, setExpandedItemIndex] = useState<string | null>(null);
  const activeSection = (expandedSection || 'hero').replace('template_', '');

  const [expandedFixedBlocks, setExpandedFixedBlocks] = useState<Record<string, boolean>>({
    hero_header: true,
    desc_block: true,
    stats_header: true,
    keyFunctions_header: true,
    contactInfo_header: true
  });

  const toggleFixedBlock = (key: string) => {
    setExpandedFixedBlocks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    setExpandedItemIndex(null);
  }, [activeSection]);

  const [mediaOpen_heroImage, setMediaOpen_heroImage] = useState(false);

  const safeData = {
    ...data
  };

  const handleChange = (field: string, value: any) => {
    updateData({ ...data, [field]: value });
  };

  const statsHist = useBlockHistory([], safeData.stats || [], (newData: any) => handleChange('stats', newData));
  const keyFunctionsHist = useBlockHistory([], safeData.keyFunctions || [], (newData: any) => handleChange('keyFunctions', newData));
  
  // Normalize contactInfo to array
  if (safeData.contactInfo && !Array.isArray(safeData.contactInfo)) {
    safeData.contactInfo = [
      safeData.contactInfo.address && { icon: 'MapPin', value: safeData.contactInfo.address },
      safeData.contactInfo.phone && { icon: 'Phone', value: { en: safeData.contactInfo.phone, mr: safeData.contactInfo.phone } },
      safeData.contactInfo.email && { icon: 'Mail', value: { en: safeData.contactInfo.email, mr: safeData.contactInfo.email } }
    ].filter(Boolean);
  }
  let initialContactInfo = safeData.contactInfo || [];
  
  const contactInfoHist = useBlockHistory([], initialContactInfo, (newData: any) => handleChange('contactInfo', newData));
  
  const descHist = useBlockHistory(
    { description: { mr: '', en: '' }, stampText: { mr: '', en: '' } }, 
    { description: safeData.hero?.description || safeData.description || { mr: '', en: '' }, stampText: safeData.hero?.stampText || { mr: '', en: '' } }, 
    (newData: any) => handleChange('hero', { ...safeData.hero, ...newData })
  );
  const heroBannerHist = useBlockHistory(
    { icon: 'Scale', heroImage: '', title: { mr: '', en: '' }, subtitle: { mr: '', en: '' } },
    { icon: safeData.sectionHeaders?.hero?.icon || 'Scale', heroImage: safeData.hero?.heroImage || safeData.heroImage || '', title: safeData.hero?.title || safeData.title || { mr: '', en: '' }, subtitle: safeData.hero?.subtitle || safeData.subtitle || { mr: '', en: '' } },
    (newData: any) => {
       handleChange('hero', { ...safeData.hero, heroImage: newData.heroImage, title: newData.title, subtitle: newData.subtitle });
       handleChange('sectionHeaders', { ...safeData.sectionHeaders, hero: { ...(safeData.sectionHeaders?.hero || {}), icon: newData.icon } });
    }
  );

  // Pre-seed Migration (CRITICAL)
  if (!safeData.sectionHeaders) safeData.sectionHeaders = {};
  
  if (!safeData.sectionHeaders.hero?.title?.mr && !safeData.sectionHeaders.hero?.title?.en) {
    safeData.sectionHeaders.hero = { title: { en: 'Header', mr: 'शीर्षक' }, icon: 'Scale' };
  }
  
  if (!safeData.sectionHeaders.keyFunctions?.title?.mr && !safeData.sectionHeaders.keyFunctions?.title?.en) {
    safeData.sectionHeaders.keyFunctions = { title: { en: 'Key Features', mr: 'प्रमुख वैशिष्ट्ये' }, icon: 'Shield' };
  }
  
  if (!safeData.sectionHeaders.stats?.title?.mr && !safeData.sectionHeaders.stats?.title?.en) {
    safeData.sectionHeaders.stats = { title: { en: 'At a Glance', mr: 'दृष्टिक्षेपात' }, icon: 'BarChart2' };
  }
  
  if (!safeData.sectionHeaders.contactInfo?.title?.mr && !safeData.sectionHeaders.contactInfo?.title?.en) {
    safeData.sectionHeaders.contactInfo = { title: { en: 'Contact Us', mr: 'संपर्क साधा' }, icon: 'Phone' };
  }

  if (Array.isArray(safeData.stats)) {
    safeData.stats = safeData.stats.map((item: any) => ({ ...item, icon: item.icon || 'Users' }));
  }
  if (Array.isArray(safeData.keyFunctions)) {
    safeData.keyFunctions = safeData.keyFunctions.map((item: any) => ({ ...item, icon: item.icon || 'Scale' }));
  }
  
  if (!safeData.contactInfo) {
    safeData.contactInfo = { email: '', phone: '', address: { mr: '', en: '' } };
  }

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
    if (expandedItemIndex === `${field}-${index}`) setExpandedItemIndex(null);
  };

  const moveArrayItem = (field: string, index: number, direction: number) => {
    let arr = safeData[field] || [];
    if (!Array.isArray(arr)) arr = [arr].filter(Boolean);
    const newArray = [...arr];
    const temp = newArray[index];
    newArray[index] = newArray[index + direction];
    newArray[index + direction] = temp;
    handleChange(field, newArray);
    if (expandedItemIndex === `${field}-${index}`) setExpandedItemIndex(`${field}-${index + direction}`);
    else if (expandedItemIndex === `${field}-${index + direction}`) setExpandedItemIndex(`${field}-${index}`);
  };

  const addArrayItem = (field: string, defaultItem: any) => {
    let arr = safeData[field] || [];
    if (!Array.isArray(arr)) arr = [arr].filter(Boolean);
    handleChange(field, [defaultItem, ...arr]);
    setExpandedItemIndex(`${field}-${arr.length}`);
  };

  if (activeSection === 'hero') {
    return (
      <div className="pb-10 space-y-4">
        <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-3 shadow-sm">
          <EditorBlockHeader 
            title="Header Banner" 
            isExpanded={!!expandedFixedBlocks['hero_header']} 
            onToggle={() => toggleFixedBlock('hero_header')} 
            history={heroBannerHist}
          />
          {!!expandedFixedBlocks['hero_header'] && (
            <div className="p-4 space-y-4 bg-white border-t border-slate-200 mt-2 rounded-b-lg">
              <IconPickerInput 
                label="Header Banner Icon" 
                value={heroBannerHist.value.icon || 'Scale'} 
                onChange={(val) => { const newD = JSON.parse(JSON.stringify(heroBannerHist.value)); newD.icon = val; heroBannerHist.update(newD); }} 
              />
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Title</label>
                <PhoneticInput value={heroBannerHist.value.title?.mr || ''} onChange={(val) => { const newD = JSON.parse(JSON.stringify(heroBannerHist.value)); newD.title.mr = val; heroBannerHist.update(newD); }} onEnglishChange={(val) => { const newD = JSON.parse(JSON.stringify(heroBannerHist.value)); newD.title.en = val; heroBannerHist.update(newD); }} englishValue={heroBannerHist.value.title?.en || ''} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Subtitle</label>
                <PhoneticInput value={heroBannerHist.value.subtitle?.mr || ''} onChange={(val) => { const newD = JSON.parse(JSON.stringify(heroBannerHist.value)); newD.subtitle.mr = val; heroBannerHist.update(newD); }} onEnglishChange={(val) => { const newD = JSON.parse(JSON.stringify(heroBannerHist.value)); newD.subtitle.en = val; heroBannerHist.update(newD); }} englishValue={heroBannerHist.value.subtitle?.en || ''} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeSection === 'description') {
    return (
      <div className="pb-10 space-y-4">
        {/* Description & Hero Image Block */}
        <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-4 shadow-sm">
          <EditorBlockHeader 
            title="Main Content Block" 
            isExpanded={!!expandedFixedBlocks['desc_block']} 
            onToggle={() => toggleFixedBlock('desc_block')} 
            history={descHist}
          />
          {!!expandedFixedBlocks['desc_block'] && (
            <div className="p-4 space-y-4 bg-white border-t border-slate-200 mt-2 rounded-b-lg">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Feature Image</label>
                <div
                  className="w-full h-36 bg-slate-100 rounded-lg border border-slate-300 overflow-hidden relative group cursor-pointer"
                  onClick={() => setMediaOpen_heroImage(true)}
                >
                  {(safeData.hero?.heroImage || safeData.heroImage) ? (
                    <>
                      <img
                        src={(safeData.hero?.heroImage || safeData.heroImage).startsWith('http') ? (safeData.hero?.heroImage || safeData.heroImage) : `${API_URL}${(safeData.hero?.heroImage || safeData.heroImage).startsWith('/') ? '' : '/'}${(safeData.hero?.heroImage || safeData.heroImage)}`}
                        className="w-full h-full object-cover"
                        alt="Preview"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-sm font-medium">
                        Click to change
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-50 hover:bg-slate-100 transition-colors">
                      <span className="text-2xl mb-1">🖼️</span>
                      <span className="text-xs font-medium">Click to select image</span>
                    </div>
                  )}
                </div>
                <MediaLibraryPopup
                  isOpen={mediaOpen_heroImage}
                  onClose={() => setMediaOpen_heroImage(false)}
                  onSelect={(url: string) => { handleChange('hero', { ...safeData.hero, heroImage: url }); setMediaOpen_heroImage(false); }}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Description</label>
                <PhoneticInput value={descHist.value.description?.mr || ''} onChange={(val) => { const newD = JSON.parse(JSON.stringify(descHist.value)); newD.description.mr = val; descHist.update(newD); }} onEnglishChange={(val) => { const newD = JSON.parse(JSON.stringify(descHist.value)); newD.description.en = val; descHist.update(newD); }} englishValue={descHist.value.description?.en || ''} multiline />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeSection === 'keyFunctions') {
    return (
      <div className="pb-10 space-y-4">
        {/* Key Functions Section */}
        <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-4 shadow-sm">
          <EditorBlockHeader 
            title="Key Features Block" 
            isExpanded={!!expandedFixedBlocks['keyFunctions_header']} 
            onToggle={() => toggleFixedBlock('keyFunctions_header')} 
            history={keyFunctionsHist}
          />
          {!!expandedFixedBlocks['keyFunctions_header'] && (
            <div className="p-4 space-y-4 bg-white border-t border-slate-200 mt-2 rounded-b-lg">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Section Title</label>
                <PhoneticInput 
                  value={safeData.sectionHeaders?.keyFunctions?.title?.mr || ''} 
                  onChange={(val) => handleChange('sectionHeaders', { ...safeData.sectionHeaders, keyFunctions: { ...(safeData.sectionHeaders?.keyFunctions || {}), title: { ...(safeData.sectionHeaders?.keyFunctions?.title || {}), mr: val } } })} 
                  onEnglishChange={(val) => handleChange('sectionHeaders', { ...safeData.sectionHeaders, keyFunctions: { ...(safeData.sectionHeaders?.keyFunctions || {}), title: { ...(safeData.sectionHeaders?.keyFunctions?.title || {}), en: val } } })} 
                  englishValue={safeData.sectionHeaders?.keyFunctions?.title?.en || ''} 
                />
              </div>
              <IconPickerInput 
                label="Section Icon" 
                value={safeData.sectionHeaders?.keyFunctions?.icon || ''} 
                onChange={(val) => handleChange('sectionHeaders', { ...safeData.sectionHeaders, keyFunctions: { ...(safeData.sectionHeaders?.keyFunctions || {}), icon: val } })} 
              />
              <div className="border-t border-slate-200 pt-4 mt-4">
                <div className="px-1 mb-2">
                  <h3 className="text-sm font-bold text-slate-700">Features List</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{(safeData.keyFunctions || []).length} item(s)</p>
                </div>
                <div className="space-y-2">
                  <button onClick={() => addArrayItem('keyFunctions', { title: { mr: '', en: '' }, desc: { mr: '', en: '' }, icon: '' })} className="mb-4 px-4 py-3 bg-indigo-50/50 border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 rounded-lg text-sm font-bold shadow-sm transition-all duration-200 w-full flex justify-center items-center gap-2 shadow-indigo-100/50">
                    <Plus size={16} /> Add Feature Item
                  </button>
          {(safeData.keyFunctions || []).map((item: any, index: number) => (
                    <KeyFunctionsEditorItem
                      key={`item-${index}`} index={index} itemData={item}
                      onUpdateFull={(i: number, newD: any) => updateArrayItemFull('keyFunctions', i, newD)}
                      onRemove={() => removeArrayItem('keyFunctions', index)}
                      onMoveUp={() => moveArrayItem('keyFunctions', index, -1)}
                      onMoveDown={() => moveArrayItem('keyFunctions', index, 1)}
                      isFirst={index === 0} isLast={index === (safeData.keyFunctions || []).length - 1}
                      isExpanded={expandedItemIndex === `keyFunctions-${index}`}
                      onToggle={() => setExpandedItemIndex(expandedItemIndex === `keyFunctions-${index}` ? null : `keyFunctions-${index}`)}
                    />
                  ))}

                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeSection === 'stats') {
    return (
      <div className="pb-10 space-y-4">
        {/* Stats Section */}
        <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-4 shadow-sm">
          <EditorBlockHeader 
            title="Stats Widget Block" 
            isExpanded={!!expandedFixedBlocks['stats_header']} 
            onToggle={() => toggleFixedBlock('stats_header')} 
            history={statsHist}
          />
          {!!expandedFixedBlocks['stats_header'] && (
            <div className="p-4 space-y-4 bg-white border-t border-slate-200 mt-2 rounded-b-lg">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Section Title</label>
                <PhoneticInput 
                  value={safeData.sectionHeaders?.stats?.title?.mr || ''} 
                  onChange={(val) => handleChange('sectionHeaders', { ...safeData.sectionHeaders, stats: { ...(safeData.sectionHeaders?.stats || {}), title: { ...(safeData.sectionHeaders?.stats?.title || {}), mr: val } } })} 
                  onEnglishChange={(val) => handleChange('sectionHeaders', { ...safeData.sectionHeaders, stats: { ...(safeData.sectionHeaders?.stats || {}), title: { ...(safeData.sectionHeaders?.stats?.title || {}), en: val } } })} 
                  englishValue={safeData.sectionHeaders?.stats?.title?.en || ''} 
                />
              </div>
              <IconPickerInput 
                label="Section Icon" 
                value={safeData.sectionHeaders?.stats?.icon || ''} 
                onChange={(val) => handleChange('sectionHeaders', { ...safeData.sectionHeaders, stats: { ...(safeData.sectionHeaders?.stats || {}), icon: val } })} 
              />
              <div className="border-t border-slate-200 pt-4 mt-4">
                <div className="px-1 mb-2">
                  <h3 className="text-sm font-bold text-slate-700">Stats List</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{(safeData.stats || []).length} item(s)</p>
                </div>
                <div className="space-y-2">
                  <button onClick={() => addArrayItem('stats', { value: '', label: { mr: '', en: '' }, icon: '' })} className="mb-4 px-4 py-3 bg-indigo-50/50 border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 rounded-lg text-sm font-bold shadow-sm transition-all duration-200 w-full flex justify-center items-center gap-2 shadow-indigo-100/50">
                    <Plus size={16} /> Add Stats Item
                  </button>
          {(safeData.stats || []).map((item: any, index: number) => (
                    <StatsEditorItem
                      key={`item-${index}`} index={index} itemData={item}
                      onUpdateFull={(i: number, newD: any) => updateArrayItemFull('stats', i, newD)}
                      onRemove={() => removeArrayItem('stats', index)}
                      onMoveUp={() => moveArrayItem('stats', index, -1)}
                      onMoveDown={() => moveArrayItem('stats', index, 1)}
                      isFirst={index === 0} isLast={index === (safeData.stats || []).length - 1}
                      isExpanded={expandedItemIndex === `stats-${index}`}
                      onToggle={() => setExpandedItemIndex(expandedItemIndex === `stats-${index}` ? null : `stats-${index}`)}
                    />
                  ))}

                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeSection === 'contactInfo') {
    return (
      <div className="pb-10 space-y-4">
        {/* Contact Info Section */}
        <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-4 shadow-sm">
          <EditorBlockHeader 
            title="Contact Widget Block" 
            isExpanded={!!expandedFixedBlocks['contactInfo_header']} 
            onToggle={() => toggleFixedBlock('contactInfo_header')} 
            history={contactInfoHist}
          />
          {!!expandedFixedBlocks['contactInfo_header'] && (
            <div className="p-4 space-y-4 bg-white border-t border-slate-200 mt-2 rounded-b-lg">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Section Title</label>
                <PhoneticInput 
                  value={safeData.sectionHeaders?.contactInfo?.title?.mr || ''} 
                  onChange={(val) => handleChange('sectionHeaders', { ...safeData.sectionHeaders, contactInfo: { ...(safeData.sectionHeaders?.contactInfo || {}), title: { ...(safeData.sectionHeaders?.contactInfo?.title || {}), mr: val } } })} 
                  onEnglishChange={(val) => handleChange('sectionHeaders', { ...safeData.sectionHeaders, contactInfo: { ...(safeData.sectionHeaders?.contactInfo || {}), title: { ...(safeData.sectionHeaders?.contactInfo?.title || {}), en: val } } })} 
                  englishValue={safeData.sectionHeaders?.contactInfo?.title?.en || ''} 
                />
              </div>
              <IconPickerInput 
                label="Section Icon" 
                value={safeData.sectionHeaders?.contactInfo?.icon || ''} 
                onChange={(val) => handleChange('sectionHeaders', { ...safeData.sectionHeaders, contactInfo: { ...(safeData.sectionHeaders?.contactInfo || {}), icon: val } })} 
              />
              <div className="border-t border-slate-200 pt-4 mt-4">
                <div className="px-1 mb-2">
                  <h3 className="text-sm font-bold text-slate-700">Contact Details List</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{initialContactInfo.length} item(s)</p>
                </div>
                <div className="space-y-2">
                  <button onClick={() => addArrayItem('contactInfo', { value: { mr: '', en: '' }, icon: 'Phone' })} className="mb-4 px-4 py-3 bg-indigo-50/50 border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 rounded-lg text-sm font-bold shadow-sm transition-all duration-200 w-full flex justify-center items-center gap-2 shadow-indigo-100/50">
                    <Plus size={16} /> Add Contact Row
                  </button>
          {initialContactInfo.map((item: any, index: number) => (
                    <ContactInfoEditorItem
                      key={`item-${index}`} index={index} itemData={item}
                      onUpdateFull={(i: number, newD: any) => updateArrayItemFull('contactInfo', i, newD)}
                      onRemove={() => removeArrayItem('contactInfo', index)}
                      onMoveUp={() => moveArrayItem('contactInfo', index, -1)}
                      onMoveDown={() => moveArrayItem('contactInfo', index, 1)}
                      isFirst={index === 0} isLast={index === initialContactInfo.length - 1}
                      isExpanded={expandedItemIndex === `contactInfo-${index}`}
                      onToggle={() => setExpandedItemIndex(expandedItemIndex === `contactInfo-${index}` ? null : `contactInfo-${index}`)}
                    />
                  ))}

                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return <div className="p-4 text-center text-slate-500">Select a section to edit</div>;
};
