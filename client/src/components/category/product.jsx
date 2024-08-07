import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { Button, Modal, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import axios from 'axios'; // ייבוא axios

const Product = (props) => {
  const { image, price, title, source } = props;
  const formattedPrice = price.includes('₪') ? price : `${price}₪`;
  const [showModal, setShowModal] = useState(false);
  const [selectedList, setSelectedList] = useState('');
  const [newListName, setNewListName] = useState('');
  const [lists, setLists] = useState([]);

  const handleAddToList = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/user/lists', {
        params: { userId: localStorage.getItem("id") }
      });

      if (Array.isArray(response.data)) {
        setLists(response.data);
      } else {
        setLists([]);
      }

      setShowModal(true);
    } catch (error) {
      console.error("Error fetching lists", error);
    }
  };

  const handleSave = async () => {
    try {
      const listId = selectedList || newListName;
      if (!listId) {
        alert("Please select or enter a list name");
        return;
      }

      const response = await axios.post('http://localhost:3000/api/user/add-to-list', {
        userId: localStorage.getItem("id"),
        listId,
        product: title
      });

      if (response.status === 200) {
        console.log("Product added to list successfully");
        setShowModal(false);
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
    <div style={{ textAlign: "center" }}>
      <Image style={{ maxWidth: "100px" }} src={image.startsWith('http') ? image : `http://localhost:3000/product_images/${image}`} alt={title} />
      <p style={{ fontSize: "12px" }}>{title}</p>
      <p style={{ fontSize: "12px" }}>מחיר: {formattedPrice}</p>
      <p style={{ fontSize: "12px" }}>מקור: {source}</p>
      <Button variant="contained" color="primary" onClick={handleAddToList}>הוסף לרשימה</Button>

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
              {Array.isArray(lists) && lists.map((list) => (
                <MenuItem key={list._id} value={list._id}>{list.name}</MenuItem>
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
    </div>
  );
}

export default Product;
