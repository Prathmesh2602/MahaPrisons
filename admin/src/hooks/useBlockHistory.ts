import { useState, useEffect, useRef } from 'react';

export function useBlockHistory<T>(
  defaultValue: T,
  propValue: T,
  onChange: (val: T) => void,
  itemKey?: any
) {
  const getItemIdentity = (val: any) => {
    if (itemKey !== undefined && itemKey !== null) return String(itemKey);
    if (val && typeof val === 'object') {
      if (val._key) return String(val._key);
      if (val.id) return String(val.id);
    }
    return undefined;
  };

  const initialParsed = propValue === undefined ? defaultValue : JSON.parse(JSON.stringify(propValue));
  const historyRef = useRef<T[]>([initialParsed]);
  const indexRef = useRef(0);
  const internalChangeRef = useRef(false);
  const currentKeyRef = useRef<string | undefined>(getItemIdentity(propValue));
  const [trigger, setTrigger] = useState(0);

  const propValueStr = propValue === undefined ? undefined : JSON.stringify(propValue);
  const defaultValueStr = JSON.stringify(defaultValue);
  
  const latestPropValue = useRef(propValueStr);
  latestPropValue.current = propValueStr;

  useEffect(() => {
    // When the baseline/saved value changes from the parent, re-initialize the entire history
    const parsedVal = latestPropValue.current === undefined ? defaultValue : JSON.parse(latestPropValue.current);
    historyRef.current = [parsedVal];
    indexRef.current = 0;
    setTrigger(prev => prev + 1);
  }, [defaultValueStr]);

  // Synchronously or via effect detect item identity change
  const currentIdentity = getItemIdentity(propValue);
  if (currentIdentity !== undefined && currentKeyRef.current !== undefined && currentIdentity !== currentKeyRef.current) {
    currentKeyRef.current = currentIdentity;
    const parsedVal = propValue === undefined ? defaultValue : JSON.parse(JSON.stringify(propValue));
    historyRef.current = [parsedVal];
    indexRef.current = 0;
  }

  useEffect(() => {
    const currentId = getItemIdentity(propValue);
    if (currentId !== undefined && currentKeyRef.current !== undefined && currentId !== currentKeyRef.current) {
      currentKeyRef.current = currentId;
      const parsedVal = propValue === undefined ? defaultValue : JSON.parse(JSON.stringify(propValue));
      historyRef.current = [parsedVal];
      indexRef.current = 0;
      setTrigger(prev => prev + 1);
      return;
    }

    if (internalChangeRef.current) {
      internalChangeRef.current = false;
    } else {
      // External change detected (e.g., Parent updated via Translate, Media Select, or Global Undo)
      if (propValueStr !== undefined) {
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
    }
  }, [propValueStr]);

  const update = (newVal: T) => {
    internalChangeRef.current = true;
    const cloned = JSON.parse(JSON.stringify(newVal));
    const newHist = historyRef.current.slice(0, indexRef.current + 1);
    newHist.push(cloned);
    historyRef.current = newHist;
    indexRef.current = newHist.length - 1;
    onChange(newVal);
    setTrigger(prev => prev + 1);
  };

  const undo = () => {
    if (indexRef.current > 0) {
      internalChangeRef.current = true;
      indexRef.current -= 1;
      const prev = JSON.parse(JSON.stringify(historyRef.current[indexRef.current]));
      onChange(prev);
      setTrigger(prev => prev + 1);
    }
  };

  const redo = () => {
    if (indexRef.current < historyRef.current.length - 1) {
      internalChangeRef.current = true;
      indexRef.current += 1;
      const next = JSON.parse(JSON.stringify(historyRef.current[indexRef.current]));
      onChange(next);
      setTrigger(prev => prev + 1);
    }
  };

  const reset = () => {
    internalChangeRef.current = true;
    const newHist = historyRef.current.slice(0, indexRef.current + 1);
    const initialLocalState = historyRef.current[0] !== undefined 
      ? JSON.parse(JSON.stringify(historyRef.current[0]))
      : JSON.parse(JSON.stringify(defaultValue));
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
