import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import './ListComponent.css'; // Import the CSS file here
import axios from 'axios';

const ListComponent = ({ searchResults }) => {

  const handleToggleFavorite = async (e) => {
    e.preventDefault();
    try {
      console.log(e.target);
      let button = null;

      if (!e.target.matches("button"))
        button = e.target.closest("button");
      else
        button = e.target;

      const url = "http://localhost:3000/api/user/favorites/update";
      const res = await axios.post(url, {
        id: localStorage.getItem("id"),
        contentId: button.id
      });

      const diff = res.data.diff;
      let countObj = button.querySelector("span")
      countObj.innerText = parseInt(countObj.innerText) + diff;
      let heart = button.querySelector("path")
      heart.style.color = diff === 1 ? "red" : "white";
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleSave = ({ currentTarget: btn }) => {
    let jsonProductsText = document.getElementById("productsListText").innerHTML;
    let jsonProducts = jsonProductsText.split('\n').map(item => item.trim());

    const url = "http://localhost:3000/api/user/basket/add";
    const res = axios.post(url, {
      id: localStorage.getItem("id"),
      basket: jsonProducts
    });

  };

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
                        <img src={product.image} alt={product.name} style={{ width: '60px', height: 'auto', marginBottom: '10px' }} />
                        <div>{product.name}</div>
                        <div>{Number(parseFloat(product.price).toFixed(2))}₪</div>
                      </div>
                    ))}
                  </div>
                </ListGroup>
                <Button className="saveButtonStyle" onClick={handleSave}>שמירת הרשימה</Button>
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
