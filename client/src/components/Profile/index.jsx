import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminManagement from './adminMangment';
import MyLists from '../MyLists';
import TzunaiManagement from './TzunaiMangment';
import './styles.css';

const Profile = () => {
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [isTzunai, setTzunai] = useState(false);
    const [isAdmin, setAdmin] = useState(false);
    const [currentTab, setCurrentTab] = useState('profile');

    useEffect(() => {
        const userEmail = localStorage.getItem('email');
        fetchUser(userEmail);
    }, []);

    const fetchUser = async (userEmail) => {
        const urlEncodedEmail = encodeURIComponent(userEmail);
        try {
            const response = await axios.get(`http://localhost:3000/api/user/email/${urlEncodedEmail}`);
            setUser(response.data);
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setEmail(response.data.email);
            setTzunai(response.data.isTzunai);
            setAdmin(response.data.isAdmin);
        } catch (error) {
            console.log('fetchUser: ', error);
        }
    };

    const getUserRole = () => {
        if (isTzunai) return "תזונאי";
        if (isAdmin) return "מנהל";
        return "צרכן";
    };

    const renderContent = () => {
        if (currentTab === 'profile') {
            return <div>פרטי המשתמש</div>;
        } else if (currentTab === 'tasks') {
            return <div>משימות</div>;
        } else if (currentTab === 'calendar') {
            return <div>לוח שנה</div>;
        } else if (currentTab === 'files') {
            return <div>קבצים</div>;
        } else if (isTzunai && currentTab === 'tzunaiManagement') {
            return <TzunaiManagement firstName={firstName} lastName={lastName} />;
        } else if (isAdmin && currentTab === 'adminManagement') {
            return <AdminManagement />;
        } else if(isAdmin==false &&isTzunai==false && currentTab === 'MyLists'){
            return <MyLists />;
        }
    };

    return (
        <div className="Main-container">
            <div className="profile-sidebar">
                <div className="profile-card">
                    <img src="/start.jpg" alt="Profile" className="profile-pic" />
                    <h2>{firstName} {lastName}</h2>
                    <p className="profile-role">{getUserRole()}</p>
                </div>
                <div className="profile-menu">
                    <ul>
                        <li><Button variant="link" onClick={() => setCurrentTab('profile')}>פרופיל</Button></li>
                        <li><Button variant="link" onClick={() => setCurrentTab('tasks')}>משימות</Button></li>
                        <li><Button variant="link" onClick={() => setCurrentTab('calendar')}>לוח שנה</Button></li>
                        <li><Button variant="link" onClick={() => setCurrentTab('files')}>קבצים</Button></li>
                        {isTzunai && <li><Button variant="link" onClick={() => setCurrentTab('tzunaiManagement')}>ניהול תזונאי</Button></li>}
                        {isAdmin && <li><Button variant="link" onClick={() => setCurrentTab('adminManagement')}>ניהול מנהל</Button></li>}
                        {isAdmin==false && isTzunai==false && <li><Button variant="link" onClick={() => setCurrentTab('MyLists')}>הרשימות שלי</Button></li>}
                    </ul>
                </div>
            </div>
            <div className="profile-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default Profile;
