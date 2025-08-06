import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [moreOpen, setMoreOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedDropdown, setExpandedDropdown] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const navbarRef = useRef(null);
  const navigate = useNavigate();

  const categories = [
    { 
      name: 'APPSC', 
      link: '/appsc',
      subCategories: [
        { name: 'APPSC', link: '/appsc' },
        { name: 'NEET', link: '/competitive-exams/neet' },
        { name: 'ESE', link: '/competitive-exams/ese' },
        { name: 'GATE', link: '/competitive-exams/gate' },
        { name: 'AE/JE', link: '/competitive-exams/ae-je' },
        { name: 'Olympiad', link: '/competitive-exams/olympiad' }
      ] 
    },
    { 
      name: 'Only IAS', 
      link: '/only-ias',
      subCategories: [
        { name: 'UPSC', link: '/only-ias/upsc' },
        { name: 'State PSC', link: '/only-ias/state-psc' }
      ] 
    },
    { 
      name: 'School Preparation',
      link: '/school-preparation',
      subCategories: [
        { name: 'Foundation', link: '/school-preparation/foundation' },
        { name: 'Commerce', link: '/school-preparation/commerce' },
        { name: 'Science', link: '/school-preparation/science' }
      ]
    },
    { 
      name: 'Govt Exam',
      link: '/govt-exam',
      subCategories: [
        { name: 'SSC', link: '/govt-exam/ssc' },
        { name: 'Banking', link: '/govt-exam/banking' },
        { name: 'Judiciary', link: '/govt-exam/judiciary' },
        { name: 'Railway', link: '/govt-exam/railway' },
        { name: 'UP Exams', link: '/govt-exam/up-exams' }
      ]
    },
    { 
      name: 'UG & PG Entrance Exams',
      link: '/ug-pg-entrance-exams',
      subCategories: [
        { name: 'MBA', link: '/ug-pg-entrance-exams/mba' },
        { name: 'IPMAT', link: '/ug-pg-entrance-exams/ipmat' },
        { name: 'IIT JAM', link: '/ug-pg-entrance-exams/iit-jam' },
        { name: 'CSIR NET', link: '/ug-pg-entrance-exams/csir-net' },
        { name: 'LAW', link: '/ug-pg-entrance-exams/law' },
        { name: 'UGC NET', link: '/ug-pg-entrance-exams/ugc-net' },
        { name: 'GMAT', link: '/ug-pg-entrance-exams/gmat' }
      ]
    },
    { 
      name: 'Finance',
      link: '/finance',
      subCategories: [
        { name: 'CA', link: '/finance/ca' },
        { name: 'CS', link: '/finance/cs' },
        { name: 'ACCA', link: '/finance/acca' }
      ]
    },
    { 
      name: 'Others',
      link: '/others',
      subCategories: [
        { name: 'Online Degrees', link: '/others/online-degrees' },
        { name: 'Financial Certification', link: '/others/financial-certification' }
      ]
    },
    { 
      name: 'Study Abroad',
      link: '/study-abroad',
      subCategories: [
        { name: 'IELTS', link: '/study-abroad/ielts' },
        { name: 'TOEFL', link: '/study-abroad/toefl' }
      ]
    },
    { 
      name: 'Agriculture',
      link: '/agriculture',
      subCategories: [
        { name: 'Agriculture', link: '/agriculture' }
      ]
    }
  ];


  const closeAll = () => {
    setDropdownOpen(false);
    setActiveCategory(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        closeAll();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setActiveCategory(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsMobileMenuOpen(false);
        setIsClosing(false);
        setExpandedDropdown(null);
      }, 300); // duration matches CSS
    } else {
      setIsMobileMenuOpen(true);
    }
  };
  // Separate handler for floating hamburger to avoid double toggle
  const handleFloatingClick = (e) => {
    e.stopPropagation();
    if (!isMobileMenuOpen) {
      setIsMobileMenuOpen(true);
      setIsClosing(false);
    }
  };
  // Swipe open/close support
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };
  const handleTouchMove = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
  };
  const handleTouchEnd = () => {
    const deltaX = touchEndX.current - touchStartX.current;
    if (!isMobileMenuOpen && deltaX < -50) {
      // swipe left to open
      setIsMobileMenuOpen(true);
    } else if (isMobileMenuOpen && deltaX > 50) {
      // swipe right to close
      toggleMobileMenu();
    }
  };
  const toggleDropdown = (category) => {
    setExpandedDropdown((prev) => (prev === category ? null : category));
  };

  return (
    <nav
      className="cc-navbar"
      ref={navbarRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="cc-navbar-container">
        <div className="cc-navbar-logo cc-center-mobile">Civic Centre IAS</div>
        {window.innerWidth <= 768 && (
          <div
            className={`cc-hamburger ${!isMobileMenuOpen ? 'floating' : ''}`}
            onClick={!isMobileMenuOpen ? handleFloatingClick : toggleMobileMenu}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        )}
        {isMobileMenuOpen && <div className="cc-mobile-overlay" onClick={toggleMobileMenu}></div>}
        {(isMobileMenuOpen || isClosing) && (
          <div className={`cc-mobile-menu${isClosing ? ' closing' : ''}`}>
            <ul className="cc-mobile-links">
              {categories.map((cat) => (
                <li key={cat.name} className="cc-dropdown-mobile">
                  <div className="cc-nav-item" onClick={() => toggleDropdown(cat.name)}>
                    {cat.name}
                  </div>
                  {expandedDropdown === cat.name && (
                    <div className="cc-subcategory-list-mobile">
                      {cat.subCategories.map((sub) => (
                        <div
                          key={sub.name}
                          className="cc-subcategory-item"
                          onClick={() => {
                            setExpandedDropdown(null);
                            navigate(sub.link);
                          }}
                        >
                          {sub.name}
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              ))}
              <li><div className="cc-nav-item" onClick={() => navigate('/trending')}>Trending Now</div></li>
              <li><div className="cc-nav-item" onClick={() => navigate('/free-scholarship-test')}>Free Scholarship Test</div></li>
              <li><div className="cc-nav-item" onClick={() => navigate('/contact-us')}>Contact Us</div></li>
              <li><div className="cc-nav-item" onClick={() => navigate('/events')}>Events</div></li>
              <li><div className="cc-nav-item" onClick={() => navigate('/webinars')}>Webinars</div></li>
              <li><div className="cc-nav-item" onClick={() => navigate('/news')}>News</div></li>
              <li><div className="cc-nav-item" onClick={() => navigate('/student-login')}>Student Login</div></li>
              <li><div className="cc-nav-item" onClick={() => navigate('/admin-login')}>Admin Login</div></li>
            </ul>
          </div>
        )}
        <ul className="cc-navbar-links cc-desktop-menu">
          <li 
            className="cc-dropdown" 
            onMouseEnter={() => setDropdownOpen(true)} 
            onMouseLeave={() => {setDropdownOpen(false); setActiveCategory(null);}}
          >
            <button className="cc-dropbtn">All Courses <span className="cc-arrow">▼</span></button>
            {dropdownOpen && (
              <div className="cc-dropdown-menu">
                <div className="cc-category-list">
                  {categories.map((cat) => (
                    cat.link ? (
                      <a
                        key={cat.name}
                        className={`cc-category-item ${activeCategory === cat.name ? 'active' : ''}`}
                        href={cat.link}
                        onMouseEnter={() => setActiveCategory(cat.name)}
                      >
                        {cat.name}
                      </a>
                    ) : (
                      <div
                        key={cat.name}
                        className={`cc-category-item ${activeCategory === cat.name ? 'active' : ''}`}
                        onMouseEnter={() => setActiveCategory(cat.name)}
                      >
                        {cat.name}
                      </div>
                    )
                  ))}
                </div>
                <div className="cc-subcategory-list">
                  {activeCategory &&
                    categories.find(c => c.name === activeCategory)?.subCategories.map((sub) => (
                      <div
                        key={sub.name}
                        className="cc-subcategory-item"
                        onClick={() => {
                          setDropdownOpen(false);
                          setActiveCategory(null);
                          navigate(sub.link);
                        }}
                      >
                        {sub.name}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </li>
          <li>
            <div className="cc-nav-item" onClick={() => navigate('/trending')}>Trending Now</div>
          </li>
          <li>
            <div className="cc-nav-item" onClick={() => navigate('/free-scholarship-test')}>Free Scholarship Test</div>
          </li>
          {/* More dropdown */}
          <li 
            className="cc-dropdown cc-dropdown-more"
            onMouseEnter={() => setMoreOpen(true)}
            onMouseLeave={() => setMoreOpen(false)}
          >
            <button className="cc-dropbtn">More <span className="cc-arrow">▼</span></button>
            {moreOpen && (
              <div className="cc-dropdown-menu cc-dropdown-menu-more">
                <div className="cc-nav-item" onClick={() => navigate('/events')}>Events</div>
                <div className="cc-nav-item" onClick={() => navigate('/webinars')}>Webinars</div>
                <div className="cc-nav-item" onClick={() => navigate('/news')}>News</div>
              </div>
            )}
          </li>
          <li>
            <div className="cc-nav-item" onClick={() => navigate('/contact-us')}>Contact Us</div>
          </li>
        </ul>
        {window.innerWidth > 768 && (
          <div 
            className="cc-dropdown cc-dropdown-login"
            onMouseEnter={() => setLoginOpen(true)}
            onMouseLeave={() => setLoginOpen(false)}
          >
            <button className="cc-dropbtn">Login/Register <span className="cc-arrow">▼</span></button>
            {loginOpen && (
              <div className="cc-dropdown-menu cc-dropdown-menu-login">
                <div className="cc-nav-item" onClick={() => navigate('/student-login')}>Student Login</div>
                <div className="cc-nav-item" onClick={() => navigate('/admin-login')}>Admin Login</div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Civic Centre. All rights reserved.</p>
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="#privacy">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};