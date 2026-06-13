import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminDashboard from './AdminDashboard';
import AdminServices from './AdminServices';
import AdminAppointments from './AdminAppointments';
import AdminInquiries from './AdminInquiries';
import AdminBlog from './AdminBlog';
import './AdminLayout.css';

// Maps URL path segment → sidebar active id
const pathToView = {
  'dashboard':    'dashboard',
  'appointments': 'appointments',
  'inquiries':    'inquiries',
  'services':     'services',
  'blog':         'blog',
};

export default function AdminLayout() {
  const location   = useLocation();
  const { currentUser, canAccess } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile]       = useState(window.innerWidth < 768);

  // Detect mobile breakpoint
  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Derive active view from URL
  const segment   = location.pathname.split('/').pop();
  const activeView = pathToView[segment] || 'dashboard';

  const handleNavigate = () => {
    if (isMobile) setSidebarOpen(false);
  };

  // Default landing: super_admin → dashboard, others → first permitted section
  const defaultPath = () => {
    if (currentUser?.role === 'super_admin') return '/admin/dashboard';
    const perms = ['appointments', 'inquiries', 'services', 'blog'];
    const first = perms.find(p => canAccess(p));
    return first ? `/admin/${first}` : '/admin/dashboard';
  };

  return (
    <div className={`admin-layout ${sidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>

      {/* Mobile backdrop */}
      {isMobile && sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <AdminSidebar
        active={activeView}
        onNavigate={handleNavigate}
        open={sidebarOpen}
        onToggle={() => setSidebarOpen(s => !s)}
        isMobile={isMobile}
      />

      <div className="admin-main">
        <AdminHeader
          onMenuToggle={() => setSidebarOpen(s => !s)}
          activeView={activeView}
          user={currentUser}
        />
        <div className="admin-content">
          <Routes>
            {/* Default redirect */}
            <Route index element={<Navigate to={defaultPath()} replace />} />
            <Route path="dashboard"    element={<AdminDashboard />} />
            <Route path="appointments" element={<AdminAppointments />} />
            <Route path="inquiries"    element={<AdminInquiries />} />
            <Route path="services"     element={<AdminServices />} />
            <Route path="blog"         element={<AdminBlog />} />
            {/* Catch-all */}
            <Route path="*"            element={<Navigate to={defaultPath()} replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
