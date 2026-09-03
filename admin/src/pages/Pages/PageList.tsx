import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../../api/client';
import { Edit, FileText, Plus } from 'lucide-react';

export default function PageList() {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const data = await apiClient('/pages');
      setPages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8 flex justify-center"><div className="w-8 h-8 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Pages</h2>
          <p className="text-sm text-gray-500 mt-1">Manage portal content pages and templates.</p>
        </div>
        <Link
          to="/pages/new"
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Page
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
              <th className="px-6 py-4 font-medium">Page Details</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Template</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {pages.map((page) => (
              <tr key={page.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{page.titleMr} <span className="text-sm font-normal text-gray-500 ml-1">({page.titleEn})</span></p>
                      <p className="text-sm text-gray-500 font-mono">/{page.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    page.status === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-800' :
                    page.status === 'IN_REVIEW' ? 'bg-amber-100 text-amber-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {page.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">{page.templateId || 'Default'}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    to={`/pages/edit/${page.id}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 bg-white border border-gray-300 hover:bg-gray-50 px-3 py-1.5 rounded-md transition-colors"
                  >
                    <Edit className="w-4 h-4" /> Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {pages.length === 0 && (
          <div className="p-8 text-center text-gray-500">No pages found. Create one to get started.</div>
        )}
      </div>
    </div>
  );
}
