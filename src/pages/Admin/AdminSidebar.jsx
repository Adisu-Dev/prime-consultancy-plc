import { useAuth } from '../../context/AuthContext';

const navItems = [
  { id: 'dashboard',    icon: '📊', label: 'Dashboard',     section: 'MAIN' },
  { id: 'appointments', icon: '📅', label: 'Appointments',  section: 'MANAGE', badge: 8 },
  { id: 'inquiries',    icon: '💬', label: 'Inquiries',     section: 'MANAGE', badge: 3 },
  { id: 'services',     icon: '🎯', label: 'Services',      section: 'CONTENT' },
  { id: 'blog',         icon: '📝', label: 'Blog & Posts',  section: 'CONTENT' },
];

export default function AdminSidebar({ active, onNavigate, open, onToggle }) {
  const { logout } = useAuth();

  const sections = [...new Set(navItems.map(i => i.section))];

  return (
    <aside className="admin-sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sb-logo-icon">P</div>
        {open && (
          <div className="sb-logo-text">
            <div className="sb-logo-name">PRIME</div>
            <div className="sb-logo-sub">ADMIN PORTAL</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="sidebar-nav" aria-label="Admin navigation">
        {sections.map(section => (
          <div key={section}>
            <div className="sidebar-section-label">{section}</div>
            {navItems.filter(i => i.section === section).map(item => (
              <button
                key={item.id}
                className={`sb-nav-item ${active === item.id ? 'active' : ''}`}
                onClick={() => onNavigate(item.id)}
                title={!open ? item.label : undefined}
                aria-current={active === item.id ? 'page' : undefined}
              >
                <span className="sb-icon">{item.icon}</span>
                <span className="sb-label">{item.label}</span>
                {item.badge && open && (
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
          onClick={logout}
          title={!open ? 'Sign Out' : undefined}
        >
          <span className="sb-icon">🚪</span>
          <span className="sb-label">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
