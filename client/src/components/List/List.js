import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import './ListComponent.css'; // Import the CSS file here

const ListComponent = ({ searchResults }) => {
  return (
    <div className="list-component" style={{ maxWidth: '1000px', margin: 'auto' }}>
      <h2 className="text-center" style={{ margin: '20px 0' }}>Supermarket Lists</h2>
      {searchResults && searchResults.sourcesProducts && searchResults.sourcesPrices ? (
        <div className="cardsContainerStyle">
          {Object.entries(searchResults.sourcesProducts).map(([sourceName, products]) => (
            <Card className="mainCardStyle" key={sourceName}>
              <Card.Body>
                <Card.Title>{sourceName}: {Number(parseFloat(searchResults.sourcesPrices[sourceName])).toFixed(2)}₪</Card.Title>
                <ListGroup variant="flush" className="scrollableListGroupStyle">
                  <div className="productsContainerStyle">
                    {Object.entries(products).map(([productName, product]) => (
                      <div className="productCardStyle" key={productName}>
                        <img src={product.image} alt={product.name} style={{ width: '60px', height: 'auto', marginBottom: '10px' }}/>
                        <div>{product.name}</div>
                        <div>{Number(parseFloat(product.price).toFixed(2))}₪</div>
                      </div>
                    ))}
                  </div>
                </ListGroup>
                <Button className="saveButtonStyle">שמירת הרשימה</Button>
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
