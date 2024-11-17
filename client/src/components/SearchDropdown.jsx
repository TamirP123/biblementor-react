import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  InputBase,
  IconButton,
} from '@mui/material';
import { FaSearch, FaTimes } from 'react-icons/fa';
import '../styles/SearchDropdown.css';

const SearchDropdown = ({ onClose, onSubmit, searchQuery, setSearchQuery }) => {
  useEffect(() => {
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSubmit(searchQuery.trim());
      onClose();
    }
  };

  const handleSneakerClick = () => {
    onClose();
  };

  return (
    <Box className="search-dropdown">
      <Box className="search-header">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <FaSearch className="search-icon" />
          <InputBase
            placeholder="Search…"
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
            autoFocus
          />
        </form>
        <IconButton onClick={onClose} className="close-button">
          <FaTimes />
        </IconButton>
      </Box>
      <Box className="search-content">
        <Typography variant="h6" className="section-title">
          {searchQuery ? 'Search Results' : 'Search'}
        </Typography>
        {searchQuery && (
          <Typography variant="body1" className="no-results">
            No results found matching your search.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default SearchDropdown;