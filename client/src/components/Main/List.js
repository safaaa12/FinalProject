import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const ListComponent = ({ searchResults }) => {
  const scrollableListGroupStyle = {
    maxHeight: '250px',
    overflowY: 'auto'
  };

  const cardsContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center', // Centers cards within the container
    gap: '20px', // Adds space between the cards
  };

  // Adjust the mainCardStyle to work within a flex container
  const mainCardStyle = {
    flex: '1 0 30%', // Allows the card to grow but not shrink, starting at 30% of the container's width
    margin: '0 auto', // Centers the card horizontally in its flex container
    maxWidth: '300px', // Ensures that the card does not grow beyond 300px in width
    marginBottom: '1rem'
  };
  const productsContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start', // Align items to the start to avoid spreading them across the full width
    gap: '10px', // Adjust gap between products
  };
  const productCardStyle = {
    flex: '1 0 calc(33.333% - 10px)', // Allows three items per row, adjusting for the gap
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '10px',
    padding: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center', // Center-align text for neatness
  };
  const saveButtonStyle = {
    width: '100%',
    marginTop: '20px',
    backgroundColor: '#007bff',
    borderColor: '#007bff',
    color: 'white',
    padding: '10px 0',
    fontSize: '1rem',
    borderRadius: '0.25rem'
  };

  return (
    <div className="list-component" style={{ maxWidth: '1000px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center', margin: '20px 0' }}>Supermarket Lists</h2>
      {searchResults && searchResults.sourcesProducts && searchResults.sourcesPrices ? (
        <div style={cardsContainerStyle}>
          {Object.entries(searchResults.sourcesProducts).map(([sourceName, products]) => (
            <Card style={mainCardStyle} key={sourceName}>
              <Card.Body>
                <Card.Title>{sourceName}: {Number(parseFloat(searchResults.sourcesPrices[sourceName])).toFixed(2)}₪</Card.Title>
                <ListGroup variant="flush" style={scrollableListGroupStyle}>
                  <div style={productsContainerStyle}>
                    {Object.entries(products).map(([productName, product]) => (
                      <div style={productCardStyle} key={productName}>
                        <img src={product.image} alt={product.name} style={{ width: '60px', height: 'auto', marginBottom: '10px' }}/>
                        <div>{product.name}</div>
                        <div>{Number(parseFloat(product.price).toFixed(2))}₪</div>
                      </div>
                    ))}
                  </div>
                </ListGroup>
                <Button style={saveButtonStyle}>שמירת הרשימה</Button>
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
