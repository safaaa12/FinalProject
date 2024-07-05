import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const MyLists = () => {
    const [baskets, setBaskets] = useState(null);

    const handleDelete = ({ currentTarget: btn }) => {

        const url = "http://localhost:3000/api/user/basket/delete";
        const res = axios.post(url, {
            id: localStorage.getItem("id"),
            basketIndex: parseInt(btn.id)
        });
        console.log(res);
    }
    useEffect(() => {
        axios
            .post('http://localhost:3000/api/user/basket/list', {
                id: localStorage.getItem("id")
            })
            .then((res) => {
                if (res.data.baskets.length > 0) {
                    setBaskets(res.data.baskets)
                }
            })
            .catch((err) => {
                console.log('Error: ' + err)
            })
    }, [setBaskets])

    return (
        <div>
            <h1>הרשימות שלי</h1>
            {baskets ? (baskets.map((basket, index) => (
                <div id={index}>
                    <h2>הרשימה {index + 1}</h2>
                    <Button variant="danger" id={index} onClick={handleDelete}>מחק</Button>
                    <ul>
                        {basket.map((product, i) => (
                            <li id={i}>
                                {product}
                            </li>
                        ))}
                    </ul>
                </div>
            ))) : <div>לא נמצאו רשימות</div>}
        </div>
    )
};

export default MyLists;
