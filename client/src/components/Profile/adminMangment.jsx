import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Form, InputGroup, FormControl } from 'react-bootstrap';
import './AdminManagement.css';

const AdminManagement = () => {
    const [users, setUsers] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        axios
            .get('http://localhost:3000/api/users/list')
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                console.log('Error: ' + err);
            });
    }, []);

    const handleUpdateTzunai = async (e) => {
        e.preventDefault();
        const userId = e.target.id;
        try {
            const url = "http://localhost:3000/api/user/tzunai/toggle";
            await axios.post(url, { id: userId });
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === userId ? { ...user, isTzunai: !user.isTzunai } : user
                )
            );
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleUpdateAdmin = async (userId) => {
        try {
            const url = "http://localhost:3000/api/user/admin/toggle";
            await axios.post(url, { id: userId });
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === userId ? { ...user, isAdmin: !user.isAdmin } : user
                )
            );
        } catch (error) {
            console.error("Error toggling Admin status:", error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            const url = `http://localhost:3000/api/user/delete/${userId}`;
            await axios.delete(url);
            setUsers(users.filter((user) => user._id !== userId));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const filteredUsers = users?.filter(user =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-management-container">
            <h1>ניהול משתמשים</h1>
            <InputGroup className="mb-3 search-bar">
                <FormControl
                    placeholder="חיפוש משתמש"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </InputGroup>
            {filteredUsers ? (
                <Table striped bordered hover className="user-table">
                    <thead>
                        <tr>
                            <th>שם</th>
                            <th>אימייל</th>
                            <th>תפקיד</th>
                            <th>פעולות</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user._id}>
                                <td>{user.firstName} {user.lastName}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Form.Check
                                        type="switch"
                                        checked={user.isTzunai}
                                        label="תזונאי"
                                        onClick={handleUpdateTzunai}
                                        id={user._id}
                                    />
                                    <Form.Check
                                        type="switch"
                                        checked={user.isAdmin}
                                        label="מנהל"
                                        onChange={() => handleUpdateAdmin(user._id)}
                                    />
                                </td>
                                <td>
                                    <Button variant="danger" onClick={() => handleDeleteUser(user._id)}>מחק משתמש</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p>אין משתמשים.</p>
            )}
        </div>
    );
};

export default AdminManagement;
