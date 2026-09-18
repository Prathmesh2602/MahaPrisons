import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';

interface PhoneticInputProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onTranslate?: (text: string) => void;
  className?: string;
  multiline?: boolean;
  transliterate?: boolean;
}

export const PhoneticInput: React.FC<PhoneticInputProps> = ({
  label,
  placeholder,
  value = '',
  onChange,
  onTranslate,
  className = '',
  multiline = false,
  transliterate = true,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setSuggestions([]);
        setFetchError(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Reset active index when suggestions change
  useEffect(() => {
    setActiveIndex(0);
  }, [suggestions]);

  // Fetch transliteration from Google Input Tools API
  const fetchSuggestions = async (word: string) => {
    if (!word || word.trim() === '') {
      setSuggestions([]);
      setIsFetching(false);
      return;
    }
    
    setIsFetching(true);
    setFetchError(null);
    
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/transliterate?text=${encodeURIComponent(word)}`);
      if (res.data[0] === 'SUCCESS') {
        const transliteratedWords = res.data[1][0][1];
        setSuggestions(transliteratedWords);
      } else {
        setFetchError("API Error: " + res.data[0]);
      }
    } catch (err: any) {
      console.error('Transliteration failed:', err);
      setFetchError(err.message || 'Network error');
      setSuggestions([]);
    } finally {
      setIsFetching(false);
    }
  };

  // Helper to get the word actively being typed (from cursor position backwards to last space)
  const getActiveWord = (text: string, cursorPosition: number) => {
    const textBeforeCursor = text.substring(0, cursorPosition);
    const lastSpaceIndex = textBeforeCursor.lastIndexOf(' ');
    const wordStart = lastSpaceIndex === -1 ? 0 : lastSpaceIndex + 1;
    return textBeforeCursor.substring(wordStart);
  };

  const commitSuggestion = (suggestion: string) => {
    if (!inputRef.current) return;
    const currentCursor = inputRef.current.selectionStart || 0;
    
    // Find the word bounds
    const textBeforeCursor = value.substring(0, currentCursor);
    const textAfterCursor = value.substring(currentCursor);
    
    const lastSpaceIndex = textBeforeCursor.lastIndexOf(' ');
    const wordStart = lastSpaceIndex === -1 ? 0 : lastSpaceIndex + 1;
    
    const newTextBefore = textBeforeCursor.substring(0, wordStart);
    
    // The new value: text before the word + the suggestion + space + text after cursor
    const newValue = newTextBefore + suggestion + ' ' + textAfterCursor;
    
    if (onChange) {
      onChange(newValue);
    }
    
    setSuggestions([]);
    
    // We want to preserve cursor position after the new word and space
    // Need to do it slightly async so React can render the new value first
    setTimeout(() => {
      if (inputRef.current) {
        const newCursorPos = newTextBefore.length + suggestion.length + 1;
        inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);
  };

  const checkActiveWord = (text: string, cursorPosition: number) => {
    if (!transliterate) return;
    
    const activeWord = getActiveWord(text, cursorPosition);
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    // If there is an active word, fetch suggestions
    if (activeWord) {
      timeoutRef.current = setTimeout(() => {
        fetchSuggestions(activeWord);
      }, 250);
    } else {
      setSuggestions([]);
      setFetchError(null);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const currentCursor = e.target.selectionStart || 0;
    
    // Immediately tell parent about raw value (fully controlled)
    if (onChange) {
      onChange(rawVal);
    }

    checkActiveWord(rawVal, currentCursor);
  };

  const handleCursorChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    // Don't check on ArrowDown/ArrowUp if suggestions are open (handled by keydown)
    if (suggestions.length > 0 && (e as any).key && ['ArrowDown', 'ArrowUp', 'Enter'].includes((e as any).key)) {
      return;
    }
    checkActiveWord(target.value, target.selectionStart || 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) {
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      commitSuggestion(suggestions[activeIndex]);
    } else if (e.key === ' ') {
      // Auto-commit top suggestion on space
      e.preventDefault();
      commitSuggestion(suggestions[activeIndex]);
    } else if (e.key === 'Escape') {
      setSuggestions([]);
    }
  };

  const handleTranslateClick = () => {
    if (onTranslate && value.trim()) {
      onTranslate(value);
    }
  };

  return (
    <div className={`relative flex flex-col justify-end h-full ${className}`} ref={wrapperRef}>
      <div className="flex flex-wrap justify-between items-end mb-1 gap-x-2">
        <label className="block text-sm font-medium text-gray-700 leading-tight">{label}</label>
        {onTranslate && (
          <span 
            onClick={handleTranslateClick}
            className="text-xs text-blue-600 cursor-pointer hover:underline whitespace-nowrap shrink-0"
          >
            Auto Translate
          </span>
        )}
      </div>
      {multiline ? (
        <textarea
          ref={inputRef as any}
          value={value}
          onChange={handleInput as any}
          onKeyDown={handleKeyDown as any}
          onKeyUp={handleCursorChange as any}
          onMouseUp={handleCursorChange as any}
          onFocus={handleCursorChange as any}
          className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm focus:ring-1 focus:ring-slate-500 focus:border-slate-500 outline-none transition-colors min-h-[80px] resize-y"
          placeholder={placeholder}
          rows={3}
        />
      ) : (
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          onKeyUp={handleCursorChange}
          onMouseUp={handleCursorChange}
          onFocus={handleCursorChange}
          className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm focus:ring-1 focus:ring-slate-500 focus:border-slate-500 outline-none transition-colors"
          placeholder={placeholder}
        />
      )}
      
      {/* Dropdown Suggestions or States */}
      {(suggestions.length > 0 || isFetching || fetchError) && (
        <div className="absolute top-[100%] left-0 z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
          {isFetching && suggestions.length === 0 && (
            <div className="px-4 py-2 text-sm text-gray-500 italic">Translating...</div>
          )}
          {fetchError && (
            <div className="px-4 py-2 text-sm text-red-500">{fetchError}</div>
          )}
          {suggestions.length > 0 && suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => commitSuggestion(suggestion)}
              onMouseEnter={() => setActiveIndex(index)}
              className={`cursor-pointer px-4 py-2 text-sm ${
                index === activeIndex ? 'bg-[#5bc0de] text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
