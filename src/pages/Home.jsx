import Navbar from "../Components/Navbar";
import React from "react";
import "./Home.css"; // Assuming you have a CSS file for styling
import Footer from"../Components/Footer"; // Importing Footer component if needed
const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-content">
        <h1>Welcome to Our Website</h1>
        <p>This is the home page content.</p>
        {/* Add more content here as needed */}
      </div>
      <Footer />
    </div>
  );
}
export default Home;