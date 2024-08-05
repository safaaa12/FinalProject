import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Category from "./category";

const Categories = () => {
    const categories = [
        {
            image: "bread.png",
            title: "לחמים ומאפים",
            path: "/category/bread"
        },
        {
            image: "meat.png",
            title: "בשר ודגים",
            path: "/category/meat"
        },
        {
            image: "milk.png",
            title: "מוצרי חלב",
            path: "/category/milk"
        },
        {
            image: "fruits.png",
            title: "פירות וירקות",
            path: "/category/Pantry Staples"
        },
        {
            image: "organic.png",
            title: "אורגני ובריאות",
            path: "/category/snacks"
        },
        {
            image: "making.png",
            title:"משקאות",
            path: "/category/Beverage"
        }
    ];

    return (
        <div style={{ textAlign: "center" }}>
            <h3>קטגוריות</h3>
            <Row>
                {categories.map((category) => (
                    <Col style={{ gap: "5px" }} xs={12} sm={6} md={4} key={category.title}>
                        <Category
                            image={category.image}
                            title={category.title}
                            path={category.path}
                            source={category.source}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default Categories;
