// Homepage.jsx
import React from "react";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import "../styles/HomePage.css";

const Homepage = () => {
  return (
    <div className="homepage">
      <Hero />
      <Footer />
    </div>
  );
};

export default Homepage;
