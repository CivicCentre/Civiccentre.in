import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Chatbot from "../../Components/Chatbot";
import "./testseries.css";

const CourseCard = ({
  title = "SSC CGL Complete Course 2025",
  subtitle = "Tier I & Tier II",
  price = "₹1,999",
  oldPrice = "₹3,499",
  savingsNote = "Limited time offer",
  ctaText = "Buy Now",
  onBuy = () => {},
}) => (
  <div className="course-card" role="complementary" aria-label="Course purchase card">
    <div className="course-card-header">
      <h3 className="course-title">{title}</h3>
      <p className="course-subtitle">{subtitle}</p>
    </div>
    <div className="course-price-row">
      <span className="price-current" aria-label="Current price">{price}</span>
      {oldPrice && <span className="price-old" aria-label="Original price">{oldPrice}</span>}
    </div>
    {savingsNote && <div className="course-savings">{savingsNote}</div>}
    <ul className="course-includes">
      <li>Full syllabus coverage</li>
      <li>All Test Series access</li>
      <li>Doubt support</li>
    </ul>
    <button className="btn buy-btn" onClick={onBuy} aria-label="Buy course">
      {ctaText}
    </button>
  </div>
);

const TestSeries = () => {
  const [activeTab, setActiveTab] = useState("test-series");

  // Sync selected tab with URL hash (#tab-id) and handle browser navigation
  const setTabAndHash = (id) => {
    setActiveTab(id);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.hash = id;
      window.history.replaceState({}, '', url);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // On mount, read hash
    const initial = window.location.hash?.replace('#', '');
    if (initial && ["test-series","mock-tests","previous-papers","syllabus","faqs"].includes(initial)) {
      setActiveTab(initial);
    }
    const onHashChange = () => {
      const current = window.location.hash?.replace('#', '');
      if (current && current !== activeTab) {
        setActiveTab(current);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [activeTab]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (activeTab === 'faqs') {
      const el = document.getElementById('faqs');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeTab]);

  const tabs = [
    { id: "test-series", label: "Test Series" },
    { id: "mock-tests", label: "Mock Tests" },
    { id: "previous-papers", label: "Previous Year Papers" },
    { id: "syllabus", label: "Syllabus" },
  ];

  const onKeyDownTab = (e, index) => {
    const lastIndex = tabs.length - 1;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = index === lastIndex ? 0 : index + 1;
      setActiveTab(tabs[next].id);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = index === 0 ? lastIndex : index - 1;
      setActiveTab(tabs[prev].id);
    }
  };

  return (
    <div className="testseries">
      <Navbar />
      <Chatbot />
      <div className="testseries-content">
        <section id="hero" className="hero">
          <div className="hero-content">
            <div className="hero-text">
              <h1>UPSSSC PET 2025 Test Series</h1>
              <p>Prepare for your exams with our comprehensive test series.</p>
              <div className="hero-stats">
                <div><strong>25</strong> Tests</div>
                <div><strong>1500+</strong> Users</div>
                <div><strong>2</strong> Languages</div>
              </div>
              <ul className="hero-features">
                <li>Detailed solutions for every question</li>
                <li>Performance analysis and ranking</li>
                <li>Accessible on all devices</li>
                <li>Based on latest exam pattern</li>
              </ul>
            </div>
          </div>
          <div className="hero-course-card">
            <CourseCard />
          </div>
        </section>
        <section className="tabs-section">
          <div
            className="tabs"
            role="tablist"
            aria-label="Test series sections"
          >
            {tabs.map((t, i) => (
              <button
                key={t.id}
                role="tab"
                id={`tab-${t.id}`}
                aria-controls={`panel-${t.id}`}
                aria-selected={activeTab === t.id}
                tabIndex={activeTab === t.id ? 0 : -1}
                className={`tab ${activeTab === t.id ? "active" : ""}`}
                onClick={() => setTabAndHash(t.id)}
                onKeyDown={(e) => onKeyDownTab(e, i)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Panels */}
          <div className="tab-panels">
            {/* Test Series */}
            {activeTab === "test-series" && (
              <div
                role="tabpanel"
                id="panel-test-series"
                aria-labelledby="tab-test-series"
                className="tab-panel"
              >
                <h2>All Test Series</h2>
                <p>Explore full-length and sectional tests with detailed solutions and performance analytics.</p>
                {/* Replace below with your actual component/list */}
                <div className="grid-cards">
                  <div className="card">Full Length Test 1</div>
                  <div className="card">Full Length Test 2</div>
                  <div className="card">Sectional Test - Quant</div>
                </div>
              </div>
            )}

            {/* Mock Tests */}
            {activeTab === "mock-tests" && (
              <div
                role="tabpanel"
                id="panel-mock-tests"
                aria-labelledby="tab-mock-tests"
                className="tab-panel"
              >
                <h2>Mock Tests</h2>
                <p>Timed exam-like simulations with rank, percentile, and question-wise analysis.</p>
                <div className="grid-cards">
                  <div className="card">Grand Mock 1</div>
                  <div className="card">Grand Mock 2</div>
                  <div className="card">Grand Mock 3</div>
                </div>
              </div>
            )}

            {/* Previous Year Papers */}
            {activeTab === "previous-papers" && (
              <div
                role="tabpanel"
                id="panel-previous-papers"
                aria-labelledby="tab-previous-papers"
                className="tab-panel"
              >
                <h2>Previous Year Papers</h2>
                <p>Practice with authentic past papers and compare patterns across years.</p>
                <ul className="list">
                  <li>UPSSSC PET 2024 (Shift 1)</li>
                  <li>UPSSSC PET 2023 (Shift 2)</li>
                  <li>UPSSSC PET 2022 (Consolidated)</li>
                </ul>
              </div>
            )}

            {/* Syllabus */}
            {activeTab === "syllabus" && (
              <div
                role="tabpanel"
                id="panel-syllabus"
                aria-labelledby="tab-syllabus"
                className="tab-panel"
              >
                <h2>Syllabus</h2>
                <p>Topic-wise breakdown with weightage to help you prioritize your study plan.</p>
                <div className="grid-two">
                  <div>
                    <h3>General Studies</h3>
                    <ul className="list">
                      <li>Indian History</li>
                      <li>Geography</li>
                      <li>Polity & Economy</li>
                    </ul>
                  </div>
                  <div>
                    <h3>Reasoning & Quant</h3>
                    <ul className="list">
                      <li>Arithmetic</li>
                      <li>Data Interpretation</li>
                      <li>Logical Reasoning</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "faqs" && (
              <div
                role="tabpanel"
                id="panel-faqs"
                aria-labelledby="tab-faqs"
                className="tab-panel"
              >
                <p className="muted">Scrolling to FAQs…</p>
              </div>
            )}
          </div>
        </section>
        <section id="details" className="details-section">
            <div className="details-content">
                <h2>Why Choose Our Test Series?</h2>
                <p>We provide a comprehensive and structured approach to help you excel in your exams.</p>
                <ul className="details-list">
                <li>Expert-curated content</li>
                <li>Regular updates based on exam patterns</li>
                <li>24/7 doubt support via our community</li>
                <li>Performance tracking and personalized feedback</li>
                </ul>
            </div>
            <div className="details-image">
                <img src="https://via.placeholder.com/600x400" alt="Test Series Details" />
            </div>
        </section>
        <section id="faqs" className="faq-section">
            <h2>FAQs</h2>
            <div className="faqs-content">
                <div className="faq-item">
                <h3>What is included in the test series?</h3>
                <p>Our test series includes full-length tests, sectional tests, and mock exams with detailed solutions.</p>
                </div>
                <div className="faq-item">
                <h3>How can I access the test series?</h3>
                <p>You can access the test series through our website after purchasing the course.</p>
                </div>
                <div className="faq-item">
                <h3>Is there any doubt support available?</h3>
                <p>Yes, we provide 24/7 doubt support through our community forums and chat.</p>
                </div>
            </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
export default TestSeries;