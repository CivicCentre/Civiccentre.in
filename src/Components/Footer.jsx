import React, { useState, useEffect } from "react";
import "./Footer.css";

const Footer = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className={`footer ${visible ? "visible" : ""}`}>
      <div className="footer-content">
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
        <p>&copy; {new Date().getFullYear()} Civic Centre. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
