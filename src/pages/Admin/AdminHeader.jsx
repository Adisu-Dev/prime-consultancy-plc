import { useAuth } from '../../context/AuthContext';

const viewTitles = {
  dashboard: 'Dashboard',
  appointments: 'Appointment Management',
  inquiries: 'Contact Inquiries',
  services: 'Services Management',
  blog: 'Blog Management',
};

export default function AdminHeader({ onMenuToggle, activeView, user }) {
  const { logout } = useAuth();
  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'AU';

  return (
    <header className="admin-header">
      <div className="ah-left">
        <button className="ah-menu-btn" onClick={onMenuToggle} aria-label="Toggle sidebar">
          <span /><span /><span />
        </button>
        <div>
          <div className="ah-breadcrumb">
            Admin <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>/ </span>
            {viewTitles[activeView] || activeView}
          </div>
        </div>
      </div>

      <div className="ah-right">
        <button className="ah-icon-btn" aria-label="Notifications" title="Notifications">
          🔔
          <span className="ah-notif-dot" />
        </button>
        <button className="ah-icon-btn" aria-label="Settings" title="Settings">⚙️</button>

        <div className="ah-user" onClick={logout} title="Click to sign out" role="button" tabIndex={0}>
          <div className="ah-avatar">{initials}</div>
          <div>
            <div className="ah-user-name">{user?.name || 'Admin User'}</div>
            <div className="ah-user-role">{user?.role === 'admin' ? 'Administrator' : 'Manager'}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
