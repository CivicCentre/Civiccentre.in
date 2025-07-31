import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navbarRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setDropdownOpen(false); // close dropdown when menu toggled
  };
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const closeAll = () => {
    setIsOpen(false);
    setDropdownOpen(false);
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
        <div className="navbar-logo">MyCompany</div>
        <ul className={`navbar-links ${isOpen ? "mobile open" : "mobile"}`}>
          <li className="dropdown">
            <button className="dropbtn">
              UPSC <span className="arrow">▼</span>
            </button>
            <div className="dropdown-content">
              <a href="#upsc1" onClick={closeAll}>UPSC Option 1</a>
              <a href="#upsc2" onClick={closeAll}>UPSC Option 2</a>
            </div>
          </li>
          <li className="dropdown">
            <button className="dropbtn">
              TGPSC <span className="arrow">▼</span>
            </button>
            <div className="dropdown-content">
              <a href="#tgpsc1" onClick={closeAll}>TGPSC Option 1</a>
              <a href="#tgpsc2" onClick={closeAll}>TGPSC Option 2</a>
            </div>
          </li>
          <li className="dropdown">
            <button className="dropbtn">
              APPSC <span className="arrow">▼</span>
            </button>
            <div className="dropdown-content">
              <a href="#appsc1" onClick={closeAll}>APPSC Option 1</a>
              <a href="#appsc2" onClick={closeAll}>APPSC Option 2</a>
            </div>
          </li>
          <li className="dropdown">
            <button className="dropbtn">
              ExamOTT <span className="arrow">▼</span>
            </button>
            <div className="dropdown-content">
              <a href="#examott1" onClick={closeAll}>ExamOTT Option 1</a>
              <a href="#examott2" onClick={closeAll}>ExamOTT Option 2</a>
            </div>
          </li>
          <li className="dropdown">
            <button className="dropbtn">
              More <span className="arrow">▼</span>
            </button>
            <div className="dropdown-content">
              <a href="#more1" onClick={closeAll}>More Option 1</a>
              <a href="#more2" onClick={closeAll}>More Option 2</a>
            </div>
          </li>
          <li className="dropdown">
            <button className="dropbtn">
              About <span className="arrow">▼</span>
            </button>
            <div className="dropdown-content">
              <a href="#about1" onClick={closeAll}>About Option 1</a>
              <a href="#about2" onClick={closeAll}>About Option 2</a>
            </div>
          </li>
          <li className="dropdown">
            <button className="dropbtn">
              Contact <span className="arrow">▼</span>
            </button>
            <div className="dropdown-content">
              <a href="#contact1" onClick={closeAll}>Contact Option 1</a>
              <a href="#contact2" onClick={closeAll}>Contact Option 2</a>
            </div>
          </li>
        </ul>
        <div className={`dropdown ${dropdownOpen ? "open" : ""}`}>
          <button className="dropbtn" onClick={toggleDropdown}>
            Login <span className="arrow">▼</span>
          </button>
          <div className="dropdown-content">
            <a href="#login1" onClick={closeAll}>Login 1</a>
            <a href="#login2" onClick={closeAll}>Login 2</a>
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