import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Button, TextField, Grid, Container } from '@mui/material';

const ProductSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      console.log(`Sending search query: ${query}`);
      const response = await axios.get(`http://localhost:3000/api/search?q=${query}`);
      console.log(`Received search results: ${response.data.length} items`);
      setResults(response.data);
    } catch (error) {
      console.error("Error searching for products", error);
    }
  };

  return (
    <Container style={{ marginTop: '40px' }}>
      <TextField
        label="חפש מוצר"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginBottom: '20px', width: '100%' }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginBottom: '20px' }}>
        חפש
      </Button>
      <Grid container spacing={4}>
        {results.map((product, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={`http://localhost:3000/product_images/${product.ImageUrl}`}
                alt={product.ItemName}
                style={{ objectFit: 'contain' }} // שינוי כאן כדי לשמור על פרופורציה נכונה של התמונה
              />
              <CardContent style={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div" align="center">
                  {product.ItemName}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  מחיר: {product.ItemPrice} 
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  ספק: {product.ManufacturerName}
                </Typography>
               
                <Typography variant="body2" color="text.secondary" align="center">
                  מקור: {product.Source}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductSearch;
