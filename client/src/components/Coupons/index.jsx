import React, { useState } from 'react';
import { Component } from 'react';
import "./styles.css";
import axios from 'axios';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class Coupons extends Component {
  state = {};

  componentDidMount() {
    this.getData()
  }

  getData() {
    axios
      .get('http://localhost:3000/api/coupons')
      .then(({ data }) => {
        this.setState({ data })
        console.log(data)
      })
      .catch(err => {
        this.setState({ error: err.message })
      })
  }

  // constructor(props) {
  //   super(props);
  //   this.initialize();
  // }
  render() {
    return this.state.data
      ? <div class="text-center">
        <h1>Sales</h1>
        <div class="d-flex">
          {Object.entries(this.state.data).map(([source, products]) =>
            <div style={{ width: 'max-content' }}>
              <h2>{source}</h2>
              <ListGroup class="d-inline-flex">
                {products.map((product) =>
                  <ListGroupItem>
                    <img
                      src={product.image}
                    />
                    <p>{product.pricetext}</p>
                    <p>{product.description}</p>
                    <code>{product.until}</code>
                  </ListGroupItem>
                )}
              </ListGroup>
            </div>
          )}
        </div>
      </div>
      : this.state.error
        ? <div>{this.state.error}</div>
        : <div>Loading...</div>
  }
}
