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
          <h1>Welcome to My Company</h1>
          <p>Your one-stop solution for all your needs.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Home;