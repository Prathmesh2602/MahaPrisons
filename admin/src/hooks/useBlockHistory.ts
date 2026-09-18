import { useState, useEffect, useRef } from 'react';

export function useBlockHistory<T>(
  defaultValue: T,
  propValue: T,
  onChange: (val: T) => void
) {
  const historyRef = useRef<T[]>([propValue]);
  const indexRef = useRef(0);
  const internalChangeRef = useRef(false);
  const [trigger, setTrigger] = useState(0);

  const propValueStr = JSON.stringify(propValue);
  const defaultValueStr = JSON.stringify(defaultValue);
  
  const latestPropValue = useRef(propValueStr);
  latestPropValue.current = propValueStr;

  useEffect(() => {
    // When the baseline/saved value changes from the parent, re-initialize the entire history
    historyRef.current = [JSON.parse(latestPropValue.current)];
    indexRef.current = 0;
    setTrigger(prev => prev + 1);
  }, [defaultValueStr]);

  useEffect(() => {
    if (internalChangeRef.current) {
      internalChangeRef.current = false;
    } else {
      // External change detected (e.g., Parent updated via Translate, Media Select, or Global Undo)
      const parsed = JSON.parse(propValueStr);
      // Only push to history if the external change actually differs from our current local state
      if (JSON.stringify(historyRef.current[indexRef.current]) !== propValueStr) {
        const newHist = historyRef.current.slice(0, indexRef.current + 1);
        newHist.push(parsed);
        historyRef.current = newHist;
        indexRef.current = newHist.length - 1;
        setTrigger(prev => prev + 1);
      }
    }
  }, [propValueStr]);

  const update = (newVal: T) => {
    internalChangeRef.current = true;
    const newHist = historyRef.current.slice(0, indexRef.current + 1);
    newHist.push(newVal);
    historyRef.current = newHist;
    indexRef.current = newHist.length - 1;
    onChange(newVal);
    setTrigger(prev => prev + 1);
  };

  const undo = () => {
    if (indexRef.current > 0) {
      internalChangeRef.current = true;
      indexRef.current -= 1;
      const prev = historyRef.current[indexRef.current];
      onChange(prev);
      setTrigger(prev => prev + 1);
    }
  };

  const redo = () => {
    if (indexRef.current < historyRef.current.length - 1) {
      internalChangeRef.current = true;
      indexRef.current += 1;
      const next = historyRef.current[indexRef.current];
      onChange(next);
      setTrigger(prev => prev + 1);
    }
  };

  const reset = () => {
    internalChangeRef.current = true;
    const newHist = historyRef.current.slice(0, indexRef.current + 1);
    const initialLocalState = historyRef.current[0];
    newHist.push(initialLocalState);
    historyRef.current = newHist;
    indexRef.current = newHist.length - 1;
    onChange(initialLocalState);
    setTrigger(prev => prev + 1);
  };

  return { 
    value: historyRef.current[indexRef.current], 
    update, 
    undo, 
    redo, 
    reset, 
    canUndo: indexRef.current > 0, 
    canRedo: indexRef.current < historyRef.current.length - 1 
  };
}
