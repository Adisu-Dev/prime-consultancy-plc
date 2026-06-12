import './Footer.css';

const serviceLinks = [
  'Corporate & Business Strategy',
  'Growth & Business Transformation',
  'Organizational Design',
  'Feasibility Studies',
  'Business Plan Development',
  'Project Evaluation',
  'Training & Capacity Building',
  'Research & Advisory',
];

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Blog & Insights', href: '#blog' },
  { label: 'Contact Us', href: '#contact' },
  { label: 'Book Consultation', href: '#booking' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container footer-top-inner">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon">P</div>
              <div>
                <div className="footer-logo-name">PRIME</div>
                <div className="footer-logo-sub">CONSULTANCY PLC</div>
              </div>
            </div>
            <p className="footer-tagline">
              Ethiopia's leading professional consulting firm — delivering expert strategy,
              feasibility studies, and capacity-building services since 2010.
            </p>
            <div className="footer-socials">
              {['LinkedIn', 'Twitter', 'WhatsApp', 'YouTube'].map((s) => (
                <a key={s} href="#social" className="fsocial-btn" aria-label={s}>
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4 className="footer-col-title">Our Services</h4>
            <ul className="footer-links">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <a href="#services">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contact Info</h4>
            <div className="footer-contact">
              {[
                { icon: '📍', text: 'Bole, Addis Ababa, Ethiopia' },
                { icon: '📞', text: '+251 911 134 390', href: 'tel:+251911134390' },
                { icon: '📧', text: 'info@primeconsultancy.et', href: 'mailto:info@primeconsultancy.et' },
                { icon: '🕐', text: 'Mon–Fri: 8:00 AM – 6:00 PM' },
              ].map((c) => (
                <div key={c.text} className="footer-contact-item">
                  <span className="fci-icon">{c.icon}</span>
                  {c.href ? (
                    <a href={c.href}>{c.text}</a>
                  ) : (
                    <span>{c.text}</span>
                  )}
                </div>
              ))}
            </div>

            <div className="footer-newsletter">
              <p>Subscribe to our newsletter</p>
              <div className="newsletter-form">
                <input type="email" placeholder="Your email address" aria-label="Email for newsletter" />
                <button type="button" aria-label="Subscribe">→</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-divider" />

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {year} Prime Consultancy PLC. All rights reserved. | Bole, Addis Ababa, Ethiopia</p>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms & Conditions</a>
            <a href="#sitemap">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
