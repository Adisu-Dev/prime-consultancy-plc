import { useState } from 'react';
import './Contact.css';

const services = [
  'Corporate & Business Strategy',
  'Growth & Business Transformation',
  'Organizational Design',
  'Feasibility Studies',
  'Business Plan Development',
  'Project Evaluation',
  'Training & Capacity Building',
  'Research & Advisory',
  'Other',
];

export default function Contact() {
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '', service: '', message: '',
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); setSent(true); };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <p className="section-label">Get In Touch</p>
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle centered">
            Have a question or ready to start a project? Reach out and our team will
            get back to you within 24 hours.
          </p>
        </div>

        <div className="contact-inner">
          {/* Info panel */}
          <div className="contact-info">
            <div className="contact-info-card">
              <h3>Contact Information</h3>
              <p>Get in touch with us through any of the channels below or fill out the form.</p>

              <div className="contact-details">
                {[
                  { icon: '📍', label: 'Address', val: 'Bole, Addis Ababa, Ethiopia' },
                  { icon: '📞', label: 'Phone', val: '+251 911 134 390', href: 'tel:+251911134390' },
                  { icon: '📧', label: 'Email', val: 'info@primeconsultancy.et', href: 'mailto:info@primeconsultancy.et' },
                  { icon: '🕐', label: 'Business Hours', val: 'Mon–Fri, 8:00 AM – 6:00 PM EAT' },
                ].map((d) => (
                  <div key={d.label} className="contact-detail">
                    <div className="contact-detail-icon">{d.icon}</div>
                    <div>
                      <div className="cd-label">{d.label}</div>
                      {d.href ? (
                        <a href={d.href} className="cd-val link">{d.val}</a>
                      ) : (
                        <div className="cd-val">{d.val}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="contact-socials">
                <a href="#social" className="social-btn" aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
                <a href="#social" className="social-btn" aria-label="Twitter/X">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                  </svg>
                </a>
                <a href="https://wa.me/251911134390" className="social-btn whatsapp" aria-label="WhatsApp">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="map-placeholder">
              <div className="map-overlay">
                <div className="map-pin">📍</div>
                <p>Bole, Addis Ababa</p>
                <a href="https://maps.google.com/?q=Bole,Addis+Ababa,Ethiopia" target="_blank" rel="noopener noreferrer" className="map-link">
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="contact-form-wrap">
            {sent ? (
              <div className="contact-success">
                <div className="success-emoji">🎉</div>
                <h3>Message Sent!</h3>
                <p>Thank you for your message. We'll get back to you within 24 hours.</p>
                <button className="btn-primary" onClick={() => setSent(false)}>Send Another</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <h3 className="cf-title">Send Us a Message</h3>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="ct-name">Full Name *</label>
                    <input id="ct-name" name="name" type="text" placeholder="Your full name" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ct-company">Company Name</label>
                    <input id="ct-company" name="company" type="text" placeholder="Your company" value={form.company} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="ct-email">Email Address *</label>
                    <input id="ct-email" name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ct-phone">Phone Number</label>
                    <input id="ct-phone" name="phone" type="tel" placeholder="+251 9__ ___ ___" value={form.phone} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="ct-service">Service Needed</label>
                  <select id="ct-service" name="service" value={form.service} onChange={handleChange}>
                    <option value="">Select a service...</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="ct-message">Message *</label>
                  <textarea id="ct-message" name="message" rows={5} placeholder="Tell us about your project or question..." value={form.message} onChange={handleChange} required />
                </div>

                <button type="submit" className="btn-primary form-submit">
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
