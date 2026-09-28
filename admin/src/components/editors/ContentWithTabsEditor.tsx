import React, { useState, useEffect } from 'react';
import { EditorBlockHeader } from '../EditorLayout';
import { IconPickerInput } from './shared/IconPickerInput';
import { PhoneticInput } from '../PhoneticInput';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { useBlockHistory } from '../../hooks/useBlockHistory';
import { MediaLibraryPopup } from '../MediaLibraryPopup';

interface ContentWithTabsEditorProps {
  data: any;
  updateData: (data: any) => void;
  blockId: string;
  expandedSection?: string | null;
}

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

export const ContentWithTabsEditor: React.FC<ContentWithTabsEditorProps> = ({ data, updateData, blockId, expandedSection }) => {
  const [expandedItemIndex, setExpandedItemIndex] = useState<number | string | null>(0);
  const activeSection = (expandedSection || 'hero').replace('template_', '');

  useEffect(() => {
    setExpandedItemIndex(0);
  }, [activeSection]);

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

  const heroBannerHist = useBlockHistory(
    { title: { mr: '', en: '' }, subtitle: { mr: '', en: '' }, description: { mr: '', en: '' }, icon: 'GraduationCap' },
    { 
      title: safeData.hero?.title || safeData.title || { mr: '', en: '' }, 
      subtitle: safeData.hero?.subtitle || safeData.subtitle || { mr: '', en: '' },
      description: safeData.hero?.description || safeData.description || { mr: '', en: '' },
      icon: safeData.sectionHeaders?.hero?.icon || 'GraduationCap'
    },
    (newData: any) => {
       handleChange('hero', { ...safeData.hero, title: newData.title, subtitle: newData.subtitle, description: newData.description });
       handleChange('sectionHeaders', { ...safeData.sectionHeaders, hero: { ...(safeData.sectionHeaders?.hero || {}), icon: newData.icon } });
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

  if (activeSection === 'hero') {
    return (
      <div className="pb-10 space-y-4">
        <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-3 shadow-sm">
          <EditorBlockHeader title="Hero Banner Configuration" isExpanded={expandedItemIndex === 'hero'} onToggle={() => setExpandedItemIndex(expandedItemIndex === 'hero' ? null : 'hero')} history={heroBannerHist} />
          {expandedItemIndex === 'hero' && (
            <div className="p-4 space-y-4 bg-white border-t border-slate-200 mt-2 rounded-b-lg">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Title</label>
                <PhoneticInput value={heroBannerHist.value.title?.mr || ''} onChange={(val) => { const newD = JSON.parse(JSON.stringify(heroBannerHist.value)); newD.title.mr = val; heroBannerHist.update(newD); }} onEnglishChange={(val) => { const newD = JSON.parse(JSON.stringify(heroBannerHist.value)); newD.title.en = val; heroBannerHist.update(newD); }} englishValue={heroBannerHist.value.title?.en || ''} />
              </div>
              <IconPickerInput 
                label="Hero Icon" 
                value={heroBannerHist.value.icon || ''} 
                onChange={(val) => { const newD = JSON.parse(JSON.stringify(heroBannerHist.value)); newD.icon = val; heroBannerHist.update(newD); }} 
              />
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Subtitle</label>
                <PhoneticInput value={heroBannerHist.value.subtitle?.mr || ''} onChange={(val) => { const newD = JSON.parse(JSON.stringify(heroBannerHist.value)); newD.subtitle.mr = val; heroBannerHist.update(newD); }} onEnglishChange={(val) => { const newD = JSON.parse(JSON.stringify(heroBannerHist.value)); newD.subtitle.en = val; heroBannerHist.update(newD); }} englishValue={heroBannerHist.value.subtitle?.en || ''} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Description</label>
                <PhoneticInput value={heroBannerHist.value.description?.mr || ''} onChange={(val) => { const newD = JSON.parse(JSON.stringify(heroBannerHist.value)); newD.description.mr = val; heroBannerHist.update(newD); }} onEnglishChange={(val) => { const newD = JSON.parse(JSON.stringify(heroBannerHist.value)); newD.description.en = val; heroBannerHist.update(newD); }} englishValue={heroBannerHist.value.description?.en || ''} multiline />
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
          <h3 className="text-sm font-bold text-slate-700">Key Functions</h3>
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
              isExpanded={expandedItemIndex === index}
              onToggle={() => setExpandedItemIndex(expandedItemIndex === index ? null : index)}
            />
          ))}

        </div>
      </div>
    );
  }

  if (activeSection === 'stats') {
    return (
      <div className="pb-10 space-y-4">
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
              isExpanded={expandedItemIndex === index}
              onToggle={() => setExpandedItemIndex(expandedItemIndex === index ? null : index)}
            />
          ))}

        </div>
      </div>
    );
  }

  if (activeSection === 'contactInfo') {
    return (
      <div className="pb-10 space-y-4">
        <div className="px-1 mb-2 mt-4">
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
