---
name: Phonetic Input Usage
description: Rule to enforce usage of PhoneticInput component for any Marathi language fields
---

# Phonetic Input Rule

Whenever you are developing or modifying UI forms in the `admin` app that require the user to input **Marathi** text (e.g. fields ending in `_mr`, or labels indicating "Marathi"), you MUST use the `PhoneticInput` component located at `admin/src/components/PhoneticInput.tsx` instead of a standard `<input type="text">`.

## Guidelines
1. Import the component: `import { PhoneticInput } from '../components/PhoneticInput';`
2. It is a fully controlled component. Use `value` and `onChange`.
3. Provide a clear `label`.

Example:
```tsx
<PhoneticInput
  label="Group Title (Marathi)"
  value={formData.title_mr}
  onChange={(val) => handleChange('title_mr', val)}
/>
```

Do not use standard HTML `<input>` fields for any Marathi content.
