import React from 'react';
import { FormGroup, LanguageInput } from './FormElements';

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
    </div>
  );
};
