import React, { useEffect } from 'react';
import { Box, InputBase, IconButton } from '@mui/material';
import { FaSearch, FaTimes } from 'react-icons/fa';
import '../styles/SearchDropdown.css';

const SearchDropdown = ({ onClose, onSubmit, searchQuery, setSearchQuery }) => {
  useEffect(() => {}, [searchQuery]);

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

  return (
    <Box className="search-dropdown">
      <form onSubmit={handleSearchSubmit} className="search-form">
        <InputBase
          placeholder="Search…"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
          autoFocus
        />
        <FaSearch className="search-icon" />
        <IconButton onClick={onClose} className="close-button">
          <FaTimes />
        </IconButton>
      </form>
    </Box>
  );
};

export default SearchDropdown;