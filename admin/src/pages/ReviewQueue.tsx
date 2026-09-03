import { useEffect, useState } from 'react';
import { apiClient } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';
import { Check, X, Eye } from 'lucide-react';

export default function ReviewQueue() {
  const [queue, setQueue] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchQueue();
  }, []);

  const fetchQueue = async () => {
    try {
      const data = await apiClient('/review-queue');
      setQueue(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (versionId: string, pageId: string) => {
    if (!window.confirm('Are you sure you want to approve and publish this content? It will go live immediately.')) return;
    try {
      await apiClient(`/pages/${pageId}/approve`, {
        method: 'POST',
        body: JSON.stringify({ versionId })
      });
      fetchQueue();
    } catch (err: any) {
      alert(err.message || 'Error approving');
    }
  };

  const handleReject = async (versionId: string, pageId: string) => {
    const reason = window.prompt('Please provide a reason for rejection:');
    if (reason === null) return;
    
    try {
      await apiClient(`/pages/${pageId}/reject`, {
        method: 'POST',
        body: JSON.stringify({ versionId, reviewNotes: reason })
      });
      fetchQueue();
    } catch (err: any) {
      alert(err.message || 'Error rejecting');
    }
  };

  if (loading) return <div className="p-8 flex justify-center"><div className="w-8 h-8 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Pending Approvals</h2>
          <p className="text-sm text-gray-500 mt-1">Review and publish content submitted by editors.</p>
        </div>
        <div className="bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full">
          {queue.length} Pending
        </div>
      </div>
      
      <div className="divide-y divide-gray-200">
        {queue.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <Check className="w-12 h-12 text-gray-300 mb-3" />
            <p className="text-gray-500 font-medium">You're all caught up!</p>
            <p className="text-sm text-gray-400 mt-1">No items currently pending review.</p>
          </div>
        ) : (
          queue.map((item: any) => (
            <div key={item.id} className="p-6 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded uppercase">Page Update</span>
                  <span className="text-sm text-gray-500">ID: {item.id.substring(0, 8)}</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  {item.page?.titleMr || 'Unknown Page'} <span className="text-sm font-normal text-gray-500 ml-1">({item.page?.titleEn || 'N/A'})</span>
                </h3>
                <div className="text-sm text-gray-500 flex items-center gap-3 mt-2">
                  <span>URL Path: <span className="font-mono bg-gray-100 px-1 py-0.5 rounded">/{item.page?.slug}</span></span>
                  <span>•</span>
                  <span>Submitted: {format(new Date(item.createdAt), 'MMM d, yyyy HH:mm')}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-md transition-colors flex items-center gap-2 shadow-sm"
                  onClick={() => alert('Diff viewer not implemented yet')}
                >
                  <Eye className="w-4 h-4" /> View Diff
                </button>
                <button
                  onClick={() => handleReject(item.id, item.pageId)}
                  className="px-3 py-2 text-sm font-medium text-red-700 bg-white border border-red-200 hover:bg-red-50 rounded-md transition-colors flex items-center gap-2 shadow-sm"
                >
                  <X className="w-4 h-4" /> Reject
                </button>
                <button
                  onClick={() => handleApprove(item.id, item.pageId)}
                  className="px-3 py-2 text-sm font-medium text-white bg-emerald-600 border border-emerald-700 hover:bg-emerald-700 rounded-md transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Check className="w-4 h-4" /> Approve
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
