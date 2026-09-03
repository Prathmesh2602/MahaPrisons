import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../utils/api';
import { MediaPicker } from '../../components/MediaPicker';
import { ArrayEditor, FormGroup, TextField, LanguageInput } from '../../components/VisualBuilder/forms/FormElements';
import { Save, Loader2 } from 'lucide-react';

export const GlobalSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/api/v1/settings');
      setSettings(data);
    } catch (error) {
      console.error('Failed to fetch settings', error);
      // Initialize if not found
      setSettings({
        logoH1: '',
        logoSpans: [],
        topbarLinks: [],
        footerColumns: [],
        contactInfo: { address: '', phone: '', email: '' },
        socialLinks: []
      });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await apiFetch('/api/v1/settings', {
        method: 'PUT',
        body: JSON.stringify(settings)
      });
      alert('Global Settings saved successfully!');
    } catch (error) {
      console.error('Failed to save settings', error);
      alert('Failed to save settings.');
    }
    setSaving(false);
  };

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-amber-500" /></div>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Global Settings</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          Save Settings
        </button>
      </div>

      <div className="space-y-8">
        
        {/* HEADER SETTINGS */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 p-4">
            <h2 className="font-bold text-gray-700">Header & Topbar</h2>
          </div>
          <div className="p-6 space-y-6">
            <FormGroup label="Main Title (English)">
              <TextField 
                value={settings?.logoH1} 
                onChange={(val) => setSettings({ ...settings, logoH1: val })} 
              />
            </FormGroup>

            <ArrayEditor
              title="Subtitle / Spans"
              items={settings?.logoSpans || []}
              onChange={(val) => setSettings({ ...settings, logoSpans: val })}
              newItemTemplate={''}
              renderItem={(item, updateItem, index) => (
                <TextField 
                  value={item} 
                  onChange={(val) => updateItem(val)} 
                  placeholder="e.g. महाराष्ट्र कारागृह आणि सुधार सेवा"
                />
              )}
            />

            <ArrayEditor
              title="Topbar Links"
              items={settings?.topbarLinks || []}
              onChange={(val) => setSettings({ ...settings, topbarLinks: val })}
              newItemTemplate={{ text: '', href: '#', title: '' }}
              renderItem={(item, updateItem, index) => (
                <div className="grid grid-cols-2 gap-4">
                  <FormGroup label="Text">
                    <TextField 
                      value={item.text} 
                      onChange={(val) => updateItem({ ...item, text: val, title: val })} 
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
        </section>

        {/* FOOTER SETTINGS */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 p-4">
            <h2 className="font-bold text-gray-700">Footer Settings</h2>
          </div>
          <div className="p-6 space-y-6">
            
            <ArrayEditor
              title="Footer Links"
              items={settings?.footerColumns || []}
              onChange={(val) => setSettings({ ...settings, footerColumns: val })}
              newItemTemplate={{ text: '', href: '#', title: '' }}
              renderItem={(item, updateItem, index) => (
                <div className="grid grid-cols-2 gap-4">
                  <FormGroup label="Text">
                    <TextField 
                      value={item.text} 
                      onChange={(val) => updateItem({ ...item, text: val, title: val })} 
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

            <div className="border border-gray-200 p-4 rounded bg-gray-50 space-y-4 mt-6">
              <h3 className="font-semibold text-gray-700 mb-2">Contact Information</h3>
              <FormGroup label="Address">
                <TextField 
                  value={settings?.contactInfo?.address || ''} 
                  onChange={(val) => setSettings({ ...settings, contactInfo: { ...settings.contactInfo, address: val } })} 
                />
              </FormGroup>
              <div className="grid grid-cols-2 gap-4">
                <FormGroup label="Phone">
                  <TextField 
                    value={settings?.contactInfo?.phone || ''} 
                    onChange={(val) => setSettings({ ...settings, contactInfo: { ...settings.contactInfo, phone: val } })} 
                  />
                </FormGroup>
                <FormGroup label="Email">
                  <TextField 
                    value={settings?.contactInfo?.email || ''} 
                    onChange={(val) => setSettings({ ...settings, contactInfo: { ...settings.contactInfo, email: val } })} 
                  />
                </FormGroup>
              </div>
            </div>

            <ArrayEditor
              title="Social Media Links"
              items={settings?.socialLinks || []}
              onChange={(val) => setSettings({ ...settings, socialLinks: val })}
              newItemTemplate={{ platform: 'Facebook', href: '#' }}
              renderItem={(item, updateItem, index) => (
                <div className="grid grid-cols-2 gap-4">
                  <FormGroup label="Platform">
                    <TextField 
                      value={item.platform} 
                      onChange={(val) => updateItem({ ...item, platform: val })} 
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
        </section>

      </div>
    </div>
  );
};
