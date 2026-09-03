import React from 'react';

export const FormGroup = ({ label, children }) => (
  <div className="mb-4">
    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">{label}</label>
    {children}
  </div>
);

export const TextField = ({ value, onChange, placeholder, type = "text" }) => (
  <input
    type={type}
    value={value || ''}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
  />
);

export const TextArea = ({ value, onChange, placeholder, rows = 3 }) => (
  <textarea
    value={value || ''}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    rows={rows}
    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
  />
);

import { ReactTransliterate } from 'react-transliterate';
import 'react-transliterate/dist/index.css';
import { Languages, Loader2 } from 'lucide-react';

export const LanguageInput = ({ value, onChange, isTextArea = false }) => {
  const [translationMap, setTranslationMap] = React.useState(window.__TRANSLATIONS_CACHE__ || {});
  
  React.useEffect(() => {
    if (!window.__TRANSLATIONS_CACHE__) {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
      fetch(`${apiUrl}/public/translations`)
        .then(res => res.json())
        .then(data => {
          window.__TRANSLATIONS_CACHE__ = data;
          setTranslationMap(data);
        })
        .catch(err => console.error('Failed to load translations', err));
    }
  }, []);

  // Gracefully handle legacy string values
  const isString = typeof value === 'string';
  const hasDevanagari = isString && /[\u0900-\u097F]/.test(value);
  
  const legacyTranslation = isString ? (translationMap[value.trim()] || {}) : {};
  
  const en = isString ? (hasDevanagari ? (legacyTranslation.en || '') : value) : (value?.en || '');
  const mr = isString ? (hasDevanagari ? value : (legacyTranslation.mr || '')) : (value?.mr || '');
  
  const [isTranslating, setIsTranslating] = React.useState(false);

  const handleChange = (lang, text) => {
    if (isString) {
      const defaultEn = hasDevanagari ? (legacyTranslation.en || '') : value;
      const defaultMr = hasDevanagari ? value : (legacyTranslation.mr || '');
      onChange({ 
        en: lang === 'en' ? text : defaultEn, 
        mr: lang === 'mr' ? text : defaultMr 
      });
    } else {
      onChange({ ...(value || {}), [lang]: text });
    }
  };

  const handleAutoTranslate = async () => {
    if (!mr) return;
    setIsTranslating(true);
    try {
      const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=mr&tl=en&dt=t&q=${encodeURIComponent(mr)}`);
      const data = await res.json();
      if (data && data[0]) {
        const translatedText = data[0].map(item => item[0]).join('');
        handleChange('en', translatedText);
      }
    } catch (err) {
      console.error('Translation failed', err);
      alert('Auto-translation failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Marathi Input (First Preference with Phonetic) */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 z-10 pointer-events-none text-xs font-medium text-amber-600 bg-amber-50 rounded-l-md px-2 border-r border-gray-300">MR</span>
        <div className="pl-14">
          <ReactTransliterate
            renderComponent={(props) => isTextArea ? (
              <textarea {...props} className="w-full px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-1 focus:ring-amber-500 sm:text-sm" rows={3} />
            ) : (
              <input {...props} className="w-full px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-1 focus:ring-amber-500 sm:text-sm" />
            )}
            value={mr}
            onChangeText={(text) => handleChange('mr', text)}
            lang="mr"
            placeholder={isTextArea ? "येथे टाईप करा (Phonetic typing enabled)..." : "येथे टाईप करा..."}
            offsetY={isTextArea ? 4 : 4}
            offsetX={0}
          />
        </div>
      </div>

      {/* Auto Translate Action */}
      <div className="flex justify-center -my-1">
        <button 
          onClick={handleAutoTranslate} 
          disabled={isTranslating || !mr}
          className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 disabled:opacity-50 border border-blue-200 rounded-full text-xs font-semibold transition-colors"
          title="Auto-translate Marathi to English"
        >
          {isTranslating ? <Loader2 size={14} className="animate-spin" /> : <Languages size={14} />}
          Auto Translate
        </button>
      </div>

      {/* English Input */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 z-10 pointer-events-none text-xs font-medium text-blue-600 bg-blue-50 rounded-l-md px-2 border-r border-gray-300">EN</span>
        <div className="pl-14">
          {isTextArea ? (
            <textarea
              value={en}
              onChange={(e) => handleChange('en', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
              rows={3}
              placeholder="English translation..."
            />
          ) : (
            <input
              type="text"
              value={en}
              onChange={(e) => handleChange('en', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
              placeholder="English translation..."
            />
          )}
        </div>
      </div>
    </div>
  );
};

import { Plus, Trash2, ArrowUp, ArrowDown, Undo2, Redo2, RotateCcw } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export const useSectionHistory = (value, onChange) => {
  const [history, setHistory] = useState({ past: [], future: [] });
  const [originalValue, setOriginalValue] = useState(null);
  const isHistoryAction = useRef(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && value !== undefined) {
      setOriginalValue(JSON.parse(JSON.stringify(value)));
      initialized.current = true;
    }
  }, [value]);

  const handleChange = (newValue) => {
    if (!isHistoryAction.current) {
      setHistory(prev => ({
        past: [...prev.past, JSON.parse(JSON.stringify(value))],
        future: []
      }));
    }
    onChange(newValue);
  };

  const undo = () => {
    if (history.past.length === 0) return;
    isHistoryAction.current = true;
    const previous = history.past[history.past.length - 1];
    setHistory(prev => ({
      past: prev.past.slice(0, -1),
      future: [JSON.parse(JSON.stringify(value)), ...prev.future]
    }));
    onChange(previous);
    setTimeout(() => { isHistoryAction.current = false; }, 0);
  };

  const redo = () => {
    if (history.future.length === 0) return;
    isHistoryAction.current = true;
    const next = history.future[0];
    setHistory(prev => ({
      past: [...prev.past, JSON.parse(JSON.stringify(value))],
      future: prev.future.slice(1)
    }));
    onChange(next);
    setTimeout(() => { isHistoryAction.current = false; }, 0);
  };

  const reset = () => {
    if (!initialized.current) return;
    setHistory(prev => ({
      past: [...prev.past, JSON.parse(JSON.stringify(value))],
      future: []
    }));
    onChange(JSON.parse(JSON.stringify(originalValue)));
  };

  return { handleChange, undo, redo, reset, canUndo: history.past.length > 0, canRedo: history.future.length > 0 };
};

const ArrayItemEditor = ({ item, index, renderItem, handleUpdate, handleMove, handleRemove, isFirst, isLast }) => {
  const { handleChange, undo, redo, reset, canUndo, canRedo } = useSectionHistory(item, (newItem) => handleUpdate(index, newItem));

  return (
    <div className="relative bg-white border border-gray-200 rounded-md p-3 pb-10 shadow-sm mt-3 pt-10">
      <div className="absolute top-2 right-2 flex items-center gap-1 bg-gray-50 border border-gray-200 rounded px-1 py-0.5 shadow-sm z-10">
        <span className="text-[10px] uppercase font-bold text-gray-400 mr-2 tracking-wider">Item {index + 1}</span>
        <button onClick={undo} disabled={!canUndo} title="Undo Item Edits" className="p-1 text-gray-500 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-gray-500 transition-colors"><Undo2 size={12}/></button>
        <button onClick={redo} disabled={!canRedo} title="Redo Item Edits" className="p-1 text-gray-500 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-gray-500 transition-colors"><Redo2 size={12}/></button>
        <div className="w-px h-3 bg-gray-300 mx-0.5"></div>
        <button onClick={reset} title="Reset Item" className="p-1 text-gray-500 hover:text-red-500 transition-colors"><RotateCcw size={12}/></button>
      </div>

      {renderItem(item, handleChange, index)}
      
      <div className="absolute bottom-0 left-0 right-0 bg-gray-50 border-t border-gray-100 p-1.5 flex justify-end gap-1 rounded-b-md">
        <button 
          onClick={() => handleMove(index, -1)} 
          disabled={isFirst}
          className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
          title="Move Up"
        >
          <ArrowUp size={16} />
        </button>
        <button 
          onClick={() => handleMove(index, 1)} 
          disabled={isLast}
          className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
          title="Move Down"
        >
          <ArrowDown size={16} />
        </button>
        <button 
          onClick={() => handleRemove(index)} 
          className="p-1 text-gray-400 hover:text-red-600 transition-colors ml-2"
          title="Remove"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export const ArrayEditor = ({ items, onChange, renderItem, newItemTemplate, title = 'Items' }) => {
  const { handleChange, undo, redo, reset, canUndo, canRedo } = useSectionHistory(items || [], onChange);

  const handleAdd = () => {
    handleChange([...(items || []), newItemTemplate]);
  };

  const handleRemove = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    handleChange(newItems);
  };

  const handleMove = (index, direction) => {
    if (direction === -1 && index === 0) return;
    if (direction === 1 && index === items.length - 1) return;
    
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[index + direction];
    newItems[index + direction] = temp;
    handleChange(newItems);
  };

  const handleUpdate = (index, newItem) => {
    const newItems = [...items];
    newItems[index] = newItem;
    handleChange(newItems);
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50 mb-4">
      <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-100">
        <h4 className="font-semibold text-gray-700 text-sm flex items-center gap-2">{title}</h4>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-white border border-gray-200 rounded px-1 py-0.5 shadow-sm">
            <span className="text-[10px] uppercase font-bold text-gray-400 ml-1 mr-2 tracking-wider">List</span>
            <button onClick={undo} disabled={!canUndo} title="Undo List Change (Adds/Removes)" className="p-1 text-gray-500 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-gray-500 transition-colors"><Undo2 size={14}/></button>
            <button onClick={redo} disabled={!canRedo} title="Redo List Change" className="p-1 text-gray-500 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-gray-500 transition-colors"><Redo2 size={14}/></button>
            <div className="w-px h-3 bg-gray-300 mx-0.5"></div>
            <button onClick={reset} title="Reset Entire List" className="p-1 text-gray-500 hover:text-red-500 transition-colors"><RotateCcw size={14}/></button>
          </div>
          
          <button
            onClick={handleAdd}
            className="flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 hover:bg-amber-200 rounded text-xs font-semibold transition-colors"
          >
            <Plus size={14} /> Add New
          </button>
        </div>
      </div>
      
      <div className="p-3 flex flex-col gap-3">
        {(!items || items.length === 0) && (
          <div className="text-center py-4 text-gray-400 text-sm">No items added yet.</div>
        )}
        
        {items && items.map((item, index) => (
          <ArrayItemEditor 
            key={index}
            item={item}
            index={index}
            renderItem={renderItem}
            handleUpdate={handleUpdate}
            handleMove={handleMove}
            handleRemove={handleRemove}
            isFirst={index === 0}
            isLast={index === items.length - 1}
          />
        ))}
      </div>
    </div>
  );
};
