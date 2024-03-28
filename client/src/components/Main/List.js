import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button'; // Import Button here

const ListComponent = ({ searchResults }) => {
  const scrollableListGroupStyle = {
    maxHeight: '250px',
    overflowY: 'auto'
  };

  const mainCardStyle = {
    width: '100%',
    maxWidth: '300px',
    margin: '20px auto', // Center the card with margins
    marginBottom: '1rem'
  };

  const productsContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  };

  const productCardStyle = {
    width: '25%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '10px',
    padding: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const saveButtonStyle = {
    width: '100%', // Make the button match the card width
    marginTop: '20px', // Add some space above the button
    backgroundColor: '#007bff', // Bootstrap primary color
    borderColor: '#007bff',
    color: 'white',
    padding: '10px 0', // Increase padding for better touch area and visual size
    fontSize: '1rem', // Increase font size for better readability
    borderRadius: '0.25rem' // Match Bootstrap's border radius for buttons
  };

  return (
    <div className="list-component" style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center', margin: '10px 0' }}>Supermarket Lists</h2>
      {searchResults && searchResults.sourcesProducts && searchResults.sourcesPrices ? (
        <div>
          {Object.entries(searchResults.sourcesProducts).map(([sourceName, products]) => (
            <Card style={mainCardStyle} key={sourceName}>
              <Card.Body>
                <Card.Title>{sourceName}: {searchResults.sourcesPrices[sourceName]}₪</Card.Title>
                <ListGroup variant="flush" style={scrollableListGroupStyle}>
                  <div style={productsContainerStyle}>
                    {Object.entries(products).map(([productName, product]) => (
                      <div style={productCardStyle} key={productName}>
                        <img src={product.image} alt={product.name} style={{ width: '80px', height: 'auto', marginBottom: '10px' }}/>
                        <div>{product.name}</div>
                        <div>{Number(parseFloat(product.price).toFixed(2))}₪</div>
                      </div>
                    ))}
                  </div>
                </ListGroup>
                <Button style={saveButtonStyle}>שמירת הרשימה</Button> {/* Styled Save List button */}
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
