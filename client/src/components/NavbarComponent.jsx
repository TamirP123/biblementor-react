import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import "../styles/Navbar.css";
import SearchDropdown from "./SearchDropdown";
import Auth from "../utils/auth";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useMediaQuery } from "@mui/material";

// Import React Icons
import { FaUserCircle } from "react-icons/fa";

const NavbarComponent = () => {
  const [scrolled, setScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const handleAccountClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    Auth.logout();
    handleAccountClose();
  };

  return (
    <AppBar
      position="fixed"
      className={`navbar ${scrolled ? "scrolled" : ""}`}
      elevation={0}
    >
      <Toolbar className="toolbar">
        <Box className="left-section">
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography variant="h4" className="navbar-title">
              Bible Mentor
            </Typography>
          </Link>
          <Box className="navbar-links">
            <Link to="/" style={{ textDecoration: "none" }}>
              <a href="#" className="nav-link">Bible</a>
            </Link>
            <Link to="/" style={{ textDecoration: "none" }}>
              <a href="#" className="nav-link">Topics</a>
            </Link>
            <Link to="/" style={{ textDecoration: "none" }}>
              <a href="#" className="nav-link">AI Insights</a>
            </Link>
            <div className="search-dropdown-container">
              <SearchDropdown />
            </div>
          </Box>
        </Box>
        <Box className="right-section">
          {Auth.loggedIn() ? (
            <>
              <Button
                className="nav-link account-button"
                onClick={handleAccountClick}
                startIcon={<FaUserCircle />}
              >
                Account
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleAccountClose}
                className="account-menu"
              >
                <MenuItem onClick={handleAccountClose} component={Link} to="/orders">
                  Prayer Requests
                </MenuItem>
                <MenuItem onClick={handleAccountClose} component={Link} to="/favorites">
                  My Verses
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <a href="#" className="login-link">Login</a>
            </Link>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarComponent;
