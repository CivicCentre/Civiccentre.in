import Navbar from "../Components/Navbar";
import React from "react";
import "./Home.css"; // Assuming you have a CSS file for styling
import Footer from"../Components/Footer"; // Importing Footer component if needed

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      
      <div className="home-content">
        <div className="hero-section">
          <div className="home-container">
      <section className="hero">
        <div className="hero-left">
           <div className="hero-right">
          <img 
            src="https://static.wixstatic.com/media/64ada7_1a6297ee4ee3444c986f0a9ff7116fe4~mv2.jpg/v1/fill/w_1280,h_439,al_c,q_85,enc_avif,quality_auto/upsc-cse-classroom-program-digital-files-web.jpg" 
            alt="Learning" 
          />
        </div>
        <h1>
            Learn Smarter with <span>CivicCentre IAS</span>
          </h1>
          <p>
            Access live classes, recorded lectures, and study materials 
            from the best mentors. Start your journey today!
          </p>
          <button className="cta-btn">Explore Courses</button>
        </div>
      </section>
        <div className="features-container">
              <div className="feature-box">
                   <img src="/images/live-icon.png" alt="Live" className="feature-icon" />
                   <h3>Daily Live</h3>
                   <p>Interactive classes</p>
              </div>
              <div className="feature-box">
                   <img src="/images/test-icon.png" alt="Tests" className="feature-icon" />
                   <h3>10 Million +</h3>
                   <p>Tests, sample papers & notes</p>
              </div>
              <div className="feature-box">
                   <img src="/images/doubt-icon.png" alt="Doubt" className="feature-icon" />
                   <h3>24 x 7</h3>
                   <p>Doubt solving sessions</p>
             </div>

              <div className="feature-box">
                  <img src="/images/offline-icon.png" alt="Offline" className="feature-icon" />
                  <h3>100 +</h3>
                  <p>Offline centres</p>
              </div>
        </div>
        <section className="free-sources-section">
            <h2>FREE SOURCES</h2>
            <div className="free-sources-container">

           <div className="free-sources-left">
           <div className="source-box"><h2>Daily Current Affairs</h2></div>
           <div className="source-box"><h2>Daily Current Affairs</h2></div>
           <div className="source-box"><h2>Daily Current Affairs</h2></div>
        </div>

        <div className="free-sources-right">
          <marquee behavior="scroll" direction="up" scrollamount="2">
          <p>Latest Announcements in Scroll Type or blinking</p>
          <p>Admissions Open!</p>
          <p>New Batches Starting Soon</p>
         </marquee>
       </div>
       </div>
      </section>
      <section className="courses-section">
          <div className="course-category">
            <h3>UPSC</h3>
          </div>
          <div className="course-category">
            <h3>TGPSC</h3>
          </div>
          <div className="course-category">
            <h3>APPSC</h3>
          </div>
          <div className="course-subheader">
            <p>Classes | Test Series | Material | PYQs | Reflections | Rankers</p>
          </div>
          <div className="course-grid">
            <div className="course-box">Prelims cum Mains</div>
            <div className="course-box">Prelims cum Mains</div>
            <div className="course-box">Exclusive Prelims Course</div>
            <div className="course-box">Prelims Strategy Sessions</div>
          </div>
        </section>
        </div>
          <p>Your one-stop solution for all your needs.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Home;