import React, { useState } from 'react';

const ProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const searchProducts = async () => {
    if (!searchQuery) {
      alert('Please enter a search query.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products: [searchQuery] }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResults(data[searchQuery] || []);
    } catch (error) {
      console.error('Error during search:', error);
      setError('Failed to fetch results.');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter product name..."
      />
      <button onClick={searchProducts}>Search</button>
      <div id="results">
        {error && <p>{error}</p>}
        {results.map((product, index) => (
          <div key={index}>
            <p>{product.name} - {product.price}- {product.imge} </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSearch;
