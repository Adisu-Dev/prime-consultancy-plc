import { useState } from 'react';
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
  const { currentUser } = useAuth();

  const View = views[activeView] || AdminDashboard;

  return (
    <div className={`admin-layout ${sidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
      <AdminSidebar
        active={activeView}
        onNavigate={setActiveView}
        open={sidebarOpen}
        onToggle={() => setSidebarOpen(s => !s)}
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
