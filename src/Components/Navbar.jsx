import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import "./Footer.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
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


  const closeAll = () => {
    setIsOpen(false);
    setDropdownOpen(null);
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
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Swipe detection
  useEffect(() => {
    const handleTouchStart = (e) => {
      const x = e.touches[0].clientX;
      touchStartX.current = x;
      touchEndX.current = x;
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
        <div className="navbar-logo">
          <Link className="homelink" to="/">Civic Centre IAS</Link>
        </div>
        <ul className={`navbar-links ${isOpen ? "mobile open" : "mobile"}`}>
          <li className={`dropdown ${dropdownOpen === 'upsc' ? 'open' : ''}`} onClick={() => toggleDropdown('upsc')}>
            <button className="dropbtn">
              UPSC <span className="arrow">▼</span>
            </button>
            <div className="dropdown-content">
              <a href="/UPSC">UPSC Template</a>
              <a href="#upsc2">UPSC Option 2</a>
            </div>
          </li>
          <li className={`dropdown ${dropdownOpen === 'tgpsc' ? 'open' : ''}`} onClick={() => toggleDropdown('tgpsc')}>
            <button className="dropbtn">
              TGPSC <span className="arrow">▼</span>
            </button>
            <div className="dropdown-content">
              <a href="/TGPSC">TGPSC Template</a>
              <a href="#tgpsc2">TGPSC Option 2</a>
            </div>
          </li>
          <li className={`dropdown ${dropdownOpen === 'appsc' ? 'open' : ''}`} onClick={() => toggleDropdown('appsc')}>
            <button className="dropbtn">
              APPSC <span className="arrow">▼</span>
            </button>
            <div className="dropdown-content">
              <a href="/APPSC">APPSC Course Template</a>
              <a href="/testseries">Test Series Template</a>
            </div>
          </li>
          <li className={`dropdown ${dropdownOpen === 'examott' ? 'open' : ''}`} onClick={() => toggleDropdown('examott')}>
            <button className="dropbtn">
              ExamOTT <span className="arrow">▼</span>
            </button>
            <div className="dropdown-content">
              <a href="#examott1">ExamOTT Option 1</a>
              <a href="#examott2">ExamOTT Option 2</a>
            </div>
          </li>
          <li className="notdropdown"><a href="/about">About</a></li>
          <li className="notdropdown"><a href="/contact">Contact</a></li>
          <li className={`dropdown ${dropdownOpen === "login" ? "open" : ""} mobile-only`} onClick={() => toggleDropdown("login")}>
            <button className="dropbtn">
              Login <span className="arrow">▼</span>
            </button>
            <div className="dropdown-content">
              <a href="/login/student" onClick={() => { setDropdownOpen(null); setIsOpen(false); }}>
                Student Login
              </a>
              <a href="/login/admin" onClick={() => { setDropdownOpen(null); setIsOpen(false); }}>
                Admin Login
              </a>
            </div>
          </li>
        </ul>
        <li className={`dropdown ${dropdownOpen === "login" ? "open" : ""} desktop-only`} onClick={() => toggleDropdown("login")}>
          <button className="dropbtn">
            Login <span className="arrow">▼</span>
          </button>
          <div className="dropdown-content">
            <a href="/login/student" onClick={() => { setDropdownOpen(null); setIsOpen(false); }}>
              Student Login
            </a>
            <a href="/login/admin" onClick={() => { setDropdownOpen(null); setIsOpen(false); }}>
              Admin Login
            </a>
          </div>
        </li>

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