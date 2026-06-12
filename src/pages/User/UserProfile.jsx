import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useValidation, rules } from '../../hooks/useValidation';
import './UserProfile.css';

const profileRules = {
  name:    [rules.required('Name'), rules.minLen(3, 'Name')],
  email:   [rules.required('Email'), rules.email()],
  phone:   [rules.phone()],
  company: [],
  message: [rules.required('Message'), rules.minLen(20, 'Message'), rules.maxLen(500, 'Message')],
};

const myAppointments = [
  { id: 1, service: 'Business Strategy Consultation', date: '2026-06-20', time: '10:00 AM', status: 'confirmed' },
  { id: 2, service: 'Feasibility Study Briefing',     date: '2026-07-05', time: '2:00 PM',  status: 'pending' },
];

export default function UserProfile({ onClose }) {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);
  const [msgSent, setMsgSent] = useState(false);

  const [profile, setProfile] = useState({
    name:    currentUser?.name    || '',
    email:   currentUser?.email   || '',
    phone:   '',
    company: '',
  });

  const [contactForm, setContactForm] = useState({
    name:    currentUser?.name  || '',
    email:   currentUser?.email || '',
    phone:   '',
    company: '',
    message: '',
  });

  const profileValidation = useValidation({ name: profileRules.name, email: profileRules.email, phone: profileRules.phone });
  const contactValidation = useValidation({ name: profileRules.name, email: profileRules.email, message: profileRules.message });

  // Profile handlers
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(f => ({ ...f, [name]: value }));
    if (profileValidation.touched[name]) profileValidation.touch(name, value);
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    if (!profileValidation.validateAll(profile)) return;
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  // Contact handlers
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm(f => ({ ...f, [name]: value }));
    if (contactValidation.touched[name]) contactValidation.touch(name, value);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactValidation.validateAll(contactForm)) return;
    setMsgSent(true);
  };

  const tabs = [
    { id: 'profile',      label: '👤 Profile',      },
    { id: 'appointments', label: '📅 Appointments',  },
    { id: 'contact',      label: '💬 Contact Us',    },
  ];

  return (
    <div className="profile-overlay">
      <div className="profile-panel">
        {/* Header */}
        <div className="pp-header">
          <div className="pp-user">
            <div className="pp-avatar">
              {currentUser?.name?.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <div className="pp-name">{currentUser?.name}</div>
              <div className="pp-role">Client Portal</div>
            </div>
          </div>
          <button className="pp-close" onClick={onClose} aria-label="Close profile">×</button>
        </div>

        {/* Tabs */}
        <div className="pp-tabs">
          {tabs.map(t => (
            <button
              key={t.id}
              className={`pp-tab ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="pp-body">

          {/* ── Profile tab ── */}
          {activeTab === 'profile' && (
            <div className="pp-section">
              <h3 className="pp-section-title">Personal Information</h3>
              <p className="pp-section-sub">Update your profile details below.</p>

              {saved && (
                <div className="pp-success">✅ Profile updated successfully!</div>
              )}

              <form onSubmit={handleProfileSave} noValidate>
                {[
                  { name: 'name', label: 'Full Name *', type: 'text', placeholder: 'Your full name', v: profileValidation },
                  { name: 'email', label: 'Email Address *', type: 'email', placeholder: 'your@email.com', v: profileValidation },
                  { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+251 9__ ___ ___', v: profileValidation },
                  { name: 'company', label: 'Company / Organization', type: 'text', placeholder: 'Your organization', v: profileValidation },
                ].map(field => (
                  <div
                    key={field.name}
                    className={`pf-group ${field.v.touched[field.name] && field.v.errors[field.name] ? 'has-error' : field.v.touched[field.name] ? 'has-success' : ''}`}
                  >
                    <label>{field.label}</label>
                    <input
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={profile[field.name]}
                      onChange={handleProfileChange}
                      onBlur={e => field.v.touch(e.target.name, e.target.value)}
                    />
                    {field.v.touched[field.name] && field.v.errors[field.name] && (
                      <p className="pf-error">{field.v.errors[field.name]}</p>
                    )}
                    {field.v.touched[field.name] && !field.v.errors[field.name] && (
                      <p className="pf-success">✓ Looks good</p>
                    )}
                  </div>
                ))}

                <button type="submit" className="btn-profile-save">
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {/* ── Appointments tab ── */}
          {activeTab === 'appointments' && (
            <div className="pp-section">
              <h3 className="pp-section-title">My Appointments</h3>
              <p className="pp-section-sub">Your upcoming and recent consultation bookings.</p>

              <div className="my-appts">
                {myAppointments.map(a => (
                  <div key={a.id} className="my-appt-card">
                    <div className="mac-left">
                      <div className="mac-service">{a.service}</div>
                      <div className="mac-datetime">📅 {a.date} at {a.time}</div>
                    </div>
                    <span className={`status-badge status-${a.status}`}>{a.status}</span>
                  </div>
                ))}
              </div>

              <a href="#booking" className="btn-profile-save" onClick={onClose} style={{ textAlign: 'center', textDecoration: 'none' }}>
                + Book New Consultation
              </a>
            </div>
          )}

          {/* ── Contact tab ── */}
          {activeTab === 'contact' && (
            <div className="pp-section">
              <h3 className="pp-section-title">Send Us a Message</h3>
              <p className="pp-section-sub">We'll respond within 24 hours.</p>

              {msgSent ? (
                <div className="pp-sent">
                  <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
                  <h4>Message Sent!</h4>
                  <p>Thank you. We'll get back to you shortly.</p>
                  <button className="btn-profile-save" onClick={() => { setMsgSent(false); setContactForm(f => ({ ...f, message: '' })); }}>
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} noValidate>
                  {[
                    { name: 'name',    label: 'Full Name *',       type: 'text',  placeholder: 'Your name' },
                    { name: 'email',   label: 'Email Address *',   type: 'email', placeholder: 'your@email.com' },
                    { name: 'phone',   label: 'Phone',             type: 'tel',   placeholder: '+251...' },
                    { name: 'company', label: 'Company',           type: 'text',  placeholder: 'Optional' },
                  ].map(field => (
                    <div
                      key={field.name}
                      className={`pf-group ${contactValidation.touched[field.name] && contactValidation.errors[field.name] ? 'has-error' : contactValidation.touched[field.name] ? 'has-success' : ''}`}
                    >
                      <label>{field.label}</label>
                      <input
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={contactForm[field.name]}
                        onChange={handleContactChange}
                        onBlur={e => contactValidation.touch(e.target.name, e.target.value)}
                      />
                      {contactValidation.touched[field.name] && contactValidation.errors[field.name] && (
                        <p className="pf-error">{contactValidation.errors[field.name]}</p>
                      )}
                    </div>
                  ))}

                  <div className={`pf-group ${contactValidation.touched.message && contactValidation.errors.message ? 'has-error' : contactValidation.touched.message ? 'has-success' : ''}`}>
                    <label>Message * <span style={{ fontWeight: 400, fontSize: 11, color: 'var(--text-muted)' }}>({contactForm.message.length}/500)</span></label>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Describe your project or question…"
                      value={contactForm.message}
                      onChange={handleContactChange}
                      onBlur={e => contactValidation.touch(e.target.name, e.target.value)}
                    />
                    {contactValidation.touched.message && contactValidation.errors.message && (
                      <p className="pf-error">{contactValidation.errors.message}</p>
                    )}
                  </div>

                  <button type="submit" className="btn-profile-save">
                    Send Message →
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
