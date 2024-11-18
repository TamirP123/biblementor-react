// Homepage.jsx
import React from "react";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Features from "../components/Features";
import TopicExplorer from "../components/TopicExplorer";
import "../styles/HomePage.css";

const Homepage = () => {
  return (
    <div className="homepage">
      <Hero />
      <Features />
      <TopicExplorer />
      <Footer />
    </div>
  );
};

export default Homepage;
