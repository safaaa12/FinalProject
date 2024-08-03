import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from '@mui/material';
import './SearchResults.css';

const SearchResults = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const query = localStorage.getItem('searchQuery');
    const location = localStorage.getItem('searchLocation');

    const fetchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/search?q=${query}&location=${location}`);
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching search results", error);
      }
    };

    fetchResults();
  }, []);

  return (
    <Container>
      <div className="cards-container">
        {results.map((product, index) => (
          <div className="product-card" key={index}>
            <img
              className="product-image"
              src={`http://localhost:3000/product_images/${product.ImageUrl}`}
              alt={product.ItemName}
            />
            <div className="product-info">
              <h5>{product.ItemName}</h5>
              <p>מחיר: {product.ItemPrice}</p>
              <p>ספק: {product.ManufacturerName}</p>
              <p>מקור: {product.Source}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default SearchResults;
