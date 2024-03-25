import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const ListComponent = ({ searchResults }) => {
  return (
    <div className="list-component">
      {searchResults && searchResults.sourcesProducts && searchResults.sourcesPrices ? (
        <div>
          <h2>Supermarket Lists</h2>
          {Object.entries(searchResults.sourcesProducts).map(([SourceName, products]) => (
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>{SourceName}: {searchResults.sourcesPrices[SourceName]}</Card.Title>
                <ListGroup variant="flush">
                  {
                    Object.entries(products).map(([productName, product]) => (
                      <ListGroup.Item>
                        {productName}
                        {product.price}
                        <img src={product.image} />
                      </ListGroup.Item>
                    ))}
                </ListGroup>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <p>Loading cheapest supplier...</p>
      )}
    </div>
  );
};

export default ListComponent;

