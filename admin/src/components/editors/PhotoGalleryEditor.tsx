import React, { useState } from 'react';
import axios from 'axios';
import { PhoneticInput } from '../PhoneticInput';
import { EditorBlockHeader, EditorFormHeader } from '../EditorLayout';
import { useBlockEditorState } from '../../hooks/useBlockEditorState';
import { useBlockHistory } from '../../hooks/useBlockHistory';
import { Button } from '../Button';
import { Trash2, ArrowUp, ArrowDown, Send, Save, Plus, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { MediaLibraryPopup } from '../MediaLibraryPopup';

const GalleryItemBlock = ({
  index, itemData, onUpdateFull, onRemove, onMoveUp, onMoveDown, isFirst, isLast, onMediaSelect, onTranslate,
  isExpanded, onToggle
}: any) => {
  const defaultItem = { type: 'photo', title: { mr: "", en: "" }, img_src: "" };

  const itemHist = useBlockHistory(
    defaultItem,
    itemData,
    (newItemData) => onUpdateFull(index, newItemData)
  );

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

  const currentItem = itemHist.value;

  return (
    <div className="p-2 border border-slate-200 rounded-lg bg-slate-50">
      <EditorBlockHeader
        title={currentItem.title?.mr || `Item ${index + 1}`}
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
        <div className="flex flex-col gap-2 p-2 bg-white border border-slate-200 rounded-lg shadow-sm mt-2 border-l-4 border-l-amber-500">
          <div className="flex gap-2">
            <div className="w-24 h-24 shrink-0 rounded-md border border-slate-200 bg-slate-50 overflow-hidden relative group cursor-pointer" onClick={() => onMediaSelect(index)}>
              {currentItem.img_src ? (
                <img src={currentItem.img_src} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400"><ImageIcon size={24} /></div>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-[10px] font-medium text-center px-1">Change</span>
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <div className="space-y-1">
                <PhoneticInput label="Title (Marathi)" value={currentItem.title?.mr} onChange={(val) => handleLocalUpdate('title.mr', val)} onTranslate={(text) => onTranslate(text, index, 'title.en')} />
                <PhoneticInput label="Title (English)" transliterate={false} value={currentItem.title?.en} onChange={(val) => handleLocalUpdate('title.en', val)} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const PhotoGalleryEditor = ({ blockId, initialData, onPreviewUpdate }: any) => {
  const { user } = useAuth();
  
  const defaultItems = [
    { type: 'photo', title: { mr: "फोटो १", en: "Photo 1" }, img_src: "" }
  ];

  const safeData = initialData || { items: defaultItems };

  const {
    data,
    setData,
    historyIndex,
    historyLength,
    updateHistoryState,
    handleUndo,
    handleRedo,
    handleReset,
    handleSave,
    hasChanges
  } = useBlockEditorState(blockId, safeData, onPreviewUpdate);

  const [expandedBlock, setExpandedBlock] = useState<number | null>(null);
  const [isMediaPopupOpen, setIsMediaPopupOpen] = useState(false);
  const [mediaTargetIndex, setMediaTargetIndex] = useState<number | null>(null);

  const updateItemFull = (index: number, fullItemData: any) => {
    const newData = JSON.parse(JSON.stringify(data));
    if (!newData.items) newData.items = defaultItems;
    newData.items[index] = fullItemData;
    setData(newData);
    updateHistoryState(newData);
  };

  const updateItemField = (index: number, key: string, value: string) => {
    const newData = JSON.parse(JSON.stringify(data));
    if (!newData.items) newData.items = defaultItems;
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      if (!newData.items[index][parent]) newData.items[index][parent] = {};
      newData.items[index][parent][child] = value;
    } else {
      newData.items[index][key] = value;
    }
    setData(newData);
    updateHistoryState(newData);
  };

  const addItem = () => {
    const newData = JSON.parse(JSON.stringify(data));
    if (!newData.items) newData.items = [];
    newData.items.push({
      type: 'photo',
      title: { mr: "", en: "" },
      img_src: ""
    });
    setData(newData);
    updateHistoryState(newData);
  };

  const removeItem = (index: number) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData.items.splice(index, 1);
    setData(newData);
    updateHistoryState(newData);
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newData = JSON.parse(JSON.stringify(data));
    if (direction === 'up' && index > 0) {
      [newData.items[index - 1], newData.items[index]] = [newData.items[index], newData.items[index - 1]];
    } else if (direction === 'down' && index < newData.items.length - 1) {
      [newData.items[index + 1], newData.items[index]] = [newData.items[index], newData.items[index + 1]];
    }
    setData(newData);
    updateHistoryState(newData);
  };

  const handleTranslate = async (text: string, index: number, targetKey: string) => {
    if (!text) return;
    try {
      const res = await axios.get('http://localhost:5000/api/v1/translate', { params: { text, source: 'mr', target: 'en' } });
      const translatedText = res.data?.responseData?.translatedText;
      if (translatedText) updateItemField(index, targetKey, translatedText);
    } catch (err) { console.error('Translation failed', err); }
  };

  const itemsList = data.items || defaultItems;

  return (
    <div className="w-full flex flex-col gap-2">
      <EditorFormHeader
        className="sticky top-[-1px] z-20 bg-white/95 backdrop-blur pb-4 pt-3 -mx-3 px-2 -mt-3 border-b border-slate-200 shadow-[0_4px_6px_-6px_rgba(0,0,0,0.1)]"
        title="Edit Photo Gallery"
        onUndo={handleUndo}
        canUndo={historyIndex > 0}
        onRedo={handleRedo}
        canRedo={historyIndex < historyLength - 1}
        onReset={handleReset}
        onSave={handleSave}
        isSaveDisabled={!hasChanges}
        saveText={user?.role === 'MAKER' ? 'Send for Review' : 'Save & Publish'}
        saveIcon={user?.role === 'MAKER' ? <Send size={14} /> : <Save size={14} />}
      />

      <div className="w-full space-y-2">
        {itemsList.map((item: any, index: number) => (
          <GalleryItemBlock
            key={index}
            index={index}
            itemData={item}
            onUpdateFull={updateItemFull}
            onRemove={() => removeItem(index)}
            onMoveUp={() => moveItem(index, 'up')}
            onMoveDown={() => moveItem(index, 'down')}
            isFirst={index === 0}
            isLast={index === itemsList.length - 1}
            onMediaSelect={(idx: number) => { setMediaTargetIndex(idx); setIsMediaPopupOpen(true); }}
            onTranslate={handleTranslate}
            isExpanded={expandedBlock === index}
            onToggle={() => setExpandedBlock(expandedBlock === index ? null : index)}
          />
        ))}
        {(!itemsList || itemsList.length === 0) && (
          <div className="w-full text-center text-slate-500 py-2 text-xs border border-dashed border-slate-300 rounded-lg">No items added.</div>
        )}
      </div>
      
      <Button onClick={addItem} variant="secondary" className="w-full">
        <Plus size={14} className="mr-2" /> Add Item
      </Button>

      <MediaLibraryPopup
        isOpen={isMediaPopupOpen}
        onClose={() => setIsMediaPopupOpen(false)}
        onSelect={(url) => {
          if (mediaTargetIndex !== null) updateItemField(mediaTargetIndex, 'img_src', url);
          setIsMediaPopupOpen(false);
          setMediaTargetIndex(null);
        }}
      />
    </div>
  );
};
