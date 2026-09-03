import React from 'react';
import { FormGroup, LanguageInput, ArrayEditor, TextField, TextArea } from './FormElements';
import { MediaPicker } from '../../MediaPicker';

export const HeroCarouselForm = ({ data, onChange }) => {
  const handleSlidesChange = (newSlides) => {
    onChange({ ...data, slides: newSlides });
  };

  return (
    <div className="space-y-6">
      <ArrayEditor
        title="Carousel Slides"
        items={data?.slides || []}
        onChange={handleSlidesChange}
        newItemTemplate={{
          img_src: '',
          img_alt: '',
          category: { en: '', mr: '' },
          title: { en: '', mr: '' },
          statement: { en: '', mr: '' },
          description: { en: '', mr: '' },
          cta1: { en: '', mr: '', href: '#' },
          cta2: null
        }}
        renderItem={(item, updateItem, index) => (
          <div className="space-y-4">
            <MediaPicker 
              label="Slide Image"
              value={item.img_src}
              onSelect={(val) => updateItem({ ...item, img_src: val, img_alt: 'Slide ' + (index + 1) })}
            />
            
            <FormGroup label="Category (e.g. Rehabilitation)">
              <LanguageInput 
                value={item.category || {en:'', mr:''}} 
                onChange={(val) => updateItem({ ...item, category: val })} 
              />
            </FormGroup>

            <FormGroup label="Title">
              <LanguageInput 
                value={item.title || {en:'', mr:''}} 
                onChange={(val) => updateItem({ ...item, title: val })} 
              />
            </FormGroup>

            <FormGroup label="Statement / Subtitle">
              <LanguageInput 
                value={item.statement || {en:'', mr:''}} 
                onChange={(val) => updateItem({ ...item, statement: val })} 
              />
            </FormGroup>

            <FormGroup label="Description">
              <LanguageInput 
                value={item.description || {en:'', mr:''}} 
                onChange={(val) => updateItem({ ...item, description: val })} 
                isTextArea
              />
            </FormGroup>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="border p-3 rounded bg-gray-50">
                <FormGroup label="Primary Button Text">
                  <LanguageInput 
                    value={item.cta1 || {en:'', mr:''}} 
                    onChange={(val) => updateItem({ ...item, cta1: { ...item.cta1, ...val } })} 
                  />
                </FormGroup>
                <FormGroup label="Primary Button Link">
                  <TextField 
                    value={item.cta1?.href || '#'} 
                    onChange={(val) => updateItem({ ...item, cta1: { ...item.cta1, href: val } })} 
                  />
                </FormGroup>
              </div>
              <div className="border p-3 rounded bg-gray-50">
                <FormGroup label="Secondary Button (Optional)">
                  <LanguageInput 
                    value={item.cta2 || {en:'', mr:''}} 
                    onChange={(val) => updateItem({ ...item, cta2: val.en || val.mr ? { ...item.cta2, ...val } : null })} 
                  />
                </FormGroup>
                <FormGroup label="Secondary Button Link">
                  <TextField 
                    value={item.cta2?.href || '#'} 
                    onChange={(val) => updateItem({ ...item, cta2: item.cta2 ? { ...item.cta2, href: val } : null })} 
                  />
                </FormGroup>
              </div>
            </div>
          </div>
        )}
      />

      <div className="border-t border-gray-200 pt-6">
        <h4 className="font-semibold text-gray-700 mb-4">Director General's Quote</h4>
        <FormGroup label="Director General Name">
          <LanguageInput 
            value={data?.dgName || {en:'', mr:''}} 
            onChange={(val) => onChange({ ...data, dgName: val })} 
          />
        </FormGroup>
        
        <FormGroup label="Designation">
          <LanguageInput 
            value={data?.dgDesignation || {en:'', mr:''}} 
            onChange={(val) => onChange({ ...data, dgDesignation: val })} 
          />
        </FormGroup>

        <FormGroup label="Quote Content">
          <LanguageInput 
            value={data?.dgQuote || {en:'', mr:''}} 
            onChange={(val) => onChange({ ...data, dgQuote: val })} 
            isTextArea
          />
        </FormGroup>

        <MediaPicker 
          label="Profile Photo"
          value={data?.dgPhoto || ''}
          onSelect={(val) => onChange({ ...data, dgPhoto: val })}
        />

        <FormGroup label="Read Full Message Link">
          <TextField 
            value={data?.dgLink || ''} 
            onChange={(val) => onChange({ ...data, dgLink: val })} 
            placeholder="https://..."
          />
        </FormGroup>
      </div>
    </div>
  );
};
