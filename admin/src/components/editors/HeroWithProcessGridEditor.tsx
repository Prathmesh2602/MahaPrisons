import React, { useState, useEffect } from 'react';
import { EditorBlockHeader } from '../EditorLayout';
import { IconPickerInput } from './shared/IconPickerInput';
import { PhoneticInput } from '../PhoneticInput';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { useBlockHistory } from '../../hooks/useBlockHistory';
import { MediaLibraryPopup } from '../MediaLibraryPopup';

interface HeroWithProcessGridEditorProps {
  data: any;
  updateData: (data: any) => void;
  blockId: string;
  expandedSection?: string | null;
}

const StatsEditorItem = ({ index, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, isExpanded, onToggle }: any) => {
  const defaultItem = { value: '', label: { mr: '', en: '' }, isText: false };
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
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Value</label>
            <input type="text" value={currentItem.value || ''} onChange={(e) => handleLocalUpdate('value', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm" />
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

const TechnicalFocusEditorItem = ({ index, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, isExpanded, onToggle }: any) => {
  const defaultItem = { title: { mr: '', en: '' }, description: { mr: '', en: '' }, icon: 'CheckCircle2' };
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
          <IconPickerInput label="Icon" value={currentItem.icon || 'CheckCircle2'} onChange={(val) => handleLocalUpdate('icon', val)} />
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

export const HeroWithProcessGridEditor: React.FC<HeroWithProcessGridEditorProps> = ({ data, updateData, blockId, expandedSection }) => {
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

  // Migrations
  if (!safeData.hero) safeData.hero = {};
  if (!safeData.hero.title && safeData.title) safeData.hero.title = safeData.title;
  if (!safeData.hero.subtitle && safeData.subtitle) safeData.hero.subtitle = safeData.subtitle;
  if (!safeData.hero.description && safeData.description) safeData.hero.description = safeData.description;
  if (!safeData.hero.heroImage && safeData.heroImage) safeData.hero.heroImage = safeData.heroImage;

  if (!safeData.hero.floatingBadge) safeData.hero.floatingBadge = { icon: 'TrendingUp', title: { mr: 'कौशल्य विकास', en: 'Skill Development' }, value: { mr: '100% Practical', en: '100% Practical' } };

  if (!safeData.sectionHeaders) safeData.sectionHeaders = {};
  if (!safeData.sectionHeaders.partnership) safeData.sectionHeaders.partnership = { title: { mr: 'औद्योगिक भागीदारी', en: 'Industrial Partnership' }, icon: 'Factory' };
  else if (!safeData.sectionHeaders.partnership.icon) safeData.sectionHeaders.partnership.icon = 'Factory';
  if (!safeData.sectionHeaders.stats) safeData.sectionHeaders.stats = { title: { mr: 'प्रकल्पाची ठळक वैशिष्ट्ये', en: 'Project Highlights' } };
  if (!safeData.sectionHeaders.technicalFocus) safeData.sectionHeaders.technicalFocus = { title: { mr: 'तांत्रिक प्रशिक्षण क्षेत्रे', en: 'Technical Training Areas' }, icon: 'Settings' };
  else if (!safeData.sectionHeaders.technicalFocus.icon) safeData.sectionHeaders.technicalFocus.icon = 'Settings';

  if (safeData.technicalFocus && safeData.technicalFocus.length > 0) {
    if (safeData.technicalFocus[0].mr !== undefined && safeData.technicalFocus[0].title === undefined) {
      safeData.technicalFocus = safeData.technicalFocus.map((item: any) => ({
        title: { mr: item.mr || '', en: item.en || '' },
        description: { mr: 'उद्योग मानकांनुसार व्यावसायिक प्रशिक्षण.', en: 'Professional training as per industry standards.' },
        icon: 'CheckCircle2'
      }));
    }
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
          />
          {!!expandedFixedBlocks['hero_content'] && (
            <div className="p-4 space-y-4 bg-white border-t border-slate-200 mt-2 rounded-b-lg">
              
              {/* Partnership Badge */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-4">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Industrial Partnership Badge</h4>
                <IconPickerInput 
                  label="Badge Icon" 
                  value={safeData.sectionHeaders?.partnership?.icon || 'Factory'} 
                  onChange={(val) => handleChange('sectionHeaders', { ...safeData.sectionHeaders, partnership: { ...(safeData.sectionHeaders?.partnership || {}), icon: val } })} 
                />
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Badge Title</label>
                  <PhoneticInput 
                    value={safeData.sectionHeaders?.partnership?.title?.mr || ''} 
                    onChange={(val) => handleChange('sectionHeaders', { ...safeData.sectionHeaders, partnership: { ...(safeData.sectionHeaders?.partnership || {}), title: { ...(safeData.sectionHeaders?.partnership?.title || {}), mr: val } } })} 
                    onEnglishChange={(val) => handleChange('sectionHeaders', { ...safeData.sectionHeaders, partnership: { ...(safeData.sectionHeaders?.partnership || {}), title: { ...(safeData.sectionHeaders?.partnership?.title || {}), en: val } } })} 
                    englishValue={safeData.sectionHeaders?.partnership?.title?.en || ''} 
                  />
                </div>
              </div>

              {/* Main Content */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Title</label>
                <PhoneticInput value={safeData.hero?.title?.mr || ''} onChange={(val) => handleChange('hero', { ...safeData.hero, title: { ...safeData.hero?.title, mr: val } })} onEnglishChange={(val) => handleChange('hero', { ...safeData.hero, title: { ...safeData.hero?.title, en: val } })} englishValue={safeData.hero?.title?.en || ''} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Subtitle</label>
                <PhoneticInput value={safeData.hero?.subtitle?.mr || ''} onChange={(val) => handleChange('hero', { ...safeData.hero, subtitle: { ...safeData.hero?.subtitle, mr: val } })} onEnglishChange={(val) => handleChange('hero', { ...safeData.hero, subtitle: { ...safeData.hero?.subtitle, en: val } })} englishValue={safeData.hero?.subtitle?.en || ''} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Description</label>
                <PhoneticInput value={safeData.hero?.description?.mr || ''} onChange={(val) => handleChange('hero', { ...safeData.hero, description: { ...safeData.hero?.description, mr: val } })} onEnglishChange={(val) => handleChange('hero', { ...safeData.hero, description: { ...safeData.hero?.description, en: val } })} englishValue={safeData.hero?.description?.en || ''} multiline />
              </div>

              {/* Image & Floating Badge */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Hero Image</label>
                  <div
                    className="w-full h-36 bg-slate-100 rounded-lg border border-slate-300 overflow-hidden relative group cursor-pointer"
                    onClick={() => setMediaOpen_heroImage(true)}
                  >
                    {safeData.hero?.heroImage ? (
                      <img
                        src={safeData.hero.heroImage.startsWith('http') ? safeData.hero.heroImage : `http://localhost:5000${safeData.hero.heroImage.startsWith('/') ? '' : '/'}${safeData.hero.heroImage}`}
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
                    onSelect={(url: string) => { handleChange('hero', { ...safeData.hero, heroImage: url }); setMediaOpen_heroImage(false); }}
                  />
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-4">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Floating Image Badge</h4>
                  <IconPickerInput 
                    label="Badge Icon" 
                    value={safeData.hero?.floatingBadge?.icon || 'TrendingUp'} 
                    onChange={(val) => handleChange('hero', { ...safeData.hero, floatingBadge: { ...(safeData.hero?.floatingBadge || {}), icon: val } })} 
                  />
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Badge Title</label>
                    <PhoneticInput 
                      value={safeData.hero?.floatingBadge?.title?.mr || ''} 
                      onChange={(val) => handleChange('hero', { ...safeData.hero, floatingBadge: { ...(safeData.hero?.floatingBadge || {}), title: { ...(safeData.hero?.floatingBadge?.title || {}), mr: val } } })} 
                      onEnglishChange={(val) => handleChange('hero', { ...safeData.hero, floatingBadge: { ...(safeData.hero?.floatingBadge || {}), title: { ...(safeData.hero?.floatingBadge?.title || {}), en: val } } })} 
                      englishValue={safeData.hero?.floatingBadge?.title?.en || ''} 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Badge Value</label>
                    <PhoneticInput 
                      value={safeData.hero?.floatingBadge?.value?.mr || ''} 
                      onChange={(val) => handleChange('hero', { ...safeData.hero, floatingBadge: { ...(safeData.hero?.floatingBadge || {}), value: { ...(safeData.hero?.floatingBadge?.value || {}), mr: val } } })} 
                      onEnglishChange={(val) => handleChange('hero', { ...safeData.hero, floatingBadge: { ...(safeData.hero?.floatingBadge || {}), value: { ...(safeData.hero?.floatingBadge?.value || {}), en: val } } })} 
                      englishValue={safeData.hero?.floatingBadge?.value?.en || ''} 
                    />
                  </div>
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

        <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-4 shadow-sm">
          <EditorBlockHeader 
            title="Section Header Configuration (Optional)" 
            isExpanded={!!expandedFixedBlocks['stats_header']} 
            onToggle={() => toggleFixedBlock('stats_header')} 
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
            </div>
          )}
        </div>
        <div className="px-1 mb-2">
          <h3 className="text-sm font-bold text-slate-700">Stats</h3>
          <p className="text-xs text-slate-500 mt-0.5">{(safeData.stats || []).length} item(s)</p>
        </div>
        <div className="space-y-2">
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
          <button onClick={() => addArrayItem('stats', { value: '', label: { mr: '', en: '' }, isText: false })} className="mt-4 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors w-full flex justify-center items-center gap-2">
            <Plus size={16} /> Add Stats Item
          </button>
        </div>
      </div>
    );
  }

  if (activeSection === 'technicalFocus') {
    return (
      <div className="pb-10 space-y-4">

        <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-4 shadow-sm">
          <EditorBlockHeader 
            title="Section Header Configuration (Optional)" 
            isExpanded={!!expandedFixedBlocks['technicalFocus_header']} 
            onToggle={() => toggleFixedBlock('technicalFocus_header')} 
          />
          {!!expandedFixedBlocks['technicalFocus_header'] && (
            <div className="p-4 space-y-4 bg-white border-t border-slate-200 mt-2 rounded-b-lg">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Section Title</label>
                <PhoneticInput 
                  value={safeData.sectionHeaders?.technicalFocus?.title?.mr || ''} 
                  onChange={(val) => handleChange('sectionHeaders', { ...safeData.sectionHeaders, technicalFocus: { ...(safeData.sectionHeaders?.technicalFocus || {}), title: { ...(safeData.sectionHeaders?.technicalFocus?.title || {}), mr: val } } })} 
                  onEnglishChange={(val) => handleChange('sectionHeaders', { ...safeData.sectionHeaders, technicalFocus: { ...(safeData.sectionHeaders?.technicalFocus || {}), title: { ...(safeData.sectionHeaders?.technicalFocus?.title || {}), en: val } } })} 
                  englishValue={safeData.sectionHeaders?.technicalFocus?.title?.en || ''} 
                />
              </div>
              <IconPickerInput 
                label="Section Icon" 
                value={safeData.sectionHeaders?.technicalFocus?.icon || ''} 
                onChange={(val) => handleChange('sectionHeaders', { ...safeData.sectionHeaders, technicalFocus: { ...(safeData.sectionHeaders?.technicalFocus || {}), icon: val } })} 
              />
            </div>
          )}
        </div>
        <div className="px-1 mb-2">
          <h3 className="text-sm font-bold text-slate-700">Technical Focus</h3>
          <p className="text-xs text-slate-500 mt-0.5">{(safeData.technicalFocus || []).length} item(s)</p>
        </div>
        <div className="space-y-2">
          {(safeData.technicalFocus || []).map((item: any, index: number) => (
            <TechnicalFocusEditorItem
              key={`item-${index}`} index={index} itemData={item}
              onUpdateFull={(i: number, newD: any) => updateArrayItemFull('technicalFocus', i, newD)}
              onRemove={() => removeArrayItem('technicalFocus', index)}
              onMoveUp={() => moveArrayItem('technicalFocus', index, -1)}
              onMoveDown={() => moveArrayItem('technicalFocus', index, 1)}
              isFirst={index === 0} isLast={index === (safeData.technicalFocus || []).length - 1}
              isExpanded={expandedItemIndex === index}
              onToggle={() => setExpandedItemIndex(expandedItemIndex === index ? -1 : index)}
            />
          ))}
          <button onClick={() => addArrayItem('technicalFocus', { mr: '', en: '' })} className="mt-4 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors w-full flex justify-center items-center gap-2">
            <Plus size={16} /> Add Technical Focus Item
          </button>
        </div>
      </div>
    );
  }

  return <div className="p-4 text-center text-slate-500">Select a section to edit</div>;
};
