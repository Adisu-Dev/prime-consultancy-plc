import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminDashboard from './AdminDashboard';
import AdminServices from './AdminServices';
import AdminAppointments from './AdminAppointments';
import AdminInquiries from './AdminInquiries';
import AdminBlog from './AdminBlog';
import './AdminLayout.css';

const views = {
  dashboard:    AdminDashboard,
  services:     AdminServices,
  appointments: AdminAppointments,
  inquiries:    AdminInquiries,
  blog:         AdminBlog,
};

export default function AdminLayout() {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { currentUser } = useAuth();

  // Detect mobile, auto-close sidebar on small screens
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

  const View = views[activeView] || AdminDashboard;

  const handleNavigate = (view) => {
    setActiveView(view);
    if (isMobile) setSidebarOpen(false); // auto-close on mobile after nav
  };

  return (
    <div className={`admin-layout ${sidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>

      {/* Mobile overlay backdrop */}
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
          sidebarOpen={sidebarOpen}
          user={currentUser}
          activeView={activeView}
        />
        <div className="admin-content">
          <View />
        </div>
      </div>
    </div>
  );
}
