import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const Category = (props) => {
    const { image, title, path } = props;

    return (
        <Link to={path} style={{ textDecoration: "none" }}>
            <div style={{ textAlign: "center" }}>
                <Image style={{ maxWidth: "100px" }} src={`./images/categories/${image}`} alt={title} />
                <p style={{ fontSize: "12px" }}>{title}</p>
            </div>
        </Link>
    );
}

export default Category;
