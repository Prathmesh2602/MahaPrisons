import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Shield } from 'lucide-react';
import { Button } from '../components/Button';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('admin@mahaprisons.gov.in');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/v1/auth/login', { email, password });
      login(res.data.token, res.data.user);
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handleSetup = async () => {
    try {
      await axios.post('http://localhost:5000/api/v1/auth/setup');
      alert('Default admin created. You can now login.');
    } catch (err) {
      alert('Admin already exists or setup failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4 font-sans">
      <div className="bg-white p-8 md:p-[2.5rem] rounded-[1.25rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full max-w-[420px]">
        
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <Shield className="w-11 h-11 text-[#f97316] stroke-[2]" />
          </div>
          <h2 className="text-[22px] font-bold text-slate-900 tracking-tight">CMS Admin Login</h2>
          <p className="text-[14px] text-slate-500 mt-2">Sign in to manage portal content</p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-600 text-[13px] p-3 mb-6 rounded-lg text-center font-medium border border-red-100">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-slate-700 text-[13px] font-semibold mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-lg text-[14px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-colors placeholder:text-slate-400 shadow-sm"
              placeholder="admin@mahaprisons.gov.in"
            />
          </div>
          
          <div>
            <label className="block text-slate-700 text-[13px] font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-lg text-[14px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-colors placeholder:text-slate-400 shadow-sm"
              placeholder="••••••••"
            />
          </div>
          
          <div className="pt-2">
            <Button 
              type="submit" 
              variant="secondary"
              className="w-full h-11 text-[15px]"
            >
              Sign In
            </Button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <Button 
            onClick={handleSetup} 
            variant="ghost"
            size="sm"
            className="text-[12px] text-slate-400 hover:text-slate-600 p-0"
          >
            Run Setup (Initialize Admin)
          </Button>
        </div>
      </div>
    </div>
  );
};
