import './Industries.css';

const industries = [
  { icon: '🏦', name: 'Financial Institutions', desc: 'Banks, MFIs & insurance' },
  { icon: '🏭', name: 'Manufacturing',          desc: 'Production & supply chain' },
  { icon: '🌍', name: 'NGOs & INGOs',           desc: 'Non-governmental orgs' },
  { icon: '🏛️', name: 'Government Agencies',   desc: 'Federal & regional bodies' },
  { icon: '🌾', name: 'Agriculture',            desc: 'Agribusiness & value chain' },
  { icon: '🏥', name: 'Healthcare',             desc: 'Hospitals & health systems' },
  { icon: '🎓', name: 'Education',              desc: 'Universities & training' },
  { icon: '💻', name: 'Technology',             desc: 'Tech startups & digital' },
];

const row1 = industries.slice(0, 5);
const row2 = industries.slice(5);

export default function Industries() {
  return (
    <section id="industries" className="industries">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow" style={{ color: 'var(--gold)' }}>Our Reach</span>
          <h2 className="section-title white">Industries We Serve</h2>
          <p className="section-subtitle white centered">
            Sector-specific knowledge and cross-industry insights for every unique operating environment.
          </p>
        </div>

        <div className="industries-grid">
          {row1.map(ind => (
            <div key={ind.name} className="industry-card">
              <div className="industry-icon-wrap">
                <span className="industry-icon">{ind.icon}</span>
              </div>
              <div className="industry-name">{ind.name}</div>
              <div className="industry-desc">{ind.desc}</div>
            </div>
          ))}
        </div>

        <div className="industries-grid-row2" style={{ marginTop: 16 }}>
          {row2.map(ind => (
            <div key={ind.name} className="industry-card">
              <div className="industry-icon-wrap">
                <span className="industry-icon">{ind.icon}</span>
              </div>
              <div className="industry-name">{ind.name}</div>
              <div className="industry-desc">{ind.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
