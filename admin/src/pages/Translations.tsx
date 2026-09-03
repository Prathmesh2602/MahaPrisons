import { useEffect, useState } from 'react';
import { apiClient } from '../api/client';
import { Save } from 'lucide-react';

export default function Translations() {
  const [translations, setTranslations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    fetchTranslations();
  }, []);

  const fetchTranslations = async () => {
    try {
      const data = await fetch('http://localhost:3000/api/v1/public/translations').then(res => res.json());
      const arr = Object.entries(data).map(([key, val]: any) => ({
        key,
        mr: val.mr,
        en: val.en,
        id: val.id || null
      }));
      setTranslations(arr);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (id: string | null, mr: string, en: string) => {
    if (!id) return alert('This legacy entry does not have a database ID yet. (Database seed pending full import)');
    setSavingId(id);
    try {
      await apiClient(`/translations/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ mr, en })
      });
      alert('Translation updated! Changes are live immediately and cached in Redis.');
    } catch (err: any) {
      alert(err.message || 'Error saving');
    } finally {
      setSavingId(null);
    }
  };

  if (loading) return <div className="p-8 flex justify-center"><div className="w-8 h-8 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Translations Dictionary</h2>
        <p className="text-sm text-gray-500 mt-1">Updates here are saved immediately via Direct-Write APIs and bypass the Maker-Checker workflow.</p>
      </div>
      
      <div className="space-y-4">
        {translations.slice(0, 15).map((t: any, idx) => (
          <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-100 bg-gray-50 rounded-lg items-center shadow-sm hover:border-gray-200 transition-colors">
            <div className="font-mono text-sm bg-white border border-gray-200 p-2 rounded-md shadow-inner truncate text-slate-600 font-semibold" title={t.key}>
              {t.key}
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1 uppercase tracking-wider">English</label>
              <input type="text" defaultValue={t.en} className="w-full border border-gray-300 p-2 rounded-md text-sm shadow-sm focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none" 
                onChange={(e) => { t.en = e.target.value; }} />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1 uppercase tracking-wider">Marathi</label>
              <input type="text" defaultValue={t.mr} className="w-full border border-gray-300 p-2 rounded-md text-sm shadow-sm font-devanagari focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none" 
                onChange={(e) => { t.mr = e.target.value; }} />
            </div>
            <div className="md:text-right mt-4 md:mt-0">
              <button 
                onClick={() => handleSave(t.id, t.mr, t.en)}
                disabled={savingId === t.id}
                className="bg-slate-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-800 flex items-center justify-center gap-2 w-full shadow-sm disabled:opacity-50 transition-colors"
              >
                <Save className="w-4 h-4" /> {savingId === t.id ? 'Saving...' : 'Direct Save'}
              </button>
            </div>
          </div>
        ))}
        {translations.length > 15 && (
          <div className="text-center text-sm text-gray-500 py-6 border-t border-dashed mt-4">
            Showing first 15 dictionary entries. (Pagination/Search deferred for production).
          </div>
        )}
      </div>
    </div>
  );
}
