import React, { useState, useEffect } from 'react';
import { EditorBlockHeader } from '../EditorLayout';
import { IconPickerInput } from './shared/IconPickerInput';
import { PhoneticInput } from '../PhoneticInput';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { useBlockHistory } from '../../hooks/useBlockHistory';
import { MediaLibraryPopup } from '../MediaLibraryPopup';
import { API_URL } from '../../config/api';


interface ContentWithRightSidebarEditorProps {
  data: any;
  updateData: (data: any) => void;
  blockId: string;
  expandedSection?: string | null;
}

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
        title={typeof currentItem.label === 'string' ? currentItem.label : (currentItem.label?.mr || currentItem.title?.mr || currentItem.name?.mr || currentItem.mr || `Item ${index + 1}`)}
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
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Value</label>
            <input type="text" value={currentItem.value || ''} onChange={(e) => handleLocalUpdate('value', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Label</label>
            <PhoneticInput value={currentItem.label?.mr || ''} onChange={(val) => handleLocalUpdate('label', { ...currentItem.label, mr: val })} onEnglishChange={(val) => handleLocalUpdate('label', { ...currentItem.label, en: val })} englishValue={currentItem.label?.en || ''} />
          </div>
          <IconPickerInput label="Icon" value={currentItem.icon || ''} onChange={(val) => handleLocalUpdate('icon', val)} />
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
        title={typeof currentItem.title === 'string' ? currentItem.title : (currentItem.title?.mr || currentItem.label?.mr || currentItem.name?.mr || currentItem.mr || `Item ${index + 1}`)}
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
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Title</label>
            <PhoneticInput value={currentItem.title?.mr || ''} onChange={(val) => handleLocalUpdate('title', { ...currentItem.title, mr: val })} onEnglishChange={(val) => handleLocalUpdate('title', { ...currentItem.title, en: val })} englishValue={currentItem.title?.en || ''} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Description</label>
            <PhoneticInput value={currentItem.desc?.mr || ''} onChange={(val) => handleLocalUpdate('desc', { ...currentItem.desc, mr: val })} onEnglishChange={(val) => handleLocalUpdate('desc', { ...currentItem.desc, en: val })} englishValue={currentItem.desc?.en || ''} multiline />
          </div>
          <IconPickerInput label="Icon" value={currentItem.icon || ''} onChange={(val) => handleLocalUpdate('icon', val)} />
        </div>
      )}
    </div>
  );
};

const ContactInfoEditorItem = ({ index, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, isExpanded, onToggle }: any) => {
  const defaultItem = { value: { mr: '', en: '' }, icon: '' };
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
        title={typeof currentItem.value === 'string' ? currentItem.value : (currentItem.value?.mr || currentItem.value?.en || `Item ${index + 1}`)}
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
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Contact Detail</label>
            <PhoneticInput 
              value={typeof currentItem.value === 'string' ? currentItem.value : (currentItem.value?.mr || '')} 
              onChange={(val) => handleLocalUpdate('value', { ...((typeof currentItem.value === 'object' ? currentItem.value : {}) || {}), mr: val })} 
              onEnglishChange={(val) => handleLocalUpdate('value', { ...((typeof currentItem.value === 'object' ? currentItem.value : {}) || {}), en: val })} 
              englishValue={typeof currentItem.value === 'string' ? currentItem.value : (currentItem.value?.en || '')} 
            />
          </div>
          <IconPickerInput label="Icon" value={currentItem.icon || ''} onChange={(val) => handleLocalUpdate('icon', val)} />
        </div>
      )}
    </div>
  );
};

export const ContentWithRightSidebarEditor: React.FC<ContentWithRightSidebarEditorProps> = ({ data, updateData, blockId, expandedSection }) => {
  const [expandedItemIndex, setExpandedItemIndex] = useState<number | string | null>(0);
  const activeSection = (expandedSection || 'hero').replace('template_', '');
  const [mediaOpen_heroImage, setMediaOpen_heroImage] = useState(false);

  const safeData = { ...data };
  if (!safeData.sectionHeaders) safeData.sectionHeaders = {};

  // PRE-SEED LEGACY HEADERS
  if (!safeData.sectionHeaders.hero) safeData.sectionHeaders.hero = { title: { en: 'DLSA', mr: 'डीएलएसए' }, icon: 'Scale' };
  if (!safeData.sectionHeaders.stats) safeData.sectionHeaders.stats = { title: { en: 'Contact', mr: 'संपर्क' }, icon: 'Activity' };
  if (!safeData.sectionHeaders.contactInfo) safeData.sectionHeaders.contactInfo = { title: { en: 'Contact Us', mr: 'संपर्क साधा' }, icon: 'Phone' };

  const handleChange = (field: string, value: any) => {
    updateData({ ...data, [field]: value });
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

  const heroBannerHist = useBlockHistory(
    { icon: 'Scale', title: { mr: '', en: '' }, subtitle: { mr: '', en: '' } },
    { icon: safeData.sectionHeaders?.hero?.icon || 'Scale', title: safeData.hero?.title || safeData.title || { mr: '', en: '' }, subtitle: safeData.hero?.subtitle || safeData.subtitle || { mr: '', en: '' } },
    (newData: any) => {
       handleChange('hero', { ...safeData.hero, title: newData.title, subtitle: newData.subtitle });
       handleChange('sectionHeaders', { ...safeData.sectionHeaders, hero: { ...(safeData.sectionHeaders?.hero || {}), icon: newData.icon } });
    }
  );

  const descHist = useBlockHistory(
    { heroImage: '', description: { mr: '', en: '' } },
    { heroImage: safeData.hero?.heroImage || safeData.heroImage || '', description: safeData.hero?.description || safeData.description || { mr: '', en: '' } },
    (newData: any) => {
       handleChange('hero', { ...safeData.hero, heroImage: newData.heroImage, description: newData.description });
    }
  );

  if (safeData.contactInfo && !Array.isArray(safeData.contactInfo)) {
    safeData.contactInfo = [
      safeData.contactInfo.address && { icon: 'MapPin', value: safeData.contactInfo.address },
      safeData.contactInfo.phone && { icon: 'Phone', value: { en: safeData.contactInfo.phone, mr: safeData.contactInfo.phone } },
      safeData.contactInfo.email && { icon: 'Mail', value: { en: safeData.contactInfo.email, mr: safeData.contactInfo.email } }
    ].filter(Boolean);
  }
  let initialContactInfo = safeData.contactInfo || [];
  const contactInfoHist = useBlockHistory([], initialContactInfo, (newData: any) => handleChange('contactInfo', newData));

  const contactHeaderHist = useBlockHistory(
    { title: { en: '', mr: '' }, icon: 'Phone' },
    { title: safeData.sectionHeaders?.contactInfo?.title || { en: 'Contact Us', mr: 'संपर्क साधा' }, icon: safeData.sectionHeaders?.contactInfo?.icon || 'Phone' },
    (newData: any) => {
       handleChange('sectionHeaders', { ...safeData.sectionHeaders, contactInfo: newData });
    }
  );

  if (activeSection === 'hero') {
    return (
      <div className="pb-10 space-y-4">
        <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-3 shadow-sm">
          <EditorBlockHeader title="Hero Banner Configuration" isExpanded={expandedItemIndex === 'hero'} onToggle={() => setExpandedItemIndex(expandedItemIndex === 'hero' ? null : 'hero')} history={heroBannerHist} />
          {expandedItemIndex === 'hero' && (
            <div className="p-4 space-y-4 bg-white border-t border-slate-200 mt-2 rounded-b-lg">
              <IconPickerInput label="Section Icon" value={heroBannerHist.value.icon || ''} onChange={(val) => { const newD = JSON.parse(JSON.stringify(heroBannerHist.value)); newD.icon = val; heroBannerHist.update(newD); }} />
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
        <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-3 shadow-sm">
          <EditorBlockHeader title="Description Block" isExpanded={expandedItemIndex === 'desc'} onToggle={() => setExpandedItemIndex(expandedItemIndex === 'desc' ? null : 'desc')} history={descHist} />
          {expandedItemIndex === 'desc' && (
            <div className="p-4 space-y-4 bg-white border-t border-slate-200 mt-2 rounded-b-lg">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1 hover:text-slate-800 transition-colors">Hero Image <span className="text-red-500">*</span></label>
                <div
                  className="w-full h-36 bg-slate-100 rounded-lg border border-slate-300 overflow-hidden relative group cursor-pointer hover:border-emerald-500 transition-colors shadow-sm"
                  onClick={() => setMediaOpen_heroImage(true)}
                >
                  {descHist.value.heroImage ? (
                    <>
                      <img src={descHist.value.heroImage.startsWith('http') ? descHist.value.heroImage : `${API_URL}${descHist.value.heroImage.startsWith('/') ? '' : '/'}${descHist.value.heroImage}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Preview" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white font-medium drop-shadow-md bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">Click to change</span>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 group-hover:text-emerald-500 transition-colors">
                      <span className="text-2xl mb-1 transform group-hover:scale-110 transition-transform">🖼</span>
                      <span className="text-xs font-medium">Click to select image</span>
                    </div>
                  )}
                </div>
                <MediaLibraryPopup isOpen={mediaOpen_heroImage} onClose={() => setMediaOpen_heroImage(false)} onSelect={(url: string) => { const newD = JSON.parse(JSON.stringify(descHist.value)); newD.heroImage = url; descHist.update(newD); setMediaOpen_heroImage(false); }} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Description / Quote</label>
                <PhoneticInput value={descHist.value.description?.mr || ''} onChange={(val) => { const newD = JSON.parse(JSON.stringify(descHist.value)); newD.description.mr = val; descHist.update(newD); }} onEnglishChange={(val) => { const newD = JSON.parse(JSON.stringify(descHist.value)); newD.description.en = val; descHist.update(newD); }} englishValue={descHist.value.description?.en || ''} multiline />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeSection === 'sidebar') {
    return (
      <div className="pb-10 space-y-4">
        {/* Stats List */}
        <div className="px-1 mb-2 mt-4 border-t border-slate-200 pt-4">
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

        {/* Contact Info Section */}
        <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-3 shadow-sm mt-8">
          <EditorBlockHeader 
            title="Contact Section Style" 
            isExpanded={expandedItemIndex === 'contact_header'} 
            onToggle={() => setExpandedItemIndex(expandedItemIndex === 'contact_header' ? null : 'contact_header')} 
            history={contactHeaderHist}
          />
          {expandedItemIndex === 'contact_header' && (
            <div className="p-4 space-y-4 bg-white border-t border-slate-200 mt-2 rounded-b-lg">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Section Title</label>
                <PhoneticInput 
                  value={contactHeaderHist.value.title?.mr || ''} 
                  onChange={(val) => { const newD = JSON.parse(JSON.stringify(contactHeaderHist.value)); newD.title.mr = val; contactHeaderHist.update(newD); }} 
                  onEnglishChange={(val) => { const newD = JSON.parse(JSON.stringify(contactHeaderHist.value)); newD.title.en = val; contactHeaderHist.update(newD); }} 
                  englishValue={contactHeaderHist.value.title?.en || ''} 
                />
              </div>
              <IconPickerInput 
                label="Section Icon" 
                value={contactHeaderHist.value.icon || ''} 
                onChange={(val) => { const newD = JSON.parse(JSON.stringify(contactHeaderHist.value)); newD.icon = val; contactHeaderHist.update(newD); }} 
              />
              <div className="border-t border-slate-200 pt-4 mt-4">
                <div className="px-1 mb-2">
                  <h3 className="text-sm font-bold text-slate-700">Contact Details List</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{initialContactInfo.length} item(s)</p>
                </div>
                <div className="space-y-2">
                  <button onClick={() => addArrayItem('contactInfo', { value: { mr: '', en: '' }, icon: '' })} className="mb-4 px-4 py-3 bg-indigo-50/50 border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 rounded-lg text-sm font-bold shadow-sm transition-all duration-200 w-full flex justify-center items-center gap-2 shadow-indigo-100/50">
                    <Plus size={16} /> Add Contact Item
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

  if (activeSection === 'keyFunctions') {
    return (
      <div className="pb-10 space-y-4">
        <div className="px-1 mb-2">
          <h3 className="text-sm font-bold text-slate-700">Key Functions List</h3>
          <p className="text-xs text-slate-500 mt-0.5">{(safeData.keyFunctions || []).length} item(s)</p>
        </div>
        <div className="space-y-2">
          <button onClick={() => addArrayItem('keyFunctions', { title: { mr: '', en: '' }, desc: { mr: '', en: '' }, icon: '' })} className="mb-4 px-4 py-3 bg-indigo-50/50 border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 rounded-lg text-sm font-bold shadow-sm transition-all duration-200 w-full flex justify-center items-center gap-2 shadow-indigo-100/50">
            <Plus size={16} /> Add Key Functions Item
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
    );
  }

  return <div className="p-4 text-center text-slate-500">Select a section to edit</div>;
};
