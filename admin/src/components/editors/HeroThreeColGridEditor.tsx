import React, { useState, useEffect } from 'react';
import { EditorBlockHeader } from '../EditorLayout';
import { IconPickerInput } from './shared/IconPickerInput';
import { PhoneticInput } from '../PhoneticInput';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { useBlockHistory } from '../../hooks/useBlockHistory';
import { MediaLibraryPopup } from '../MediaLibraryPopup';

interface HeroThreeColGridEditorProps {
  data: any;
  updateData: (data: any) => void;
  blockId: string;
  expandedSection?: string | null;
}

const ProductionStatsEditorItem = ({ index, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, isExpanded, onToggle }: any) => {
  const defaultItem = { value: '', label: { mr: '', en: '' }, unit: '' };
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
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Title</label>
            <PhoneticInput 
              value={typeof currentItem.value === 'object' ? currentItem.value?.mr || '' : currentItem.value || ''} 
              onChange={(val) => handleLocalUpdate('value', { ...(typeof currentItem.value === 'object' ? currentItem.value : { mr: currentItem.value || '', en: currentItem.value || '' }), mr: val })} 
              onEnglishChange={(val) => handleLocalUpdate('value', { ...(typeof currentItem.value === 'object' ? currentItem.value : { mr: currentItem.value || '', en: currentItem.value || '' }), en: val })} 
              englishValue={typeof currentItem.value === 'object' ? currentItem.value?.en || '' : currentItem.value || ''} 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Subtitle</label>
            <PhoneticInput 
              value={typeof currentItem.unit === 'object' ? currentItem.unit?.mr || '' : currentItem.unit || ''} 
              onChange={(val) => handleLocalUpdate('unit', { ...(typeof currentItem.unit === 'object' ? currentItem.unit : { mr: currentItem.unit || '', en: currentItem.unit || '' }), mr: val })} 
              onEnglishChange={(val) => handleLocalUpdate('unit', { ...(typeof currentItem.unit === 'object' ? currentItem.unit : { mr: currentItem.unit || '', en: currentItem.unit || '' }), en: val })} 
              englishValue={typeof currentItem.unit === 'object' ? currentItem.unit?.en || '' : currentItem.unit || ''} 
            />
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

const ActiveProjectsEditorItem = ({ index, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, isExpanded, onToggle }: any) => {
  const defaultItem = { image: '', title: { mr: '', en: '' }, desc: { mr: '', en: '' } };
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

export const HeroThreeColGridEditor: React.FC<HeroThreeColGridEditorProps> = ({ data, updateData, blockId, expandedSection }) => {
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
    safeData.sectionHeaders?.production || {},
    (newVal: any) => handleChange('sectionHeaders', { ...safeData.sectionHeaders, production: newVal })
  );

  const impactHeaderHist = useBlockHistory(
    { title: { mr: '', en: '' }, icon: '' },
    safeData.sectionHeaders?.impact || {},
    (newVal: any) => handleChange('sectionHeaders', { ...safeData.sectionHeaders, impact: newVal })
  );

  const impactStatementHist = useBlockHistory(
    { mr: '', en: '' },
    typeof safeData.impactStatement === 'object' ? safeData.impactStatement : { mr: safeData.impactStatement || '', en: safeData.impactStatement || '' },
    (newVal: any) => handleChange('impactStatement', newVal)
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
              <div className="mb-6 p-4 border border-emerald-100 bg-emerald-50/50 rounded-lg space-y-4">
                <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">Badge Configuration</h4>
                <IconPickerInput 
                  label="Badge Icon" 
                  value={heroBadgeHist.value.icon || ''} 
                  onChange={(val) => { const n = { ...heroBadgeHist.value, icon: val }; heroBadgeHist.update(n); }} 
                />
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Badge Title</label>
                  <PhoneticInput 
                    value={heroBadgeHist.value.title?.mr || ''} 
                    onChange={(val) => { const n = { ...heroBadgeHist.value, title: { ...heroBadgeHist.value.title, mr: val } }; heroBadgeHist.update(n); }} 
                    onEnglishChange={(val) => { const n = { ...heroBadgeHist.value, title: { ...heroBadgeHist.value.title, en: val } }; heroBadgeHist.update(n); }} 
                    englishValue={heroBadgeHist.value.title?.en || ''} 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Title</label>
                <PhoneticInput value={heroContentHist.value.title?.mr || ''} onChange={(val) => { const n = { ...heroContentHist.value, title: { ...heroContentHist.value.title, mr: val } }; heroContentHist.update(n); }} onEnglishChange={(val) => { const n = { ...heroContentHist.value, title: { ...heroContentHist.value.title, en: val } }; heroContentHist.update(n); }} englishValue={heroContentHist.value.title?.en || ''} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Subtitle</label>
                <PhoneticInput value={heroContentHist.value.subtitle?.mr || ''} onChange={(val) => { const n = { ...heroContentHist.value, subtitle: { ...heroContentHist.value.subtitle, mr: val } }; heroContentHist.update(n); }} onEnglishChange={(val) => { const n = { ...heroContentHist.value, subtitle: { ...heroContentHist.value.subtitle, en: val } }; heroContentHist.update(n); }} englishValue={heroContentHist.value.subtitle?.en || ''} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Description</label>
                <PhoneticInput value={heroContentHist.value.description?.mr || ''} onChange={(val) => { const n = { ...heroContentHist.value, description: { ...heroContentHist.value.description, mr: val } }; heroContentHist.update(n); }} onEnglishChange={(val) => { const n = { ...heroContentHist.value, description: { ...heroContentHist.value.description, en: val } }; heroContentHist.update(n); }} englishValue={heroContentHist.value.description?.en || ''} multiline />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Hero Image</label>
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
                  onSelect={(url: string) => { const n = { ...heroContentHist.value, heroImage: url }; heroContentHist.update(n); setMediaOpen_heroImage(false); }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeSection === 'productionStats') {
    return (
      <div className="pb-10 space-y-4">


        <div className="px-1 mb-2">
          <h3 className="text-sm font-bold text-slate-700">Production Stats</h3>
          <p className="text-xs text-slate-500 mt-0.5">{(safeData.productionStats || []).length} item(s)</p>
        </div>
        <div className="space-y-2">
          {(safeData.productionStats || []).map((item: any, index: number) => (
            <ProductionStatsEditorItem
              key={`item-${index}`} index={index} itemData={item}
              onUpdateFull={(i: number, newD: any) => updateArrayItemFull('productionStats', i, newD)}
              onRemove={() => removeArrayItem('productionStats', index)}
              onMoveUp={() => moveArrayItem('productionStats', index, -1)}
              onMoveDown={() => moveArrayItem('productionStats', index, 1)}
              isFirst={index === 0} isLast={index === (safeData.productionStats || []).length - 1}
              isExpanded={expandedItemIndex === index}
              onToggle={() => setExpandedItemIndex(expandedItemIndex === index ? -1 : index)}
            />
          ))}
          <button onClick={() => addArrayItem('productionStats', { value: { mr: '', en: '' }, label: { mr: '', en: '' }, unit: { mr: '', en: '' } })} className="mt-4 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors w-full flex justify-center items-center gap-2">
            <Plus size={16} /> Add Production Stats Item
          </button>
        </div>
      </div>
    );
  }

  if (activeSection === 'activeProjects') {
    return (
      <div className="pb-10 space-y-4">


        <div className="px-1 mb-2">
          <h3 className="text-sm font-bold text-slate-700">Active Projects</h3>
          <p className="text-xs text-slate-500 mt-0.5">{(safeData.activeProjects || []).length} item(s)</p>
        </div>
        <div className="space-y-2">
          {(safeData.activeProjects || []).map((item: any, index: number) => (
            <ActiveProjectsEditorItem
              key={`item-${index}`} index={index} itemData={item}
              onUpdateFull={(i: number, newD: any) => updateArrayItemFull('activeProjects', i, newD)}
              onRemove={() => removeArrayItem('activeProjects', index)}
              onMoveUp={() => moveArrayItem('activeProjects', index, -1)}
              onMoveDown={() => moveArrayItem('activeProjects', index, 1)}
              isFirst={index === 0} isLast={index === (safeData.activeProjects || []).length - 1}
              isExpanded={expandedItemIndex === index}
              onToggle={() => setExpandedItemIndex(expandedItemIndex === index ? -1 : index)}
            />
          ))}
          <button onClick={() => addArrayItem('activeProjects', { image: '', title: { mr: '', en: '' }, desc: { mr: '', en: '' } })} className="mt-4 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors w-full flex justify-center items-center gap-2">
            <Plus size={16} /> Add Active Projects Item
          </button>
        </div>
      </div>
    );
  }

  if (activeSection === 'impactStatement') {
    return (
      <div className="pb-10 space-y-4">

        <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-4 shadow-sm">
          <EditorBlockHeader 
            title="Impact Header Configuration" 
            isExpanded={!!expandedFixedBlocks['impactStatement_header']} 
            onToggle={() => toggleFixedBlock('impactStatement_header')}
            history={impactHeaderHist} 
          />
          {!!expandedFixedBlocks['impactStatement_header'] && (
            <div className="p-4 space-y-4 bg-white border-t border-slate-200 mt-2 rounded-b-lg">
              <IconPickerInput 
                label="Section Icon" 
                value={impactHeaderHist.value.icon || ''} 
                onChange={(val) => { const n = { ...impactHeaderHist.value, icon: val }; impactHeaderHist.update(n); }} 
              />
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Section Title</label>
                <PhoneticInput 
                  value={impactHeaderHist.value.title?.mr || ''} 
                  onChange={(val) => { const n = { ...impactHeaderHist.value, title: { ...impactHeaderHist.value.title, mr: val } }; impactHeaderHist.update(n); }} 
                  onEnglishChange={(val) => { const n = { ...impactHeaderHist.value, title: { ...impactHeaderHist.value.title, en: val } }; impactHeaderHist.update(n); }} 
                  englishValue={impactHeaderHist.value.title?.en || ''} 
                />
              </div>
            </div>
          )}
        </div>

        <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-4 shadow-sm">
          <EditorBlockHeader 
            title="Impact Statement Text" 
            isExpanded={expandedFixedBlocks['impactStatement_content'] !== false} 
            onToggle={() => toggleFixedBlock('impactStatement_content')}
            history={impactStatementHist} 
          />
          {expandedFixedBlocks['impactStatement_content'] !== false && (
            <div className="p-4 space-y-4 bg-white border-t border-slate-200 mt-2 rounded-b-lg">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Statement</label>
                <PhoneticInput 
                  value={impactStatementHist.value.mr || ''} 
                  onChange={(val) => { const n = { ...impactStatementHist.value, mr: val }; impactStatementHist.update(n); }} 
                  onEnglishChange={(val) => { const n = { ...impactStatementHist.value, en: val }; impactStatementHist.update(n); }} 
                  englishValue={impactStatementHist.value.en || ''} 
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
