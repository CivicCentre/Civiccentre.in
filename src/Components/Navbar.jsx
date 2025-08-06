import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import "./Footer.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [nestedOpen, setNestedOpen] = useState(null);
  const navbarRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setDropdownOpen(null); // close dropdown when menu toggled
  };

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const toggleNested = (id) => {
    setNestedOpen(nestedOpen === id ? null : id);
  };

  const closeAll = () => {
    setIsOpen(false);
    setDropdownOpen(null);
    setNestedOpen(null);
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
        setDropdownOpen(null);
        setNestedOpen(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Swipe detection
  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
    };
    const handleTouchMove = (e) => {
      touchEndX.current = e.touches[0].clientX;
    };
    const handleTouchEnd = () => {
      const swipeDistance = touchStartX.current - touchEndX.current;
      if (swipeDistance > 50) {
        // swipe left to close
        closeAll();
      } else if (swipeDistance < -50) {
        // swipe right to open
        setIsOpen(true);
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <nav className="navbar" ref={navbarRef}>
      <div className="navbar-container">
        <div className="navbar-logo">Civic Centre IAS</div>
        <ul className={`navbar-links ${isOpen ? "mobile open" : "mobile"}`}>
          <li className={`dropdown ${dropdownOpen === 'upsc' ? 'open' : ''}`}>
            <button className="dropbtn" onClick={() => toggleDropdown('upsc')}>
              UPSC <span className="arrow">▼</span>
            </button>
            <div className="dropdown-content">
              <a href="#upsc1">UPSC Option 1</a>
              <a href="#upsc2">UPSC Option 2</a>
              <div
                className={`nested-dropdown ${nestedOpen === 'upsc-more' ? 'open' : ''}`}
                onClick={(e) => { e.stopPropagation(); toggleNested('upsc-more'); }}
              >
                <button className="dropbtn">
                  More <span className="arrow">▼</span>
                </button>
                <div className="dropdown-content">
                  <a href="#upsc-more1" onClick={() => setNestedOpen(null)}>More Option 1</a>
                  <a href="#upsc-more2" onClick={() => setNestedOpen(null)}>More Option 2</a>  
                </div>
              </div>
            </div>
          </li>
          <li className={`dropdown ${dropdownOpen === 'tgpsc' ? 'open' : ''}`}>
            <button className="dropbtn" onClick={() => toggleDropdown('tgpsc')}>
              TGPSC <span className="arrow">▼</span>
            </button>
            <div className="dropdown-content">
              <a href="#tgpsc1">TGPSC Option 1</a>
              <a href="#tgpsc2">TGPSC Option 2</a>
              <div
                className={`nested-dropdown ${nestedOpen === 'tgpsc-more' ? 'open' : ''}`}
                onClick={(e) => { e.stopPropagation(); toggleNested('tgpsc-more'); }}
              >
                <button className="dropbtn">
                  More <span className="arrow">▼</span>
                </button>
                <div className="dropdown-content">
                  <a href="#tgpsc-more1" onClick={() => setNestedOpen(null)}>More Option 1</a>
                  <a href="#tgpsc-more2" onClick={() => setNestedOpen(null)}>More Option 2</a>  
                </div>
              </div>
            </div>
          </li>
          <li className={`dropdown ${dropdownOpen === 'appsc' ? 'open' : ''}`}>
            <button className="dropbtn" onClick={() => toggleDropdown('appsc')}>
              APPSC <span className="arrow">▼</span>
            </button>
            <div className="dropdown-content">
              <a href="/APPSC">APPSC Option 1</a>
              <a href="#appsc2">APPSC Option 2</a>
              <div
                className={`nested-dropdown ${nestedOpen === 'appsc-more' ? 'open' : ''}`}
                onClick={(e) => { e.stopPropagation(); toggleNested('appsc-more'); }}
              >
                <button className="dropbtn">
                  More <span className="arrow">▼</span>
                </button>
                <div className="dropdown-content">
                  <a href="#appsc-more1" onClick={() => setNestedOpen(null)}>More Option 1</a>
                  <a href="#appsc-more2" onClick={() => setNestedOpen(null)}>More Option 2</a>  
                </div>
              </div>
            </div>
          </li>
          <li className={`dropdown ${dropdownOpen === 'examott' ? 'open' : ''}`}>
            <button className="dropbtn" onClick={() => toggleDropdown('examott')}>
              ExamOTT <span className="arrow">▼</span>
            </button>
            <div className="dropdown-content">
              <a href="#examott1">ExamOTT Option 1</a>
              <a href="#examott2">ExamOTT Option 2</a>
              <div
                className={`nested-dropdown ${nestedOpen === 'examott-more' ? 'open' : ''}`}
                onClick={(e) => { e.stopPropagation(); toggleNested('examott-more'); }}
              >
                <button className="dropbtn">
                  More <span className="arrow">▼</span>
                </button>
                <div className="dropdown-content">
                  <a href="#examott-more1" onClick={() => setNestedOpen(null)}>More Option 1</a>
                  <a href="#examott-more2" onClick={() => setNestedOpen(null)}>More Option 2</a>  
                </div>
              </div>
            </div>
          </li>
          <li className={`dropdown ${dropdownOpen === 'more' ? 'open' : ''}`}>
            <button className="dropbtn" onClick={() => toggleDropdown('more')}>
              More <span className="arrow">▼</span>
            </button>
            <div className="dropdown-content">
              <a href="#more1">More Option 1</a>
              <a href="#more2">More Option 2</a>
              <div
                className={`nested-dropdown ${nestedOpen === 'more-more' ? 'open' : ''}`}
                onClick={(e) => { e.stopPropagation(); toggleNested('more-more'); }}
              >
                <button className="dropbtn">
                  Submenu <span className="arrow">▼</span>
                </button>
                <div className="dropdown-content">
                  <a href="#more-sub1" onClick={() => setNestedOpen(null)}>Sub Option 1</a>
                  <a href="#more-sub2" onClick={() => setNestedOpen(null)}>Sub Option 2</a>  
                </div>
              </div>
            </div>
          </li>
          <li className="dropdown">
            <button className="dropbtn">
              About <span className="arrow">▼</span>
            </button>
            <div className="dropdown-content">
              <a href="#about1">About Option 1</a>
              <a href="#about2">About Option 2</a>
            </div>
          </li>
          <li className="dropdown">
            <button className="dropbtn">
              Contact <span className="arrow">▼</span>
            </button>
            <div className="dropdown-content">
              <a href="#contact1">Contact Option 1</a>
              <a href="#contact2">Contact Option 2</a>
            </div>
          </li>
        </ul>

        <div className={`dropdown ${dropdownOpen === "login" ? "open" : ""}`}>
          <button className="dropbtn" onClick={() => toggleDropdown("login")}>
            Login <span className="arrow">▼</span>
          </button>
          <div className="dropdown-content">
            <a href="#login1">Login 1</a>
            <a href="#login2">Login 2</a>
          </div>
        </div>

        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
      {isOpen && <div className="mobile-overlay show" onClick={closeAll}></div>}
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