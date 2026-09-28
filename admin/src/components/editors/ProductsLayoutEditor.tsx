import React, { useState } from 'react';
import { PhoneticInput } from '../PhoneticInput';
import { EditorBlockHeader } from '../EditorLayout';
import { useBlockHistory } from '../../hooks/useBlockHistory';
import { Button } from '../Button';
import { Trash2, ArrowUp, ArrowDown, Plus, Image as ImageIcon } from 'lucide-react';
import { IconPickerInput } from './shared/IconPickerInput';
import { MediaLibraryPopup } from '../MediaLibraryPopup';

interface ProductsLayoutEditorProps {
  data: any;
  updateData: (data: any) => void;
  blockId: string;
  expandedSection?: string | null;
}

const ProductItem = ({
  index, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, onMediaSelect,
  isExpanded, onToggle
}: any) => {
  const defaultItem = { title: { mr: '', en: '' }, desc: { mr: '', en: '' }, image: '', icon: '' };
  const itemHist = useBlockHistory(defaultItem, itemData, (newItemData: any) => onUpdateFull(index, newItemData));
  const currentItem = itemHist.value;

  const handleLocalUpdate = (key: string, value: string) => {
    const newItem = JSON.parse(JSON.stringify(itemHist.value));
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      if (!newItem[parent]) newItem[parent] = {};
      newItem[parent][child] = value;
    } else {
      newItem[key] = value;
    }
    itemHist.update(newItem);
  };

  return (
    <div className="border border-slate-200 rounded-lg bg-white mb-3 shadow-sm overflow-hidden">
      <EditorBlockHeader
        title={currentItem.title?.mr || `Product ${index + 1}`}
        isExpanded={isExpanded}
        onToggle={onToggle}
        history={itemHist}
        rightAction={
          <div className="flex items-center gap-1 border border-slate-200 rounded-md overflow-hidden bg-white shadow-sm">
            <button onClick={onMoveUp} disabled={isFirst} className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200 transition-colors" title="Move Up"><ArrowUp size={14} /></button>
            <button onClick={onMoveDown} disabled={isLast} className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30 border-r border-slate-200 transition-colors" title="Move Down"><ArrowDown size={14} /></button>
            <button onClick={onRemove} className="p-1.5 text-red-500 hover:bg-red-50 disabled:opacity-30 transition-colors" title="Remove"><Trash2 size={14} /></button>
          </div>
        }
      />
      
      {isExpanded && (
        <div className="flex flex-col gap-3 py-3 pr-2 pl-2 bg-white border-t border-slate-200 border-l-[3px] border-l-blue-500">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Image <span className="text-red-500">*</span></label>
            <div
              className="w-full h-40 bg-slate-100 rounded border border-slate-200 overflow-hidden relative group cursor-pointer"
              onClick={() => onMediaSelect(() => (url: string) => handleLocalUpdate('image', url))}
            >
              {currentItem.image ? (
                <img src={currentItem.image} alt="preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                  <ImageIcon size={24} className="mb-1" />
                  <span className="text-xs">No Image Selected</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2 items-center justify-center">
                <span className="text-white text-xs font-medium bg-black/50 px-3 py-1.5 rounded border border-white/20">Choose from Library</span>
              </div>
            </div>
          </div>
          <hr className="border-t border-slate-100 my-1" />
          
          <IconPickerInput label="Icon" value={currentItem.icon || ''} onChange={(val) => handleLocalUpdate('icon', val)} />
          <hr className="border-t border-slate-100 my-1" />

          <div className="space-y-1">
            <PhoneticInput
              label="Title"
              value={currentItem.title?.mr || ''}
              onChange={(val) => handleLocalUpdate('title.mr', val)}
              onEnglishChange={(val) => handleLocalUpdate('title.en', val)}
              englishValue={currentItem.title?.en || ''}
              className="w-full"
            />
          </div>
          <hr className="border-t border-slate-100 my-1" />

          <div className="space-y-1">
            <PhoneticInput
              label="Description"
              value={currentItem.desc?.mr || ''}
              onChange={(val) => handleLocalUpdate('desc.mr', val)}
              onEnglishChange={(val) => handleLocalUpdate('desc.en', val)}
              englishValue={currentItem.desc?.en || ''}
              className="w-full"
              multiline={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export const ProductsLayoutEditor = ({ data, updateData, blockId, expandedSection }: ProductsLayoutEditorProps) => {
  const defaultData = { hero: {}, products: [], outlet: {} };
  const history = useBlockHistory(defaultData, data, updateData);
  const currentData = history.value || defaultData;
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [mediaTarget, setMediaTarget] = useState<any>(null);
  const displaySection = expandedSection || 'hero';
  
  const handleUpdate = (key: string, value: any) => {
    const newData = JSON.parse(JSON.stringify(currentData));
    if (key.includes('.')) {
      const parts = key.split('.');
      newData[parts[0]] = newData[parts[0]] || {};
      newData[parts[0]][parts[1]] = value;
    } else {
      newData[key] = value;
    }
    history.update(newData);
  };

  const handleArrayUpdate = (index: number, newItemData: any) => {
    const newArr = [...(currentData.products || [])];
    newArr[index] = newItemData;
    handleUpdate('products', newArr);
  };

  const handleArrayAdd = () => {
    const newArr = [{ id: Date.now().toString(), title: { mr: '', en: '' }, desc: { mr: '', en: '' }, image: '', icon: '' }, ...(currentData.products || [])];
    handleUpdate('products', newArr);
    setExpandedItems(prev => [...prev, "0"]);
  };

  const handleArrayRemove = (index: number) => {
    const newArr = (currentData.products || []).filter((_: any, i: number) => i !== index);
    handleUpdate('products', newArr);
  };

  const moveArrayItem = (index: number, direction: -1 | 1) => {
    const newArr = [...(currentData.products || [])];
    const temp = newArr[index];
    newArr[index] = newArr[index + direction];
    newArr[index + direction] = temp;
    handleUpdate('products', newArr);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Hero Section */}
      {displaySection === 'hero' && (
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
        <EditorBlockHeader 
          title="Hero Section" 
          isExpanded={true} 
          onToggle={() => {}} 
          history={history} 
        />
        <div className="flex flex-col gap-3 py-3 pr-2 pl-2 border-t border-slate-200 border-l-[3px] border-l-blue-500">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Background Image</label>
            <div
              className="w-full h-40 bg-slate-100 rounded border border-slate-200 overflow-hidden relative group cursor-pointer"
              onClick={() => setMediaTarget(() => (url: string) => handleUpdate('hero.image', url))}
            >
              <img 
                src={currentData.hero?.image || "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80"} 
                alt="preview" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2 items-center justify-center">
                <span className="text-white text-xs font-medium bg-black/50 px-3 py-1.5 rounded border border-white/20">Choose from Library</span>
              </div>
            </div>
          </div>
          <hr className="border-t border-slate-100 my-1" />
          
          <IconPickerInput 
            label="Icon" 
            value={currentData.hero?.icon || 'ShoppingBag'} 
            onChange={(val) => handleUpdate('hero.icon', val)} 
          />
          <hr className="border-t border-slate-100 my-1" />

          <div className="space-y-1">
            <PhoneticInput
              label="Title"
              value={currentData.hero?.title?.mr || ''}
              onChange={(val) => handleUpdate('hero.title.mr', val)}
              onEnglishChange={(val) => handleUpdate('hero.title.en', val)}
              englishValue={currentData.hero?.title?.en || ''}
              className="w-full"
            />
          </div>
          <hr className="border-t border-slate-100 my-1" />
          <div className="space-y-1">
            <PhoneticInput
              label="Subtitle"
              value={currentData.hero?.subtitle?.mr || ''}
              onChange={(val) => handleUpdate('hero.subtitle.mr', val)}
              onEnglishChange={(val) => handleUpdate('hero.subtitle.en', val)}
              englishValue={currentData.hero?.subtitle?.en || ''}
              className="w-full"
              multiline={true}
            />
          </div>
        </div>
      </div>
      )}

      {/* Outlet Section */}
      {displaySection === 'outlet' && (
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
        <EditorBlockHeader 
          title="Outlet Section" 
          isExpanded={true} 
          onToggle={() => {}} 
          history={history} 
        />
        <div className="flex flex-col gap-3 py-3 pr-2 pl-2 border-t border-slate-200 border-l-[3px] border-l-blue-500">
          <div className="space-y-1">
            <PhoneticInput
              label="Title"
              value={currentData.outlet?.title?.mr || ''}
              onChange={(val) => handleUpdate('outlet.title.mr', val)}
              onEnglishChange={(val) => handleUpdate('outlet.title.en', val)}
              englishValue={currentData.outlet?.title?.en || ''}
              className="w-full"
            />
          </div>
          <hr className="border-t border-slate-100 my-1" />
          <div className="space-y-1">
            <PhoneticInput
              label="Description"
              value={currentData.outlet?.desc?.mr || ''}
              onChange={(val) => handleUpdate('outlet.desc.mr', val)}
              onEnglishChange={(val) => handleUpdate('outlet.desc.en', val)}
              englishValue={currentData.outlet?.desc?.en || ''}
              className="w-full"
              multiline={true}
            />
          </div>
          <hr className="border-t border-slate-100 my-1" />
          <div className="space-y-1">
            <PhoneticInput
              label="Button Text"
              value={currentData.outlet?.btnText?.mr || ''}
              onChange={(val) => handleUpdate('outlet.btnText.mr', val)}
              onEnglishChange={(val) => handleUpdate('outlet.btnText.en', val)}
              englishValue={currentData.outlet?.btnText?.en || ''}
              className="w-full"
            />
          </div>
        </div>
      </div>
      )}

      {/* Products Category Section */}
      {displaySection === 'products' && (
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
        <EditorBlockHeader 
          title="Products Category Section" 
          isExpanded={true} 
          onToggle={() => {}} 
          history={history} 
        />
        <div className="p-3 bg-slate-50/50 border-t border-slate-200 border-l-[3px] border-l-blue-500">
          <div className="mb-3 flex justify-end">
            <Button onClick={handleArrayAdd} variant="primary" size="sm" className="flex items-center gap-2">
              <Plus size={16} /> Add Product
            </Button>
          </div>
          
          {(currentData.products || []).map((item: any, i: number) => (
            <ProductItem
              key={i}
              index={i}
              itemData={item}
              onUpdateFull={handleArrayUpdate}
              onRemove={() => handleArrayRemove(i)}
              onMoveUp={() => moveArrayItem(i, -1)}
              onMoveDown={() => moveArrayItem(i, 1)}
              isFirst={i === 0}
              isLast={i === (currentData.products || []).length - 1}
              onMediaSelect={setMediaTarget}
              isExpanded={expandedItems.includes(i.toString())}
              onToggle={() => setExpandedItems(prev => prev.includes(i.toString()) ? prev.filter(id => id !== i.toString()) : [...prev, i.toString()])}
            />
          ))}
          
          {(!currentData.products || currentData.products.length === 0) && (
            <div className="text-center py-12 bg-white border border-dashed border-slate-300 rounded-lg">
              <p className="text-slate-500 mb-4">No products added yet.</p>
              <Button onClick={handleArrayAdd} variant="outline" size="sm" className="mx-auto">
                <Plus size={16} className="mr-2" /> Add First Product
              </Button>
            </div>
          )}
        </div>
      </div>
      )}

      {mediaTarget && (
        <MediaLibraryPopup
          isOpen={true}
          onClose={() => setMediaTarget(null)}
          onSelect={(url) => {
            mediaTarget(url);
            setMediaTarget(null);
          }}
        />
      )}
    </div>
  );
};
