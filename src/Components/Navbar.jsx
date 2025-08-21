import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css"; // Assuming you have a CSS file for styles
import Logo from "../assets/CivicCentreLogo.png"; // Adjust the path as needed

const PHONE_NUMBER = "7013495019";

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const header = document.querySelector('.cc-header');
    if (!header) return;

    const parseRGBA = (str) => {
      const m = str.match(/rgba?\(([^)]+)\)/i);
      if (!m) return { r: 255, g: 255, b: 255, a: 1 };
      const parts = m[1].split(',').map(s => s.trim());
      const r = parseInt(parts[0], 10);
      const g = parseInt(parts[1], 10);
      const b = parseInt(parts[2], 10);
      const a = parts[3] !== undefined ? parseFloat(parts[3]) : 1;
      return { r, g, b, a };
    };

    const compositeOverWhite = ({ r, g, b, a }) => {
      if (a === undefined || a >= 1) return { r, g, b };
      const R = Math.round(r * a + 255 * (1 - a));
      const G = Math.round(g * a + 255 * (1 - a));
      const B = Math.round(b * a + 255 * (1 - a));
      return { r: R, g: G, b: B };
    };

    const compute = () => {
      const bg = getComputedStyle(header).backgroundColor;
      const rgba = parseRGBA(bg);
      const { r, g, b } = compositeOverWhite(rgba);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      const textColor = brightness > 128 ? '#000000' : '#ffffff';
      header.style.setProperty('--cc-text', textColor);
    };

    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!searchRef.current) return;
      if (!searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };

    const onKeyDown = (e) => {
      // Press '/' to open search unless you're typing in an input/textarea/select or contenteditable
      const tag = (e.target.tagName || "").toLowerCase();
      const isTyping = tag === 'input' || tag === 'textarea' || tag === 'select' || (e.target.isContentEditable === true);
      if (!isTyping && e.key === '/') {
        e.preventDefault();
        setSearchOpen(true);
        // focus after state updates
        setTimeout(() => searchInputRef.current && searchInputRef.current.focus(), 0);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };

    document.addEventListener('click', onDocClick);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('click', onDocClick);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <header className="cc-header">
      <div className="cc-header-inner">
        {/* Left: Logo */}
        <div className="cc-logo">
          <img
            src={Logo}
            alt="CivicCentre IAS"
            className="cc-logo-img"
          />
        </div>

        {/* Center: Links */}
        <nav className="cc-nav" aria-label="Primary">
          <ul className="cc-nav-list">
            <li className="cc-nav-item"><a className="cc-nav-link" href="/upsc">UPSC</a></li>
            <li className="cc-nav-item"><a className="cc-nav-link" href="/tgpsc">TSPSC</a></li>
            <li className="cc-nav-item"><a className="cc-nav-link" href="/appsc">APPSC</a></li>
            <li className="cc-nav-item"><a className="cc-nav-link" href="/materials">Materials</a></li>
            <li className="cc-nav-item"><a className="cc-nav-link" href="/scholarship-tests">Scholarship Tests</a></li>
            <li className="cc-nav-item"><a className="cc-nav-link" href="/examott">ExamOTT</a></li>
            <li className="cc-nav-item"><a className="cc-nav-link" href="/more">More</a></li>
          </ul>
        </nav>

        {/* Right: Phone + Login */}
        <div className="cc-actions">
          {/* Search */}
          <form
            className={`cc-search ${searchOpen ? 'is-open' : ''}`}
            ref={searchRef}
            role="search"
            action="https://www.google.com/search"
            method="GET"
            rel="noopener noreferrer"
          >
            <button
              type="button"
              className="cc-search-btn"
              style={{ color: "black" }}
              aria-label={searchOpen ? 'Close search' : 'Open search'}
              onClick={() => {
                const next = !searchOpen;
                setSearchOpen(next);
                if (next) setTimeout(() => searchInputRef.current && searchInputRef.current.focus(), 0);
              }}
            >
              <span>Search</span>
            </button>
            <input
              ref={searchInputRef}
              className="cc-search-input"
              type="search"
              name="q"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search…"
              aria-label="Search"
            />
          </form>
          <a href={`tel:${PHONE_NUMBER}`} className="cc-phone" aria-label="Call">
            <span className="cc-phone-icon">☎</span>
            <span className="cc-phone-number">{PHONE_NUMBER}</span>
          </a>
          <a href="/login" className="cc-btn cc-btn-outline" role="button">Login</a>
        </div>
      </div>
    </header>
  );
}