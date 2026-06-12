import { useState } from 'react';
import './CaseStudies.css';

const cases = [
  {
    tag: 'Business Strategy',
    category: 'Strategy',
    headerBg: 'linear-gradient(135deg, #1B3A6B, #2E6BC4)',
    client: 'Commercial Bank of Ethiopia',
    industry: 'Financial Institutions',
    challenge: 'Needed a 5-year strategic plan to expand digital banking and improve market share.',
    solution: 'Developed a comprehensive digital transformation roadmap with clear KPIs and milestones.',
    results: ['45% increase in digital banking users', 'Expanded to 12 new branches', '30% reduction in operational costs'],
  },
  {
    tag: 'Organizational Development',
    category: 'NGOs',
    headerBg: 'linear-gradient(135deg, #1a5c3a, #2E7D32)',
    client: 'USAID-Ethiopia Program',
    industry: 'NGOs & International Organizations',
    challenge: 'Organizational restructuring needed to improve program delivery across 8 regional offices.',
    solution: 'Designed a new governance framework, reporting structures, and capacity building program.',
    results: ['60% improvement in program efficiency', 'Standardized M&E frameworks deployed', '200+ staff trained'],
  },
  {
    tag: 'Feasibility Study',
    category: 'Business',
    headerBg: 'linear-gradient(135deg, #7c4a00, #C9A84C)',
    client: 'Sunrise Agro-Processing PLC',
    industry: 'Agriculture & Manufacturing',
    challenge: 'Required a full feasibility assessment for a $5M agro-processing plant investment.',
    solution: 'Conducted comprehensive market, financial, technical, and environmental feasibility study.',
    results: ['Investment approved by 3 major lenders', 'Projected ROI of 28% within 4 years', '150+ jobs created'],
  },
];

const filters = ['All', 'Strategy', 'NGOs', 'Government', 'Business'];

export default function CaseStudies() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? cases
    : cases.filter(c => c.category === activeFilter);

  return (
    <section id="case-studies" className="casestudies">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Success Stories</span>
          <h2 className="section-title">Proven Results Across Industries</h2>
          <p className="section-subtitle centered">
            Real-world impact through expert consulting — organizations we've helped transform with measurable results.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="cases-filter">
          {filters.map(f => (
            <button
              key={f}
              className={`category-tag ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="cases-grid">
          {filtered.map(c => (
            <div key={c.client} className="case-card">
              {/* Header / image area */}
              <div className="case-header" style={{ background: c.headerBg }}>
                <span className="case-category-badge">{c.tag}</span>
                <div className="case-industry">{c.industry}</div>
                <h3 className="case-client">{c.client}</h3>
              </div>

              <div className="case-body">
                <div className="case-section">
                  <div className="cs-label"><span className="cs-dot red" />Challenge</div>
                  <p>{c.challenge}</p>
                </div>
                <div className="case-section">
                  <div className="cs-label"><span className="cs-dot blue" />Solution</div>
                  <p>{c.solution}</p>
                </div>
                <div className="case-section">
                  <div className="cs-label"><span className="cs-dot green" />Key Results</div>
                  <ul className="case-results">
                    {c.results.map(r => (
                      <li key={r}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#2E7D32">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <a href="#contact" className="case-link">
                  View Case Study →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="casestudies-footer">
          <a href="#contact" className="btn-primary">View All Case Studies</a>
        </div>
      </div>
    </section>
  );
}
