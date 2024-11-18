import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import SearchDropdown from "./SearchDropdown";
import Auth from "../utils/auth";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useMediaQuery } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

// Import React Icons
import { FaUserCircle } from "react-icons/fa";

const NavbarComponent = () => {
  const [scrolled, setScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const mobileMenuItems = [
    { text: 'Bible', path: '/' },
    { text: 'Topics', path: '/' },
    { text: 'AI Insights', path: '/' },
  ];

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
          
          {!isMobile && (
            <Box className="navbar-links">
              <Link to="/bible" style={{ textDecoration: "none" }}>
                <a href="#" className="nav-link">Bible</a>
              </Link>
              <Link to="/" style={{ textDecoration: "none" }}>
                <a href="#" className="nav-link">Topics</a>
              </Link>
              <Link to="/" style={{ textDecoration: "none" }}>
                <a href="#" className="nav-link">Ask AI</a>
              </Link>
            </Box>
          )}
        </Box>

        <div className={`search-dropdown-container ${isMobile ? 'mobile-search-top' : ''}`}>
          <SearchDropdown />
        </div>

        <Box className="right-section">
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleMobileMenu}
              className="mobile-menu-button"
            >
              <MenuIcon />
            </IconButton>
          )}

          {!isMobile && Auth.loggedIn() ? (
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
          ) : !isMobile ? (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <a href="#" className="login-link">Login</a>
            </Link>
          ) : null}
        </Box>
      </Toolbar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
        className="mobile-drawer"
      >
        <Box className="mobile-menu">
          <List>
            {mobileMenuItems.map((item) => (
              <ListItem 
                button 
                key={item.text} 
                component={Link} 
                to={item.path}
                onClick={toggleMobileMenu}
              >
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
            {Auth.loggedIn() ? (
              <>
                <ListItem button component={Link} to="/orders">
                  <ListItemText primary="Prayer Requests" />
                </ListItem>
                <ListItem button component={Link} to="/favorites">
                  <ListItemText primary="My Verses" />
                </ListItem>
                <ListItem button onClick={handleLogout}>
                  <ListItemText primary="Logout" />
                </ListItem>
              </>
            ) : (
              <ListItem button component={Link} to="/login">
                <ListItemText primary="Login" />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default NavbarComponent;
