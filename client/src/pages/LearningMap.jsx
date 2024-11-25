import React from 'react';
import BibleMap from '../components/BibleMap';
import '../styles/LearningMap.css';

const LearningMap = () => {
  return (
    <div className="learning-map-page">
      <div className="learning-map-header">
        <h1>Biblical Learning Map</h1>
        <p>Explore the geographical context of biblical events and locations</p>
      </div>
      <div className="learning-map-content">
        <BibleMap />
        <div className="map-features">
          <div className="feature-card">
            <h3>Historical Context</h3>
            <p>Discover the historical significance of biblical locations and their role in Scripture.</p>
          </div>
          <div className="feature-card">
            <h3>Biblical References</h3>
            <p>Find relevant Bible verses connected to each location.</p>
          </div>
          <div className="feature-card">
            <h3>Interactive Learning</h3>
            <p>Click on markers to learn about important biblical sites and events.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningMap; 