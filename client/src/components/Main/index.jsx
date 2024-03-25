import React, { useState } from 'react';
import ProductSearch from '../Search/ProductSearchComponent.jsx'; 
import ListComponent from './List.js'; 
import "./styles.css";

const Main = () => {
  const [productsList, setProductsList] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/productsList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products: productsList.split('\n').map(item => item.trim()) }),
      });

      if (response.ok) {
        console.log("ok");
        const data = await response.json();
        console.log(data);
        setSearchResults(data);
        setShowSearchResults(true);
      } else {
        console.error('Failed to fetch search results:', response.status);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="main-container">
      <ProductSearch /> {/* הוספת הקומפוננטה ProductSearch לתחילת הקונטיינר */}
      <div className="products-input">
        <form onSubmit={handleFormSubmit}>
          <textarea
            value={productsList}
            onChange={(e) => setProductsList(e.target.value)}
            placeholder="הזן את המוצרים כאן, כל מוצר בשורה נפרדת"
          ></textarea>
          <button type="submit">הוספה לרשימת הקניות</button>
        </form>
      </div>
      {showSearchResults && <ListComponent searchResults={searchResults} />}
    </div>
  );
};



export default Main;

