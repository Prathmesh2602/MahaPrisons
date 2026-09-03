import React from 'react';
import { HeroCarouselForm } from './forms/HeroCarouselForm';
import { AboutSectionForm } from './forms/AboutSectionForm';
import { QuickServicesForm } from './forms/QuickServicesForm';
import { JailInsightsForm } from './forms/JailInsightsForm';
import { MinisterProfilesForm } from './forms/MinisterProfilesForm';
import { PhotoGalleryForm } from './forms/PhotoGalleryForm';
import { HolidayCalendarForm } from './forms/HolidayCalendarForm';

export const BlockFormRenderer = ({ blockType, data, onChange }) => {
  // If the block type has a specialized form, render it
  if (blockType === 'HERO_CAROUSEL') {
    return <HeroCarouselForm data={data} onChange={onChange} />;
  }
  
  if (blockType === 'ABOUT_SECTION') {
    return <AboutSectionForm data={data} onChange={onChange} />;
  }

  if (blockType === 'QUICK_SERVICES') {
    return <QuickServicesForm data={data} onChange={onChange} />;
  }

  if (blockType === 'JAIL_INSIGHTS') {
    return <JailInsightsForm data={data} onChange={onChange} />;
  }

  if (blockType === 'MINISTER_PROFILES') {
    return <MinisterProfilesForm data={data} onChange={onChange} />;
  }

  if (blockType === 'PHOTO_GALLERY') {
    return <PhotoGalleryForm data={data} onChange={onChange} />;
  }

  if (blockType === 'HOLIDAY_CALENDAR') {
    return <HolidayCalendarForm data={data} onChange={onChange} />;
  }

  // Fallback to raw JSON editor for unimplemented block types
  const handleRawChange = (e) => {
    try {
      const parsedData = JSON.parse(e.target.value);
      onChange(parsedData);
    } catch (err) {
      // Ignore invalid JSON while typing
    }
  };

  return (
    <div>
      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-700">
        No specialized form exists for <strong>{blockType}</strong> yet. Falling back to raw JSON editor.
      </div>
      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Block Data (JSON)</label>
      <textarea
        className="w-full h-96 p-3 text-sm font-mono bg-gray-900 text-green-400 rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
        defaultValue={JSON.stringify(data, null, 2)}
        onChange={handleRawChange}
        spellCheck="false"
      />
    </div>
  );
};
