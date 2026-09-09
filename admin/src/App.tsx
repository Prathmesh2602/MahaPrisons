import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DashboardLayout } from './layouts/DashboardLayout';
import { AuthLayout } from './layouts/AuthLayout';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ReviewQueue from './pages/ReviewQueue';
import Navigation from './pages/Navigation';
import { VisualBuilder } from './pages/VisualBuilder';
import { GlobalSettings } from './pages/Settings/GlobalSettings';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>
          
          
          {/* Full Screen Visual Builder */}
          <Route path="/builder/:pageId" element={<VisualBuilder />} />
          
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/review-queue" element={<ReviewQueue />} />
            
            {/* Stubs for now */}
            <Route path="/navigation" element={<Navigation />} />
            <Route path="/media" element={<div className="p-4 bg-white rounded shadow">Media Library (WIP)</div>} />
            <Route path="/translations" element={<div className="p-4 bg-white rounded shadow">Translations Editor (WIP)</div>} />
            <Route path="/settings" element={<GlobalSettings />} />
            <Route path="/audit-logs" element={<div className="p-4 bg-white rounded shadow">Audit Logs (WIP)</div>} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
