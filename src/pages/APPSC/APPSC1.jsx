import React from 'react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import Chatbot from '../../Components/Chatbot';
import './APPSC1.css';

const groups = [
  { key: 'group-1', label: 'Group-1' },
  { key: 'group-2', label: 'Group-2' },
  { key: 'group-3', label: 'Group-3' },
  { key: 'group-4', label: 'Group-4' },
];

const cards = [1, 2, 3].map((i) => ({
  id: i,
  title: 'TSPSC Group-I Prelims cum Mains',
  subtitle: 'Classroom cum Mentorship Program',
  offline: '₹ 65,000',
  online: '₹ 65,000',
  img: '/assets/banners/tspsc-prelims-mains.jpg', // replace with your real image path
}));

export default function APPSC1() {
  const [active, setActive] = React.useState('group-1');
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const heroImages = [
    '/assets/banners/tspsc-hero-1.jpg',
    '/assets/banners/tspsc-hero-2.jpg',
    '/assets/banners/tspsc-hero-3.jpg',
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="appsci-page">
      <Navbar />

      <main className="appsci-container">
        {/* Top Notice Bar (optional) */}
        <div className="appsci-topbar" role="status">
          UPSC PCM Classroom cum Mentorship Program | Batch Starts From <strong>19th Aug 2025</strong> ➜
        </div>

        {/* Hero Banner / Slider (static placeholder) */}
        <section className="appsci-hero" aria-label="Promotions">
          <div className="appsci-hero-slide">
            <img
              className="appsci-hero-image"
              src={heroImages[currentSlide]}
              alt="TSPSC Group-I 2025–26 Prelims cum Mains Classroom Program cum Mentorship Program – Admissions in Progress"
            />
          </div>
          <div className="appsci-hero-dots" aria-hidden>
            {heroImages.map((_, index) => (
              <span
                key={index}
                className={`dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </section>

        {/* Group Tabs (no navigation away; content can be swapped later) */}
        <nav className="appsci-tabs" aria-label="TSPSC Groups">
          {groups.map((g) => (
            <button
              key={g.key}
              className={`appsci-tab ${active === g.key ? 'is-active' : ''}`}
              onClick={() => setActive(g.key)}
              type="button"
            >
              {g.label}
            </button>
          ))}
        </nav>

        {/* Section Title */}
        <h2 className="appsci-section-title">Classroom Programs</h2>

        {/* Cards Grid */}
        <section className="appsci-card-grid">
          {cards.map((c) => (
            <article key={c.id} className="appsci-card" role="article">
              <div className="appsci-card-media">
                <img src={c.img} alt={c.title} />
              </div>
              <div className="appsci-card-body">
                <h3 className="appsci-card-title">{c.title}</h3>
                <p className="appsci-card-sub">{c.subtitle}</p>
                <p className="appsci-card-note">Admissions in Progress</p>
                <div className="appsci-price-row">
                  <span className="appsci-chip">Offline: {c.offline}</span>
                  <span className="appsci-chip">Online: {c.online}</span>
                </div>
                <button className="appsci-btn" type="button">Explore</button>
              </div>
            </article>
          ))}
        </section>
      </main>

      {/* Chatbot (fixed at corner, component decides position) */}
      <Chatbot />

      <Footer />
    </div>
  );
}