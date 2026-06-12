import { useState } from 'react';
import './Services.css';

const services = [
  { icon: '🎯', title: 'Corporate & Business Strategy',        desc: 'Helping organizations define vision, mission, strategic objectives, and actionable growth plans.',         features: ['Vision & Mission Development', 'Market Positioning', 'Growth Roadmaps', 'Competitive Analysis'],       color: '#1B2B4B' },
  { icon: '🚀', title: 'Growth & Business Transformation',     desc: 'Designing strategies that accelerate business growth, improve performance, and revitalize organizations.',    features: ['Performance Improvement', 'Change Management', 'Process Optimization', 'Turnaround Strategy'],        color: '#059669' },
  { icon: '🏢', title: 'Organizational Design & Development',  desc: 'Creating efficient organizational structures, governance frameworks, and operational systems.',              features: ['Org. Restructuring', 'Governance Frameworks', 'HR Systems', 'Culture Development'],                  color: '#2563EB' },
  { icon: '📋', title: 'Project Feasibility Studies',          desc: 'Comprehensive market, financial, technical, and operational feasibility assessments.',                        features: ['Market Analysis', 'Financial Projections', 'Technical Assessment', 'Risk Analysis'],                  color: '#EA580C' },
  { icon: '📄', title: 'Business Plan Development',            desc: 'Preparing investor-ready and lender-ready business plans for startups and established organizations.',        features: ['Investor-Ready Plans', 'Financial Modeling', 'Market Research', 'Pitch Decks'],                      color: '#7C3AED' },
  { icon: '🔍', title: 'Project Assessment & Evaluation',      desc: 'Baseline studies, mid-term evaluations, final evaluations, impact assessments, and monitoring frameworks.',  features: ['Impact Assessment', 'M&E Frameworks', 'Baseline Studies', 'Final Evaluations'],                      color: '#0891B2' },
  { icon: '🎓', title: 'Training & Capacity Building',         desc: 'Professional training focused on leadership, management, entrepreneurship, and organizational excellence.',  features: ['Leadership Training', 'Project Management', 'Entrepreneurship', 'Team Development'],                 color: '#DC2626' },
  { icon: '📊', title: 'Research & Advisory Services',         desc: 'Data-driven studies, market research, policy analysis, and strategic recommendations.',                      features: ['Market Research', 'Policy Analysis', 'Strategic Advisory', 'Data Analytics'],                        color: '#1D4ED8' },
];

export default function Services() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="services" className="services">
      <div className="container">
        <div className="section-header">
          <p className="section-label">What We Do</p>
          <h2 className="section-title">Comprehensive Consulting Solutions</h2>
          <p className="section-subtitle centered">
            We deliver end-to-end advisory services tailored to the unique needs of businesses,
            NGOs, and government institutions across Ethiopia and beyond.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`service-card ${hovered === i ? 'hovered' : ''}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="service-icon" style={{ background: `${service.color}18`, color: service.color }}>
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
              <ul className="service-features">
                {service.features.map((f) => (
                  <li key={f}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ color: service.color }}>
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="service-link">
                Learn More
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
              <div className="service-card-accent" style={{ background: service.color }} />
            </div>
          ))}
        </div>

        <div className="services-footer">
          <a href="#contact" className="btn-primary">View All Services</a>
        </div>
      </div>
    </section>
  );
}
