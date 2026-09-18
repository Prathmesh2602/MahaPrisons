import React from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './pages/Login';
import { MenuEditor } from './pages/MenuEditor';
import { SettingsEditor } from './pages/SettingsEditor';
import { ReviewDashboard } from './pages/ReviewDashboard';
import { UserManagement } from './pages/UserManagement';
import { PageEditor } from './pages/PageEditor';
import { Button } from './components/Button';
import { LayoutDashboard, Settings, Menu as MenuIcon, LogOut, CheckSquare, Shield, ShieldCheck, Image as ImageIcon, FileText, Users, X } from 'lucide-react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" />;
  return <>{children}</>;
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = React.useState(true);

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 ${isSidebarExpanded ? 'w-56' : 'w-20'} bg-[#0f172a] text-slate-300 flex flex-col shadow-2xl md:shadow-xl z-50 transform transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div
          className={`border-b border-slate-800/50 flex items-center min-h-[60px] relative overflow-hidden transition-all duration-300 ${isSidebarExpanded ? 'px-4 py-3 gap-3' : 'p-0 h-[60px] justify-center cursor-pointer hover:bg-slate-800/50'}`}
          onClick={() => { if (!isSidebarExpanded) setIsSidebarExpanded(true); }}
          title={!isSidebarExpanded ? "Expand Sidebar" : undefined}
        >
          <div className={`flex items-center gap-3 overflow-hidden whitespace-nowrap ${isSidebarExpanded ? 'flex-1' : ''}`}>
            <img src="http://localhost:5000/uploads/logo.jpeg" alt="Logo" className="w-10 h-10 min-w-[40px] rounded-md object-cover shrink-0 bg-white" />
            <h2 className={`text-base font-bold text-white tracking-wide transition-opacity duration-200 ${isSidebarExpanded ? 'opacity-100' : 'opacity-0 w-0 hidden'}`}>MahaPrisons</h2>
          </div>
          {isSidebarExpanded && (
            <button
              className="hidden md:flex text-slate-400 hover:text-white shrink-0"
              onClick={(e) => { e.stopPropagation(); setIsSidebarExpanded(false); }}
              title="Collapse Sidebar"
            >
              <MenuIcon size={20} />
            </button>
          )}
          <button
            className="md:hidden text-slate-400 hover:text-white shrink-0 absolute right-4"
            onClick={(e) => { e.stopPropagation(); setIsMobileMenuOpen(false); }}
          >
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 px-3 py-5 space-y-1.5 overflow-y-auto overflow-x-hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <NavLink to="/" end className={({ isActive }) => `flex items-center ${isSidebarExpanded ? 'justify-start' : 'justify-center'} gap-3.5 px-3 py-2.5 text-[13px] font-medium rounded-md transition-all duration-200 ${isActive ? 'bg-[#1e293b] text-white shadow-sm' : 'text-slate-400 hover:bg-[#1e293b]/60 hover:text-white'}`} title="Dashboard">
            {({ isActive }) => (
              <><LayoutDashboard size={18} strokeWidth={isActive ? 2 : 1.75} className="shrink-0" /> <span className={`whitespace-nowrap transition-opacity duration-200 ${isSidebarExpanded ? 'opacity-100' : 'opacity-0 hidden'}`}>Dashboard</span></>
            )}
          </NavLink>
          <NavLink to="/menu" className={({ isActive }) => `flex items-center ${isSidebarExpanded ? 'justify-start' : 'justify-center'} gap-3.5 px-3 py-2.5 text-[13px] font-medium rounded-md transition-all duration-200 ${isActive ? 'bg-[#1e293b] text-white shadow-sm' : 'text-slate-400 hover:bg-[#1e293b]/60 hover:text-white'}`} title="Navigation">
            {({ isActive }) => (
              <><MenuIcon size={18} strokeWidth={isActive ? 2 : 1.75} className="shrink-0" /> <span className={`whitespace-nowrap transition-opacity duration-200 ${isSidebarExpanded ? 'opacity-100' : 'opacity-0 hidden'}`}>Navigation</span></>
            )}
          </NavLink>
          <NavLink to="/review" className={({ isActive }) => `flex items-center ${isSidebarExpanded ? 'justify-start' : 'justify-center'} gap-3.5 px-3 py-2.5 text-[13px] font-medium rounded-md transition-all duration-200 ${isActive ? 'bg-[#1e293b] text-white shadow-sm' : 'text-slate-400 hover:bg-[#1e293b]/60 hover:text-white'}`} title={user?.role === 'MAKER' ? 'My Submissions' : 'Review Queue'}>
            {({ isActive }) => (
              <><CheckSquare size={18} strokeWidth={isActive ? 2 : 1.75} className="shrink-0" /> <span className={`whitespace-nowrap transition-opacity duration-200 ${isSidebarExpanded ? 'opacity-100' : 'opacity-0 hidden'}`}>{user?.role === 'MAKER' ? 'My Submissions' : 'Review Queue'}</span></>
            )}
          </NavLink>
          {user?.role === 'SUPER_ADMIN' && (
            <NavLink to="/users" className={({ isActive }) => `flex items-center ${isSidebarExpanded ? 'justify-start' : 'justify-center'} gap-3.5 px-3 py-2.5 text-[13px] font-medium rounded-md transition-all duration-200 ${isActive ? 'bg-[#1e293b] text-white shadow-sm' : 'text-slate-400 hover:bg-[#1e293b]/60 hover:text-white'}`} title="User Management">
              {({ isActive }) => (
                <><Users size={18} strokeWidth={isActive ? 2 : 1.75} className="shrink-0" /> <span className={`whitespace-nowrap transition-opacity duration-200 ${isSidebarExpanded ? 'opacity-100' : 'opacity-0 hidden'}`}>User Management</span></>
              )}
            </NavLink>
          )}
          <div className={`flex items-center ${isSidebarExpanded ? 'justify-start' : 'justify-center'} gap-3.5 px-3 py-2.5 text-[13px] font-medium rounded-md text-slate-400 hover:bg-[#1e293b]/60 hover:text-white transition-all duration-200 cursor-pointer`} title="Media Library">
            <ImageIcon size={18} strokeWidth={1.75} className="shrink-0" /> <span className={`whitespace-nowrap transition-opacity duration-200 ${isSidebarExpanded ? 'opacity-100' : 'opacity-0 hidden'}`}>Media Library</span>
          </div>

          <NavLink to="/settings" className={({ isActive }) => `flex items-center ${isSidebarExpanded ? 'justify-start' : 'justify-center'} gap-3.5 px-3 py-2.5 text-[13px] font-medium rounded-md transition-all duration-200 ${isActive ? 'bg-[#1e293b] text-white shadow-sm' : 'text-slate-400 hover:bg-[#1e293b]/60 hover:text-white'}`} title="Settings">
            {({ isActive }) => (
              <><Settings size={18} strokeWidth={isActive ? 2 : 1.75} className="shrink-0" /> <span className={`whitespace-nowrap transition-opacity duration-200 ${isSidebarExpanded ? 'opacity-100' : 'opacity-0 hidden'}`}>Settings</span></>
            )}
          </NavLink>
          <div className={`flex items-center ${isSidebarExpanded ? 'justify-start' : 'justify-center'} gap-3.5 px-3 py-2.5 text-[13px] font-medium rounded-md text-slate-400 hover:bg-[#1e293b]/60 hover:text-white transition-all duration-200 cursor-pointer`} title="Audit Logs">
            <Shield size={18} strokeWidth={1.75} className="shrink-0" /> <span className={`whitespace-nowrap transition-opacity duration-200 ${isSidebarExpanded ? 'opacity-100' : 'opacity-0 hidden'}`}>Audit Logs</span>
          </div>
        </nav>
        <div className="py-4 px-1 border-t border-slate-800/50">
          <div className={`flex items-center ${isSidebarExpanded ? 'justify-between px-2' : 'justify-center'}`}>
            <div className={`overflow-hidden transition-all duration-200 ${isSidebarExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 hidden'}`} title={user?.email}>
              <div className="text-sm font-bold text-white truncate">{user?.email}</div>
              <div className="text-xs text-slate-500 mt-1">{user?.role}</div>
            </div>
            <Button onClick={logout} variant="ghost" className={`p-1.5 rounded-md hover:bg-[#1e293b] text-slate-400 hover:text-red-400 transition-colors shrink-0 ${isSidebarExpanded ? 'ml-2' : ''}`} title="Log out">
              <LogOut size={18} strokeWidth={2} />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 shrink-0 shadow-sm z-30 min-h-[60px]">
          <div className="flex items-center gap-3">
            <img src="http://localhost:5000/uploads/logo.jpeg" alt="Logo" className="w-10 h-10 rounded-md object-cover shrink-0" />
            <h2 className="text-base font-bold text-slate-800">MahaPrisons</h2>
          </div>
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-slate-600 hover:text-slate-900 p-1">
            <MenuIcon size={24} />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

const DashboardHome = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-800">Dashboard</h1>
      </div>
      <div className="p-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 mb-8">
          <p className="text-lg text-slate-800 font-medium">Welcome back, {user?.email}</p>
          <p className="text-sm text-slate-500 mt-1">You are logged in as {user?.role}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Draft Pages */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="bg-blue-50 text-blue-600 p-4 rounded-xl">
              <FileText size={24} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-500">Draft Pages</h3>
              <p className="text-2xl font-bold text-slate-900">0</p>
            </div>
          </div>

          {/* Pending Review */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="bg-orange-50 text-orange-500 p-4 rounded-xl">
              <CheckSquare size={24} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-500">Pending Review</h3>
              <p className="text-2xl font-bold text-slate-900">0</p>
            </div>
          </div>

          {/* Active Users */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="bg-emerald-50 text-emerald-600 p-4 rounded-xl">
              <LayoutDashboard size={24} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-500">Active Users</h3>
              <p className="text-2xl font-bold text-slate-900">1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AppRoutes = () => {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
      <Route path="/" element={<ProtectedRoute><DashboardLayout><DashboardHome /></DashboardLayout></ProtectedRoute>} />
      <Route path="/menu" element={<ProtectedRoute><DashboardLayout><MenuEditor /></DashboardLayout></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><DashboardLayout><SettingsEditor /></DashboardLayout></ProtectedRoute>} />
      <Route path="/review" element={<ProtectedRoute><DashboardLayout><ReviewDashboard /></DashboardLayout></ProtectedRoute>} />
      <Route path="/users" element={<ProtectedRoute><DashboardLayout><UserManagement /></DashboardLayout></ProtectedRoute>} />
      <Route path="/page-editor" element={<ProtectedRoute><DashboardLayout><PageEditor /></DashboardLayout></ProtectedRoute>} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
