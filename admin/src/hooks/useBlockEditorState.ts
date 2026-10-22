import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { API_URL } from '../config/api';

const objectKeyMap = new WeakMap<object, string>();
let keyCounter = 0;

export function ensureArrayItemKeys(data: any): any {
  if (!data || typeof data !== 'object') return data;
  
  if (Array.isArray(data)) {
    return data.map((item, idx) => {
      if (item && typeof item === 'object') {
        let key = item._key;
        if (!key && item.id !== undefined && item.id !== null && String(item.id).trim() !== '') {
          key = String(item.id);
        }
        if (!key) {
          key = objectKeyMap.get(item);
          if (!key) {
            key = `k_${++keyCounter}_${idx}`;
            objectKeyMap.set(item, key);
          }
        }
        const processed = ensureArrayItemKeys(item);
        if (processed._key !== key) {
          return { ...processed, _key: key };
        }
        return processed;
      }
      return item;
    });
  }

  let hasChanged = false;
  const result: any = {};
  for (const k of Object.keys(data)) {
    const val = data[k];
    const processed = ensureArrayItemKeys(val);
    result[k] = processed;
    if (processed !== val) {
      hasChanged = true;
    }
  }
  return hasChanged ? result : data;
}

export const useBlockEditorState = (blockId: string, initialData: any, onPreviewUpdate: (data: any) => void) => {
  const safeInitialData = ensureArrayItemKeys(initialData || {});
  const [data, setData] = useState<any>(safeInitialData);
  const [savedData, setSavedData] = useState<any>(safeInitialData);
  
  const historyRef = useRef<any[]>([JSON.parse(JSON.stringify(safeInitialData))]);
  const historyIndexRef = useRef(0);
  const [historyTrigger, setHistoryTrigger] = useState(0);

  const prevBlockIdRef = useRef(blockId);
  const lastEmittedStrRef = useRef<string>('');
  const initialDataStr = JSON.stringify(initialData);

  useEffect(() => {
    const isNewBlock = prevBlockIdRef.current !== blockId;
    prevBlockIdRef.current = blockId;

    if (isNewBlock) {
      const normalized = ensureArrayItemKeys(JSON.parse(initialDataStr || '{}'));
      setData(normalized);
      setSavedData(normalized);
      historyRef.current = [JSON.parse(JSON.stringify(normalized))];
      historyIndexRef.current = 0;
      setHistoryTrigger(prev => prev + 1);
      return;
    }

    const currentJson = JSON.stringify(data);
    if (initialDataStr === currentJson || initialDataStr === lastEmittedStrRef.current) {
      return;
    }

    // Only update if initialData genuinely came from an external source (e.g. reload or template switch)
    if (initialDataStr && initialDataStr !== '{}') {
      const normalized = ensureArrayItemKeys(JSON.parse(initialDataStr));
      setData(normalized);
      setSavedData(normalized);
      historyRef.current = [JSON.parse(JSON.stringify(normalized))];
      historyIndexRef.current = 0;
      setHistoryTrigger(prev => prev + 1);
    }
  }, [blockId, initialDataStr]);

  // Sync with preview and update history when data changes
  useEffect(() => {
    const json = JSON.stringify(data);
    if (json === lastEmittedStrRef.current) return;
    lastEmittedStrRef.current = json;
    onPreviewUpdate(data);

    // Record into undo/redo history if different from current head
    const currentHead = JSON.stringify(historyRef.current[historyIndexRef.current]);
    if (json !== currentHead) {
      const newHistory = historyRef.current.slice(0, historyIndexRef.current + 1);
      newHistory.push(JSON.parse(json));
      historyRef.current = newHistory;
      historyIndexRef.current = newHistory.length - 1;
      setHistoryTrigger(prev => prev + 1);
    }
  }, [data]);

  const setNormalizedData = (newVal: any) => {
    setData((prev: any) => {
      const resolved = typeof newVal === 'function' ? newVal(prev) : newVal;
      return ensureArrayItemKeys(resolved);
    });
  };

  const updateHistoryState = (newData?: any) => {
    if (newData) {
      setNormalizedData(newData);
    }
  };

  const handleUndo = () => {
    if (historyIndexRef.current > 0) {
      historyIndexRef.current -= 1;
      const prevData = JSON.parse(JSON.stringify(historyRef.current[historyIndexRef.current]));
      setData(prevData);
      setHistoryTrigger(prev => prev + 1);
    }
  };

  const handleRedo = () => {
    if (historyIndexRef.current < historyRef.current.length - 1) {
      historyIndexRef.current += 1;
      const nextData = JSON.parse(JSON.stringify(historyRef.current[historyIndexRef.current]));
      setData(nextData);
      setHistoryTrigger(prev => prev + 1);
    }
  };

  const handleReset = () => {
    if (historyRef.current.length > 0) {
      historyIndexRef.current = 0;
      const firstData = JSON.parse(JSON.stringify(historyRef.current[0]));
      setData(firstData);
      setHistoryTrigger(prev => prev + 1);
    }
  };

  const handleSave = async (userRole?: string, changeSummary?: string) => {
    if (!blockId) return false;
    try {
      const res = await axios.put(
        `${API_URL}/api/v1/pages/blocks/${blockId}`,
        { content: data, changeSummary },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      if (res.data.pendingReview) {
        alert('Changes submitted for Super Admin review!');
      } else {
        setSavedData(JSON.parse(JSON.stringify(data)));
        alert('Saved successfully!');
      }
      return true;
    } catch (error) {
      console.error('Failed to save block:', error);
      alert('Failed to save');
      return false;
    }
  };

  return {
    data,
    setData: setNormalizedData,
    savedData,
    historyIndex: historyIndexRef.current,
    historyLength: historyRef.current.length,
    updateHistoryState,
    handleUndo,
    handleRedo,
    handleReset,
    handleSave,
    hasChanges: JSON.stringify(data) !== JSON.stringify(savedData)
  };
};
