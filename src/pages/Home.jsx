// src/Home.jsx
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "./Home.css";


// --- Social Proof Popup Component ---
const SocialProofPopup = ({ message, isVisible }) => {
  return (
    <div className={`social-proof-popup ${isVisible ? "show" : ""}`}>
      <span role="img" aria-label="notification">🔔</span> {message}
    </div>
  );
};

// --- Static Data outside the component ---
const socialProofMessages = [
  "Pavan just registered for the Test Series!",
  "Sivaram recently joined our Mentorship Program!",
  "Anusha enrolled in the UPSC Foundation Course!",
  "Rohit signed up for APPSC Group 1 Coaching!",
  "Deepika registered for TSPSC Test Series!",
  "Karthik enrolled in Mains Answer Writing!",
  "Pooja just started with our Prelims Course!",
  "Vikram registered for Optional Subject Coaching!",
  "Divya recently subscribed to Daily Current Affairs!",
  "Rahul joined the Interview Guidance Program!",
];
// --- End Static Data ---


const sliderImages = [
  "https://static.pw.live/5eb393ee95fab7468a79d189/GLOBAL_CMS/112e0a62-cde1-4740-94f3-f11d1c4b2858.webp",
  "https://static.pw.live/5eb393ee95fab7468a79d189/GLOBAL_CMS/6455a514-59c7-46dd-9358-5af3a2e25cd3.webp",
  "https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/a20d6132-cd8c-413f-bb02-9e1b46586180.webp",
  "https://static.pw.live/5eb393ee95fab7468a79d189/GLOBAL_CMS/42cddfad-7c73-4a15-abe9-e3544ad290b2.webp",
  "https://static.pw.live/5eb393ee95fab7468a79d189/GLOBAL_CMS/542a4905-b25e-4ed1-a35a-88ab6fa96287.jpg",
  "https://static.pw.live/5eb393ee95fab7468a79d189/GLOBAL_CMS/5069011b-cd13-483e-ac43-d0f7180cfc6c.jpg",
  "https://static.pw.live/5eb393ee95fab7468a79d189/GLOBAL_CMS/18adc383-0231-4846-b493-2d00022f1948.webp"
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("UPSC");
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderIntervalRef = useRef(null);

  // State and Refs for Social Proof Popup
  const [popupVisible, setPopupVisible] = useState(false);
  const [currentPopupMessageIndex, setCurrentPopupMessageIndex] = useState(0);
  const popupTimeoutRef = useRef(null);
  const popupIntervalRef = useRef(null);

  // Ref for Video Scroll Container
  const videoScrollContainerRef = useRef(null);

  const startSlider = () => {
    sliderIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
  };

  useEffect(() => {
    startSlider();
    return () => clearInterval(sliderIntervalRef.current);
  }, []);

  // Effect for Social Proof Popup Logic
  useEffect(() => {
    popupTimeoutRef.current = setTimeout(() => {
      setPopupVisible(true);
      popupIntervalRef.current = setInterval(() => {
        setPopupVisible(false);
        setTimeout(() => {
          setCurrentPopupMessageIndex(
            (prevIndex) => (prevIndex + 1) % socialProofMessages.length
          );
          setPopupVisible(true);
        }, 500);
      }, 5000);
    }, 4000);

    return () => {
      clearTimeout(popupTimeoutRef.current);
      clearInterval(popupIntervalRef.current);
    };
  }, []);


  // Effect for Video Auto-Scrolling
  useEffect(() => {
    const scrollContainer = videoScrollContainerRef.current;
    if (!scrollContainer) return;

    const scrollSpeed = 2; // Pixels per interval
    const scrollIntervalTime = 50; // Milliseconds per interval (faster interval, smoother scroll)

    let scrollHandler = setInterval(() => {
      if (scrollContainer.scrollLeft >= (scrollContainer.scrollWidth - scrollContainer.clientWidth)) {
        scrollContainer.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
      } else {
        scrollContainer.scrollLeft += scrollSpeed;
      }
    }, scrollIntervalTime);

    const handleMouseEnter = () => clearInterval(scrollHandler);
    const handleMouseLeave = () => {
        clearInterval(scrollHandler);
        scrollHandler = setInterval(() => {
            if (scrollContainer.scrollLeft >= (scrollContainer.scrollWidth - scrollContainer.clientWidth)) {
                scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                scrollContainer.scrollLeft += scrollSpeed;
            }
        }, scrollIntervalTime);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);


    return () => {
      clearInterval(scrollHandler);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);


  const courseContent = {
    UPSC: [
      {
        headline: "UPSC CSE Prelims Cum Mains Foundation Course 2025-26",
        image: "https://static.wixstatic.com/media/64ada7_487f6d1371e24761a8386a47f7b21344~mv2.jpg/v1/fill/w_493,h_266,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/website%20Thumbnail%20-%20UPSC%20CSE%202026-27%20PCM%20Classroom%20cum%20Mentorship%20Program.jpg", // Placeholder image URL
        price: "₹ 75,000",
        link: "https://drive.google.com/file/d/1JLbYbbgmHkkggHsItJAnt8M4R0z6Ntw3/view?usp=sharing" // Example link
      },
      {
        headline: "UPSC Prelims Test Series",
        image: "https://static.wixstatic.com/media/64ada7_c6481bbadfa0416cb8d25261a93cc327~mv2.jpg/v1/fill/w_493,h_266,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/UPSC-Sectional-Tests-Batch-2-learnyst-thumbnaiil.jpg", // Placeholder image URL
        price: "₹ 12,500",
        link: "/upsc-prelims-test-series" // Example link
      },
      {
        headline: "UPSC CSE Mains 2025-26 NAIPUNYATA+",
        image: "https://static.wixstatic.com/media/64ada7_211e17d8719c4c848107cfc31e5061b6~mv2.jpg/v1/fill/w_493,h_266,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/682b03d6f8791a16daa18cb0_UPSC-Naipunyata%2B-Answer-writing-program-%26-Mnetorship-program-2025.jpg",
        price: "₹ 45,000",
        link: "/upsc-optional-coaching"
      },
      {
        headline: "UPSC Mains Answer Writing",
        image: "https://static.wixstatic.com/media/64ada7_c46a1e4602294a948ef82784e500bad1~mv2.jpg/v1/fill/w_493,h_266,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/UPSC-CSE-Naipunyata-%2B-A-long-Term-Lernest-thambnil.jpg",
        price: "₹ 20,000",
        link: "/upsc-mains-writing"
      },
      {
        headline: "UPSC Foundation Course 2025",
        image: "https://static.wixstatic.com/media/64ada7_484709f091c04545a71634274e4b84e9~mv2.jpg/v1/fill/w_493,h_266,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/upsc-cse-classroom-program-leanyst-thumbnail%20(1).jpg", // Placeholder image URL
        price: "₹ 75,000",
        link: "/upsc-foundation-course" // Example link
      },
    ],
    APPSC: [
      {
        headline: "APPSC GROUP-I Prelims Cum Mains Test Series 2025",
        image: "https://static.wixstatic.com/media/64ada7_e7e080be52a6400b86b36595922aaa79~mv2.jpg/v1/fill/w_493,h_266,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Website%20Course%20Thumbnail%20-%20APPSC%20Group-1%20Mains%20Test%20Series%20with%20Mentorship%202025-26%20(1).jpg", // Placeholder image URL
        price: "₹ 20,000",
        link: "https://drive.google.com/file/d/1ql60q4bwANfn87pJbYxuKPCHZQ_K706g/view?usp=sharing"
      },
      {
        headline: "APPSC GROUP-I Prelims Cum Mains Classroom Program 2025",
        image: "https://static.wixstatic.com/media/64ada7_796f1a296f764885aaf6bb0714a5bc2c~mv2.jpg/v1/fill/w_493,h_266,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/APPSC-Group-1-PCM-Classes---Independance-Day-Offer-classplsu-banner.jpg", // Placeholder image URL
        price: "₹ 60,000",
        link: "/appsc-mock-tests"
      },
      {
        headline: "APPSC GROUP-I Prelims Cum Mains Classroom Program 2025",
        image: "https://static.wixstatic.com/media/64ada7_796f1a296f764885aaf6bb0714a5bc2c~mv2.jpg/v1/fill/w_493,h_266,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/APPSC-Group-1-PCM-Classes---Independance-Day-Offer-classplsu-banner.jpg", // Placeholder image URL
        price: "₹ 60,000",
        link: "/appsc-mock-tests"
      },
      {
        headline: "AP High Court 2025 Group-C Vacancies Full Length Mock Tests",
        image: "https://static.wixstatic.com/media/64ada7_7128c7e496974b93a9cf82f6ca2baa97~mv2.jpg/v1/fill/w_1016,h_572,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/AP-High-Court-Group-C-Full-Length-Mock-Tests-learnyst-thumbnail.jpg",
        price: "₹ 5,000",
        link: "/appsc-current-affairs"
      },
    ],
    TSPSC: [
      {
        headline: "TGPSC GROUP-I Prelims Cum Mains Classroom Program 2025",
        image: "https://static.wixstatic.com/media/64ada7_664fdd317c004fe686bcdc9599a7c900~mv2.jpg/v1/fill/w_493,h_266,al_c,lg_1,q_80,enc_avif,quality_auto/TGPSC-Group-1-PCM-Classes-2025-Independence-day-offer-classplus-thumbnail%20(1).jpg", // Placeholder image URL
        price: "₹ 55,000",
        link: "/tspsc-group-classes"
      },
      {
        headline: "TGPSC GROUP-I 2025 Mains Test Series & Mentorship Program",
        image: "https://static.wixstatic.com/media/64ada7_196e22f0be03478aa06e37d6b8bfe841~mv2.jpg/v1/fill/w_493,h_266,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/680b6a2300010317b28c907b_TGPSC-Group1-Mains-Test-Series-learnyst-thumbnail-p-800.jpg", // Placeholder image URL
        price: "₹ 8,000",
        link: "/tspsc-exam-series"
      },
      {
        headline: "TGPSC GROUP–2 150 Days Sectional Test Series 2025 Batch -3",
        image: "https://static.wixstatic.com/media/64ada7_503be21a4a8747108329f52e754ded91~mv2.jpg/v1/fill/w_493,h_266,al_c,lg_1,q_80,enc_avif,quality_auto/TSPSC-Group-2-150-Days-sectional-test-series-Batch-3-classplus-thumbnail.jpg",
        price: "₹ 15,000",
        link: "/ts-history-culture"
      },
      {
        headline: "APPSC GROUP-I Prelims Cum Mains Classroom Program 2025",
        image: "https://static.wixstatic.com/media/64ada7_796f1a296f764885aaf6bb0714a5bc2c~mv2.jpg/v1/fill/w_493,h_266,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/APPSC-Group-1-PCM-Classes---Independance-Day-Offer-classplsu-banner.jpg", // Placeholder image URL
        price: "₹ 60,000",
        link: "/appsc-mock-tests"
      },
    ],
  };

  const videoIds = [
    "c8B4tq0A3iA", // Example dummy ID 1
    "P_S2F1pL6cI", // Example dummy ID 2
    "c8B4tq0A3iA", // Repeat for demonstration of scrolling
    "P_S2F1pL6cI"
  ];

  
  const whyChooseUsFeatures = [
    { title: "Reverse Engineering Technique", description: "Learn from seasoned educators and civil service experts." },
    { title: "Comprehensive Study Material", description: "Access meticulously crafted notes and resources." },
    { title: "Personalized Mentorship", description: "Receive one-on-one guidance and doubt clarification." },
    { title: "Regular Mock Tests", description: "Evaluate your progress with frequent and detailed assessments." },
    { title: "State-of-the-Art Facilities", description: "Study in a comfortable and technologically equipped environment." },
    { title: "Proven Track Record", description: "Join a legacy of successful civil service aspirants." },
  ];

  const toppers = [
    { name: "N. Sai Krishna", rank: "UPSC CSE 2024, Rank 12", img: "data:image/jpeg;base64,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" },
    { name: "A. Srilakshmi", rank: "APPSC Group 1, Rank 3", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtDoZys8qSc47jkRFl3JUMh_BxkMe95TX6cQ&s" },
    { name: "K. Rahul", rank: "TSPSC Group 2, Rank 5", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfTaLlgEAlX-fwui2f1X5BmmzS_utL_fWD5A&s" },
    { name: "P. Ganesh", rank: "UPSC CSE 2023, Rank 25", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrlRZpOd8AxqUz2ep_DWSnV4k45XvGj0juOg&s" },
  ];

  const testimonials = [
    { text: "Civic Centre IAS provided unparalleled guidance. The faculty support and comprehensive test series were instrumental in my success. Highly recommended!", author: "Priya Sharma, UPSC CSE Aspirant" },
    { text: "The APPSC coaching at Civic Centre IAS is truly exceptional. Their focus on conceptual clarity helped me clear the exam with confidence.", author: "Rajesh Kumar, APPSC Group 1 Officer" },
    { text: "From daily classes to doubt clearing sessions, every aspect of TSPSC preparation was covered thoroughly. A great academy!", author: "Sangeetha Rao, TSPSC Group 2 Recruit" },
    
  ];


  return (
    <div className="home-main-container">
      <Navbar />
    <section className="base-home">
      {/* Hero Section with Slider */}
      <section className="hero-section">
        <div className="image-slider">
          <div
            className="slides"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            onMouseEnter={() => clearInterval(sliderIntervalRef.current)}
            onMouseLeave={startSlider}
          >
            {sliderImages.map((src, idx) => (
              <img key={idx} src={src} alt={`Banner ${idx + 1}`} loading="lazy" />
            ))}
          </div>
          <div className="dots">
            {sliderImages.map((_, idx) => (
              <button
                key={idx}
                className={currentSlide === idx ? "dot active-dot" : "dot"}
                onClick={() => setCurrentSlide(idx)}
              />
            ))}
          </div>
        </div>
      </section>
      {/* IAS Academy Box Navigation and Courses */}
      <section className="ias-academy-layout-section">
        <div className="academy-navbar">
          Free Sources
        </div>
        <div className="academy-courses-row">
          <div className="academy-course-box">APPSC Latest IUpdates</div>
          <div className="academy-course-box">TGPSC Latest Updates</div>
          <div className="academy-course-box">Monthly Current Affairs</div>
          <div className="academy-course-box">Latest Updates</div>
        </div>
      </section>


      {/* Course Tabs Section */}
      <section className="course-tabs-section section-padding bg-light-gray">
        <div className="container">
          <h2>Our Comprehensive Programs</h2>
          <div className="tab-header">
            {Object.keys(courseContent).map((tab) => (
              <button
                key={tab}
                className={`tab-button ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab && (
            <div className="tab-content">
              {/* Changed class name for styling */}
              <div className="course-grid-visual">
                {courseContent
                  ?.[activeTab]?.map((course, index) => (
                    <div key={index} className="course-card-visual">
                      <img
                        src={course.image}
                        alt={course.headline}
                        className="course-image"
                        loading="lazy"
                      />
                      <h3 className="course-headline">{course.headline}</h3>
                      <div className="course-actions">
                        {/* Using <a> for navigation, can be <button> if handled with React Router */}
                        <a href={course.link} className="btn-secondary btn-explore">
                          Explore Now
                        </a>
                        <p className="course-price">{course.price}</p>
                      </div>
                    </div>
                  ))}
              </div>
              {/* Removed the old course-features-list as per your request to replace */}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us-section section-padding">
        <div className="container">
          <h2>Why Choose Civic Centre IAS?</h2>
          <div className="features-grid">
            {whyChooseUsFeatures.map((feature, index) => (
              <div key={index} className="feature-card-item">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Highlights */}
      <section className="program-highlights-section section-padding">
        <div className="container">
          <h2>Our Flagship Programs</h2>
          <div className="program-card-grid">
            {Object.keys(courseContent).map((course) => (
              <div key={course} className="program-highlight-card">
                <h3>{course}</h3>
                <p>
                  Comprehensive preparation for {course} exams including Prelims,
                  Mains, and Mock Tests, designed for aspiring civil servants in {course === "UPSC" ? "India" : "Telangana and Andhra Pradesh"}.
                </p>
                <button className="btn-small">Learn More</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Test Series */}
      <section className="test-series-section section-padding bg-light-gray">
        <div className="container">
          <h2>Test Series & Mock Features</h2>
          <div className="feature-details">
            <p>Our meticulously designed test series offers:</p>
            <ul>
                <li>Detailed performance analytics and progress dashboards.</li>
                <li>All India Ranking system to assess your competitive standing.</li>
                <li>Comprehensive solutions and explanations for every question.</li>
                <li>Timed tests to simulate actual exam conditions.</li>
                <li>Sectional and full-length mock tests for complete coverage.</li>
            </ul>
            <button className="btn-primary">Explore Test Series</button>
          </div>
        </div>
      </section>

      {/* Latest Videos */}
      <section className="video-section section-padding">
        <div className="container">
          <h2>Latest Insights & Updates</h2>
        </div>
        <div className="video-scroll-container" ref={videoScrollContainerRef}>
          <div className="video-track">
            {videoIds.map((id, index) => (
              <div className="video-card" key={index}>
                <iframe
                  src={`https://www.youtube.com/embed/${id}?autoplay=0&mute=1&loop=1&playlist=${id}&controls=1`}
                  title={`YouTube Video ${index + 1}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results / Toppers */}
      <section className="results-wall-section section-padding bg-light-gray">
        <div className="container">
          <h2>Our Achievers: Walls of Success</h2>
          <div className="results-grid">
            {toppers.map((topper, index) => (
              <div key={index} className="result-item">
                <img src={topper.img} alt={`Topper ${topper.name}`} />
                <h3>{topper.name}</h3>
                <p>{topper.rank}</p>
              </div>
            ))}
          </div>
          <button className="btn-primary" style={{marginTop: "30px"}}>View All Results</button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section section-padding">
        <div className="container">
          <h2>What Our Students Say</h2>
        </div>
        <div className="testimonial-carousel">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <p>"{testimonial.text}"</p>
              <h4>- {testimonial.author}</h4>
            </div>
          ))}
        </div>
        <div className="container">
          <button className="btn-secondary" style={{marginTop: "30px"}}>Read More Testimonials</button>
        </div>
      </section>

      {/* Technology */}
      <section className="technology-section section-padding bg-light-gray">
        <div className="container">
          <h2>Our Technology-Driven Learning Platform</h2>
          <div className="tech-features-grid">
            <div className="tech-item">
                <h3>Interactive Live Classes</h3>
                <p>Engage with faculty in real-time with Q&A features.</p>
            </div>
            <div className="tech-item">
                <h3>Personalized Dashboard</h3>
                <p>Track your progress, assignments, and test scores.</p>
            </div>
            <div className="tech-item">
                <h3>Mobile App Access</h3>
                <p>Learn on the go with our dedicated Android/iOS application.</p>
            </div>
            <div className="tech-item">
                <h3>Rich Content Library</h3>
                <p>Access recorded lectures, e-books, and current affairs capsules.</p>
            </div>
          </div>
          <button className="btn-primary" style={{marginTop: "30px"}}>Discover Our Platform</button>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section section-padding">
        <div className="container">
          <h2>Get In Touch</h2>
          <p className="contact-intro-text">We'd love to hear from you. Fill out the form below or reach us directly.</p>
          <div className="contact-details-and-form">
            <div className="contact-details">
                <h3>Civic Centre IAS </h3>
                <p><strong>Address:</strong> Flat No: 204, 2nd Floor, Sai Datta Residency, Above Union Bank of India, Ashok Nagar X Roads, RTC X Roads, Hyderabad, Telangana 500020</p>
                <p><strong>Phone:</strong> +91 98765 43210</p>
                <p><strong>Email:</strong> info@civiccentreias.com</p>
                <p><strong>Working Hours:</strong> Mon - Sat: 9 AM - 7 PM</p>
                  <div className="map-placeholder">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.669812735749!2d78.49079557497262!3d17.42761370169165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bce2562479e0001%3A0xc3f5f3e4d9b4b9e2!2sRTC%20X%20Roads!5e0!3m2!1sen!2sin!4v1678901234567!5m2!1sen!2sin0" // Example Google Maps embed URL
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Civic Centre IAS Location"
                    ></iframe>
                </div>
            </div>
            <form className="contact-form">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <input type="tel" placeholder="Your Phone Number" />
              <textarea placeholder="Message" rows="5" required></textarea>
              <button type="submit" className="btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919876543210"
        className="floating-whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        💬
      </a>

      {/* Social Proof Popup Render */}
      <SocialProofPopup
        message={socialProofMessages[currentPopupMessageIndex]}
        isVisible={popupVisible}
      />

    </section>
      <Footer />
    </div>
  );
}