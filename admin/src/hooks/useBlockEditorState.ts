import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useBlockHistory } from './useBlockHistory';

export const useBlockEditorState = (blockId: string, initialData: any, onPreviewUpdate: (data: any) => void) => {
  const [data, setData] = useState<any>(initialData);
  const [savedData, setSavedData] = useState<any>(initialData);
  
  const historyRef = useRef<any[]>([JSON.parse(JSON.stringify(initialData))]);
  const historyIndexRef = useRef(0);
  // Dummy state just to trigger re-renders for UI when history changes
  const [historyTrigger, setHistoryTrigger] = useState(0);

  const initialDataStr = JSON.stringify(initialData);
  useEffect(() => {
    setData(initialData);
    setSavedData(initialData);
    historyRef.current = [JSON.parse(initialDataStr || 'null')];
    historyIndexRef.current = 0;
    setHistoryTrigger(prev => prev + 1);
  }, [initialDataStr]);

  // Sync with preview when data changes
  useEffect(() => {
    onPreviewUpdate(data);
  }, [data]);

  const updateHistoryState = (newData: any) => {
    const newHistory = historyRef.current.slice(0, historyIndexRef.current + 1);
    newHistory.push(JSON.parse(JSON.stringify(newData)));
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

  const handleSave = async (userRole?: string) => {
    if (!blockId) return false;
    try {
      const res = await axios.put(
        `http://localhost:5000/api/v1/pages/blocks/${blockId}`,
        { content: data },
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
    setData,
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
