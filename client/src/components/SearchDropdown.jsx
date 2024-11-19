import React, { useState } from 'react';
import { Box, InputBase } from '@mui/material';
import { FaSearch } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/SearchDropdown.css';

const SearchDropdown = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Reset search when location changes
  React.useEffect(() => {
    setSearchQuery('');
  }, [location]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Force navigation even if on same route
      navigate('/', { replace: true });
      navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <Box className="search-dropdown">
      <form onSubmit={handleSearchSubmit} className="search-form">
        <InputBase
          placeholder="Search Bible..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        <FaSearch className="search-icon" onClick={handleSearchSubmit} />
      </form>
    </Box>
  );
};

export default SearchDropdown;