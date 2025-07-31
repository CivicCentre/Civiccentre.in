

import React from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

const APPSC = () => {
  return (
    <>
      <Navbar />
      <div className="content-container" style={{ padding: "2rem" }}>
        <h1>Andhra Pradesh Public Service Commission (APPSC)</h1>
        <p>
          The Andhra Pradesh Public Service Commission (APPSC) is responsible for
          conducting civil services examinations and various other recruitment
          tests for appointments to the services of the state. It also advises the
          government on matters relating to recruitment, transfers, and promotions.
        </p>
        <h2>Examinations Conducted</h2>
        <ul>
          <li>Group I Services Examination</li>
          <li>Group II Services Examination</li>
          <li>Group III and IV Services</li>
          <li>Departmental Tests</li>
          <li>Other Recruitment Examinations</li>
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
      </div>
      <Footer />
    </>
  );
};

export default APPSC;