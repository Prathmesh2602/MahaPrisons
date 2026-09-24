import React, { useState, useEffect } from 'react';
import { EditorBlockHeader } from '../EditorLayout';
import { IconPickerInput } from './shared/IconPickerInput';
import { PhoneticInput } from '../PhoneticInput';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { useBlockHistory } from '../../hooks/useBlockHistory';
import { MediaLibraryPopup } from '../MediaLibraryPopup';

interface HeroWithMenuGridEditorProps {
  data: any;
  updateData: (data: any) => void;
  blockId: string;
  expandedSection?: string | null;
}

const MenuHighlightsEditorItem = ({ index, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, isExpanded, onToggle }: any) => {
  const defaultItem = { mr: '', en: '' };
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
          <IconPickerInput 
            label="Item Icon" 
            value={currentItem.icon || (index % 2 === 0 ? 'Utensils' : 'Coffee')} 
            onChange={(val) => handleLocalUpdate('icon', val)} 
          />
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Marathi</label>
            <input type="text" value={currentItem.mr || ''} onChange={(e) => handleLocalUpdate('mr', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">English</label>
            <input type="text" value={currentItem.en || ''} onChange={(e) => handleLocalUpdate('en', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm" />
          </div>
        </div>
      )}
    </div>
  );
};

export const HeroWithMenuGridEditor: React.FC<HeroWithMenuGridEditorProps> = ({ data, updateData, blockId, expandedSection }) => {
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

  // Migrations
  if (!safeData.about && (safeData.description || safeData.hero?.description)) {
    safeData.about = { description: safeData.hero?.description || safeData.description };
  }
  if (!safeData.sectionHeaders?.about?.icon) {
    if (!safeData.sectionHeaders) safeData.sectionHeaders = {};
    if (!safeData.sectionHeaders.about) safeData.sectionHeaders.about = {};
    safeData.sectionHeaders.about.icon = 'HeartHandshake';
  }
  if (!safeData.sectionHeaders?.menuHighlights?.title?.mr) {
    if (!safeData.sectionHeaders) safeData.sectionHeaders = {};
    if (!safeData.sectionHeaders.menuHighlights) safeData.sectionHeaders.menuHighlights = {};
    safeData.sectionHeaders.menuHighlights.title = { mr: 'खास आकर्षणे', en: 'Menu Highlights' };
  }

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
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Hero Image</label>
                <div
                  className="w-full h-36 bg-slate-100 rounded-lg border border-slate-300 overflow-hidden relative group cursor-pointer"
                  onClick={() => setMediaOpen_heroImage(true)}
                >
                  {safeData.heroImage || safeData.hero?.heroImage ? (
                    <>
                      <img
                        src={(safeData.heroImage || safeData.hero?.heroImage).startsWith('http') ? (safeData.heroImage || safeData.hero?.heroImage) : `http://localhost:5000${(safeData.heroImage || safeData.hero?.heroImage).startsWith('/') ? '' : '/'}${(safeData.heroImage || safeData.hero?.heroImage)}`}
                        className="w-full h-full object-cover"
                        alt="Preview"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-sm font-medium">Click to change</span>
                      </div>
                    </>
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
                  onSelect={(url: string) => { handleChange('heroImage', url); setMediaOpen_heroImage(false); }}
                />
              </div>
              <IconPickerInput 
                label="Hero Icon" 
                value={safeData.hero?.icon || 'UtensilsCrossed'} 
                onChange={(val) => handleChange('hero', { ...safeData.hero, icon: val })} 
              />
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Title</label>
                <PhoneticInput value={safeData.hero?.title?.mr || safeData.title?.mr || ''} onChange={(val) => handleChange('hero', { ...safeData.hero, title: { ...safeData.hero?.title, mr: val } })} onEnglishChange={(val) => handleChange('hero', { ...safeData.hero, title: { ...safeData.hero?.title, en: val } })} englishValue={safeData.hero?.title?.en || safeData.title?.en || ''} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Subtitle</label>
                <PhoneticInput value={safeData.hero?.subtitle?.mr || safeData.subtitle?.mr || ''} onChange={(val) => handleChange('hero', { ...safeData.hero, subtitle: { ...safeData.hero?.subtitle, mr: val } })} onEnglishChange={(val) => handleChange('hero', { ...safeData.hero, subtitle: { ...safeData.hero?.subtitle, en: val } })} englishValue={safeData.hero?.subtitle?.en || safeData.subtitle?.en || ''} />
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
        <div className="flex items-center gap-2 mb-4 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
          <input 
            type="checkbox" 
            className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 cursor-pointer"
            checked={safeData.about?.isVisible !== false} 
            onChange={(e) => handleChange('about', { ...safeData.about, isVisible: e.target.checked })} 
            id="toggle-about"
          />
          <label htmlFor="toggle-about" className="text-sm font-semibold text-slate-700 cursor-pointer select-none">
            Show Intro Section
          </label>
        </div>
        <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-4 shadow-sm">
          <EditorBlockHeader 
            title="Section Header Configuration (Optional)" 
            isExpanded={!!expandedFixedBlocks['about_header']} 
            onToggle={() => toggleFixedBlock('about_header')} 
          />
          {!!expandedFixedBlocks['about_header'] && (
            <div className="p-4 space-y-4 bg-white border-t border-slate-200 mt-2 rounded-b-lg">
              <IconPickerInput 
                label="Section Icon" 
                value={safeData.sectionHeaders?.about?.icon || ''} 
                onChange={(val) => handleChange('sectionHeaders', { ...safeData.sectionHeaders, about: { ...(safeData.sectionHeaders?.about || {}), icon: val } })} 
              />
            </div>
          )}
        </div>
        <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-3 shadow-sm">
          <EditorBlockHeader 
            title="Intro Description" 
            isExpanded={!!expandedFixedBlocks['about_content']} 
            onToggle={() => toggleFixedBlock('about_content')} 
          />
          {!!expandedFixedBlocks['about_content'] && (
            <div className="p-4 space-y-4 bg-white border-t border-slate-200 mt-2 rounded-b-lg">
              <PhoneticInput 
                value={safeData.about?.description?.mr || ''} 
                onChange={(val) => handleChange('about', { ...safeData.about, description: { ...safeData.about?.description, mr: val } })} 
                onEnglishChange={(val) => handleChange('about', { ...safeData.about, description: { ...safeData.about?.description, en: val } })} 
                englishValue={safeData.about?.description?.en || ''} 
                multiline 
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeSection === 'secondaryImage') {
    return (
      <div className="pb-10 space-y-4">
        <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-3 shadow-sm">
          <EditorBlockHeader 
            title="Secondary Media" 
            isExpanded={!!expandedFixedBlocks['secondaryImage_content']} 
            onToggle={() => toggleFixedBlock('secondaryImage_content')} 
          />
          {!!expandedFixedBlocks['secondaryImage_content'] && (
            <div className="p-4 space-y-4 bg-white border-t border-slate-200 mt-2 rounded-b-lg">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Image</label>
                <div
                  className="w-full h-36 bg-slate-100 rounded-lg border border-slate-300 overflow-hidden relative group cursor-pointer"
                  onClick={() => setMediaOpen_heroImage(true)}
                >
                  {safeData.secondaryImage || safeData.hero?.secondaryImage ? (
                    <>
                      <img
                        src={(safeData.secondaryImage || safeData.hero?.secondaryImage).startsWith('http') ? (safeData.secondaryImage || safeData.hero?.secondaryImage) : `http://localhost:5000${(safeData.secondaryImage || safeData.hero?.secondaryImage).startsWith('/') ? '' : '/'}${(safeData.secondaryImage || safeData.hero?.secondaryImage)}`}
                        className="w-full h-full object-cover"
                        alt="Preview"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-sm font-medium">Click to change</span>
                      </div>
                    </>
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
                  onSelect={(url: string) => { handleChange('secondaryImage', url); setMediaOpen_heroImage(false); }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeSection === 'menuHighlights') {
    return (
      <div className="pb-10 space-y-4">

        <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-4 shadow-sm">
          <EditorBlockHeader 
            title="Section Header Configuration (Optional)" 
            isExpanded={!!expandedFixedBlocks['menuHighlights_header']} 
            onToggle={() => toggleFixedBlock('menuHighlights_header')} 
          />
          {!!expandedFixedBlocks['menuHighlights_header'] && (
            <div className="p-4 space-y-4 bg-white border-t border-slate-200 mt-2 rounded-b-lg">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Section Title</label>
                <PhoneticInput 
                  value={safeData.sectionHeaders?.menuHighlights?.title?.mr || ''} 
                  onChange={(val) => handleChange('sectionHeaders', { ...safeData.sectionHeaders, menuHighlights: { ...(safeData.sectionHeaders?.menuHighlights || {}), title: { ...(safeData.sectionHeaders?.menuHighlights?.title || {}), mr: val } } })} 
                  onEnglishChange={(val) => handleChange('sectionHeaders', { ...safeData.sectionHeaders, menuHighlights: { ...(safeData.sectionHeaders?.menuHighlights || {}), title: { ...(safeData.sectionHeaders?.menuHighlights?.title || {}), en: val } } })} 
                  englishValue={safeData.sectionHeaders?.menuHighlights?.title?.en || ''} 
                />
              </div>
              <IconPickerInput 
                label="Section Icon" 
                value={safeData.sectionHeaders?.menuHighlights?.icon || ''} 
                onChange={(val) => handleChange('sectionHeaders', { ...safeData.sectionHeaders, menuHighlights: { ...(safeData.sectionHeaders?.menuHighlights || {}), icon: val } })} 
              />
            </div>
          )}
        </div>
        <div className="px-1 mb-2">
          <h3 className="text-sm font-bold text-slate-700">Menu Highlights</h3>
          <p className="text-xs text-slate-500 mt-0.5">{(safeData.menuHighlights || []).length} item(s)</p>
        </div>
        <div className="space-y-2">
          {(safeData.menuHighlights || []).map((item: any, index: number) => (
            <MenuHighlightsEditorItem
              key={`item-${index}`} index={index} itemData={item}
              onUpdateFull={(i: number, newD: any) => updateArrayItemFull('menuHighlights', i, newD)}
              onRemove={() => removeArrayItem('menuHighlights', index)}
              onMoveUp={() => moveArrayItem('menuHighlights', index, -1)}
              onMoveDown={() => moveArrayItem('menuHighlights', index, 1)}
              isFirst={index === 0} isLast={index === (safeData.menuHighlights || []).length - 1}
              isExpanded={expandedItemIndex === index}
              onToggle={() => setExpandedItemIndex(expandedItemIndex === index ? -1 : index)}
            />
          ))}
          <button onClick={() => addArrayItem('menuHighlights', { mr: '', en: '' })} className="mt-4 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors w-full flex justify-center items-center gap-2">
            <Plus size={16} /> Add Menu Highlights Item
          </button>
        </div>
      </div>
    );
  }

  if (activeSection === 'motto') {
    return (
      <div className="pb-10 space-y-4">
        <div className="p-2 border border-slate-200 rounded-lg bg-slate-50 mb-3 shadow-sm">
          <EditorBlockHeader 
            title="Motto / Tagline" 
            isExpanded={!!expandedFixedBlocks['motto_content']} 
            onToggle={() => toggleFixedBlock('motto_content')} 
          />
          {!!expandedFixedBlocks['motto_content'] && (
            <div className="p-4 space-y-4 bg-white border-t border-slate-200 mt-2 rounded-b-lg">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Marathi</label>
                <input type="text" value={safeData.motto?.mr || ''} onChange={(e) => handleChange('motto', { ...safeData.motto, mr: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">English</label>
                <input type="text" value={safeData.motto?.en || ''} onChange={(e) => handleChange('motto', { ...safeData.motto, en: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded text-sm" />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return <div className="p-4 text-center text-slate-500">Select a section to edit</div>;
};
