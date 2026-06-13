import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, ROLE_PERMISSIONS } from '../../context/AuthContext';
import { useValidation, rules } from '../../hooks/useValidation';
import './Login.css';

const loginRules = {
  email:    [rules.required('Email'), rules.email()],
  password: [rules.required('Password')],
};

const adminHints = [
  { role: 'Super Admin',       email: 'admin@prime.et',      pass: 'Admin@123',      icon: '🔐', color: '#1B3A6B' },
  { role: 'Content Manager',   email: 'content@prime.et',    pass: 'Content@123',    icon: '✏️',  color: '#059669' },
  { role: 'Marketing Manager', email: 'marketing@prime.et',  pass: 'Marketing@123',  icon: '📢', color: '#7C3AED' },
];

export default function AdminLogin() {
  const { login, authError, loading } = useAuth();
  const { errors, touched, touch, validateAll } = useValidation(loginRules);
  const navigate = useNavigate();

  const [form, setForm]         = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (touched[name]) touch(name, value);
  };
  const handleBlur  = (e) => touch(e.target.name, e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll(form)) return;
    const result = await login(form.email, form.password);
    if (result.ok) {
      // Only admin roles can access admin portal
      const adminRoles = ['super_admin', 'content_manager', 'marketing_manager'];
      if (adminRoles.includes(result.role)) {
        navigate('/admin/dashboard');
      } else {
        // Regular user tried to access admin — redirect to public site
        navigate('/');
      }
    }
  };

  return (
    <div className="login-page">
      {/* Left panel */}
      <div className="login-left" style={{ background: 'linear-gradient(165deg, #0D2240 0%, #152238 55%, #1B3A6B 100%)' }}>
        <div className="login-brand">
          <div className="login-logo-icon">P</div>
          <div>
            <div className="login-logo-name">PRIME</div>
            <div className="login-logo-sub">ADMIN PORTAL</div>
          </div>
        </div>
        <div className="login-left-content">
          <h1>Admin Portal</h1>
          <p>Secure access for administrators and content managers.</p>

          <div className="login-img-wrap">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80"
              alt="Admin dashboard"
              className="login-hero-img"
            />
            <div className="login-img-overlay">
              <span>🔐</span>
              <div>Restricted Access — Authorized Personnel Only</div>
            </div>
          </div>

          {/* Role descriptions */}
          <div style={{ marginTop: 20 }}>
            {Object.entries(ROLE_PERMISSIONS)
              .filter(([key]) => key !== 'user')
              .map(([key, perm]) => (
                <div key={key} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)',
                }}>
                  <span style={{
                    width: 10, height: 10, borderRadius: '50%',
                    background: perm.color, flexShrink: 0,
                  }} />
                  <div>
                    <div style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>{perm.label}</div>
                    <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11 }}>
                      {perm.canAccess.join(', ') || 'No admin access'}
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="login-right">
        <div className="login-form-container">
          <h2 className="login-title">Admin Sign In</h2>
          <p className="login-subtitle">Access the Prime Consultancy management portal.</p>

          {/* Role hint cards */}
          <div className="login-hints">
            <p className="hint-label">Quick demo access:</p>
            <div className="hints-row" style={{ flexWrap: 'wrap', gap: 8 }}>
              {adminHints.map(h => (
                <button
                  key={h.role}
                  className="hint-card"
                  onClick={() => setForm({ email: h.email, password: h.pass })}
                  type="button"
                  style={{ flex: '1 1 auto', minWidth: 120 }}
                >
                  <span className="hint-icon">{h.icon}</span>
                  <span className="hint-role" style={{ color: h.color }}>{h.role}</span>
                  <span className="hint-email">{h.email}</span>
                </button>
              ))}
            </div>
          </div>

          {authError && (
            <div className="auth-error" role="alert">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              {authError}
            </div>
          )}

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className={`lf-group ${touched.email && errors.email ? 'has-error' : touched.email ? 'has-success' : ''}`}>
              <label htmlFor="al-email">Email Address</label>
              <div className="lf-input-wrap">
                <svg className="lf-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <input
                  id="al-email" name="email" type="email"
                  placeholder="admin@prime.et"
                  value={form.email}
                  onChange={handleChange} onBlur={handleBlur}
                  autoComplete="email"
                />
                {touched.email && !errors.email && (
                  <svg className="lf-check" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                )}
              </div>
              {touched.email && errors.email && <p className="lf-error">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className={`lf-group ${touched.password && errors.password ? 'has-error' : touched.password ? 'has-success' : ''}`}>
              <label htmlFor="al-password">Password</label>
              <div className="lf-input-wrap">
                <svg className="lf-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                <input
                  id="al-password" name="password"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Your password"
                  value={form.password}
                  onChange={handleChange} onBlur={handleBlur}
                  autoComplete="current-password"
                />
                <button
                  type="button" className="lf-toggle-pass"
                  onClick={() => setShowPass(s => !s)}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? '🙈' : '👁'}
                </button>
              </div>
              {touched.password && errors.password && <p className="lf-error">{errors.password}</p>}
            </div>

            <div className="lf-row">
              <label className="lf-remember">
                <input type="checkbox" /> Remember me
              </label>
            </div>

            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? (
                <><span className="spinner" /> Signing in…</>
              ) : (
                <>Sign In <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></>
              )}
            </button>
          </form>

          <p className="login-back" style={{ marginTop: 16 }}>
            <a href="/" className="back-link">← Back to Public Website</a>
          </p>
        </div>
      </div>
    </div>
  );
}
