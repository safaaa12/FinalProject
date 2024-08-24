import React, { useState, useEffect } from 'react';
import { Row, Col, Carousel, Button, Alert } from 'react-bootstrap';
import { TextField } from '@mui/material';
import { Link, useNavigate } from "react-router-dom"; // שימוש ב-useNavigate
import ProductSearch from '../Search/ProductSearchComponent.jsx';
import ListComponent from '../List/List.js';
import axios from 'axios';
import "./styles.css";
import Categories from "../category/categories";

const Main = () => {
  const [queries, setQueries] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [articles, setArticles] = useState([]);
  const [recipes, setRecipes] = useState([]);

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

  useEffect(() => {
    axios.get('http://localhost:3000/api/articles/list')
      .then((res) => setArticles(res.data.articles))
      .catch((err) => console.error('Error:', err));
      
    axios.get('http://localhost:3000/api/recipes/list')
      .then((res) => setRecipes(res.data.recipes))
      .catch((err) => console.error('Error:', err));
  }, []);

  const defaultImage = "AS.png";

  return (
    <div>
      <Row style={{ justifyContent: 'space-between' }}>
        <Col md={12} lg={7} className='ProductSearchContainer'>
          <div className="ProductSearch-container">
            <ProductSearch />
          </div>
        </Col>
      </Row>
      <Row className="flex-container">
        <Col md={12} lg={6} className="carousel-container">
        <Alert variant="info" className="text-center">
        <h4>הצטרפו למערכת שלנו עכשיו!</h4>
        <p>קבלו גישה להנחות ומבצעים מיוחדים <Link to="/signup">הירשמו עכשיו</Link></p>
      </Alert>
        <div className="moving-title-container">
            <div className="moving-title">קראו את הכתבות המובילות שלנו</div>
          </div>
          <Carousel style={{ borderRadius: '10px', overflow: 'hidden' }}>
            {articles.map(article => (
              <Carousel.Item key={article.id}>
                <img
                  className="d-block w-100"
                  src={article.imageUrl || defaultImage}
                  alt={article.title}
                  onClick={() => window.location.href = `/articles/${article.id}`}
                  style={{ width: '260px', height: '290px', objectFit: 'cover' }}
                />
                <Carousel.Caption className="custom-carousel-caption">
                  <h3 className="highlighted-title">{article.title}</h3>
                  <p onClick={() => window.location.href = `/articles`}>{article.author}</p>
                  <Button
                    className="custom-button"
                    onClick={() => window.location.href = `/articles`}
                  >
                    קרא עוד
                  </Button>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
            {recipes.map(recipe => (
              <Carousel.Item key={recipe.id}>
                <img
                  className="d-block w-100"
                  src={recipe.imageUrl || defaultImage}
                  alt={recipe.title}
                  onClick={() => window.location.href = `/recipes/${recipe.id}`}
                  style={{ width: '270px', height: '300px', objectFit: 'cover' }}
                />
                <Carousel.Caption className="custom-carousel-caption">
                  <h3 className="highlighted-title">{recipe.title}</h3>
                  <p onClick={() => window.location.href = `/recipes`}>{recipe.author}</p>
                  <Button
                    className="custom-button"
                    onClick={() => window.location.href = `/recipes/${recipe.id}`}                   
                     >
                    קרא עוד
                  </Button>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col md={12} lg={6} className="categories-column">
          <Categories />
        </Col>
      </Row>
      <Row>
        <Col md={12} lg={7} className='listContainer'>
          <TextField 
            label="הזן את המוצרים כאן, כל מוצר בשורה נפרדת"
            variant="outlined"
            multiline
            rows={6}
            value={queries}
            onChange={(e) => setQueries(e.target.value)}
            style={{ marginBottom: '20px', width: '100%' }}
          />
          <Button variant="contained" color="primary" onClick={handleSearch} className="search-button">חפש</Button>
          <Button variant="contained" color="secondary" onClick={handleSave} className="save-button">שמור רשימה</Button>
          {searchResults && <ListComponent searchResults={searchResults} />}
        </Col>
      </Row>
    </div>
  );
};

export default Main;
