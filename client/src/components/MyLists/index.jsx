import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import "./index.css";

const MyLists = () => {
    const [baskets, setBaskets] = useState(null);

    const handleDelete = async ({ currentTarget: btn }) => {
        const url = "http://localhost:3000/api/user/basket/delete";
        try {
            const res = await axios.post(url, {
                id: localStorage.getItem("id"),
                basketIndex: parseInt(btn.id)
            });
            console.log(res);
            setBaskets(baskets.filter((_, index) => index !== parseInt(btn.id)));
        } catch (error) {
            console.error('Error deleting basket:', error);
        }
    };

    useEffect(() => {
        const fetchBaskets = async () => {
            try {
                const res = await axios.post('http://localhost:3000/api/user/basket/list', {
                    id: localStorage.getItem("id")
                });
                if (res.data.baskets.length > 0) {
                    setBaskets(res.data.baskets);
                }
            } catch (error) {
                console.error('Error fetching baskets:', error);
            }
        };
        fetchBaskets();
    }, []);

    return (
        <div className="user-management-container">
            <h1>הרשימות שלי</h1>
            {baskets ? (
                baskets.map((basket, index) => (
                    <div key={index} className="list-container">
                        <h2>רשימה {index + 1}</h2>
                        <ul>
                            {basket.map((product, i) => (
                                <li key={i}>{product}</li>
                            ))}
                        </ul>
                        <Button variant="danger" id={index} onClick={handleDelete}>מחק</Button>
                    </div>
                ))
            ) : (
                <div>לא נמצאו רשימות</div>
            )}
        </div>
    );
};

export default MyLists;
