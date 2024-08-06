import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "./product";

const CategoryPage = () => {
    const { name } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:3000/api/category/${name}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    // Sorting products by price (ascending)
                    const sortedProducts = data.sort((a, b) => {
                        const priceA = parseFloat(a.ItemPrice.replace(/[^0-9.-]+/g, ""));
                        const priceB = parseFloat(b.ItemPrice.replace(/[^0-9.-]+/g, ""));
                        return priceA - priceB;
                    });
                    setProducts(sortedProducts);
                } else {
                    console.error('Failed to fetch search results:', response.status);
                }
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        }
        fetchData();
    }, [name]);

    return (
        <>
            <h1>המוצרים של קטוגריית {name}</h1>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
                {products.length === 0 ? (
                    <h2>טוען מוצרים...</h2>
                ) : (
                    products.map((product) => (
                        <Product
                            key={product.ItemCode}
                            title={product.ItemName}
                            price={product.ItemPrice}
                            image={product.ImageUrl}
                            source={product.Source}
                        />
                    ))
                )}
            </div>
        </>
    );
}

export default CategoryPage;
