"use client";
import React, { useEffect, useState } from 'react';
import { useAccessibility } from '../hooks/useAccessibility';

export const BlankPageFallback = ({ path }) => {
  const { language } = useAccessibility();
  const [menuLabelEn, setMenuLabelEn] = useState('');
  const [menuLabelMr, setMenuLabelMr] = useState('');

  useEffect(() => {
    // Fetch the menu to find the label for this path
    const fetchMenu = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/v1/menu');
        const data = await res.json();
        
        let foundLabelEn = path;
        let foundLabelMr = path;
        
        // Recursive search for the menu item
        const searchItems = (items) => {
          if (!items) return false;
          for (const item of items) {
            // Check direct href
            if (item.href === `/${path}`) {
              foundLabelEn = item.label_en || item.label_mr;
              foundLabelMr = item.label_mr || item.label_en;
              return true;
            }
            
            // Check mega menu groups
            if (item.groups && Array.isArray(item.groups)) {
              for (const group of item.groups) {
                if (group.children) {
                  for (const child of group.children) {
                    if (child.href === `/${path}`) {
                      foundLabelEn = child.label_en || child.label_mr || child.title;
                      foundLabelMr = child.label_mr || child.label_en || child.title;
                      return true;
                    }
                  }
                }
              }
            }
            
            // Check nested children
            if (item.children && item.children.length > 0) {
              if (searchItems(item.children)) return true;
            }
          }
          return false;
        };
        
        searchItems(data);
        
        setMenuLabelEn(foundLabelEn);
        setMenuLabelMr(foundLabelMr);
      } catch (err) {
        console.error('Failed to fetch menu labels', err);
      }
    };
    
    fetchMenu();
  }, [path]);

  const comingSoonText = language === 'mr' ? 'पृष्ठ लवकरच येत आहे...' : 'Page coming soon...';
  
  // Format fallback if API fails
  const formatFallback = (p) => {
    return p.split('/').pop().replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const labelToDisplay = language === 'mr' 
    ? (menuLabelMr || formatFallback(path))
    : (menuLabelEn || formatFallback(path));

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 dark-mode:bg-gray-900 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-400 dark-mode:text-gray-600 mb-4 text-center">
        {comingSoonText}
      </h1>
      <p className="text-gray-400 dark-mode:text-gray-500">
        {labelToDisplay}
      </p>
    </div>
  );
};
