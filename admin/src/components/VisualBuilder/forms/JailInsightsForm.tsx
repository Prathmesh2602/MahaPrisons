import React from 'react';
import { FormGroup, LanguageInput, ArrayEditor, TextField } from './FormElements';
import * as LucideIcons from 'lucide-react';

export const JailInsightsForm = ({ data, onChange }) => {
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
          />
        </FormGroup>
        
        <FormGroup label="YouTube Link">
          <TextField 
            value={data?.youtubeLink || ''} 
            onChange={(val) => onChange({ ...data, youtubeLink: val })} 
            placeholder="https://youtube.com/..."
          />
        </FormGroup>
      </div>

      <ArrayEditor
        title="Insight Cards"
        items={data?.cards || []}
        onChange={(newCards) => onChange({ ...data, cards: newCards })}
        newItemTemplate={{ icon: 'Star', title: {en:'', mr:''}, description: {en:'', mr:''} }}
        renderItem={(item, updateItem, index) => {
          const Icon = LucideIcons[item.icon] || LucideIcons.Star;
          return (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-100 text-amber-700 rounded-lg">
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <FormGroup label="Lucide Icon Name (e.g. HeartHandshake, Sprout, BookOpen)">
                    <TextField 
                      value={item.icon} 
                      onChange={(val) => updateItem({ ...item, icon: val })} 
                    />
                  </FormGroup>
                </div>
              </div>

              <FormGroup label="Card Title">
                <LanguageInput 
                  value={item.title || {en:'', mr:''}} 
                  onChange={(val) => updateItem({ ...item, title: val })} 
                />
              </FormGroup>
              
              <FormGroup label="Card Description">
                <LanguageInput 
                  value={item.description || {en:'', mr:''}} 
                  onChange={(val) => updateItem({ ...item, description: val })} 
                  isTextArea
                />
              </FormGroup>
            </div>
          )
        }}
      />
    </div>
  );
};
