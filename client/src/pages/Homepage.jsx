// Homepage.jsx
import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import ImpactStats from "../components/ImpactStats";
import "../styles/HomePage.css";

const Homepage = () => {
  return (
    <div className="homepage">
      <Hero />
      <Features />
      <ImpactStats />
    </div>
  );
};

export default Homepage;
