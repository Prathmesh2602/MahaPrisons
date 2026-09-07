import React from 'react';
import { FormGroup, LanguageInput, ArrayEditor } from './FormElements';
import { MediaPicker } from '../../MediaPicker';
import { User } from 'lucide-react';

export const AboutSectionForm = ({ data, onChange }) => {
  const heading = data?.heading || {};
  const content = data?.content || {};

  return (
    <div className="space-y-6">
      <div className="bg-white p-1">
        <FormGroup label="Section Heading">
          <LanguageInput 
            value={heading} 
            onChange={(val) => onChange({ ...data, heading: val })} 
          />
        </FormGroup>

        <FormGroup label="Paragraph Content">
          <LanguageInput 
            isTextArea 
            value={content} 
            onChange={(val) => onChange({ ...data, content: val })} 
          />
        </FormGroup>
      </div>

      <ArrayEditor
        title="Officers In Charge"
        items={data?.officers || []}
        onChange={(newOfficers) => onChange({ ...data, officers: newOfficers })}
        newItemTemplate={{ img: '', name: {en:'', mr:''}, desg: {en:'', mr:''} }}
        renderItem={(item, updateItem, index) => (
          <div className="space-y-4">
            <MediaPicker 
              label="Profile Photo"
              value={item.img}
              onSelect={(val) => updateItem({ ...item, img: val })}
              fallbackIcon={<User className="w-10 h-10 text-gray-400" />}
            />
            
            <FormGroup label="Name">
              <LanguageInput 
                value={item.name || {en:'', mr:''}} 
                onChange={(val) => updateItem({ ...item, name: val })} 
              />
            </FormGroup>

            <FormGroup label="Designation">
              <LanguageInput 
                value={item.desg || {en:'', mr:''}} 
                onChange={(val) => updateItem({ ...item, desg: val })} 
              />
            </FormGroup>
          </div>
        )}
      />
    </div>
  );
};
