import React, { useEffect, useState } from "react";
import "../styles/Hero.css";
import { generateBibleResponse } from "../utils/openai";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { FaTwitter, FaFacebook, FaWhatsapp, FaCopy } from 'react-icons/fa';
import Auth from "../utils/auth";

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
  const [shareAnchorEl, setShareAnchorEl] = useState(null);
  const [showCopySuccess, setShowCopySuccess] = useState(false);

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

  const handleShareClick = (event) => {
    setShareAnchorEl(event.currentTarget);
  };

  const handleShareClose = () => {
    setShareAnchorEl(null);
  };

  const handleShare = (platform) => {
    const shareText = `Daily Bible Verse: ${verseOfTheDay}`;
    const encodedText = encodeURIComponent(shareText);
    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&quote=${encodedText}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedText}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareText).then(() => {
          setShowCopySuccess(true);
          setTimeout(() => setShowCopySuccess(false), 2000);
        });
        break;
      default:
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
    handleShareClose();
  };

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

  const isLoggedIn = Auth.loggedIn();
  const saveButtonText = isLoggedIn ? "Save" : "Save Verse";

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
              <button className="verse-share-btn" onClick={handleShareClick}>
                Share Verse
              </button>
              <Tooltip 
                title={!isLoggedIn ? "Please login to save verses" : ""}
                placement="top"
              >
                <span className="tooltip-wrapper">
                  <button 
                    className={`verse-save-btn ${!isLoggedIn ? 'disabled' : ''}`}
                    onClick={() => isLoggedIn && handleSaveVerse()}
                  >
                    {saveButtonText}
                  </button>
                </span>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      {/* Share Menu */}
      <Menu
        anchorEl={shareAnchorEl}
        open={Boolean(shareAnchorEl)}
        onClose={handleShareClose}
        className="share-menu"
      >
        <MenuItem onClick={() => handleShare('twitter')}>
          <ListItemIcon>
            <FaTwitter className="share-icon twitter" />
          </ListItemIcon>
          <ListItemText>Share on Twitter</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleShare('facebook')}>
          <ListItemIcon>
            <FaFacebook className="share-icon facebook" />
          </ListItemIcon>
          <ListItemText>Share on Facebook</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleShare('whatsapp')}>
          <ListItemIcon>
            <FaWhatsapp className="share-icon whatsapp" />
          </ListItemIcon>
          <ListItemText>Share on WhatsApp</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleShare('copy')}>
          <ListItemIcon>
            <FaCopy className="share-icon" />
          </ListItemIcon>
          <ListItemText>{showCopySuccess ? 'Copied!' : 'Copy to Clipboard'}</ListItemText>
        </MenuItem>
      </Menu>

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
