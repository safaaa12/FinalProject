import React, { Component } from 'react';
import './styles.css';
import axios from 'axios';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class Coupons extends Component {
  state = {
    data: JSON.parse(localStorage.getItem('coupons')), // Initialize state from localStorage
    error: null
  };

  componentDidMount() {
    if (!this.state.data) {
      this.getData(); // Only fetch data if it's not found in localStorage
    }
  }

  getData() {
    axios
      .get('http://localhost:3000/api/coupons')
      .then(({ data }) => {
        this.setState({ data });
        localStorage.setItem('coupons', JSON.stringify(data)); // Save fetched data to localStorage
        console.log(data);
      })
      .catch((err) => {
        this.setState({ error: err.message });
      });
  }

  render() {
    const { data, error } = this.state; // Destructure for cleaner access
    return (
      <div className='Coupons'>
        <h1 className="text-center">מבצעים</h1>
        {data ? (
          <div className="text-center">
            <div className="d-flex justify-content-center">
              {Object.entries(data).map(([source, products]) => (
                <div style={{ width: 'max-content', margin: '10px' }} key={source}>
                  <h2>{source}</h2>
                  <ListGroup className="d-inline-flex">
                    {products.map((product, index) => (
                      <ListGroupItem key={index}>
                        <img src={product.image} alt={product.description} style={{ width: '100px', height: 'auto' }} />
                        <p>{product.priceText}</p>
                        <p>{product.description}</p>
                        <code>{product.until}</code>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                </div>
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="text-center">{error}</div>
        ) : (
          <div className="text-center">Loading...</div>
        )}
      </div>
    );
  }
}
