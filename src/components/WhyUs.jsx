import './WhyUs.css';

const reasons = [
  { icon: '👥', title: 'Expert Consultants',           desc: 'Experienced professionals with multidisciplinary expertise spanning strategy, finance, and operations.' },
  { icon: '🎯', title: 'Results-Oriented Approach',    desc: 'Every engagement is focused on delivering measurable outcomes that move your organization forward.' },
  { icon: '🌍', title: 'Deep Industry Experience',     desc: 'Proven track record serving public, private, and nonprofit sectors across Ethiopia and Africa.' },
  { icon: '🔧', title: 'Customized Solutions',         desc: 'We reject one-size-fits-all thinking. Every solution is precisely tailored to your unique context.' },
  { icon: '📊', title: 'Evidence-Based Decisions',     desc: 'Research-driven methodologies and rigorous data analysis underpin every recommendation.' },
];

const metrics = [
  { val: '200+', lbl: 'Projects Delivered',    desc: 'Across diverse industries' },
  { val: '98%',  lbl: 'Client Satisfaction',   desc: 'Post-project surveys' },
  { val: '15+',  lbl: 'Years in Operation',    desc: 'Established presence' },
  { val: '50+',  lbl: 'Expert Consultants',    desc: 'Multidisciplinary team' },
];

const bars = [
  { label: 'Client Retention Rate',    pct: 94 },
  { label: 'On-Time Delivery',         pct: 97 },
  { label: 'Recommendation Rate',      pct: 99 },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="whyus">
      <div className="container whyus-inner">

        {/* ── Left ── */}
        <div className="whyus-content">
          <span className="eyebrow">Why Choose Us</span>
          <h2 className="section-title">
            Why Clients Choose<br/>Prime Consultancy
          </h2>
          <p className="whyus-intro">
            We combine global expertise with deep local knowledge to deliver strategies
            that actually work in the Ethiopian and East African business environment.
          </p>

          <div className="reasons-list">
            {reasons.map((r, i) => (
              <div key={r.title} className="reason-item">
                <div className="reason-icon-wrap">{r.icon}</div>
                <div className="reason-body">
                  <div className="reason-title">{r.title}</div>
                  <div className="reason-desc">{r.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right ── */}
        <div className="whyus-visual">
          <div className="performance-card">
            <div className="perf-header">
              <span className="perf-title">Performance Index</span>
              <span className="perf-year">2024</span>
            </div>

            <div className="perf-metrics">
              {metrics.map(m => (
                <div key={m.lbl} className="perf-metric">
                  <div className="perf-val">{m.val}</div>
                  <div className="perf-lbl">{m.lbl}</div>
                  <div className="perf-desc">{m.desc}</div>
                </div>
              ))}
            </div>

            <div className="perf-bars">
              {bars.map(b => (
                <div key={b.label} className="perf-bar-item">
                  <div className="pbi-row">
                    <span className="pbi-label">{b.label}</span>
                    <span className="pbi-pct">{b.pct}%</span>
                  </div>
                  <div className="pbi-track">
                    <div className="pbi-fill" style={{ width: `${b.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="whyus-cta-box">
            <p>Ready to transform your organization?</p>
            <a href="#booking" className="btn-primary">Start Your Journey</a>
          </div>
        </div>
      </div>
    </section>
  );
}
