import React from 'react';
import { FormGroup, TextField, LanguageInput, ArrayEditor, SubSection } from './FormElements';

export const AnnouncementsTabsForm = ({ data, onChange }) => {
  return (
    <div className="space-y-6">
      <SubSection 
        title="Announcements Section Title" 
        value={data.title} 
        onChange={(val) => onChange({ ...data, title: val })}
      >
        {(title, handleChange) => (
          <FormGroup label="Title">
            <LanguageInput
              value={title}
              onChange={handleChange}
            />
          </FormGroup>
        )}
      </SubSection>

      <ArrayEditor
        title="Tabs"
        items={data.tabs || []}
        onChange={(tabs) => onChange({ ...data, tabs })}
        newItemTemplate={{ tab_title: '', items: [] }}
        renderItem={(tab, handleTabChange) => (
          <div className="space-y-4">
            <FormGroup label="Tab Title">
              <TextField
                value={tab.tab_title}
                onChange={(val) => handleTabChange({ ...tab, tab_title: val })}
                placeholder="e.g. भरती"
              />
            </FormGroup>
            
            <ArrayEditor
              title="Announcements in this Tab"
              items={tab.items || []}
              onChange={(items) => handleTabChange({ ...tab, items })}
              newItemTemplate={{ text: '', href: '', date: '' }}
              renderItem={(item, handleItemChange) => (
                <div className="space-y-4 border p-4 rounded-md">
                  <FormGroup label="Text">
                    <TextField
                      value={item.text}
                      onChange={(val) => handleItemChange({ ...item, text: val })}
                    />
                  </FormGroup>
                  <FormGroup label="Link (href)">
                    <TextField
                      value={item.href}
                      onChange={(val) => handleItemChange({ ...item, href: val })}
                    />
                  </FormGroup>
                  <FormGroup label="Date">
                    <TextField
                      value={item.date}
                      onChange={(val) => handleItemChange({ ...item, date: val })}
                      placeholder="e.g. 03 Jul 2026"
                    />
                  </FormGroup>
                </div>
              )}
            />
          </div>
        )}
      />
    </div>
  );
};
