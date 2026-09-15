import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Users, Plus, Edit2, Trash2, Shield, Search, X } from 'lucide-react';
import { Button } from '../components/Button';
interface UserData {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
}

export const UserManagement: React.FC = () => {
  const { user, token } = useAuth();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'MAKER'
  });

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/v1/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'SUPER_ADMIN') {
      fetchUsers();
    }
  }, [user]);

  const handleOpenModal = (userToEdit?: UserData) => {
    if (userToEdit) {
      setEditingUser(userToEdit);
      setFormData({
        name: userToEdit.name || '',
        email: userToEdit.email,
        password: '', // blank on edit unless they want to change it
        role: userToEdit.role
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'MAKER'
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await axios.put(`http://localhost:5000/api/v1/users/${editingUser.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('User updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/v1/users', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('User created successfully');
      }
      handleCloseModal();
      fetchUsers();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to save user');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/v1/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('User deleted');
        fetchUsers();
      } catch (err: any) {
        alert(err.response?.data?.error || 'Failed to delete user');
      }
    }
  };

  if (user?.role !== 'SUPER_ADMIN') {
    return (
      <div className="p-8 text-center text-red-600">
        <h2 className="text-2xl font-bold">Access Denied</h2>
        <p>Only Super Admins can access User Management.</p>
      </div>
    );
  }

  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(search.toLowerCase()) || 
    (u.name && u.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-xl font-bold text-slate-800">User Management</h1>
          <p className="text-sm text-slate-500 mt-1">Manage admin access, roles, and permissions.</p>
        </div>
        <Button
          onClick={() => handleOpenModal()}
          variant="primary"
          icon={<Plus size={18} />}
        >
          Add New User
        </Button>
      </div>

      <div className="p-6 md:p-8 flex-1">
        <div className="max-w-[1200px] mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50 rounded-t-lg">
            <div className="relative w-72">
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none"
              />
              <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            <div className="text-sm text-gray-500">
              Total Users: <span className="font-bold text-gray-700">{users.length}</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <th className="p-4">Name / Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Created At</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500">Loading users...</td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500">No users found.</td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="font-medium text-gray-800">{u.name || 'Unnamed User'}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{u.email}</div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                          u.role === 'SUPER_ADMIN' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                          u.role === 'CHECKER' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                          'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}>
                          {u.role === 'SUPER_ADMIN' && <Shield size={12} />}
                          {u.role}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            onClick={() => handleOpenModal(u)}
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                            title="Edit User"
                          >
                            <Edit2 size={16} />
                          </Button>
                          {user.id !== u.id && (
                            <Button
                              onClick={() => handleDelete(u.id)}
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-800 hover:bg-red-50"
                              title="Delete User"
                            >
                              <Trash2 size={16} />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* User Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Users className="text-orange-500" size={20} />
                {editingUser ? 'Edit User' : 'Add New User'}
              </h3>
              <Button onClick={handleCloseModal} variant="ghost" size="sm" className="p-1.5"><X size={20} /></Button>
            </div>
            
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    placeholder="e.g. John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    placeholder="user@mahaprisons.gov.in"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {editingUser ? 'New Password (leave blank to keep current)' : 'Password'}
                  </label>
                  <input
                    type="password"
                    required={!editingUser}
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    placeholder={editingUser ? 'Enter new password...' : 'Enter password...'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Role</label>
                  <select
                    value={formData.role}
                    onChange={e => setFormData({...formData, role: e.target.value})}
                    className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                  >
                    <option value="MAKER">Maker (Editor, cannot publish directly)</option>
                    <option value="CHECKER">Checker (Approver, can review & publish)</option>
                    <option value="SUPER_ADMIN">Super Admin (Full Access)</option>
                  </select>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                <Button
                  type="button"
                  onClick={handleCloseModal}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                >
                  {editingUser ? 'Save Changes' : 'Create User'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
