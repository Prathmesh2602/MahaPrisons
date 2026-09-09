import { useAuth } from '../context/AuthContext';
import { FileText, CheckSquare, Users } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Welcome back, {user?.email}</h2>
        <p className="text-gray-500 mt-1">You are logged in as <span className="font-medium text-slate-700">{user?.role}</span></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-lg mr-4">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Draft Pages</p>
            <p className="text-2xl font-bold text-gray-900">0</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center">
          <div className="p-4 bg-amber-50 text-amber-600 rounded-lg mr-4">
            <CheckSquare className="w-8 h-8" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Pending Review</p>
            <p className="text-2xl font-bold text-gray-900">0</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-lg mr-4">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Active Users</p>
            <p className="text-2xl font-bold text-gray-900">1</p>
          </div>
        </div>
      </div>
    </div>
  );
}
