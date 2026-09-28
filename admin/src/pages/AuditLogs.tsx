import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Eye, Calendar, Clock, CheckCircle, XCircle, Clock3 } from 'lucide-react';
import { Button } from '../components/Button';
import { ReviewDiffViewer } from '../components/ReviewDiffViewer';

interface Revision {
  id: string;
  modelName: string;
  recordId: string | null;
  displayType?: string;
  displayTitle?: string;
  previewUrl?: string;
  status: string;
  proposedData: any;
  changeSummary?: string;
  rejectReason?: string;
  createdBy: { name: string | null; email: string };
  reviewedBy?: { name: string | null; email: string };
  createdAt: string;
  updatedAt: string;
}

export const AuditLogs = () => {
  const { token, user } = useAuth();
  const [logs, setLogs] = useState<Revision[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previewRevision, setPreviewRevision] = useState<Revision | null>(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/review/history', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Failed to fetch audit logs');
      const data = await res.json();
      setLogs(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs px-2.5 py-1 rounded-full border border-green-200"><CheckCircle size={12} /> Approved</span>;
      case 'REJECTED':
        return <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 text-xs px-2.5 py-1 rounded-full border border-red-200"><XCircle size={12} /> Rejected</span>;
      case 'PENDING_REVIEW':
        return <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded-full border border-amber-200"><Clock3 size={12} /> Pending</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded border border-gray-200">{status}</span>;
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return (
      <div className="flex flex-col">
        <span className="flex items-center gap-1 text-sm"><Calendar size={12} className="text-gray-400" /> {d.toLocaleDateString()}</span>
        <span className="flex items-center gap-1 text-xs text-gray-500"><Clock size={12} className="text-gray-400" /> {d.toLocaleTimeString()}</span>
      </div>
    );
  };

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen font-sans bg-slate-50">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 flex items-center gap-3">
            <div className="bg-indigo-600 p-2.5 rounded-xl text-white shadow-lg shadow-indigo-200">
              <Shield size={28} />
            </div>
            Audit Logs
          </h1>
          <p className="text-slate-500 mt-2 text-[15px] font-medium max-w-2xl">
            A comprehensive history of all content changes, approvals, and rejections across the system.
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 shadow-sm border border-red-100 font-medium">
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 font-medium">Loading audit logs...</div>
        ) : logs.length === 0 ? (
          <div className="p-12 text-center text-slate-500 font-medium flex flex-col items-center gap-4">
            <Shield className="w-16 h-16 text-slate-300" />
            <p className="text-lg">No audit history found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                  <th className="p-4 pl-6">Timestamp</th>
                  <th className="p-4">Action Summary</th>
                  <th className="p-4">Maker</th>
                  <th className="p-4">Checker</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right pr-6">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="p-4 pl-6 align-top">
                      {formatDate(log.updatedAt)}
                    </td>
                    <td className="p-4 align-top">
                      <div className="font-bold text-slate-900 mb-1">
                        {log.displayTitle || log.modelName}
                      </div>
                      <div className="text-sm font-medium text-slate-600 mb-2">
                        {log.changeSummary || 'Content modification'}
                      </div>
                      <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                        {log.displayType || 'Settings'}
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <div className="text-sm font-medium text-slate-900">{log.createdBy.name || 'Maker'}</div>
                      <div className="text-xs text-slate-500">{log.createdBy.email}</div>
                    </td>
                    <td className="p-4 align-top">
                      {log.reviewedBy ? (
                        <>
                          <div className="text-sm font-medium text-slate-900">{log.reviewedBy.name || 'Checker'}</div>
                          <div className="text-xs text-slate-500">{log.reviewedBy.email}</div>
                        </>
                      ) : (
                        <span className="text-xs text-slate-400 italic">Pending...</span>
                      )}
                    </td>
                    <td className="p-4 align-top">
                      {getStatusBadge(log.status)}
                    </td>
                    <td className="p-4 pr-6 align-top text-right">
                      <Button
                        onClick={() => setPreviewRevision(log)}
                        variant="outline"
                        size="sm"
                        className="bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-sm"
                        icon={<Eye size={16} />}
                      >
                        View Diff
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Diff Modal */}
        {previewRevision && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col border border-slate-200">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
                <h2 className="text-xl font-bold text-slate-900">
                  Log Details: <span className="text-indigo-600">{previewRevision.displayTitle || previewRevision.modelName}</span>
                </h2>
                <div className="flex items-center gap-3">
                  {previewRevision.previewUrl && (
                    <Button 
                      onClick={() => window.open(previewRevision.previewUrl, '_blank')} 
                      variant="outline" 
                      size="sm" 
                      className="border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                      icon={<Eye className="w-4 h-4" />}
                    >
                      View Live State
                    </Button>
                  )}
                  <button onClick={() => setPreviewRevision(null)} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors">
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 overflow-y-auto flex-grow bg-slate-50/50">
                <div className="flex gap-4 mb-6">
                  <div className="flex-1 bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                    <h3 className="text-slate-400 font-bold mb-1 text-[10px] uppercase tracking-wider">Maker</h3>
                    <p className="font-semibold text-slate-900">{previewRevision.createdBy.name || previewRevision.createdBy.email}</p>
                  </div>
                  <div className="flex-1 bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                    <h3 className="text-slate-400 font-bold mb-1 text-[10px] uppercase tracking-wider">Checker</h3>
                    <p className="font-semibold text-slate-900">{previewRevision.reviewedBy ? (previewRevision.reviewedBy.name || previewRevision.reviewedBy.email) : 'None'}</p>
                  </div>
                  <div className="flex-1 bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                    <h3 className="text-slate-400 font-bold mb-1 text-[10px] uppercase tracking-wider">Final Status</h3>
                    <div className="mt-1">{getStatusBadge(previewRevision.status)}</div>
                  </div>
                </div>

                {previewRevision.rejectReason && (
                  <div className="mb-6 bg-red-50 border border-red-200 p-5 rounded-xl shadow-sm">
                    <h3 className="text-red-900 font-bold mb-2 text-xs uppercase tracking-wider">Rejection Reason</h3>
                    <p className="text-red-800 font-medium">{previewRevision.rejectReason}</p>
                  </div>
                )}
                
                {previewRevision.changeSummary && (
                  <div className="mb-6 bg-indigo-50 border border-indigo-200 p-5 rounded-xl shadow-sm">
                    <h3 className="text-indigo-900 font-bold mb-2 text-xs uppercase tracking-wider">Maker's Change Summary</h3>
                    <p className="text-indigo-950 text-lg font-medium">{previewRevision.changeSummary}</p>
                  </div>
                )}

                <h3 className="text-slate-900 font-bold mb-3 mt-8">Exact Technical Changes</h3>
                <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200">
                  <ReviewDiffViewer revisionId={previewRevision.id} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
