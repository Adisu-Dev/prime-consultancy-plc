import './Blog.css';

const posts = [
  {
    category: 'Business Strategy',
    catColor: '#1B3A6B',
    catBg: '#DBEAFE',
    title: '5 Key Strategies for Sustainable Business Growth in Ethiopia',
    excerpt: 'Discover the proven frameworks that successful Ethiopian companies use to achieve consistent growth in a dynamic market environment.',
    date: 'June 5, 2026',
    readTime: '6 min read',
    bgColor: '#EFF6FF',
  },
  {
    category: 'Project Management',
    catColor: '#2E7D32',
    catBg: '#DCFCE7',
    title: 'How to Build a Robust M&E Framework for Development Projects',
    excerpt: 'A practical guide to monitoring and evaluation systems that ensure accountability, learning, and measurable impact in development programs.',
    date: 'May 28, 2026',
    readTime: '8 min read',
    bgColor: '#ECFDF5',
  },
  {
    category: 'Org. Development',
    catColor: '#C9A84C',
    catBg: '#FEF3C7',
    title: 'Transforming Your Organizational Culture for High Performance',
    excerpt: 'Culture eats strategy for breakfast. Learn how leading Ethiopian organizations are building cultures that drive performance and innovation.',
    date: 'May 15, 2026',
    readTime: '5 min read',
    bgColor: '#FFFBEB',
  },
];

export default function Blog() {
  return (
    <section id="blog" className="blog">
      <div className="container">
        {/* Header row: title left, button right */}
        <div className="blog-header-row">
          <div className="section-header" style={{ textAlign: 'left' }}>
            <p className="section-label">Knowledge Hub</p>
            <h2 className="section-title">Latest Insights &amp; News</h2>
          </div>
          <a href="#blog" className="btn-ghost">
            View All Articles →
          </a>
        </div>

        <div className="blog-grid">
          {posts.map((post) => (
            <article key={post.title} className="blog-card">
              {/* Thumbnail */}
              <div className="blog-image" style={{ background: post.bgColor }}>
                <span className="blog-img-icon">📝</span>
              </div>

              <div className="blog-body">
                {/* Category + Date */}
                <div className="blog-meta">
                  <span
                    className="blog-cat"
                    style={{ color: post.catColor, background: post.catBg, padding: '2px 10px', borderRadius: 9999 }}
                  >
                    {post.category}
                  </span>
                  <span className="blog-date">{post.date}</span>
                </div>

                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>

                <div className="blog-footer-row">
                  <span className="blog-readtime">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {post.readTime}
                  </span>
                  <a href="#blog" className="blog-read-more">
                    Read More →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
