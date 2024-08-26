import React, { Component } from 'react';
import './styles.css';
import axios from 'axios';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class Coupons extends Component {
  state = {
    data: JSON.parse(localStorage.getItem('coupons')),
    error: null
  };

  componentDidMount() {
    if (!this.state.data) {
      this.getData();
    }
  }

  getData() {
    axios
      .get('http://localhost:3000/api/coupons')
      .then(({ data }) => {
        this.setState({ data });
        localStorage.setItem('coupons', JSON.stringify(data));
        console.log(data);
      })
      .catch((err) => {
        this.setState({ error: err.message });
      });
  }

  render() {
    const { data, error } = this.state;
    return (
      <div className='Coupons'>
        <h1>דף מבצעים</h1>
        {data ? (
          <div className="coupon-container">
            {Object.entries(data).map(([source, products]) => (
              <div className="coupon-item" key={source}>
                <h2>{source}</h2>
                <ListGroup>
                  {products.map((product, index) => (
                    <ListGroupItem key={index} className="coupon-product">
                      <img src={product.image} alt={product.description} />
                      <p className="price-text">{product.priceText}</p>
                      <p>{product.description}</p>
                      <code>{product.until}</code>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-error">שגיאה בטעינת המבצעים: {error}</div>
        ) : (
          <div className="text-center">טוען מבצעים...</div>
        )}
      </div>
    );
  }
}
