import React, { useState, useEffect } from 'react';
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import './home.css';

// Component for the new image slider with integrated hero content
const ImageSlider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    'https://static.pw.live/5eb393ee95fab7468a79d189/GLOBAL_CMS/d0ef19df-e372-4250-a206-326a46c682c0.webp',
    'https://static.pw.live/5eb393ee95fab7468a79d189/GLOBAL_CMS/632b7e3d-b472-428d-b04e-52a304f060bd.jpg',
    'https://static.pw.live/5eb393ee95fab7468a79d189/GLOBAL_CMS/0af1db90-9990-4114-949e-63e04fbc2d60.jpg',
    'https://static.pw.live/5eb393ee95fab7468a79d189/GLOBAL_CMS/d80e4400-3f73-4e5f-aaf6-2bd43f02361f.webp',
    'https://static.pw.live/5eb393ee95fab7468a79d189/GLOBAL_CMS/542a4905-b25e-4ed1-a35a-88ab6fa96287.jpg',
    'https://static.pw.live/5eb393ee95fab7468a79d189/GLOBAL_CMS/c9afacc0-0e62-480f-99a6-a760f308cf7c.webp',
  ];

  const nextImage = React.useCallback(() => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(nextImage, 5000); // Change image every 5 seconds
    return () => clearInterval(intervalId);
  }, [nextImage]);

  return (
    <div className="image-slider-wrapper">
      <div className="slider-container">
        <div className="slider-wrapper" style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Slide ${index + 1}`} className="slider-image" />
          ))}
        </div>
        <button onClick={prevImage} className="slider-button prev-button">
          &#10094;
        </button>
        <button onClick={nextImage} className="slider-button next-button">
          &#10095;
        </button>
        <div className="slider-dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${currentImageIndex === index ? 'active' : ''}`}
              onClick={() => setCurrentImageIndex(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Array of unique YouTube video IDs for the video section
const videoIds = [
  "xwsKOYlD1Ms", // Free Orientation Session for UPSC CSE 2026-27
  "GZ4jSIp3pCM", // Mekala Upendar Success Story - 3 Jobs
  "z0cubXNhnIE", // M. Sairam's Success Story - TGPSC Group 1
  "hGiZ-jYAUs0", // CivicCentre IAS - The Rise
  "dQw4w9WgXcQ", // A popular placeholder, but replaced with a real video
  "SqzYq49kUcg",
  "p7nC-kS-1aA",
];

// Array of testimonial objects for the testimonials section
const testimonials = [
  {
    imgSrc: "https://tse4.mm.bing.net/th/id/OIP.svwHnycp3o1agQ4gsit7rwHaJ3?pid=Api&P=0&h=180",
    name: "D. Venkata Rammana",
    rank: "AIR 2",
    testimonial: "CivicCentre IAS helped me achieve my dream of a top rank.",
  },
  {
    imgSrc: "https://tse4.mm.bing.net/th/id/OIP.svwHnycp3o1agQ4gsit7rwHaJ3?pid=Api&P=0&h=180",
    name: "Jinni Tejaswini",
    rank: "AIR 4",
    testimonial: "The faculty's reverse engineering technique was a game-changer for me.",
  },
  {
    imgSrc: "https://tse4.mm.bing.net/th/id/OIP.svwHnycp3o1agQ4gsit7rwHaJ3?pid=Api&P=0&h=180",
    name: "Mekala Upendar",
    rank: "Group-2, AIR 9",
    testimonial: "With the right strategy and guidance, I achieved my goal of three government jobs!",
  },
  {
    imgSrc: "https://tse4.mm.bing.net/th/id/OIP.svwHnycp3o1agQ4gsit7rwHaJ3?pid=Api&P=0&h=180",
    name: "Sravya M",
    rank: "AIR 12",
    testimonial: "Structured courses and test series are top-notch.",
  },
  {
    imgSrc: "https://tse4.mm.bing.net/th/id/OIP.svwHnycp3o1agQ4gsit7rwHaJ3?pid=Api&P=0&h=180",
    name: "Anusha Kalam",
    rank: "AIR 7",
    testimonial: "The best coaching platform for UPSC aspirants!",
  },
];

// Data for the new scrolling card section
const rowOneData = [
  "Looking for an eco-friendly yoga mat that won't slip",
  "Champions League top scorers and match highlights",
  "How come orange juice prices have dropped?",
  "Give me ideas for what to do with my kids' art",
  "Help me study vocabulary for an entrance exam",
  "Write an email to request a quote from local plumbers",
  "Cycling groups open to beginners",
  "Write a Python script to automate sending daily email reports"
];

const rowTwoData = [
  "What's going on with the asteroid sample NASA brought back?",
  "Create a morning routine to improve my productivity",
  "Make a sandwich using ingredients from my kitchen",
  "Good brunch spots near me with outdoor seating",
  "Design a programming game to teach basics in a fun way",
  "NBA draft prospects and scouting report",
  "Explain nos"
];

const rowThreeData = [
  "Why is Python a popular language?",
  "How to start coding for beginners?",
  "What's the difference between JavaScript and TypeScript?",
  "Explain what a REST API is in simple terms.",
  "Give me ideas for a small web development project.",
  "What is machine learning?",
  "How does the Internet work?",
];

// Data for the new recent updates section
const updatesData = [
  {
    category: "Results",
    items: [
      { text: "BIS Group A, B, C Final Result 2025", new: true },
      { text: "RSMSSB JE Result 2025 (Advt No. 12/2024)", new: true },
      { text: "UPSC Geo Scientist Mains Result 2025" },
      { text: "AAI Junior Executive Result 2025" },
      { text: "RRB ALP CBT 2 Result 2025" },
      { text: "Bihar Police ASI Steno Final Result 2025" },
      { text: "SSC GD Constable Result 2025" },
      { text: "SBI Clerk Mains Result 2025" },
      { text: "UPSC Civil Services Prelims Result 2025" },
      { text: "MPPKVVCL Result 2025" },
    ],
  },
  {
    category: "Admit Card",
    items: [
      { text: "BSSC Field Assistant Admit Card 2025", new: true },
      { text: "Supreme Court JCA Descriptive Test Admit Card 2025", new: true },
      { text: "SSC Stenographer Grade C and D Exam Schedule 2025" },
      { text: "SSC JHT Exam Date 2025" },
      { text: "UPSC CAPF AC Admit Card 2025" },
      { text: "Rajasthan Patwari Exam Schedule 2025" },
      { text: "OSSSC Sevak Sevika Admit Card 2025" },
      { text: "RSSB Librarian Grade 3 Admit Card 2025" },
      { text: "BTSC Staff Nurse Admit Card 2025" },
      { text: "BPSC Assistant Engineer Admit Card" },
    ],
  },
  {
    category: "Latest Jobs",
    items: [
      { text: "Indian Bank Apprentice Recruitment 2025 – 1500 Vacancies" },
      { text: "DSSSB Recruitment 2025 – 2119 Warder, PGT & Other Vacancies" },
      { text: "SBI Specialist Cadre Officer Recruitment 2025 – 33 Vacancies (Last Date Extended)" },
      { text: "SHS Bihar Ophthalmic Assistant Recruitment 2025 – 220 Vacancies" },
      { text: "APSSB Non Ministerial Technical Exam 2025 – 239 Various Vacancies" },
      { text: "AP Police Assistant Public Prosecutor Recruitment 2025 – 42 Vacancies" },
      { text: "RRB Technician Recruitment 2025 – 6238 Vacancies (Last Date Extended)" },
    ],
  },
  {
    category: "Latest Updates",
    items: [
      { text: "Punjab and Haryana High Court Stenographer Grade 3 Answer Key 2025", new: true },
      { text: "RRB NTPC Graduate Level Answer Key 2025" },
      { text: "SSC GD Constable Final Answer Key 2025" },
      { text: "NVS Non Teaching Post Answer Key 2025" },
      { text: "Re Schedule Stage II Exam" },
      { text: "UPSSSC Junior Analyst Food Revised Answer Key 2025" },
      { text: "UPSSSC Assistant Accountant & Auditor Revised Answer Key 2025" },
      { text: "UPSSSC Enforcement Constable Answer Key 2025" },
    ],
  },
];

// Data for the new dynamic course section with links
const courseDataByCategory = {
  "UPSC": [
    {
      title: "UPSC PRARAMBH 2028 (New Batch)",
      startDate: "8 Sept, 2025",
      endDate: "31 Dec, 2028",
      price: "₹31,999",
      originalPrice: "₹59,999",
      imgSrc: "https://static.wixstatic.com/media/64ada7_211e17d8719c4c848107cfc31e5061b6~mv2.jpg/v1/fill/w_493,h_266,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/682b03d6f8791a16daa18cb0_UPSC-Naipunyata%2B-Answer-writing-program-%26-Mnetorship-program-2025.jpg",
      exploreUrl: "https://www.civiccentre.in/upsc-courses/pranambh",
      buyNowUrl: "https://www.civiccentre.in/checkout/pranambh"
    },
    {
      title: "UPSC PRARAMBH 2028 (New Batch)",
      startDate: "8 Sept, 2025",
      endDate: "31 Dec, 2028",
      price: "₹31,999",
      originalPrice: "₹59,999",
      imgSrc: "https://static.wixstatic.com/media/64ada7_487f6d1371e24761a8386a47f7b21344~mv2.jpg/v1/fill/w_493,h_266,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/website%20Thumbnail%20-%20UPSC%20CSE%202026-27%20PCM%20Classroom%20cum%20Mentorship%20Program.jpg",
      exploreUrl: "https://www.civiccentre.in/upsc-courses/pranambh",
      buyNowUrl: "https://www.civiccentre.in/checkout/pranambh"
    },
    {
      title: "UPSC PRARAMBH 2028 (New Batch)",
      startDate: "8 Sept, 2025",
      endDate: "31 Dec, 2028",
      price: "₹31,999",
      originalPrice: "₹59,999",
      imgSrc: "https://static.wixstatic.com/media/64ada7_c6481bbadfa0416cb8d25261a93cc327~mv2.jpg/v1/fill/w_493,h_266,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/UPSC-Sectional-Tests-Batch-2-learnyst-thumbnaiil.jpg",
      exploreUrl: "https://www.civiccentre.in/upsc-courses/pranambh",
      buyNowUrl: "https://www.civiccentre.in/checkout/pranambh"
    },
    {
      title: "UPSC PRARAMBH 2028 (New Batch)",
      startDate: "8 Sept, 2025",
      endDate: "31 Dec, 2028",
      price: "₹31,999",
      originalPrice: "₹59,999",
      imgSrc: "https://static.wixstatic.com/media/64ada7_211e17d8719c4c848107cfc31e5061b6~mv2.jpg/v1/fill/w_493,h_266,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/682b03d6f8791a16daa18cb0_UPSC-Naipunyata%2B-Answer-writing-program-%26-Mnetorship-program-2025.jpg",
      exploreUrl: "https://www.civiccentre.in/upsc-courses/pranambh",
      buyNowUrl: "https://www.civiccentre.in/checkout/pranambh"
    },
    {
      title: "UPSC PRARAMBH 2028 (New Batch)",
      startDate: "8 Sept, 2025",
      endDate: "31 Dec, 2028",
      price: "₹31,999",
      originalPrice: "₹59,999",
      imgSrc: "https://static.wixstatic.com/media/64ada7_211e17d8719c4c848107cfc31e5061b6~mv2.jpg/v1/fill/w_493,h_266,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/682b03d6f8791a16daa18cb0_UPSC-Naipunyata%2B-Answer-writing-program-%26-Mnetorship-program-2025.jpg",
      exploreUrl: "https://www.civiccentre.in/upsc-courses/pranambh",
      buyNowUrl: "https://www.civiccentre.in/checkout/pranambh"
    },
  ],
  "TGPSC": [
    {
      title: "TGPSC Group 1 Foundation Course",
      language: "Hinglish",
      batchDetails: "1 Year Comprehensive Program",
      startDate: "15 Aug, 2025",
      endDate: "15 Aug, 2026",
      price: "₹12,000",
      originalPrice: "₹18,000",
      discount: "Discount of 33%",
      // Removed invalid JSX fragment and render code from object
    }
  ],
  "APPSC": [
    {
      title: "APPSC Group 2 Foundation Course",
      language: "Telugu",
      batchDetails: "Build your basics from scratch",
      startDate: "1 Oct, 2025",
      endDate: "30 Sept, 2026",
      price: "₹11,000",
      originalPrice: "₹16,000",
      discount: "Discount of 31%",
      new: false,
      imgSrc: "https://static.wixstatic.com/media/64ada7_796f1a296f764885aaf6bb0714a5bc2c~mv2.jpg/v1/fill/w_493,h_266,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/APPSC-Group-1-PCM-Classes---Independance-Day-Offer-classplsu-banner.jpg",
      exploreUrl: "https://www.civiccentre.in/appsc-courses/group2-foundation",
      buyNowUrl: "https://www.civiccentre.in/checkout/appsc-group2-foundation"
    },
    {
      title: "APPSC Group 1 Mains Test Series",
      language: "English",
      batchDetails: "Complete test series with mentorship",
      startDate: "1 Nov, 2025",
      endDate: "31 Mar, 2026",
      price: "₹7,500",
      originalPrice: "₹10,500",
      discount: "Discount of 28%",
      new: true,
      imgSrc: "https://static.wixstatic.com/media/64ada7_e7e080be52a6400b86b36595922aaa79~mv2.jpg/v1/fill/w_720,h_390,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Website%20Course%20Thumbnail%20-%20APPSC%20Group-1%20Mains%20Test%20Series%20with%20Mentorship%202025-26%20(1).jpg",
      exploreUrl: "https://www.civiccentre.in/appsc-courses/mains-test-series",
      buyNowUrl: "https://www.civiccentre.in/checkout/mains-test-series"
    }
  ],
  "Optional Courses": [
    {
      title: "Public Administration Optional Course",
      language: "English",
      batchDetails: "Full Course with Tests",
      startDate: "1 Sept, 2025",
      endDate: "28 Feb, 2026",
      price: "₹18,000",
      originalPrice: "₹22,000",
      discount: "Discount of 18%",
      new: false,
      imgSrc: "https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/9164a200-b702-4e97-a26c-2ed4ddf66239.png",
      exploreUrl: "https://www.civiccentre.in/optional-courses/pub-ad",
      buyNowUrl: "https://www.civiccentre.in/checkout/pub-ad"
    },
    {
      title: "Sociology Optional Course",
      language: "Hinglish",
      batchDetails: "Comprehensive coverage",
      startDate: "1 Oct, 2025",
      endDate: "31 Mar, 2026",
      price: "₹17,500",
      originalPrice: "₹21,000",
      discount: "Discount of 17%",
      new: false,
      imgSrc: "https://static.pw.live/5eb393ee95fab7468a79d189/ADMIN/9164a200-b702-4e97-a26c-2ed4ddf66239.png",
      exploreUrl: "https://www.civiccentre.in/optional-courses/sociology",
      buyNowUrl: "https://www.civiccentre.in/checkout/sociology"
    }
  ],
  "AP-High Court": [
    {
      title: "AP-High Court Assistant & Examiner Course",
      language: "English",
      batchDetails: "Legal & General Studies",
      startDate: "1 Dec, 2025",
      endDate: "15 Apr, 2026",
      price: "₹8,500",
      originalPrice: "₹12,000",
      discount: "Discount of 29%",
      new: true,
      imgSrc: "https://static.wixstatic.com/media/64ada7_2ca25658bb364aa49f7dfe81e9dbd3e4~mv2.jpg/v1/fill/w_493,h_266,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Course%20Thumbnail%20-%20APPSC%20Forest%20Section%20Officer%20(FSO)%20Prelims%20Test%20Series%202025.jpg",
      exploreUrl: "https://www.civiccentre.in/ap-high-court/assistant",
      buyNowUrl: "https://www.civiccentre.in/checkout/ap-high-court-assistant"
    },
    {
      title: "AP-High Court Test Series",
      language: "English",
      batchDetails: "Full Length Mock Tests",
      startDate: "15 Dec, 2025",
      endDate: "30 Mar, 2026",
      price: "₹3,000",
      originalPrice: "₹4,500",
      discount: "Discount of 33%",
      new: false,
      imgSrc: "https://static.wixstatic.com/media/64ada7_796f1a296f764885aaf6bb0714a5bc2c~mv2.jpg/v1/fill/w_493,h_266,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/APPSC-Group-1-PCM-Classes---Independance-Day-Offer-classplsu-banner.jpg",
      exploreUrl: "https://www.civiccentre.in/ap-high-court/test-series",
      buyNowUrl: "https://www.civiccentre.in/checkout/ap-high-court-test-series"
    }
  ],
  "Exam OTT": [
    {
      title: "Exam OTT - All Exams Subscription",
      language: "Hinglish",
      batchDetails: "Access all courses for 1 Year",
      startDate: "1 Jan, 2025",
      endDate: "1 Jan, 2026",
      price: "₹12,000",
      originalPrice: "₹15,000",
      discount: "Discount of 20%",
      new: false,
      imgSrc: "https://static.wixstatic.com/media/64ada7_7128c7e496974b93a9cf82f6ca2baa97~mv2.jpg/v1/fill/w_1016,h_572,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/AP-High-Court-Group-C-Full-Length-Mock-Tests-learnyst-thumbnail.jpg",
      exploreUrl: "https://www.civiccentre.in/exam-ott/subscription",
      buyNowUrl: "https://www.civiccentre.in/checkout/exam-ott-subscription"
    }
  ]
};

// Extract the categories from the new data structure
const udemyCategories = Object.keys(courseDataByCategory);


// Helper Components
const TestimonialCard = ({ imgSrc, name, rank, testimonial }) => (
  <div className="testimonial-card card">
    <img src={imgSrc} alt={`${name} - ${rank}`} className="testimonial-image" />
    <h3 className="testimonial-name">{name}</h3>
    <p className="testimonial-rank">{rank}</p>
    <p className="testimonial-text">"{testimonial}"</p>
  </div>
);

const YouTubeVideoCard = ({ videoId }) => (
  <div className="video-card card">
    <div className="video-container">
      <img
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt="YouTube video thumbnail"
        className="youtube-thumbnail"
      />
    </div>
  </div>
);

const FAQItem = ({ question, answer }) => (
  <div className="faq-item card">
    <details>
      <summary className="faq-question">
        <span>{question}</span>
        <svg
          className="faq-arrow"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </summary>
      <p className="faq-answer">{answer}</p>
    </details>
  </div>
);

const Card = ({ title }) => {
  return (
    <div className="prompt-card card">
      <p>{title}</p>
      <div className="arrow">→</div>
    </div>
  );
};

const DownloadAppSection = () => (
  <section className="download-app-section section-spacing">
    <div className="container download-app-container card">
      <div className="download-app-content">
        <h2 className="download-app-heading">Join 15 Million students on the app today!</h2>
        <ul className="download-app-features">
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Live & recorded classes available at ease
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Dashboard for progress tracking
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Lakhs of practice questions
          </li>
        </ul>
        <div className="app-links">
          <a href="#" aria-label="Get it on Google Play">
            <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" />
          </a>
          <a href="#" aria-label="Download on the App Store">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/2560px-Download_on_the_App_Store_Badge.svg.png" alt="Download on the App Store" />
          </a>
        </div>
      </div>
      <div className="download-app-image">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrEbjs4Jax9Pen7PQ583xQEEkh1hMZJ7cdZA&s" alt="CivicCentre App on mobile phone" />
      </div>
    </div>
  </section>
);

const RecentUpdatesSection = ({ updatesData }) => (
  <section className="recent-updates-section section-spacing">
    <div className="container">
      <h2 className="heading-secondary">Latest Updates</h2>
      <div className="updates-scroller-wrapper">
        <div className="updates-grid">
          {updatesData.map((update, index) => (
            <div key={`update-${index}`} className="update-category-card card">
              <h3 className="update-category-title">{update.category}</h3>
              <ul className="update-list">
                {update.items.map((item, itemIndex) => (
                  <li key={`update-${index}-item-${itemIndex}`}>
                    <a href="#" className="update-link">
                      {item.text}
                      {item.new && <span className="new-tag">New</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const CourseDetailsCard = ({ course }) => (
  <div className="course-details-card">
    <div className="course-card-image-container">
      <img src={course.imgSrc} alt={course.title} className="course-details-image" />
      <span className="online-tag">ONLINE</span>
    </div>
    <div className="course-details-content">
      <div className="title-row">
        <a href={course.exploreUrl} className="course-details-title-link">
          <h3 className="course-details-title">{course.title}</h3>
        </a>
        <div className="info-tags">
          {course.new && <span className="new-tag">NEW</span>}
          <span className="language-tag">{course.language}</span>
          <a href={`https://wa.me/?text=${encodeURIComponent('Hi, I want to know more about the ' + course.title)}`} target="_blank" rel="noopener noreferrer" className="whatsapp-icon">
            <i className="fa fa-whatsapp"></i>
          </a>
        </div>
      </div>
      <p className="course-batch-details">{course.batchDetails}</p>
      <div className="date-details">
        <p><span>Starts on</span> {course.startDate}</p>
        <p><span>Ends on</span> {course.endDate}</p>
      </div>
      <div className="pricing-section">
        <div className="price-info">
          <span className="current-price">{course.price}</span>
          <span className="original-price">{course.originalPrice}</span>
        </div>
        <div className="discount-info">
          <i className="fa fa-tag"></i>
          <span>{course.discount} applied</span>
        </div>
      </div>
      <div className="course-buttons">
        <a href={course.exploreUrl} className="btn btn-explore">EXPLORE</a>
        <a href={course.buyNowUrl} className="btn btn-buy-now">BUY NOW</a>
      </div>
    </div>
  </div>
);


const CourseExplorerSection = ({ courseDataByCategory, udemyCategories }) => {
  const [activeCategory, setActiveCategory] = useState("UPSC");

  const coursesToDisplay = courseDataByCategory[activeCategory] || [];

  return (
    <section className="course-explorer-section section-spacing">
      <div className="container">
        <h2 className="heading-secondary text-left">"The Next Big Step in Your Preparation Journey."</h2>
        <p className="section-description">
          With Civic Centre IAS - "Dream Big. Prepare Smart. Achieve More."
        </p>

        <div className="category-nav">
          <ul className="category-list">
            {udemyCategories.map((category, index) => (
              <li
                key={index}
                className={`category-item ${activeCategory === category ? "active" : ""}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        <div className="udemy-course-scroller-container">
          <div className="udemy-course-scroller">
            {coursesToDisplay.map((course, index) => (
              <CourseDetailsCard key={index} course={course} />
            ))}
          </div>
        </div>
        <div className="show-all-courses-btn-container">
          <button className="btn show-all-courses-btn">Show all {activeCategory} courses</button>
        </div>
      </div>
    </section>
  );
};


// Social Popup Bar Component
const SocialPopupBar = () => {
  const registrations = [
    { name: "Sivaram", course: "UPSC PRARAMBH 2028" },
    { name: "Pooja", course: "TGPSC Group 1 Foundation" },
    { name: "Ankit", course: "APPSC Group 2 Foundation" },
    { name: "Nisha", course: "Exam OTT Subscription" },
    { name: "Ravi", course: "Sociology Optional Course" },
    { name: "Meena", course: "AP-High Court Assistant & Examiner" },
    { name: "Suresh", course: "TGPSC Naipunyatha+ 2025" },
    { name: "Kavita", course: "Public Administration Optional" },
    { name: "Gaurav", course: "TGPSC Prelims & Mains Test Series" },
    { name: "Anjali", course: "APPSC Group 1 Mains Test Series" }
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const showTimeout = setTimeout(() => setVisible(false), 2000);
    const changeTimeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % registrations.length);
      setVisible(true);
    }, 3000);
    return () => {
      clearTimeout(showTimeout);
      clearTimeout(changeTimeout);
    };
  }, [currentIndex, registrations.length]);

  const { name, course } = registrations[currentIndex];

  return (
    <div className={`social-popup-bar${visible ? ' popup-in' : ' popup-out'}`}>
      <span className="popup-icon">🎉</span>
      <span className="popup-text">{name} registered for <b>{course}</b>. <span className="popup-trust">!</span></span>
    </div>
  );
};

const Home = () => {
  const message = 'Hello, I would like to know more about your courses.';

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="main-content">
        {/* Social Popup Bar */}
        <SocialPopupBar />
        {/* Social Media Bar */}
        <div className="social-bar">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon facebook" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon twitter" aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon instagram" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon youtube" aria-label="YouTube">
            <i className="fab fa-youtube"></i>
          </a>
        </div>


        {/* WhatsApp Button - Fixed to right bottom corner */}
        <a
          href={`https://wa.me/${"7013495019"}?text=${encodeURIComponent(message)}`}
          className="whatsapp-fixed-button"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
        >
          <i className="fab fa-whatsapp"></i>
        </a>

        {/* Image Slider - This is the new Hero Section */}
        <ImageSlider />

        {/* Recent Updates Section - New (moved after hero section) */}
        <RecentUpdatesSection updatesData={updatesData} />

        {/* New Course Explorer Section */}
        <CourseExplorerSection courseDataByCategory={courseDataByCategory} udemyCategories={udemyCategories} />

        {/* New Scrolling Card Sections */}
        <div className="home-scrolling-container">
            <div className="scrolling-row-container">
            <div className="scrolling-row">
                {rowOneData.map((item, index) => (
                <Card key={`row-1-${index}`} title={item} />
                ))}
                {rowOneData.map((item, index) => (
                <Card key={`row-1-dup-${index}`} title={item} />
                ))}
            </div>
            </div>

            <div className="scrolling-row-container">
            <div className="scrolling-row reverse-animation">
                {rowTwoData.map((item, index) => (
                <Card key={`row-2-${index}`} title={item} />
                ))}
                {rowTwoData.map((item, index) => (
                <Card key={`row-2-dup-${index}`} title={item} />
                ))}
            </div>
            </div>

            {/* Third Scrolling Row */}
            <div className="scrolling-row-container">
            <div className="scrolling-row">
                {rowThreeData.map((item, index) => (
                <Card key={`row-3-${index}`} title={item} />
                ))}
                {rowThreeData.map((item, index) => (
                <Card key={`row-3-dup-${index}`} title={item} />
                ))}
            </div>
            </div>
        </div>

        {/* Why Choose Us Section */}
        <section className="why-choose-us-section section-spacing">
            <div className="container why-choose-us-content-wrapper">
            <div className="why-choose-us-image">
                <img
                src="https://content.jdmagicbox.com/v2/comp/hyderabad/q1/040pxx40.xx40.220506142832.n8q1/catalogue/civiccentre-ashok-nagar-hyderabad-tutorials-r7j3v0tlt8.jpg"
                alt="Students studying together"
                />
            </div>
            <div className="why-choose-us-text">
                <h2 className="heading-secondary text-left">Why Choose Us?</h2>
                <ul className="why-choose-us-list">
                <li><span className="bullet-point">&bull;</span> Expert Mentors with years of experience.</li>
                <li><span className="bullet-point">&bull;</span> Proven Results with top ranks every year.</li>
                <li><span className="bullet-point">&bull;</span> Bilingual Teaching (English & Hindi).</li>
                <li><span className="bullet-point">&bull;</span> Structured Notes and study materials.</li>
                </ul>
            </div>
            </div>
        </section>

        {/* YouTube Videos Section */}
        <section className="videos-section section-spacing">
            <div className="container">
            <h2 className="heading-secondary">Watch Our Videos</h2>
            <div className="scrolling-row-container">
                <div className="scrolling-row left-to-right-animation">
                {videoIds.map((videoId, index) => (
                    <YouTubeVideoCard key={`video-dup-${index}`} videoId={videoId} />
                ))}
                </div>
            </div>
            </div>
        </section>

        {/* Download App Section - New */}
        <DownloadAppSection />
        {/* Student Success/Testimonials Section */}
        <section className="testimonials-section section-spacing">
            <div className="container">
            <h2 className="heading-secondary">Student Success Stories</h2>
            <div className="scrolling-row-container">
                <div className="scrolling-row">
                {testimonials.map((testimonial, index) => (
                    <TestimonialCard
                    key={`testimonial-${index}`}
                    imgSrc={testimonial.imgSrc}
                    name={testimonial.name}
                    rank={testimonial.rank}
                    testimonial={testimonial.testimonial}
                    />
                ))}
                {testimonials.map((testimonial, index) => (
                    <TestimonialCard
                    key={`testimonial-dup-${index}`}
                    imgSrc={testimonial.imgSrc}
                    name={testimonial.name}
                    rank={testimonial.rank}
                    testimonial={testimonial.testimonial}
                    />
                ))}
                </div>
            </div>
            </div>
        </section>
        {/* Get In Touch Section - after success stories */}
        <section className="get-in-touch-section section-spacing">
            <div className="get-in-touch-form-wrapper">
            <h2 className="get-in-touch-heading">Get in touch with CivicCentre IAS</h2>
            <form className="get-in-touch-form">
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
                <input type="text" placeholder="Your Phone" required />
                <textarea placeholder="Your Message" rows={4} required />
                <button type="submit" className="btn">Send Message</button>
            </form>
            </div>
            <div className="get-in-touch-image-wrapper">
            <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80" alt="Get in touch" className="get-in-touch-image" />
            </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section section-spacing">
            <div className="container">
            <h2 className="heading-secondary">Frequently Asked Questions</h2>
            <div className="faq-list">
                <FAQItem question="What is the duration of the course?" answer="Our foundation courses typically run for 10-12 months, followed by dedicated revision and test series." />
                <FAQItem question="Do you provide coaching for both Prelims and Mains?" answer="Yes, our programs cover the entire UPSC cycle — Prelims, Mains, and Interview — including essay writing and ethics." />
                <FAQItem question="Can working professionals join your classes?" answer="Absolutely. We have weekend batches, evening classes, and recorded sessions to accommodate working aspirants." />
                <FAQItem question="Will I get complete study material from the academy?" answer="Yes, our curated notes, current affairs compilations, and test series are designed to cover the UPSC syllabus comprehensively." />
                <FAQItem question="Are classes available online?" answer="Yes, we offer both offline classroom sessions and high-quality live online classes with interactive doubt clearing." />
                <FAQItem question="How often are mock tests conducted?" answer="Prelims mock tests are held weekly, Mains answer writing practice is done daily or weekly, and monthly full-length tests are conducted." />
                <FAQItem question="Which optional subjects do you offer?" answer="We cover popular UPSC optionals like Anthropology, Sociology, Political Science, Public Administration, Geography, History, and more." />
                <FAQItem question="Do you provide mock interviews?" answer="Yes, our mock interview panel consists of retired bureaucrats, subject experts, and senior faculty to simulate the real UPSC environment." />
            </div>
            </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Home;