import './About.css';

const features = [
  { icon: '👥', label: 'Expert Team' },
  { icon: '📊', label: 'Data-Driven' },
  { icon: '✅', label: 'Proven Methods' },
  { icon: '🎯', label: 'Tailored Solutions' },
];

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container about-inner">

        {/* Left: image stack */}
        <div className="about-visual">
          <div className="about-main-img">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=680&q=80"
              alt="Professional business team meeting"
              className="about-img"
            />
          </div>

          {/* Accent image — overlapping, bottom-right */}
          <div className="about-accent-img">
            <img
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=280&q=80"
              alt="Strategy session"
              className="about-img-sm"
            />
          </div>

          {/* Floating 15+ Years badge */}
          <div className="about-exp-badge">
            <span className="exp-num">15+</span>
            <span className="exp-lbl">Years<br/>Experience</span>
          </div>
        </div>

        {/* Right: content */}
        <div className="about-content">
          <span className="section-label">About Prime Consultancy</span>
          <h2 className="section-title">
            Your Strategic Partner<br/>for Business Growth
          </h2>

          <p className="about-p">
            Prime Consultancy PLC is a leading professional consulting firm headquartered in Bole,
            Addis Ababa, Ethiopia. We help businesses, government institutions, NGOs, and
            development organizations achieve sustainable growth and operational excellence.
          </p>
          <p className="about-p">
            With over 15 years of experience and a team of 50+ multidisciplinary experts, we combine
            global best practices with deep local market knowledge to deliver strategies that create
            lasting, measurable impact.
          </p>

          {/* Feature pills — 2×2 grid */}
          <div className="about-features">
            {features.map(f => (
              <div key={f.label} className="about-feature">
                <span style={{ fontSize: 16, flexShrink: 0 }}>{f.icon}</span>
                {f.label}
              </div>
            ))}
          </div>

          <a href="#services" className="btn-primary">
            Learn More About Us
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
