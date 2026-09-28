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
  const defaultItem = { image: "", title: { mr: "", en: "" }, desc: { mr: "", en: "" } };

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
    <div className="border border-slate-200 rounded-lg bg-white mb-3 shadow-sm overflow-hidden">
      <EditorBlockHeader
        title={currentItem.title?.mr || `Gallery Item ${index + 1}`}
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

          <div className="space-y-1">
            <PhoneticInput
              label="Title"
              value={currentItem.title?.mr || ''}
              onChange={(val) => handleLocalUpdate('title.mr', val)}
              onEnglishChange={(val) => handleLocalUpdate('title.en', val)}
              englishValue={currentItem.title?.en || ''}
              className="w-full"
              placeholder="उदा. श्रृंखला उपहारगृह..."
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
              placeholder="सविस्तर माहिती..."
              multiline={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export const GalleryLayoutEditor = ({ data, updateData, blockId, expandedSection }: any) => {
  const defaultData = { header: {}, gallery: [] };
  const history = useBlockHistory(defaultData, data, updateData);
  const currentData = history.value || defaultData;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [mediaTarget, setMediaTarget] = useState<((url: string) => void) | null>(null);
  const displaySection = expandedSection || 'header';


  const handleUpdateItem = (index: number, updatedItem: any) => {
    const newItems = [...(currentData.gallery || [])];
    newItems[index] = updatedItem;
    history.update({ ...currentData, gallery: newItems });
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...(currentData.gallery || [])];
    newItems.splice(index, 1);
    history.update({ ...currentData, gallery: newItems });
    if (expandedIndex === index) setExpandedIndex(null);
  };

  const handleMoveItem = (index: number, direction: 'up' | 'down') => {
    const newItems = [...(currentData.gallery || [])];
    if (direction === 'up' && index > 0) {
      const temp = newItems[index];
      newItems[index] = newItems[index - 1];
      newItems[index - 1] = temp;
      setExpandedIndex(index - 1);
    } else if (direction === 'down' && index < newItems.length - 1) {
      const temp = newItems[index];
      newItems[index] = newItems[index + 1];
      newItems[index + 1] = temp;
      setExpandedIndex(index + 1);
    }
    history.update({ ...currentData, gallery: newItems });
  };

  const handleAddItem = () => {
    const newItems = [...(currentData.gallery || [])];
    newItems.unshift({ image: "", title: { mr: "", en: "" }, desc: { mr: "", en: "" } });
    history.update({ ...currentData, gallery: newItems });
    setExpandedIndex(0);
  };

  const handleTranslate = async (text: string, callback: (translated: string) => void) => {
    if (!text) return;
    try {
      const res = await axios.post('/api/translate', { text, targetLanguage: 'en' });
      if (res.data.translatedText) {
        callback(res.data.translatedText);
      }
    } catch (error) {
      console.error('Translation error:', error);
    }
  };

  return (
    <div className="flex flex-col gap-4 pb-10">
      {/* Header Settings Section */}
      {displaySection === 'header' && (
      <div className="border border-slate-200 rounded-lg bg-white shadow-sm overflow-hidden">
        <EditorBlockHeader 
          title="Header Settings" 
          isExpanded={true} 
          onToggle={() => {}} 
          history={history} 
        />
        <div className="flex flex-col gap-3 py-3 pr-2 pl-2 bg-white border-t border-slate-200 border-l-[3px] border-l-blue-500">
            <div className="space-y-1">
              <PhoneticInput
                label="Title"
                value={currentData.header?.title?.mr || ''}
                onChange={(val) => history.update({ ...currentData, header: { ...currentData.header, title: { ...currentData.header?.title, mr: val } } })}
                onEnglishChange={(val) => history.update({ ...currentData, header: { ...currentData.header, title: { ...currentData.header?.title, en: val } } })}
                englishValue={currentData.header?.title?.en || ''}
                className="w-full"
                placeholder="उदा. फोटो गॅलरी"
              />
            </div>
            <hr className="border-t border-slate-100 my-1" />
            <div className="space-y-1">
              <PhoneticInput
                label="Description"
                value={currentData.header?.desc?.mr || ''}
                onChange={(val) => history.update({ ...currentData, header: { ...currentData.header, desc: { ...currentData.header?.desc, mr: val } } })}
                onEnglishChange={(val) => history.update({ ...currentData, header: { ...currentData.header, desc: { ...currentData.header?.desc, en: val } } })}
                englishValue={currentData.header?.desc?.en || ''}
                className="w-full"
                placeholder="सविस्तर माहिती..."
                multiline={true}
              />
            </div>
          </div>
        </div>
      )}

      {/* Gallery Items Section */}
      {displaySection === 'gallery' && (
      <div className="border border-slate-200 rounded-lg bg-white shadow-sm overflow-hidden">
        <EditorBlockHeader 
          title={`Image Grid (${(currentData.gallery || []).length} items)`} 
          isExpanded={true} 
          onToggle={() => {}} 
          history={history} 
        />
        <div className="p-3 bg-slate-50/50 space-y-3 border-t border-slate-200 border-l-[3px] border-l-blue-500">
              <button onClick={handleAddItem} className="mb-4 px-4 py-3 bg-indigo-50/50 border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 rounded-lg text-sm font-bold shadow-sm transition-all duration-200 w-full flex justify-center items-center gap-2 shadow-indigo-100/50">
                <Plus size={16} /> Add Image
              </button>
        {(currentData.gallery || []).map((item: any, idx: number) => (
                <GalleryItemBlock
                  key={idx}
                  index={idx}
                  itemData={item}
                  onUpdateFull={handleUpdateItem}
                  onRemove={() => handleRemoveItem(idx)}
                  onMoveUp={() => handleMoveItem(idx, 'up')}
                  onMoveDown={() => handleMoveItem(idx, 'down')}
                  isFirst={idx === 0}
                  isLast={idx === (currentData.gallery?.length || 0) - 1}
                  onMediaSelect={setMediaTarget}
                  onTranslate={handleTranslate}
                  isExpanded={expandedIndex === idx}
                  onToggle={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                />
              ))}
              {(!currentData.gallery || currentData.gallery.length === 0) && (
                <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-lg border border-slate-200 border-dashed">
                  No gallery items found. Click "Add Image" to create one.
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

export default GalleryLayoutEditor;
