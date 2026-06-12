import { useEffect, useRef, useState } from 'react';
import './Hero.css';

const STATS = [
  { end: 200, suffix: '+', label: 'Projects Completed' },
  { end: 15,  suffix: '+', label: 'Years Experience'   },
  { end: 50,  suffix: '+', label: 'Expert Consultants' },
  { end: 98,  suffix: '%', label: 'Client Satisfaction' },
];

function Counter({ end, suffix, label, run }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let start = null;
    const dur = 1800;
    const tick = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setN(Math.floor(p * end));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [end, run]);

  return (
    <div className="stat-item">
      <span className="stat-number">{n}{suffix}</span>
      <div className="stat-line" />
      <span className="stat-label">{label}</span>
    </div>
  );
}

export default function Hero() {
  const [run, setRun] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setRun(true); io.disconnect(); } },
      { threshold: 0.4 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-overlay" />
      <div className="hero-pattern" />

      <div className="container hero-content">
        {/* Left */}
        <div className="hero-left">
          <span className="hero-eyebrow">
            Ethiopia's Premier Consulting Firm
          </span>

          <h1 className="hero-title">
            Strategic Consulting<br/>
            Solutions for <span className="hero-gold">Sustainable Growth</span>
          </h1>

          <p className="hero-sub">
            Empowering businesses, NGOs, and institutions with expert strategy,
            feasibility studies, organizational development, and capacity-building
            services across Ethiopia.
          </p>

          <div className="hero-btns">
            <a href="#booking" className="btn btn-primary">Book Consultation</a>
            <a href="#contact" className="btn btn-outline-white">Contact Us</a>
          </div>

          <div className="hero-trust">
            {['✓ ISO Certified', '✓ 15+ Years Experience', '✓ 100+ Organizations Served'].map(t => (
              <span key={t} className="trust-item">{t}</span>
            ))}
          </div>
        </div>

        {/* Right — professional image */}
        <div className="hero-right">
          <div className="hero-img-wrap">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
              alt="Professional consulting team"
              className="hero-img"
            />
            <div className="hero-img-fade" />
          </div>

          {/* Floating cards */}
          <div className="hero-float top-left">
            <div className="hf-icon">📈</div>
            <div>
              <div className="hf-num">200+</div>
              <div className="hf-lbl">Projects</div>
            </div>
          </div>
          <div className="hero-float bottom-right">
            <div className="hf-icon">⭐</div>
            <div>
              <div className="hf-num">98%</div>
              <div className="hf-lbl">Satisfied</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="hero-stats" ref={ref}>
        <div className="container">
          <div className="stats-row">
            {STATS.map((s, i) => (
              <div key={s.label} className="stat-wrap">
                {i > 0 && <div className="stat-sep" />}
                <Counter {...s} run={run} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
