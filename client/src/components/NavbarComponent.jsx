import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
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
import { FaSearch, FaUserCircle } from "react-icons/fa";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "rgba(255, 255, 255, 0.15)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const NavbarComponent = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleSearchClick = () => {
    setIsSearchActive(true);
  };

  const handleSearchClose = () => {
    setIsSearchActive(false);
    setSearchQuery(""); // Reset search query when closing
  };

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

  const handleSaleClick = (e) => {
    e.preventDefault();
    navigate("/sneakers?sale=true");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/sneakers?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchActive(false);
      setSearchQuery("");
    }
  };

  return (
    <AppBar
      position="fixed"
      className={`navbar ${scrolled ? "scrolled" : ""}`}
      elevation={0}
    >
      <Toolbar className="toolbar">
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography variant="h4" className="navbar-title">
            Bible Mentor
          </Typography>
        </Link>
        <Box className="navbar-links">
          <Link to="/" style={{ textDecoration: "none" }}>
            <a href="#" className="nav-link">
              Bible
            </a>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <a href="#" className="nav-link">
              Topics
            </a>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <a href="#" className="nav-link">
              AI Insights
            </a>
          </Link>
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
                <MenuItem
                  onClick={handleAccountClose}
                  component={Link}
                  to="/orders"
                >
                  Prayer Requests
                </MenuItem>
                <MenuItem
                  onClick={handleAccountClose}
                  component={Link}
                  to="/favorites"
                >
                  My Verses
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <a href="#" className="nav-link" style={{ marginLeft: "auto" }}>
                Login
              </a>
            </Link>
          )}
        </Box>
        {isMobile && (
          <Button onClick={handleSearchClick} className="search-button">
            <FaSearch />
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavbarComponent;
