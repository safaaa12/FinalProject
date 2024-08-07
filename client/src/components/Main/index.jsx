import React, { useState } from 'react';
import { Row, Col, Carousel } from 'react-bootstrap';
import ProductSearch from '../Search/ProductSearchComponent.jsx';
import ListComponent from '../List/List.js';
import "./styles.css";
import Categories from "../category/categories";
import { useNavigate } from 'react-router-dom';
import PriceChart from './PriceChart'; // ייבוא הקומפוננטה החדשה

const Main = () => {
  const [productsList, setProductsList] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert("עליך להתחבר לפני שתוכל להוסיף לרשימה.");
      navigate('/Login');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/productsList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ products: productsList.split('\n').map(item => item.trim()) }),
      });

      if (response.ok) {
        const data = await response.json();
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
    <div>
      <Row style={{ justifyContent: 'space-between' }}>
      <Col md={12} lg={7} className='ProductSearchContainer'>
          <div className="ProductSearch-container">
            <ProductSearch />
          </div>
        </Col>
        <Col md={12} lg={7} className='listContainer'>
          <div className="products-input">
            <form onSubmit={handleFormSubmit}>
              <textarea
                id="productsListText"
                value={productsList}
                onChange={(e) => setProductsList(e.target.value)}
                placeholder="הזן את המוצרים כאן, כל מוצר בשורה נפרדת"
              ></textarea>
              <button type="submit">הוספה לרשימת הקניות</button>
            </form>
          </div>
          {showSearchResults && <ListComponent searchResults={searchResults} />}
        </Col>
        <Col md={12} lg={4} className="categories-column">
        <Categories />
        </Col>
        <Col md={12} lg={4} className='pricechartcontainer'>
          <PriceChart /> {/* הוספת תרשים המחירים */}
        </Col>
        <Col md={12} lg={4} className="carousel-container">
          <Carousel nextIcon={<span aria-hidden="true" className="carousel-control-next-icon custom-carousel-control" />} prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon custom-carousel-control" />}>
            <Carousel.Item>
              <div className="image-container">
                <img
                  className="d-block bordered-image"
                  src="hlogo2.png"
                  alt="First slide"
                  style={{ width: '700px', height: '500px' }}
                />
              </div>
              <Carousel.Caption className="custom-carousel-caption">
                <h3></h3>
                <p></p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <div className="image-container">
                <img
                  className="d-block bordered-image"
                  src="logo.png"
                  alt="Second slide"
                  style={{ width: '700px', height: '500px' }}
                />
              </div>
              <Carousel.Caption className="custom-carousel-caption">
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <div className="image-container">
                <img
                  className="d-block bordered-image"
                  src="logo2.png"
                  alt="Third slide"
                  style={{ width: '700px', height: '500px' }}
                />
              </div>
              <Carousel.Caption className="custom-carousel-caption">
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </div>
  );
};

export default Main;
