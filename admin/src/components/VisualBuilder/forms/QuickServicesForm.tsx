import React from 'react';
import { FormGroup, LanguageInput, ArrayEditor, TextField } from './FormElements';
import { MediaPicker } from '../../MediaPicker';

export const QuickServicesForm = ({ data, onChange }) => {
  return (
    <div className="space-y-6">
      <div className="border border-gray-200 rounded p-4 bg-white">
        <FormGroup label="Section Title">
          <LanguageInput 
            value={data?.title || {en:'', mr:''}} 
            onChange={(val) => onChange({ ...data, title: val })} 
          />
        </FormGroup>

        <FormGroup label="Section Subtitle">
          <LanguageInput 
            value={data?.subtitle || {en:'', mr:''}} 
            onChange={(val) => onChange({ ...data, subtitle: val })} 
            isTextArea
          />
        </FormGroup>
      </div>

      <ArrayEditor
        title="Helplines"
        items={data?.helplines || []}
        onChange={(newHelplines) => onChange({ ...data, helplines: newHelplines })}
        newItemTemplate={{ text: {en:'', mr:''}, href: '#', img_src: '', img_alt: '' }}
        renderItem={(item, updateItem, index) => (
          <div className="space-y-4">
            <FormGroup label="Helpline Text (e.g. Emergency Police:100)">
              <LanguageInput 
                value={item.text || {en:'', mr:''}} 
                onChange={(val) => updateItem({ ...item, text: val })} 
              />
            </FormGroup>
            
            <FormGroup label="Link (Optional)">
              <TextField 
                value={item.href} 
                onChange={(val) => updateItem({ ...item, href: val })} 
              />
            </FormGroup>

            <MediaPicker 
              label="Icon / Image (Optional)"
              value={item.img_src}
              onSelect={(val) => updateItem({ ...item, img_src: val })}
            />
          </div>
        )}
      />

      <ArrayEditor
        title="Important Links"
        items={data?.links || []}
        onChange={(newLinks) => onChange({ ...data, links: newLinks })}
        newItemTemplate={{ text: {en:'', mr:''}, href: '#', title: '' }}
        renderItem={(item, updateItem, index) => (
          <div className="space-y-4">
            <FormGroup label="Link Text">
              <LanguageInput 
                value={item.text || {en:'', mr:''}} 
                onChange={(val) => updateItem({ ...item, text: val })} 
              />
            </FormGroup>
            
            <FormGroup label="URL">
              <TextField 
                value={item.href} 
                onChange={(val) => updateItem({ ...item, href: val })} 
              />
            </FormGroup>
          </div>
        )}
      />
    </div>
  );
};
