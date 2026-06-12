import { useState, useEffect } from 'react';
import './Navbar.css';

const links = [
  { label: 'Home',         href: '#home' },
  { label: 'About',        href: '#about' },
  { label: 'Services',     href: '#services' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Blog',         href: '#blog' },
  { label: 'Contact',      href: '#contact' },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const close = () => setMenuOpen(false);

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation">
      <div className="container navbar-inner">

        {/* Logo */}
        <a href="#home" className="nav-logo" onClick={close}>
          <div className="nav-logo-mark">
            <span>P</span>
          </div>
          <div className="nav-logo-text">
            <span className="nav-logo-name">PRIME</span>
            <span className="nav-logo-sub">CONSULTANCY PLC</span>
          </div>
        </a>

        {/* Desktop links */}
        <ul className="nav-links">
          {links.map(l => (
            <li key={l.label}>
              <a href={l.href} className="nav-link">{l.label}</a>
            </li>
          ))}
        </ul>

        {/* Desktop right */}
        <div className="nav-right">
          <a href="#booking" className="btn btn-primary btn-sm">Book Consultation</a>
          <a href="tel:+251911134390" className="nav-phone">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.57 1 1 0 01-.24 1.01l-2.21 2.21z"/>
            </svg>
            +251 911 134 390
          </a>
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        {links.map(l => (
          <a key={l.label} href={l.href} className="mobile-link" onClick={close}>
            {l.label}
          </a>
        ))}
        <a href="#booking" className="btn btn-primary mobile-cta" onClick={close}>
          Book Consultation
        </a>
        <a href="tel:+251911134390" className="mobile-phone" onClick={close}>
          📞 +251 911 134 390
        </a>
      </div>
    </nav>
  );
}
