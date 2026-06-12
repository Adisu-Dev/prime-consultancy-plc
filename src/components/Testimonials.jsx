import { useState } from 'react';
import './Testimonials.css';

const testimonials = [
  {
    name: 'Dr. Abebe Tadesse', role: 'CEO', org: 'Sunrise Manufacturing PLC', rating: 5,
    text: 'Prime Consultancy delivered an exceptional feasibility study that secured our $5M investment. Their deep market knowledge and rigorous methodology gave our investors full confidence.',
  },
  {
    name: 'Tigist Haile', role: 'Country Director', org: 'USAID Ethiopia', rating: 5,
    text: 'The organizational restructuring project transformed how we operate across all regional offices. Professional, responsive, and delivered measurable improvements in efficiency.',
  },
  {
    name: 'Mulugeta Bekele', role: 'Director General', org: 'Ministry of Agriculture', rating: 5,
    text: 'Their strategic planning facilitation brought together diverse stakeholders and produced a comprehensive 5-year plan that is actually being implemented on the ground.',
  },
  {
    name: 'Sara Mohammed', role: 'Founder & CEO', org: 'EthiTech Startup', rating: 5,
    text: 'Prime Consultancy delivered a world-class business plan that helped us secure seed funding within 3 months. Outstanding value and truly professional service.',
  },
  {
    name: 'Yohannes Girma', role: 'Head of Operations', org: 'Dashen Bank', rating: 5,
    text: 'The capacity building program was practical, engaging, and directly applicable to our challenges. We have seen real behavioral change across our entire management team.',
  },
];

function Stars({ count }) {
  return (
    <div className="stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill={i < count ? '#C9A84C' : '#E5E7EB'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const total = testimonials.length;

  const prev = () => setActive(a => (a === 0 ? total - 1 : a - 1));
  const next = () => setActive(a => (a === total - 1 ? 0 : a + 1));

  const visible = [
    testimonials[active % total],
    testimonials[(active + 1) % total],
    testimonials[(active + 2) % total],
  ];

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Client Feedback</span>
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle centered">
            Don't just take our word for it — here's what leaders and decision-makers
            say about working with Prime Consultancy PLC.
          </p>
        </div>

        <div className="testi-track">
          {visible.map((t, i) => (
            <div key={`${t.name}-${i}`} className={`testi-card ${i === 0 ? 'testi-featured' : ''}`}>
              <div className="testi-quote">"</div>
              <Stars count={t.rating} />
              <p className="testi-text">{t.text}</p>
              <div className="testi-divider" />
              <div className="testi-author">
                <div className="testi-avatar">
                  {t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}, {t.org}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="testi-controls">
          <button className="testi-btn" onClick={prev} aria-label="Previous">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <div className="testi-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testi-dot ${i === active ? 'active' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button className="testi-btn" onClick={next} aria-label="Next">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
