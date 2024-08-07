import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Modal, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import './SearchResults.css';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState('');
  const [newListName, setNewListName] = useState('');

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

  const fetchLists = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/user/lists', {
        params: { userId: localStorage.getItem("id") }
      });

      if (Array.isArray(response.data)) {
        setLists(response.data);
      } else {
        setLists([]);
      }

      console.log('Fetched lists:', response.data);
    } catch (error) {
      console.error("Error fetching lists", error);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  const getImageUrl = (url) => {
    if (url.startsWith('http')) {
      return url;
    } else {
      return `http://localhost:3000/product_images/${url}`;
    }
  };

  const handleAddToList = (product) => {
    setSelectedProduct(product.ItemName);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const listId = selectedList || newListName;
      if (!listId) {
        alert("Please select or enter a list name");
        return;
      }

      console.log(`Adding product to list: ${selectedProduct} in list: ${listId}`);

      const url = "http://localhost:3000/api/user/add-to-list";
      const response = await axios.post(url, {
        userId: localStorage.getItem("id"),
        listId,
        product: selectedProduct
      });

      if (response.status === 200) {
        console.log("Product added to list successfully");

        if (selectedList) {
          const updatedLists = lists.map((list) =>
            list._id === listId
              ? { ...list, products: [...list.products, selectedProduct] }
              : list
          );
          setLists(updatedLists);
        } else {
          setLists([...lists, { _id: response.data.newListId, name: newListName, products: [selectedProduct] }]);
        }

        setShowModal(false);
        setSelectedProduct(null);
        setSelectedList('');
        setNewListName('');
      } else {
        console.error('Failed to add product to list:', response.status);
      }
    } catch (error) {
      console.error("Error adding product to list", error);
    }
  };

  return (
    <Container>
      <div className="cards-container">
        {results.map((product, index) => (
          <div className="product-card" key={index}>
            <img
              className="product-image"
              src={getImageUrl(product.ImageUrl)}
              alt={product.ItemName}
            />
            <div className="product-info">
              <h5>{product.ItemName}</h5>
              <p>מחיר: {product.ItemPrice}</p>
              <p>ספק: {product.ManufacturerName}</p>
              <p>מקור: {product.Source}</p>
              <Button variant="contained" color="primary" onClick={() => handleAddToList(product)}>הוסף לרשימה</Button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div className="modal-content">
          <h2>בחר רשימה או צור רשימה חדשה</h2>
          <FormControl fullWidth>
            <InputLabel id="select-list-label">בחר רשימה</InputLabel>
            <Select
              labelId="select-list-label"
              value={selectedList}
              onChange={(e) => setSelectedList(e.target.value)}
            >
              {Array.isArray(lists) && lists.map((list, index) => (
                <MenuItem key={index} value={list._id}>{list.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="שם רשימה חדשה"
            variant="outlined"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            style={{ marginTop: '1rem' }}
          />
          <Button variant="contained" color="primary" onClick={handleSave} style={{ marginTop: '1rem' }}>שמור</Button>
        </div>
      </Modal>
    </Container>
  );
};

export default SearchResults;
