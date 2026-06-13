import { useNavigate } from 'react-router-dom';
import { useAuth, ROLE_PERMISSIONS } from '../../context/AuthContext';

const navItems = [
  { id: 'dashboard',    icon: '📊', label: 'Dashboard',    section: 'MAIN',    path: '/admin/dashboard' },
  { id: 'appointments', icon: '📅', label: 'Appointments', section: 'MANAGE',  path: '/admin/appointments', badge: 8 },
  { id: 'inquiries',    icon: '💬', label: 'Inquiries',    section: 'MANAGE',  path: '/admin/inquiries',    badge: 3 },
  { id: 'services',     icon: '🎯', label: 'Services',     section: 'CONTENT', path: '/admin/services' },
  { id: 'blog',         icon: '📝', label: 'Blog & Posts', section: 'CONTENT', path: '/admin/blog' },
];

export default function AdminSidebar({ active, onNavigate, open, onToggle, isMobile }) {
  const { logout, currentUser, canAccess } = useAuth();
  const navigate = useNavigate();
  const role = currentUser?.role || 'user';
  const roleInfo = ROLE_PERMISSIONS[role];

  // Filter nav items based on role permissions
  // super_admin sees everything, others see only their permitted sections
  const visibleItems = navItems.filter(item => {
    if (role === 'super_admin') return true;
    if (item.id === 'dashboard') return false; // only super admin sees dashboard
    return canAccess(item.id);
  });

  const sections = [...new Set(visibleItems.map(i => i.section))];
  const showLabels = isMobile ? true : open;

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  return (
    <aside className="admin-sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sb-logo-icon">P</div>
        {showLabels && (
          <div className="sb-logo-text">
            <div className="sb-logo-name">PRIME</div>
            <div className="sb-logo-sub">ADMIN PORTAL</div>
          </div>
        )}
        {isMobile && (
          <button
            onClick={onToggle}
            style={{
              marginLeft: 'auto', background: 'rgba(255,255,255,0.1)',
              border: 'none', color: '#fff', borderRadius: 8,
              width: 30, height: 30, cursor: 'pointer', fontSize: 18,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            aria-label="Close sidebar"
          >
            ×
          </button>
        )}
      </div>

      {/* Role badge */}
      {showLabels && (
        <div style={{
          margin: '8px 12px', padding: '6px 12px',
          background: `${roleInfo?.color}22`,
          border: `1px solid ${roleInfo?.color}44`,
          borderRadius: 8, textAlign: 'center',
        }}>
          <span style={{
            fontSize: 11, fontWeight: 700,
            color: roleInfo?.color || '#fff',
            textTransform: 'uppercase', letterSpacing: 1,
          }}>
            {roleInfo?.label || role}
          </span>
        </div>
      )}

      {/* Nav */}
      <nav className="sidebar-nav" aria-label="Admin navigation">
        {sections.map(section => (
          <div key={section}>
            <div className="sidebar-section-label">{section}</div>
            {visibleItems.filter(i => i.section === section).map(item => (
              <button
                key={item.id}
                className={`sb-nav-item ${active === item.id ? 'active' : ''}`}
                onClick={() => { onNavigate(item.id); navigate(item.path); }}
                title={!showLabels ? item.label : undefined}
                aria-current={active === item.id ? 'page' : undefined}
              >
                <span className="sb-icon">{item.icon}</span>
                {showLabels && <span className="sb-label">{item.label}</span>}
                {item.badge && showLabels && (
                  <span className="sb-badge">{item.badge}</span>
                )}
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <button
          className="sb-nav-item"
          onClick={handleLogout}
          title={!showLabels ? 'Sign Out' : undefined}
        >
          <span className="sb-icon">🚪</span>
          {showLabels && <span className="sb-label">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
