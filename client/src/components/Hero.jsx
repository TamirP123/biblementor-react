import React, { useEffect, useState } from "react";
import "../styles/Hero.css";
import { generateBibleResponse } from "../utils/openai";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

const verses = [
  "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future. - Jeremiah 29:11",
  "I can do all things through Christ who strengthens me. - Philippians 4:13",
  "The Lord is my shepherd; I shall not want. - Psalm 23:1",
  "And we know that in all things God works for the good of those who love him, who have been called according to his purpose. - Romans 8:28",
  "Trust in the Lord with all your heart and lean not on your own understanding. - Proverbs 3:5",
];

const Hero = () => {
  const [verseOfTheDay, setVerseOfTheDay] = useState("");
  const [openDemo, setOpenDemo] = useState(false);
  const [demoResponse, setDemoResponse] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleDemoClick = async () => {
    setOpenDemo(true);
    setLoading(true);
    try {
      const demoPrompt = `Can you explain the meaning and significance of this Bible verse: "${verseOfTheDay}"`;
      const response = await generateBibleResponse(demoPrompt);
      setDemoResponse(response);
    } catch (error) {
      setDemoResponse("Sorry, there was an error generating the response. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDemo = () => {
    setOpenDemo(false);
    setDemoResponse("");
  };

  return (
    <div className="hero">
      <div className="hero-background">
        <div className="animated-circles">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="circle"></div>
          ))}
        </div>
      </div>
      <div className="hero-content">
        <div className="hero-left">
          <h1>
            Discover Biblical Wisdom with
            <span className="highlight"> AI</span>
          </h1>
          <p className="hero-subtitle">
            Your intelligent companion for deeper biblical understanding and spiritual growth
          </p>
          <div className="cta-container">
            <button className="cta-button primary">
              Start Exploring
            </button>
            <button 
              className="cta-button secondary"
              onClick={handleDemoClick}
            >
              Watch Demo
            </button>
          </div>
        </div>
        <div className="hero-right">
          <div className="verse-card">
            <div className="verse-header">
              <span className="pulse-dot"></span>
              Daily Verse
            </div>
            <p className="verse-text">
              {verseOfTheDay}
            </p>
            <div className="verse-footer">
              <button className="verse-share-btn">Share Verse</button>
              <button className="verse-save-btn">Save</button>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={openDemo}
        onClose={handleCloseDemo}
        maxWidth="md"
        fullWidth
        className="demo-dialog"
      >
        <DialogTitle>
          AI Bible Mentor Demo
        </DialogTitle>
        <DialogContent>
          <div className="demo-content">
            <h3>Today's Verse:</h3>
            <p className="demo-verse">{verseOfTheDay}</p>
            <h3>AI Interpretation:</h3>
            {loading ? (
              <div className="loading-container">
                <CircularProgress />
                <p>Generating response...</p>
              </div>
            ) : (
              <p className="demo-response">{demoResponse}</p>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDemo} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Hero;
