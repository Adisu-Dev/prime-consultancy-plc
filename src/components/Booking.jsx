import { useState } from 'react';
import './Booking.css';

const services = [
  'Corporate & Business Strategy',
  'Growth & Business Transformation',
  'Organizational Design & Development',
  'Project Feasibility Studies',
  'Business Plan Development',
  'Project Assessment & Evaluation',
  'Training & Capacity Building',
  'Research & Advisory Services',
];

export default function Booking() {
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '', service: '', date: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="booking" className="booking">
      <div className="booking-bg" />
      <div className="container booking-inner">
        {/* Left text */}
        <div className="booking-left">
          <p className="section-label">Get Started</p>
          <h2 className="section-title white">Start Your Journey with Us Today</h2>
          <p className="booking-desc">
            Ready to take your organization to the next level? Book a free 30-minute
            consultation with one of our expert consultants and discover how we can
            help you achieve your strategic goals.
          </p>

          <div className="booking-features">
            {[
              { icon: '✅', text: 'Free 30-minute initial consultation' },
              { icon: '🔒', text: 'Confidential and commitment-free' },
              { icon: '⚡', text: 'Response within 24 hours' },
              { icon: '🌍', text: 'In-person or virtual meeting' },
            ].map((f) => (
              <div key={f.text} className="booking-feature">
                <span>{f.icon}</span>
                <span>{f.text}</span>
              </div>
            ))}
          </div>

          <div className="booking-contact">
            <div className="bc-item">
              <div className="bc-icon">📞</div>
              <div>
                <div className="bc-label">Call Us Directly</div>
                <a href="tel:+251911134390" className="bc-val">+251 911 134 390</a>
              </div>
            </div>
            <div className="bc-item">
              <div className="bc-icon">📍</div>
              <div>
                <div className="bc-label">Our Office</div>
                <div className="bc-val">Bole, Addis Ababa, Ethiopia</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right form */}
        <div className="booking-right">
          {submitted ? (
            <div className="booking-success">
              <div className="success-icon">✅</div>
              <h3>Consultation Requested!</h3>
              <p>Thank you for reaching out. Our team will contact you within 24 hours to confirm your appointment.</p>
              <button className="btn-primary" onClick={() => setSubmitted(false)}>
                Book Another
              </button>
            </div>
          ) : (
            <form className="booking-form" onSubmit={handleSubmit}>
              <h3 className="form-title">Book a Free Consultation</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="bk-name">Full Name *</label>
                  <input
                    id="bk-name" name="name" type="text"
                    placeholder="Your full name"
                    value={form.name} onChange={handleChange} required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bk-company">Company / Organization</label>
                  <input
                    id="bk-company" name="company" type="text"
                    placeholder="Your company name"
                    value={form.company} onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="bk-email">Email Address *</label>
                  <input
                    id="bk-email" name="email" type="email"
                    placeholder="your@email.com"
                    value={form.email} onChange={handleChange} required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bk-phone">Phone Number</label>
                  <input
                    id="bk-phone" name="phone" type="tel"
                    placeholder="+251 9__ ___ ___"
                    value={form.phone} onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="bk-service">Service Needed *</label>
                  <select id="bk-service" name="service" value={form.service} onChange={handleChange} required>
                    <option value="">Select a service</option>
                    {services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="bk-date">Preferred Date</label>
                  <input
                    id="bk-date" name="date" type="date"
                    value={form.date} onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="bk-message">Message / Project Brief</label>
                <textarea
                  id="bk-message" name="message" rows={4}
                  placeholder="Briefly describe your project or challenge..."
                  value={form.message} onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn-primary form-submit">
                Request Consultation
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
