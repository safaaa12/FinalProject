import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import ProductSearch from '../Search/ProductSearchComponent.jsx';
import ListComponent from '../List/List.js';
import './styles.css';

const Main = () => {
  const [queries, setQueries] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/productsList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products: queries.split('\n').map(item => item.trim()) }),
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        console.error('Failed to fetch search results:', response.status);
      }
    } catch (error) {
      console.error('Error searching for products', error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/user/basket/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: localStorage.getItem("id"), basket: queries.split('\n').map(item => item.trim()) }),
      });

      if (response.ok) {
        console.log("List saved successfully");
      } else {
        console.error('Failed to save list:', response.status);
      }
    } catch (error) {
      console.error('Error saving list', error);
    }
  };

  return (
    <div>
      <div className="ProductSearch-container">
        <ProductSearch /> {/* הוספת הקומפוננטה ProductSearch לתחילת הקונטיינר */}
      </div>
      <div>
        <Box my={4}>
          <TextField
            label="הזן את המוצרים כאן, כל מוצר בשורה נפרדת"
            variant="outlined"
            multiline
            rows={6}
            value={queries}
            onChange={(e) => setQueries(e.target.value)}
            style={{ marginBottom: '20px', width: '80%' }}
          />
          <Box display="flex" justifyContent="center" style={{ width: '80%' }}>
            <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginRight: '10px' }}>
              חפש
            </Button>
            <Button variant="contained" color="secondary" onClick={handleSave}>
              שמור רשימה
            </Button>
          </Box>
        </Box>
        {searchResults && <ListComponent searchResults={searchResults} />}
      </div>
    </div>
  );
};

export default Main;
