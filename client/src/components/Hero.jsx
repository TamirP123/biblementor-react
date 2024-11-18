import React, { useEffect, useState } from "react";
import "../styles/Hero.css";

const verses = [
  "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future. - Jeremiah 29:11",
  "I can do all things through Christ who strengthens me. - Philippians 4:13",
  "The Lord is my shepherd; I shall not want. - Psalm 23:1",
  "And we know that in all things God works for the good of those who love him, who have been called according to his purpose. - Romans 8:28",
  "Trust in the Lord with all your heart and lean not on your own understanding. - Proverbs 3:5",
];

const Hero = () => {
  const [verseOfTheDay, setVerseOfTheDay] = useState("");

  useEffect(() => {
    const now = new Date();
    const lastUpdated = localStorage.getItem("verseLastUpdated");
    const verse = localStorage.getItem("verseOfTheDay");

    if (!lastUpdated || now - new Date(lastUpdated) > 24 * 60 * 60 * 1000) {
      const randomIndex = Math.floor(Math.random() * verses.length);
      const newVerse = verses[randomIndex];
      localStorage.setItem("verseOfTheDay", newVerse);
      localStorage.setItem("verseLastUpdated", now.toISOString());
      setVerseOfTheDay(newVerse);
    } else {
      setVerseOfTheDay(verse);
    }
  }, []);

  return (
    <div className="hero">
      {/* <div className="hero-overlay">
        <h1>Welcome to Bible Mentor</h1>
        <p className="verse-of-the-day">{verseOfTheDay}</p>
        <button className="cta-button">Explore More</button>
      </div> */}
    </div>
  );
};

export default Hero;
