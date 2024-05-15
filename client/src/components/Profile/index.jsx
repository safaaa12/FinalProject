import "./styles.css";
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom"; // שימוש ב-useNavigate
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

function Profile() {
    const [data, setData] = useState({});
    const navigate = useNavigate(); // יצירת אינסטנס של useNavigate

    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setemail] = useState("");
    const [isTzunai, setTzunai] = useState("");
    const [password, setpassword] = useState("");
    const [loction, setUserId] = useState(null);
    const [success, setsuccess] = useState("");


    useEffect(() => {
        const userEmail = localStorage.getItem('email');
        fetchUser(userEmail);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataobj = Object.fromEntries(formData.entries());
        try {
            const url = "http://localhost:3000/api/article/add";
            const { data: res } = await axios.post(url, formDataobj);
            setsuccess(true);
            e.target.reset();
        } catch (error) {
        }
    };

    async function fetchUser(userEmail) {
        const urlEncodedEmail = encodeURIComponent(userEmail);
        try {
            const response = await axios.get(`http://localhost:3000/api/user/email/${urlEncodedEmail}`);
            setUser(response.data);
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setemail(response.data.email);
            setTzunai(response.data.isTzunai);
            setpassword(response.data.email);
            setUserId(response.data.loction);
        } catch (error) {
            console.log("fetchUser: ", error);
        }
    }

    return (
        <>
            <div className="profile">
                <div className="card_container">
                    <div className="_card">
                        <h2>פרופיל</h2>
                        <div className="form-group">
                            <p for="fname">שם פרטי: {firstName}</p>
                            <p for="lname">שם משפחה: {lastName}</p>
                            <p for="lname">אימייל : {email}</p>
                            <p for="loction">מיקום : {loction}</p>

                        </div>
                    </div>
                </div>
            </div>
            {isTzunai ? (
                <>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>שם הכתבה</Form.Label>
                            <Form.Control required name="title" type="text" placeholder="שם הכתבה" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>הכתבה</Form.Label>
                            <Form.Control required name="text" as="textarea" rows={3} placeholder="משהו מעניין על אוכל!" />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mb-3">
                            שלח
                        </Button>
                    </Form>
                    {success ? (<>
                        <Alert variant="primary">
                            הכתבה נשלחה בהצלחה.
                        </Alert>
                    </>) : (<></>)}
                </>
            ) : (
                <></>)
            }</>
    )

}

export default Profile;
