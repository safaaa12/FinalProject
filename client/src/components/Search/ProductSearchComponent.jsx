import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './ProductSearch.css';

const ProductSearch = () => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    localStorage.setItem('searchQuery', query);
    localStorage.setItem('searchLocation', location);
    navigate('/search-results');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Container>
      <div className="product-search-container">
        <TextField
          className="search-input"
          label="חפש מוצר"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <IconButton color="primary" onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </div>
    </Container>
  );
};

export default ProductSearch;
