import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Shield } from 'lucide-react';
import { Button } from '../components/Button';
import { motion } from 'framer-motion';
import { API_URL } from '../config/api';


export const Login: React.FC = () => {
  const [email, setEmail] = useState('admin@mahaprisons.gov.in');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [bgImage, setBgImage] = useState('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1920'); // Default fallback
  const { login } = useAuth();

  useEffect(() => {
    // Fetch login page configuration
    axios.get(`${API_URL}/api/v1/settings/login_config`)
      .then(res => {
        if (res.data && res.data.backgroundImage) {
          setBgImage(res.data.backgroundImage);
        }
      })
      .catch(err => {
        console.error('Failed to load login config:', err);
      });

    // Listen for live preview updates from SettingsEditor
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'PREVIEW_UPDATE' && event.data.component === 'Login') {
        const payload = event.data.payload.login_config;
        if (payload && payload.backgroundImage !== undefined) {
          setBgImage(payload.backgroundImage || 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1920');
        }
      }
    };

    window.addEventListener('message', handleMessage);

    // Notify parent that preview is ready
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'PREVIEW_READY' }, '*');
    }

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/v1/auth/login`, { email, password });
      login(res.data.token, res.data.user);
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  

  const isPreview = window.location.search.includes('preview=true');

  return (
    <div className="min-h-screen w-full flex font-sans bg-slate-50">
      {/* Left Image Side */}
      <div className={`${isPreview ? 'block w-[55%]' : 'hidden lg:block w-[55%] xl:w-[60%]'} relative bg-slate-900 overflow-hidden`}>
        <motion.img 
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={bgImage} 
          alt="Maharashtra Prisons" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Overlay gradient for premium feel */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/20 to-transparent"></div>
        
        {/* Branding on image */}
        <div className="absolute bottom-12 left-12 right-12 z-10 text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h1 className="text-4xl xl:text-5xl font-black text-white mb-4 leading-tight">
              Maharashtra Prisons<br/>Content Management
            </h1>
            <p className="text-lg text-slate-300 max-w-lg font-medium leading-relaxed">
              Manage website content, announcements, galleries and organizational data seamlessly from the administrative portal.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Form Side */}
      <div className={`${isPreview ? 'w-[45%] p-4' : 'w-full lg:w-[45%] xl:w-[40%] p-8 lg:p-12'} flex flex-col items-center justify-center z-10 bg-white shadow-[-20px_0_40px_rgba(0,0,0,0.1)] relative overflow-hidden`}>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600"></div>
        <div className="absolute -right-32 -bottom-32 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[400px] relative z-10"
        >
          {/* Logo and Header */}
          <div className="text-center mb-10">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-50 mb-6 shadow-sm border border-orange-100/50"
            >
              <Shield className="w-8 h-8 text-orange-500 stroke-[2]" />
            </motion.div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h2>
            <p className="text-sm text-slate-500 mt-2 font-medium">Sign in to MahaPrisons CMS Portal</p>
          </div>
          
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 text-red-600 text-[13px] p-3 mb-6 rounded-lg text-center font-medium border border-red-100"
            >
              {error}
            </motion.div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-slate-700 text-[13px] font-bold mb-2 uppercase tracking-wide">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-slate-400"
                  placeholder="admin@mahaprisons.gov.in"
                />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-slate-700 text-[13px] font-bold uppercase tracking-wide">Password</label>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-slate-400"
                placeholder="••••••••"
              />
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full h-12 text-[15px] font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-lg shadow-slate-900/20 transition-all active:scale-[0.98]"
              >
                Sign In to Dashboard
              </Button>
            </div>
          </form>

          
        </motion.div>
      </div>

          </div>
  );
};
