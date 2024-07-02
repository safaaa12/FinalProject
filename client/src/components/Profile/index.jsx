import "./styles.css";
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom"; // שימוש ב-useNavigate
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import AdminManagement from "./adminMangment";

function Profile() {
    const [data, setData] = useState({});
    const navigate = useNavigate(); // יצירת אינסטנס של useNavigate

    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setemail] = useState("");
    const [isTzunai, setTzunai] = useState("");
    const [isAdmin, setAdmin] = useState("");
    const [password, setpassword] = useState("");
    const [loction, setUserId] = useState(null);
    const [articleSuccess, setArticleSuccess] = useState("");
    const [recipeSuccess, setRecipeSuccess] = useState("");


    useEffect(() => {
        const userEmail = localStorage.getItem('email');
        fetchUser(userEmail);
    }, []);

    const handleArticleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataobj = Object.fromEntries(formData.entries());
        formDataobj.tzunaiName = firstName + " " + lastName;
        try {
            const url = "http://localhost:3000/api/article/add";
            const { data: res } = await axios.post(url, formDataobj);
            setArticleSuccess(true);
            e.target.reset();
        } catch (error) {
        }
    };

    const handleRecipeSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataobj = Object.fromEntries(formData.entries());
        formDataobj.tzunaiName = firstName + " " + lastName;
        try {
            const url = "http://localhost:3000/api/recipe/add";
            const { data: res } = await axios.post(url, formDataobj);
            setRecipeSuccess(true);
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
            setAdmin(response.data.isAdmin);
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
      ) :  (
        <></>)
    }
    {isAdmin ? (<>
        <AdminManagement />
    </>) : (<></>)}

</>
    )

}
export default Profile;
