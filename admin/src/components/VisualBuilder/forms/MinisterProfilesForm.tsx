import React from 'react';
import { FormGroup, LanguageInput, ArrayEditor, TextField } from './FormElements';
import { MediaPicker } from '../../MediaPicker';

export const MinisterProfilesForm = ({ data, onChange }) => {
  return (
    <div className="space-y-6">
      <div className="border border-gray-200 rounded p-4 bg-white">
        <FormGroup label="Section Title">
          <LanguageInput 
            value={data?.title || {en:'', mr:''}} 
            onChange={(val) => onChange({ ...data, title: val })} 
          />
        </FormGroup>
      </div>

      <ArrayEditor
        title="Ministers & Key Dignitaries"
        items={data?.ministers || []}
        onChange={(newMinisters) => onChange({ ...data, ministers: newMinisters })}
        newItemTemplate={{ img_src: '', img_alt: '', name: {en:'', mr:''}, desg: {en:'', mr:''} }}
        renderItem={(item, updateItem, index) => (
          <div className="space-y-4">
            <MediaPicker 
              label="Profile Photo"
              value={item.img_src}
              onSelect={(val) => updateItem({ ...item, img_src: val })}
            />
            
            <FormGroup label="Name">
              <LanguageInput 
                value={item.name || {en:'', mr:''}} 
                onChange={(val) => updateItem({ ...item, name: val, img_alt: val.en || val.mr })} 
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

      <ArrayEditor
        title="Senior Officers"
        items={data?.seniorOfficers || []}
        onChange={(newOfficers) => onChange({ ...data, seniorOfficers: newOfficers })}
        newItemTemplate={{ img_src: '', img_alt: '', name: {en:'', mr:''}, desg: {en:'', mr:''} }}
        renderItem={(item, updateItem, index) => (
          <div className="space-y-4">
            <MediaPicker 
              label="Profile Photo"
              value={item.img_src}
              onSelect={(val) => updateItem({ ...item, img_src: val })}
            />
            
            <FormGroup label="Name">
              <LanguageInput 
                value={item.name || {en:'', mr:''}} 
                onChange={(val) => updateItem({ ...item, name: val, img_alt: val.en || val.mr })} 
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
