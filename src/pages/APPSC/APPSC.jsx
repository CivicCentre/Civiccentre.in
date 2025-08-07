import React, { useEffect, useRef } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import "./APPSC.css";
import appsclogoSVG from "../../assets/appsclogo.svg?raw";

const APPSC = () => {
  const logoRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      const rotation = window.scrollY * 0.1; // adjust rotation speed
      document.documentElement.style.setProperty('--scroll-rotation', `${rotation}deg`);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // (removed previous anime useEffect for <object>)

  // Animate SVG parts on scroll
  useEffect(() => {
    if (!logoRef.current) return;
    import('animejs').then((mod) => {
      const animeFn = mod.default ?? mod.anime;
      if (typeof animeFn !== 'function') return;
      const svgEl = logoRef.current.querySelector('svg');
      if (!svgEl) return;
      // Split into parts (all paths)
      const parts = Array.from(svgEl.querySelectorAll('path'));
      // Create a paused timeline: parts start scattered off-screen then assemble
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

      // Animate inner circle words one by one
      const words = Array.from(svgEl.querySelectorAll('text'));
      tl.add({
        targets: words,
        opacity: [0, 1],
        translateY: [20, 0],
        easing: 'easeOutSine',
        duration: 600,
        delay: (_, i) => i * 200,
      });

      // Animate the pillar rising into position
      const pillarEl = svgEl.querySelector('#pillar') || svgEl.querySelector('.pillar');
      if (pillarEl) {
        tl.add({
          targets: pillarEl,
          translateY: [100, 0],
          easing: 'easeOutBounce',
          duration: 1000,
        }, '-=400'); // overlap with previous by 400ms
      }

      // Sync timeline progress to scroll
      const onScroll = () => {
        const scrollPos = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(Math.max(scrollPos / maxScroll, 0), 1);
        tl.seek(tl.duration * progress);
      };
      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="appsclogo-bg">
        <div ref={logoRef} className="appsclogo-svg">
          <div
            className="appsclogo-svg-inner"
            dangerouslySetInnerHTML={{ __html: appsclogoSVG }}
          />
        </div>
      </div>
      <div className="content-container appsclogo-content" style={{ padding: "2rem" }}>
        <h1>Andhra Pradesh Public Service Commission (APPSC)</h1>
        <p>
          Andhra Pradesh
        </p>
        <h2>Examinations Conducted</h2>
        <ul>
          <li>Group I Services Examination</li>
        </ul>
        <h2>Eligibility and Syllabus</h2>
        <p>
          Eligibility varies based on the post applied for. Generally, candidates
          must hold a graduate degree and meet age criteria set by the commission.
          The syllabus typically includes General Studies, Mental Ability, and
          subject-specific papers.
        </p>
        <h2>Preparation Resources</h2>
        <p>
          Candidates are encouraged to follow official notifications on the APPSC
          website, refer to recommended textbooks, practice previous papers, and
          stay updated with current affairs.
        </p>
        <p>
          Candidates are encouraged to follow official notifications on the APPSC
          website, refer to recommended textbooks, practice previous papers, and
          stay updated with current affairs.
        </p>
        <p>
          Candidates are encouraged to follow official notifications on the APPSC
          website, refer to recommended textbooks, practice previous papers, and
          stay updated with current affairs.
        </p>
        <p>
          Candidates are encouraged to follow official notifications on the APPSC
          website, refer to recommended textbooks, practice previous papers, and
          stay updated with current affairs.
        </p>
        <p>
          Candidates are encouraged to follow official notifications on the APPSC
          website, refer to recommended textbooks, practice previous papers, and
          stay updated with current affairs.
        </p>
        <p>
          Candidates are encouraged to follow official notifications on the APPSC
          website, refer to recommended textbooks, practice previous papers, and
          stay updated with current affairs.
        </p>
        <p>
          Candidates are encouraged to follow official notifications on the APPSC
          website, refer to recommended textbooks, practice previous papers, and
          stay updated with current affairs.
        </p>
        <p>
          Candidates are encouraged to follow official notifications on the APPSC
          website, refer to recommended textbooks, practice previous papers, and
          stay updated with current affairs.
        </p>
        <p>
          Candidates are encouraged to follow official notifications on the APPSC
          website, refer to recommended textbooks, practice previous papers, and
          stay updated with current affairs.
        </p><p>
          Candidates are encouraged to follow official notifications on the APPSC
          website, refer to recommended textbooks, practice previous papers, and
          stay updated with current affairs.
        </p><p>
          Candidates are encouraged to follow official notifications on the APPSC
          website, refer to recommended textbooks, practice previous papers, and
          stay updated with current affairs.
        </p><p>
          Candidates are encouraged to follow official notifications on the APPSC
          website, refer to recommended textbooks, practice previous papers, and
          stay updated with current affairs.
        </p><p>
          Candidates are encouraged to follow official notifications on the APPSC
          website, refer to recommended textbooks, practice previous papers, and
          stay updated with current affairs.
        </p><p>
          Candidates are encouraged to follow official notifications on the APPSC
          website, refer to recommended textbooks, practice previous papers, and
          stay updated with current affairs.
        </p><p>
          Candidates are encouraged to follow official notifications on the APPSC
          website, refer to recommended textbooks, practice previous papers, and
          stay updated with current affairs.
        </p><p>
          Candidates are encouraged to follow official notifications on the APPSC
          website, refer to recommended textbooks, practice previous papers, and
          stay updated with current affairs.
        </p><p>
          Candidates are encouraged to follow official notifications on the APPSC
          website, refer to recommended textbooks, practice previous papers, and
          stay updated with current affairs.
        </p><p>
          Candidates are encouraged to follow official notifications on the APPSC
          website, refer to recommended textbooks, practice previous papers, and
          stay updated with current affairs.
        </p><p>
          Candidates are encouraged to follow official notifications on the APPSC
          website, refer to recommended textbooks, practice previous papers, and
          stay updated with current affairs.
        </p><p>
          Candidates are encouraged to follow official notifications on the APPSC
          website, refer to recommended textbooks, practice previous papers, and
          stay updated with current affairs.
        </p><p>
          Candidates are encouraged to follow official notifications on the APPSC
          website, refer to recommended textbooks, practice previous papers, and
          stay updated with current affairs.
        </p><p>
          Candidates are encouraged to follow official notifications on the APPSC
          website, refer to recommended textbooks, practice previous papers, and
          stay updated with current affairs.
        </p><p>
          Candidates are encouraged to follow official notifications on the APPSC
          website, refer to recommended textbooks, practice previous papers, and
          stay updated with current affairs.
        </p><p>
          Candidates are encouraged to follow official notifications on the APPSC
          website, refer to recommended textbooks, practice previous papers, and
          stay updated with current affairs.
        </p><p>
          Candidates are encouraged to follow official notifications on the APPSC
          website, refer to recommended textbooks, practice previous papers, and
          stay updated with current affairs.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default APPSC;