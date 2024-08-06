import React from "react";
import { Image } from "react-bootstrap";
import "./product.css";

const Product = (props) => {
    const { image, price, title, source } = props;
    const formattedPrice = price.includes('₪') ? price : `${price}₪`;

    return (
        <div className="product-card">
            <Image className="product-image" src={image.startsWith('http') ? image : `http://localhost:3000/product_images/${image}`} alt={title} />
            <div className="product-info">
                <h5>{title}</h5>
                <p>מחיר: {formattedPrice}</p>
                <p>מקור: {source}</p>
            </div>
        </div>
    );
}

export default Product;
