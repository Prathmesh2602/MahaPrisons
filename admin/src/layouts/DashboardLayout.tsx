import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, FileText, CheckSquare, Menu as MenuIcon, Languages, Settings, ShieldAlert, LogOut, FileImage, Shield } from 'lucide-react';

export const DashboardLayout = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard, roles: ['SUPER_ADMIN', 'CONTENT_EDITOR', 'CHECKER'] },
    { name: 'Navigation', path: '/navigation', icon: MenuIcon, roles: ['SUPER_ADMIN', 'CONTENT_EDITOR'] },
    { name: 'Review Queue', path: '/review-queue', icon: CheckSquare, roles: ['SUPER_ADMIN', 'CHECKER'] },
    { name: 'Media Library', path: '/media', icon: FileImage, roles: ['SUPER_ADMIN', 'CONTENT_EDITOR'] },
    { name: 'Translations', path: '/translations', icon: Languages, roles: ['SUPER_ADMIN', 'CONTENT_EDITOR'] },
    { name: 'Settings', path: '/settings', icon: Settings, roles: ['SUPER_ADMIN'] },
    { name: 'Audit Logs', path: '/audit-logs', icon: ShieldAlert, roles: ['SUPER_ADMIN', 'AUDITOR'] },
  ];

  const filteredNav = navItems.filter(item => item.roles.includes(user.role));

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <Shield className="w-6 h-6 text-amber-500 mr-3" />
          <span className="font-bold text-lg">CMS Admin</span>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            {filteredNav.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <li key={item.path} className="px-3">
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <div className="text-sm truncate mr-2">
              <p className="font-medium text-white truncate">{user.email}</p>
              <p className="text-slate-400 text-xs">{user.role}</p>
            </div>
            <button onClick={logout} className="text-slate-400 hover:text-white p-1">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 flex flex-col">
        <header className="h-16 bg-white border-b flex items-center px-8 shadow-sm shrink-0">
          <h1 className="text-xl font-semibold text-gray-800 capitalize">
            {location.pathname === '/' ? 'Dashboard' : location.pathname.split('/')[1].replace('-', ' ')}
          </h1>
        </header>
        <div className="flex-1 p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
