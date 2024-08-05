import React from "react";
import { Image } from "react-bootstrap";

const Product = (props) => {
    const { image, price, title, source } = props;
    const formattedPrice = price.includes('₪') ? price : `${price}₪`;

    return (
        <div style={{ textAlign: "center" }}>
            <Image style={{ maxWidth: "100px" }} src={image.startsWith('http') ? image : `http://localhost:3000/product_images/${image}`} alt={title} />
            <p style={{ fontSize: "12px" }}>{title}</p>
            <p style={{ fontSize: "12px" }}>מחיר: {formattedPrice}</p>
            <p style={{ fontSize: "12px" }}>מקור: {source}</p>
        </div>
    );
}

export default Product;
