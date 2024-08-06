import React, { Component } from 'react';
import './styles.css';
import axios from 'axios';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class Coupons extends Component {
  state = {};

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios
      .get('http://localhost:3000/api/coupons')
      .then(({ data }) => {
        this.setState({ data });
        console.log(data);
      })
      .catch((err) => {
        this.setState({ error: err.message });
      });
  }

  render() {
    return (
      <div className='Coupons'>
        <h1 className="text-center">קופונים</h1>
        {this.state.data ? (
          <div className="text-center">
            <div className="d-flex justify-content-center">
              {Object.entries(this.state.data).map(([source, products]) => (
                <div style={{ width: 'max-content', margin: '10px' }} key={source}>
                  <h2>{source}</h2>
                  <ListGroup className="d-inline-flex">
                    {products.map((product, index) => (
                      <ListGroupItem key={index}>
                        <img src={product.image} alt={product.description} style={{ width: '100px', height: 'auto' }} />
                        <p>{product.pricetext}</p>
                        <p>{product.description}</p>
                        <code>{product.until}</code>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                </div>
              ))}
            </div>
          </div>
        ) : this.state.error ? (
          <div className="text-center">{this.state.error}</div>
        ) : (
          <div className="text-center">Loading...</div>
        )}
      </div>
    );
  }
}
