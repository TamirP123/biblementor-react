import React from "react";
import "../styles/Features.css";

const Features = () => {
  return (
    <section className="features">
      <div className="section-container">
        <h2>How Can I Help You Grow?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <i className="feature-icon bible-study"></i>
            <h3>Bible Study Guidance</h3>
            <p>Get personalized study plans and verse explanations</p>
          </div>
          <div className="feature-card">
            <i className="feature-icon question"></i>
            <h3>Ask Questions</h3>
            <p>Get biblical answers to your spiritual questions</p>
          </div>
          <div className="feature-card">
            <i className="feature-icon prayer"></i>
            <h3>Prayer Support</h3>
            <p>Learn about prayer and get prayer suggestions</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features; 