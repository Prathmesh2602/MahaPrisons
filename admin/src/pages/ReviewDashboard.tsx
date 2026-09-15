import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, XCircle, Clock, Eye, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { ReviewDiffViewer } from '../components/ReviewDiffViewer';
import { Button } from '../components/Button';

interface Revision {
  id: string;
  modelName: string;
  recordId: string | null;
  status: string;
  proposedData: any;
  createdAt: string;
  createdBy: {
    name: string;
    email: string;
  };
}

export const ReviewDashboard: React.FC = () => {
  const [revisions, setRevisions] = useState<Revision[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  // States for preview modal
  const [previewRevision, setPreviewRevision] = useState<Revision | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const fetchRevisions = async () => {
    try {
      const endpoint = user?.role === 'MAKER' 
        ? 'http://localhost:5000/api/v1/review/my-requests'
        : 'http://localhost:5000/api/v1/review/pending';
      const res = await axios.get(endpoint);
      setRevisions(res.data);
    } catch (err) {
      console.error('Failed to fetch reviews', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRevisions();
    }
  }, [user]);

  const handleApprove = async (id: string) => {
    try {
      await axios.post(`http://localhost:5000/api/v1/review/${id}/approve`);
      alert('Revision approved and published successfully.');
      setPreviewRevision(null);
      fetchRevisions();
    } catch (err) {
      alert('Failed to approve revision.');
    }
  };

  const handleReject = async (id: string) => {
    if (!rejectReason) {
      alert('Please provide a reason for rejection.');
      return;
    }
    try {
      await axios.post(`http://localhost:5000/api/v1/review/${id}/reject`, { rejectReason });
      alert('Revision rejected.');
      setPreviewRevision(null);
      setRejectReason('');
      fetchRevisions();
    } catch (err) {
      alert('Failed to reject revision.');
    }
  };

  const handleCancel = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this request?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/v1/review/${id}`);
      fetchRevisions();
    } catch (err) {
      alert('Failed to cancel request.');
    }
  };

  return (
    <div>
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-800">{user?.role === 'MAKER' ? 'My Submissions' : 'Review Queue'}</h1>
      </div>
      <div className="p-8">

      {loading ? (
        <div className="text-slate-500">Loading reviews...</div>
      ) : revisions.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-800">{user?.role === 'MAKER' ? 'Submission History' : 'Pending Approvals'}</h2>
              <p className="text-sm text-slate-500">{user?.role === 'MAKER' ? 'Track the status of your proposed changes.' : 'Review and publish content submitted by editors.'}</p>
            </div>
            <span className="bg-gray-50 text-gray-700 text-xs font-bold px-3 py-1 rounded-full border border-gray-200">
              0 Items
            </span>
          </div>
          <div className="p-16 text-center">
            <div className="mx-auto w-16 h-16 text-gray-300 mb-4 flex justify-center items-center">
              <CheckCircle size={64} strokeWidth={1} />
            </div>
            <h3 className="text-lg font-medium text-slate-700">You're all caught up!</h3>
            <p className="text-slate-500 mt-1">No items currently pending review.</p>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Submitted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {revisions.map((rev) => (
                <tr key={rev.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{rev.modelName}</div>
                    <div className="text-sm text-gray-500">{rev.recordId || 'Global Config'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{rev.createdBy?.name || 'Data Entry'}</div>
                    <div className="text-sm text-gray-500">{rev.createdBy?.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(rev.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {rev.status === 'PENDING_REVIEW' && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        <Clock className="w-4 h-4 mr-1" /> Pending
                      </span>
                    )}
                    {rev.status === 'APPROVED' && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        <CheckCircle2 className="w-4 h-4 mr-1" /> Approved
                      </span>
                    )}
                    {rev.status === 'REJECTED' && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        <AlertCircle className="w-4 h-4 mr-1" /> Rejected
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end gap-3 items-center">
                    {user?.role === 'MAKER' && rev.status === 'PENDING_REVIEW' && (
                      <Button 
                        onClick={() => handleCancel(rev.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5"
                        title="Cancel Request"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                    <Button 
                      onClick={() => setPreviewRevision(rev)}
                      variant="ghost"
                      size="sm"
                      className="text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50"
                      icon={<Eye className="w-4 h-4" />}
                    >
                      Preview
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Preview Modal */}
      {previewRevision && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold">Review Proposed Changes for {previewRevision.modelName}</h2>
              <Button onClick={() => setPreviewRevision(null)} variant="ghost" size="sm" className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                <XCircle className="w-6 h-6" />
              </Button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-grow bg-gray-50">
              {(previewRevision as any).status === 'REJECTED' && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-800 p-4 rounded-md">
                  <strong>Rejection Reason:</strong> {(previewRevision as any).rejectReason}
                </div>
              )}
              <ReviewDiffViewer revisionId={previewRevision.id} />
            </div>

            {user?.role !== 'MAKER' && previewRevision.status === 'PENDING_REVIEW' && (
              <div className="p-6 border-t border-gray-200 bg-white">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rejection Reason (if rejecting)</label>
                  <input 
                    type="text" 
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Explain why this is being rejected..."
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <Button 
                    onClick={() => handleReject(previewRevision.id)}
                    disabled={!rejectReason.trim()}
                    variant="danger"
                  >
                    Reject Changes
                  </Button>
                  <Button 
                    onClick={() => handleApprove(previewRevision.id)}
                    variant="primary"
                    className="bg-green-600 hover:bg-green-700 focus:ring-green-500 shadow-green-200"
                  >
                    Approve & Publish
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};
