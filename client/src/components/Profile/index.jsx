import "./styles.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setemail] = useState("");
    const [isTzunai, setTzunai] = useState("");
    const [password, setpassword] = useState("");
    const [loction, setUserId] = useState(null);

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
          {/* Add your content here */}
          <p>Tzunai is true!</p>
        </>
      ) : (
        <>
          {/* Add content for the false case if needed */}
          <p>Tzunai is false!</p>
        </>
      )}

            </>
    )

}
export default Profile;
