import React, { useState, useEffect } from 'react';
import { EditorBlockHeader } from '../EditorLayout';
import { IconPickerInput } from './shared/IconPickerInput';
import { PhoneticInput } from '../PhoneticInput';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { useBlockHistory } from '../../hooks/useBlockHistory';
import { MediaLibraryPopup } from '../MediaLibraryPopup';
import { API_URL } from '../../config/api';


interface HeroBannerWithMediaEditorProps {
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
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Value (Title)</label>
            <input type="text" value={currentItem.value || ''} onChange={(e) => handleLocalUpdate('value', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Label (Subtitle)</label>
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

const ContactInfoEditorItem = ({ index, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, isExpanded, onToggle }: any) => {
  const defaultItem = { text: { mr: '', en: '' }, icon: '' };
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
        title={currentItem.text?.mr || currentItem.text?.en || `Item ${index + 1}`}
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
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Text</label>
            <PhoneticInput value={currentItem.text?.mr || ''} onChange={(val) => handleLocalUpdate('text', { ...currentItem.text, mr: val })} onEnglishChange={(val) => handleLocalUpdate('text', { ...currentItem.text, en: val })} englishValue={currentItem.text?.en || ''} multiline />
          </div>
          <IconPickerInput label="Icon" value={currentItem.icon || ''} onChange={(val) => handleLocalUpdate('icon', val)} />
        </div>
      )}
    </div>
  );
};

export const HeroBannerWithMediaEditor: React.FC<HeroBannerWithMediaEditorProps> = ({ data, updateData, blockId, expandedSection }) => {
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

  // Pre-seed Migration (CRITICAL)
  if (!safeData.sectionHeaders) safeData.sectionHeaders = {};
  if (!safeData.sectionHeaders.keyFunctions) safeData.sectionHeaders.keyFunctions = { title: { en: 'Key Functions', mr: 'प्रमुख कार्ये' }, icon: 'List' };
  if (!safeData.sectionHeaders.contactInfo) safeData.sectionHeaders.contactInfo = { title: { en: 'Contact Information', mr: 'संपर्क माहिती' }, icon: 'Phone' };

  if (Array.isArray(safeData.stats)) {
    safeData.stats = safeData.stats.map((item: any) => ({ ...item, icon: item.icon || 'Cpu' }));
  }
  if (Array.isArray(safeData.keyFunctions)) {
    safeData.keyFunctions = safeData.keyFunctions.map((item: any) => ({ ...item, icon: item.icon || 'PhoneCall' }));
  }
  
  if (safeData.contactInfo && !Array.isArray(safeData.contactInfo)) {
    const newContactInfo = [];
    if (safeData.contactInfo.address) newContactInfo.push({ icon: 'MapPin', text: typeof safeData.contactInfo.address === 'string' ? { en: safeData.contactInfo.address, mr: safeData.contactInfo.address } : safeData.contactInfo.address });
    if (safeData.contactInfo.phone) newContactInfo.push({ icon: 'Phone', text: { en: safeData.contactInfo.phone, mr: safeData.contactInfo.phone } });
    if (safeData.contactInfo.email) newContactInfo.push({ icon: 'Mail', text: { en: safeData.contactInfo.email, mr: safeData.contactInfo.email } });
    safeData.contactInfo = newContactInfo;
  } else if (Array.isArray(safeData.contactInfo)) {
    safeData.contactInfo = safeData.contactInfo.map((item: any) => ({ ...item, icon: item.icon || 'Info' }));
  }

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
    handleChange(field, [defaultItem, ...arr]);
    setExpandedItemIndex(arr.length);
  };

  if (activeSection === 'hero') {
    return (
      <div className="pb-10 space-y-4">
        <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-3 shadow-sm">
          <EditorBlockHeader 
            title="Header Block" 
            isExpanded={!!expandedFixedBlocks['hero_header']} 
            onToggle={() => toggleFixedBlock('hero_header')} 
          />
          {!!expandedFixedBlocks['hero_header'] && (
            <div className="p-4 space-y-4 bg-white border-t border-slate-200 mt-2 rounded-b-lg">
              <IconPickerInput 
                label="Header Badge Icon" 
                value={safeData.sectionHeaders?.heroBadge?.icon || 'Cpu'} 
                onChange={(val) => handleChange('sectionHeaders', { ...safeData.sectionHeaders, heroBadge: { ...(safeData.sectionHeaders?.heroBadge || {}), icon: val } })} 
              />
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Title</label>
                <PhoneticInput value={safeData.hero?.title?.mr || ''} onChange={(val) => handleChange('hero', { ...safeData.hero, title: { ...safeData.hero?.title, mr: val } })} onEnglishChange={(val) => handleChange('hero', { ...safeData.hero, title: { ...safeData.hero?.title, en: val } })} englishValue={safeData.hero?.title?.en || ''} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Subtitle</label>
                <PhoneticInput value={safeData.hero?.subtitle?.mr || ''} onChange={(val) => handleChange('hero', { ...safeData.hero, subtitle: { ...safeData.hero?.subtitle, mr: val } })} onEnglishChange={(val) => handleChange('hero', { ...safeData.hero, subtitle: { ...safeData.hero?.subtitle, en: val } })} englishValue={safeData.hero?.subtitle?.en || ''} />
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
        <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-3 shadow-sm">
          <EditorBlockHeader 
            title="Image Block" 
            isExpanded={!!expandedFixedBlocks['hero_image']} 
            onToggle={() => toggleFixedBlock('hero_image')} 
          />
          {!!expandedFixedBlocks['hero_image'] && (
            <div className="p-4 space-y-4 bg-white border-t border-slate-200 mt-2 rounded-b-lg">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Hero Image</label>
                <div
                  className="w-full h-36 bg-slate-100 rounded-lg border border-slate-300 overflow-hidden relative group cursor-pointer"
                  onClick={() => setMediaOpen_heroImage(true)}
                >
                  {safeData.hero?.heroImage ? (
                    <>
                      <img
                        src={safeData.hero.heroImage.startsWith('http') ? safeData.hero.heroImage : `${API_URL}${safeData.hero.heroImage.startsWith('/') ? '' : '/'}${safeData.hero.heroImage}`}
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
            </div>
          )}
        </div>

        <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-3 shadow-sm">
          <EditorBlockHeader 
            title="Description Block" 
            isExpanded={!!expandedFixedBlocks['hero_desc']} 
            onToggle={() => toggleFixedBlock('hero_desc')} 
          />
          {!!expandedFixedBlocks['hero_desc'] && (
            <div className="p-4 space-y-4 bg-white border-t border-slate-200 mt-2 rounded-b-lg">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Description</label>
                <PhoneticInput value={safeData.hero?.description?.mr || ''} onChange={(val) => handleChange('hero', { ...safeData.hero, description: { ...safeData.hero?.description, mr: val } })} onEnglishChange={(val) => handleChange('hero', { ...safeData.hero, description: { ...safeData.hero?.description, en: val } })} englishValue={safeData.hero?.description?.en || ''} multiline />
              </div>
              
              <div className="mt-8 border-t border-slate-200 pt-6">
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
                      onToggle={() => setExpandedItemIndex(expandedItemIndex === index ? -1 : index)}
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

        <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-4 shadow-sm">
          <EditorBlockHeader 
            title="Section Header Configuration (Optional)" 
            isExpanded={!!expandedFixedBlocks['keyFunctions_header']} 
            onToggle={() => toggleFixedBlock('keyFunctions_header')} 
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
            </div>
          )}
        </div>
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
              onToggle={() => setExpandedItemIndex(expandedItemIndex === index ? -1 : index)}
            />
          ))}

        </div>
      </div>
    );
  }

  if (activeSection === 'contactInfo') {
    return (
      <div className="pb-10 space-y-4">
        <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-4 shadow-sm">
          <EditorBlockHeader 
            title="Section Header Configuration (Optional)" 
            isExpanded={!!expandedFixedBlocks['contactInfo_header']} 
            onToggle={() => toggleFixedBlock('contactInfo_header')} 
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
            </div>
          )}
        </div>
        <div className="px-1 mb-2">
          <h3 className="text-sm font-bold text-slate-700">Contact Information</h3>
          <p className="text-xs text-slate-500 mt-0.5">{(safeData.contactInfo || []).length} item(s)</p>
        </div>
        <div className="space-y-2">
          <button onClick={() => addArrayItem('contactInfo', { text: { mr: '', en: '' }, icon: '' })} className="mb-4 px-4 py-3 bg-indigo-50/50 border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 rounded-lg text-sm font-bold shadow-sm transition-all duration-200 w-full flex justify-center items-center gap-2 shadow-indigo-100/50">
            <Plus size={16} /> Add Contact Item
          </button>
          {(safeData.contactInfo || []).map((item: any, index: number) => (
            <ContactInfoEditorItem
              key={`item-${index}`} index={index} itemData={item}
              onUpdateFull={(i: number, newD: any) => updateArrayItemFull('contactInfo', i, newD)}
              onRemove={() => removeArrayItem('contactInfo', index)}
              onMoveUp={() => moveArrayItem('contactInfo', index, -1)}
              onMoveDown={() => moveArrayItem('contactInfo', index, 1)}
              isFirst={index === 0} isLast={index === (safeData.contactInfo || []).length - 1}
              isExpanded={expandedItemIndex === index}
              onToggle={() => setExpandedItemIndex(expandedItemIndex === index ? -1 : index)}
            />
          ))}

        </div>
      </div>
    );
  }

  return <div className="p-4 text-center text-slate-500">Select a section to edit</div>;
};
