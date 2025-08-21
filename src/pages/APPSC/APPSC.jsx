import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import "./APPSC.css";
import appsclogoSVG from "../../assets/appsclogo.svg?raw";
import Chatbot from "../../Components/Chatbot";

const APPSC = () => {
  const logoRef = useRef(null);
  const heroRef = useRef(null);
  const orientationRef = useRef(null);
  // Tab state for course details
  const [activeTab, setActiveTab] = useState("overview");
  const [floatExit, setFloatExit] = useState(false);
  // Responsive breakpoint for mobile rendering (<768px)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Orientation sessions (YouTube thumbnails)
  const orientationVideos = [
    { id: 'wJgtqzBRgPY', title: 'Orientation Session 1' },
    { id: 'wJgtqzBRgPY', title: 'Orientation Session 2' },
    { id: 'wJgtqzBRgPY', title: 'Orientation Session 3' },
    { id: 'wJgtqzBRgPY', title: 'Orientation Session 4' },
    { id: 'wJgtqzBRgPY', title: 'Orientation Session 5' },
    { id: 'wJgtqzBRgPY', title: 'Orientation Session 6' },
    { id: 'wJgtqzBRgPY', title: 'Orientation Session 7' },
    { id: 'wJgtqzBRgPY', title: 'Orientation Session 8' },
  ];

  // Latest updates (edit these items as needed)
  const updates = [
    { title: 'APPSC Group I notification out', date: '11 Aug 2025' },
    { title: 'New orientation session uploaded', date: '10 Aug 2025' },
    { title: 'Syllabus PDF updated', date: '08 Aug 2025' },
  ];

  // FAQs (edit as needed)
  const faqs = [
    { q: 'What is the course duration?', a: 'The APPSC program typically runs for X months with weekly schedules.' },
    { q: 'Do I get recorded sessions?', a: 'Yes, all live classes are recorded and made available within 24 hours.' },
    { q: 'Is there a refund policy?', a: 'Yes, refunds are available within the first 7 days as per our policy.' },
    { q: 'How do I access study materials?', a: 'Materials are available in the portal under the Material tab after enrollment.' },
  ];

  // Masters carousel state & data
  const masters = [
    { name: 'Master 1', title: 'Polity & Governance', photo: 'https://placehold.co/640x360?text=Master+1' },
    { name: 'Master 2', title: 'History & Culture', photo: 'https://placehold.co/640x360?text=Master+2' },
    { name: 'Master 3', title: 'Economy', photo: 'https://placehold.co/640x360?text=Master+3' },
    { name: 'Master 4', title: 'Geography', photo: 'https://placehold.co/640x360?text=Master+4' },
  ];
  const [masterIndex, setMasterIndex] = useState(0);
  const slideRefs = useRef([]);
  // Masters carousel viewport ref
  const masterViewportRef = useRef(null);

  // Orientation carousel state & refs
  const [orientIndex, setOrientIndex] = useState(0);
  const orientSlideRefs = useRef([]);
  const orientViewportRef = useRef(null);
  // Skip initial auto-scrolls for both carousels
  const masterDidMount = useRef(false);
  const orientDidMount = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const rotation = window.scrollY * 0.1; // adjust rotation speed
      document.documentElement.style.setProperty('--scroll-rotation', `${rotation}deg`);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate SVG parts on scroll (with proper cleanup)
  useEffect(() => {
    if (!logoRef.current) return;
    let onScroll;
    let disposed = false;

    (async () => {
      const mod = await import('animejs');
      const animeFn = mod.default ?? mod.anime;
      if (typeof animeFn !== 'function' || disposed) return;

      const svgEl = logoRef.current?.querySelector('svg');
      if (!svgEl) return;

      const parts = Array.from(svgEl.querySelectorAll('path'));
      const tl = animeFn.timeline({ autoplay: false })
        .add({
          targets: parts,
          translateX: (el, i) => (i % 2 === 0 ? -200 : 200),
          translateY: (el, i) => (i < parts.length / 2 ? -200 : 200),
          opacity: [0, 1],
          easing: 'easeOutExpo',
          duration: 800,
          delay: (_, i) => i * 50,
        })
        .add({
          targets: parts,
          translateX: 0,
          translateY: 0,
          easing: 'easeOutExpo',
          duration: 800,
          offset: 0,
        });

      const words = Array.from(svgEl.querySelectorAll('text'));
      tl.add({
        targets: words,
        opacity: [0, 1],
        translateY: [20, 0],
        easing: 'easeOutSine',
        duration: 600,
        delay: (_, i) => i * 200,
      });

      const pillarEl = svgEl.querySelector('#pillar') || svgEl.querySelector('.pillar');
      if (pillarEl) {
        tl.add({
          targets: pillarEl,
          translateY: [100, 0],
          easing: 'easeOutBounce',
          duration: 1000,
        }, '-=400');
      }

      onScroll = () => {
        const scrollPos = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(Math.max(scrollPos / maxScroll, 0), 1);
        tl.seek(tl.duration * progress);
      };
      window.addEventListener('scroll', onScroll);
    })();

    return () => {
      disposed = true;
      if (onScroll) window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Hide/fly out the floating course card when Orientation section is in view
  useEffect(() => {
    const target = orientationRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setFloatExit(entry.isIntersecting);
      },
      { root: null, threshold: 0.1 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  // Keep active master slide centered on change (skip initial mount)
  useEffect(() => {
    if (!masterDidMount.current) {
      masterDidMount.current = true; // skip initial auto-scroll on page load
      return;
    }
    const el = slideRefs.current[masterIndex];
    const vp = masterViewportRef.current;
    if (!el || !vp) return;
    // Compute target left so we only scroll the horizontal container, not the page
    const vpStyle = getComputedStyle(vp);
    const padLeft = parseInt(vpStyle.paddingLeft || '0', 10);
    const targetLeft = el.offsetLeft - padLeft;
    vp.scrollTo({ left: targetLeft, behavior: 'smooth' });
  }, [masterIndex]);
  // Keep active orientation slide centered on change (skip initial mount)
  useEffect(() => {
    if (!orientDidMount.current) {
      orientDidMount.current = true; // skip initial auto-scroll on page load
      return;
    }
    const el = orientSlideRefs.current[orientIndex];
    const vp = orientViewportRef.current;
    if (!el || !vp) return;
    const vpStyle = getComputedStyle(vp);
    const padLeft = parseInt(vpStyle.paddingLeft || '0', 10);
    const targetLeft = el.offsetLeft - padLeft;
    vp.scrollTo({ left: targetLeft, behavior: 'smooth' });
  }, [orientIndex]);
  // Removed sticky card scroll effect




  return (
    <>
      <Navbar />
      <Chatbot />
      {!isMobile && (
        <div className={`floating-course-card ${floatExit ? 'exit' : ''}`}>
          <div className="course-enroll-card">
            <div className="course-image">
              <img
                src="https://placehold.co/400x300"
                alt="APPSC Course"
                width="400"
                height="300"
                className="course-card-image"
                loading="lazy"
              />
            </div>
            <div className="course-info">
              <h3>Enroll in APPSC Group I</h3>
              <p><strong>Start Date:</strong> DD MMM YYYY</p>
              <p><strong>Duration:</strong> X Months</p>
              <p><strong>Price:</strong> ₹X,XXX</p>
            </div>
            <button className="enroll-btn">Enroll Now</button>
          </div>
        </div>
      )}
      <section className="course-page"> 
      <section className="course-hero" ref={heroRef}>
        <div className="course-hero-inner">
          <div className="course-hero-bg">
            <div ref={logoRef} className="appsclogo-svg">
              <div
                className="appsclogo-svg-inner"
                dangerouslySetInnerHTML={{ __html: appsclogoSVG }}
              />
            </div>
          </div>
          <div className="course-hero-content">
            <div className="course-header-details">
              <h1>Andhra Pradesh Public Service Commission (APPSC)</h1>
              <p className="course-subtitle">Your gateway to success in APPSC Group I</p>
              <p className="course-dates">
                <strong>Start Date:</strong> DD MMM YYYY &nbsp;|&nbsp; <strong>End Date:</strong> DD MMM YYYY
              </p>
            </div>
            {/* Course card removed */}
          </div>
        </div>
      </section>
      {isMobile && (
        <div className="floating-course-card mobile-inline" style={{ position: 'static' }}>
          <div className="course-enroll-card">
            <div className="course-image">
              <img
                src="https://placehold.co/400x300"
                alt="APPSC Course"
                width="400"
                height="300"
                className="course-card-image"
                loading="lazy"
              />
            </div>
            <div className="course-info">
              <h3>Enroll in APPSC Group I</h3>
              <p><strong>Start Date:</strong> DD MMM YYYY</p>
              <p><strong>Duration:</strong> X Months</p>
              <p><strong>Price:</strong> ₹X,XXX</p>
            </div>
            <button className="enroll-btn">Enroll Now</button>
          </div>
        </div>
      )}
      <div className="tabs-wrapper">
        <section className="tabs-section">
          <div className="tabs">
            <button
              className={activeTab === "overview" ? "active" : ""}
              onClick={() => setActiveTab("overview")}
            >
              About
            </button>
            <button
              className={activeTab === "curriculum" ? "active" : ""}
              onClick={() => setActiveTab("curriculum")}
            >
              Schedule
            </button>
            <button
              className={activeTab === "instructors" ? "active" : ""}
              onClick={() => setActiveTab("instructors")}
            >
              Material
            </button>
          </div>
          <div className="tab-content">
            {activeTab === "overview" && (
              <div className="tab-panel">Overview content goes here.</div>
            )}
            {activeTab === "curriculum" && (
              <div className="tab-panel">Curriculum content goes here.</div>
            )}
            {activeTab === "instructors" && (
              <div className="tab-panel">Instructor details go here.</div>
            )}
            {activeTab === "faqs" && (
              <div className="tab-panel">FAQs details go here.</div>
            )}
          </div>
        </section>
      </div>
      <section className="masters-section">
        <h2 className="masters-title">Meet Your Masters</h2>
        <div className="masters-carousel">
          <button
            type="button"
            className="carousel-btn prev"
            aria-label="Previous"
            onClick={() => setMasterIndex((i) => (i - 1 + masters.length) % masters.length)}
          >
            ‹
          </button>

          <div
            className="carousel-viewport"
            ref={masterViewportRef}
            tabIndex={0}
            aria-roledescription="carousel"
            aria-label="Masters"
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') {
                setMasterIndex((i) => (i - 1 + masters.length) % masters.length);
              }
              if (e.key === 'ArrowRight') {
                setMasterIndex((i) => (i + 1) % masters.length);
              }
            }}
          >
            <div className="carousel-track">
              {masters.map((m, idx) => (
                <div
                  key={idx}
                  className={`carousel-slide ${idx === masterIndex ? 'active' : ''}`}
                  ref={(el) => (slideRefs.current[idx] = el)}
                >
                  <img src={m.photo} alt={m.name} className="carousel-image" />
                  <div className="carousel-caption">
                    <h3>{m.name}</h3>
                    {m.title && <p>{m.title}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="carousel-dots" role="tablist" aria-label="Master slides">
            {masters.map((_, i) => (
              <button
                type="button"
                key={i}
                className={`dot ${i === masterIndex ? 'active' : ''}`}
                aria-label={`Go to slide ${i + 1}`}
                aria-selected={i === masterIndex}
                onClick={() => setMasterIndex(i)}
              />
            ))}
          </div>

          <button
            type="button"
            className="carousel-btn next"
            aria-label="Next"
            onClick={() => setMasterIndex((i) => (i + 1) % masters.length)}
          >
            ›
          </button>
        </div>
      </section>
      <section className="orientation-section" ref={orientationRef}>
        <h2 className="orientation-title">Orientation Sessions</h2>
        {orientationVideos.length > 3 ? (
          <div className="orientation-carousel">
            <button
              type="button"
              className="carousel-btn prev"
              aria-label="Previous orientation video"
              onClick={() => setOrientIndex((i) => (i - 1 + orientationVideos.length) % orientationVideos.length)}
            >
              ‹
            </button>
            <div
              className="orientation-viewport"
              ref={orientViewportRef}
              tabIndex={0}
              aria-roledescription="carousel"
              aria-label="Orientation videos"
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') {
                  setOrientIndex((i) => (i - 1 + orientationVideos.length) % orientationVideos.length);
                }
                if (e.key === 'ArrowRight') {
                  setOrientIndex((i) => (i + 1) % orientationVideos.length);
                }
              }}
            >
              <div id="orientation-track" className="orientation-track">
                {orientationVideos.map((v, i) => (
                  <div
                    key={i}
                    className={`orientation-slide ${i === orientIndex ? 'active' : ''}`}
                    ref={(el) => (orientSlideRefs.current[i] = el)}
                  >
                    <a
                      className="video-card"
                      href={`https://www.youtube.com/watch?v=${v.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${v.title} (opens on YouTube)`}
                    >
                      <div className="thumb-wrap">
                        <img
                          src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                          alt={v.title}
                          className="video-thumb"
                          loading="lazy"
                        />
                        <div className="play-badge">▶</div>
                      </div>
                      <div className="video-meta">
                        <h3 className="video-title">{v.title}</h3>
                        <span className="video-cta">Watch on YouTube</span>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              className="carousel-btn next"
              aria-label="Next orientation video"
              onClick={() => setOrientIndex((i) => (i + 1) % orientationVideos.length)}
            >
              ›
            </button>
            <div className="carousel-dots" role="tablist" aria-label="Orientation slides">
              {orientationVideos.map((_, i) => (
                <button
                  type="button"
                  key={i}
                  className={`dot ${i === orientIndex ? 'active' : ''}`}
                  aria-label={`Go to orientation slide ${i + 1}`}
                  aria-selected={i === orientIndex}
                  onClick={() => setOrientIndex(i)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="orientation-grid">
            {orientationVideos.map((v, i) => (
              <a
                key={i}
                className="video-card"
                href={`https://www.youtube.com/watch?v=${v.id}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${v.title} (opens on YouTube)`}
              >
                <div className="thumb-wrap">
                  <img
                    src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                    alt={v.title}
                    className="video-thumb"
                    loading="lazy"
                  />
                  <div className="play-badge">▶</div>
                </div>
                <div className="video-meta">
                  <h3 className="video-title">{v.title}</h3>
                  <span className="video-cta">Watch on YouTube</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
      </section>
      <section className="latest-updates-section">
        <h2 className="latest-updates-title">Latest Updates</h2>
        <div className="ticker-wrapper" aria-label="Latest updates ticker" role="region">
          <div className="ticker">
            <div className="ticker-track">
              {updates.map((update, i) => (
                <div key={i} className="ticker-item">
                  <strong>{update.title}</strong> &mdash; <time dateTime={update.date}>{update.date}</time>
                </div>
              ))}
              {updates.map((update, i) => (
                <div key={`dup-${i}`} className="ticker-item">
                  <strong>{update.title}</strong> &mdash; <time dateTime={update.date}>{update.date}</time>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="faqs-section" aria-label="Frequently Asked Questions">
        <h2 className="faqs-title">FAQs</h2>
        <div className="faqs-list">
          {faqs.map((item, idx) => (
            <details key={idx} className="faq-item">
              <summary className="faq-question">
                <span>{item.q}</span>
                <span className="faq-icon" aria-hidden>+</span>
              </summary>
              <div className="faq-answer">{item.a}</div>
            </details>
          ))}
        </div>
      </section>
      <section className="empty" >
        <div className="empty-content">
        &nbsp;&nbsp;&nbsp;&nbsp;<h5>12346767</h5>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default APPSC;