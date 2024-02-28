import "./styles.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const userEmail = localStorage.getItem('email');
        fetchUser(userEmail);
    }, []);

    async function fetchUser(userEmail) {
        const urlEncodedEmail = encodeURIComponent(userEmail);
        try {
            const response = await axios.get(`http://localhost:3000/api/user/email/${urlEncodedEmail}`);
            setUser(response.data);
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setemail(response.data.email);
            setpassword(response.data.email);
            setUserId(response.data._id);
        } catch (error) {
            console.log("fetchUser: ", error);
        }
    }

    return (
        <div className="profile">
            <div className="card_container">
                <div className="_card">
                    <h2>Edit Profile</h2>
                    <div className="form-group">
                        <p for="fname">First Name: {firstName}</p>
                        <p for="lname">Last Name: {lastName}</p>
                        <p for="lname">Email : {email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;