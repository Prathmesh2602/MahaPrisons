import { useState, useEffect, useRef } from 'react';

export function useBlockHistory<T>(
  defaultValue: T,
  propValue: T,
  onChange: (val: T) => void
) {
  const [history, setHistory] = useState<T[]>([propValue]);
  const [index, setIndex] = useState(0);
  const internalChangeRef = useRef(false);

  const propValueStr = JSON.stringify(propValue);

  useEffect(() => {
    if (internalChangeRef.current) {
      internalChangeRef.current = false;
    } else {
      // External change detected (Global Undo/Reset/Fetch)
      setHistory([JSON.parse(propValueStr)]);
      setIndex(0);
    }
  }, [propValueStr]);

  const update = (newVal: T) => {
    internalChangeRef.current = true;
    const newHist = history.slice(0, index + 1);
    newHist.push(newVal);
    setHistory(newHist);
    setIndex(newHist.length - 1);
    onChange(newVal);
  };

  const undo = () => {
    if (index > 0) {
      internalChangeRef.current = true;
      const prev = history[index - 1];
      setIndex(index - 1);
      onChange(prev);
    }
  };

  const redo = () => {
    if (index < history.length - 1) {
      internalChangeRef.current = true;
      const next = history[index + 1];
      setIndex(index + 1);
      onChange(next);
    }
  };

  const reset = () => {
    internalChangeRef.current = true;
    const newHist = history.slice(0, index + 1);
    newHist.push(defaultValue);
    setHistory(newHist);
    setIndex(newHist.length - 1);
    onChange(defaultValue);
  };

  return { value: history[index], update, undo, redo, reset, canUndo: index > 0, canRedo: index < history.length - 1 };
}
