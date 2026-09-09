import React from 'react';
import { FormGroup, LanguageInput, ArrayEditor, TextField } from './FormElements';

export const HolidayCalendarForm = ({ data, onChange }) => {
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
        title="Holidays List"
        items={data?.holidays || []}
        onChange={(newHolidays) => onChange({ ...data, holidays: newHolidays })}
        newItemTemplate={{ date: '', type: 'gazetted', title: {en:'', mr:''} }}
        renderItem={(item, updateItem, index) => (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormGroup label="Date (YYYY-MM-DD)">
                <TextField 
                  type="date"
                  value={item.date || ''} 
                  onChange={(val) => updateItem({ ...item, date: val })} 
                />
              </FormGroup>
              
              <FormGroup label="Type">
                <select
                  value={item.type || 'gazetted'}
                  onChange={(e) => updateItem({ ...item, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-amber-500 sm:text-sm"
                >
                  <option value="gazetted">Gazetted Holiday</option>
                  <option value="restricted">Restricted Holiday</option>
                </select>
              </FormGroup>
            </div>
            
            <FormGroup label="Holiday Name">
              <LanguageInput 
                value={item.title || {en:'', mr:''}} 
                onChange={(val) => updateItem({ ...item, title: val })} 
              />
            </FormGroup>
          </div>
        )}
      />
    </div>
  );
};
