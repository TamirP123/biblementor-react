import React, { useState, useEffect } from "react";
import "../styles/ImpactStats.css";

const ImpactStats = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector(".impact-stats-section");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const stats = [
    {
      number: "10K+",
      label: "Bible Verses Explored",
      description: "Deep spiritual insights and contextual understanding provided",
      icon: "📖"
    },
    {
      number: "5K+",
      label: "Lives Impacted",
      description: "Growing community of believers strengthened in their faith",
      icon: "🙏"
    },
    {
      number: "24/7",
      label: "Spiritual Guidance",
      description: "Available whenever you need biblical wisdom and support",
      icon: "✝️"
    }
  ];

  const benefits = [
    {
      title: "Personalized Scripture Study",
      description: "AI-powered guidance tailored to your spiritual journey and questions",
      color: "#7d5fff"
    },
    {
      title: "Biblical Context & Wisdom",
      description: "Understand the historical and spiritual context of every verse",
      color: "#5f27cd"
    },
    {
      title: "Faith Growth",
      description: "Deepen your relationship with God through informed study and reflection",
      color: "#341f97"
    }
  ];

  return (
    <section className="impact-stats-section">
      <div className="impact-container">
        <h2>Transforming Faith Through Understanding</h2>
        
        <div className={`stats-grid ${isVisible ? 'animate' : ''}`}>
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-number">{stat.number}</div>
              <h3>{stat.label}</h3>
              <p>{stat.description}</p>
            </div>
          ))}
        </div>

        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="benefit-card"
              style={{'--accent-color': benefit.color}}
            >
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
              <div className="benefit-indicator"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats; 