import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useBlockHistory } from './useBlockHistory';
import { API_URL } from '../config/api';

export function ensureArrayItemKeys(data: any): any {
  if (!data || typeof data !== 'object') return data;
  
  if (Array.isArray(data)) {
    return data.map((item, idx) => {
      if (item && typeof item === 'object') {
        const existingKey = item._key || (item.id && typeof item.id === 'string' && item.id.trim() !== '' ? item.id : undefined);
        const key = existingKey || `k_${Math.random().toString(36).substring(2, 9)}_${Date.now()}_${idx}`;
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
  // Dummy state just to trigger re-renders for UI when history changes
  const [historyTrigger, setHistoryTrigger] = useState(0);

  const initialDataStr = JSON.stringify(initialData);
  useEffect(() => {
    const normalized = ensureArrayItemKeys(JSON.parse(initialDataStr || '{}'));
    setData(normalized);
    setSavedData(normalized);
    historyRef.current = [JSON.parse(JSON.stringify(normalized))];
    historyIndexRef.current = 0;
    setHistoryTrigger(prev => prev + 1);
  }, [initialDataStr]);

  // Sync with preview when data changes
  useEffect(() => {
    onPreviewUpdate(data);
  }, [data]);

  const setNormalizedData = (newVal: any) => {
    setData((prev: any) => {
      const resolved = typeof newVal === 'function' ? newVal(prev) : newVal;
      return ensureArrayItemKeys(resolved);
    });
  };

  const updateHistoryState = (newData: any) => {
    const normalized = ensureArrayItemKeys(newData);
    const newHistory = historyRef.current.slice(0, historyIndexRef.current + 1);
    newHistory.push(JSON.parse(JSON.stringify(normalized)));
    historyRef.current = newHistory;
    historyIndexRef.current = newHistory.length - 1;
    setHistoryTrigger(prev => prev + 1);
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
