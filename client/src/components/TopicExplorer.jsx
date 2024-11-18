import React from "react";
import "../styles/TopicExplorer.css";

const TopicExplorer = () => {
  return (
    <section className="topic-explorer">
      <div className="section-container">
        <h2>Explore Biblical Topics</h2>
        <div className="topics-grid">
          <button className="topic-button">Salvation</button>
          <button className="topic-button">Prayer</button>
          <button className="topic-button">Faith</button>
          <button className="topic-button">Love</button>
          <button className="topic-button">Hope</button>
          <button className="topic-button">Wisdom</button>
        </div>
      </div>
    </section>
  );
};

export default TopicExplorer; 