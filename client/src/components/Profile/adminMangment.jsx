import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Form } from 'react-bootstrap';

const AdminManagement = () => {

    const [users, setUsers] = useState(null);

    React.useEffect(() => {
        axios
            .get('http://localhost:3000/api/users/list')
            .then((res) => {
                setUsers(res.data)
            })
            .catch((err) => {
                console.log('Error: ' + err)
            })
    }, [setUsers])

    const handleUpdateTzunai = async (e) => {
        e.preventDefault();
        const userId = e.target.id;
        console.log(userId);
        try {
            const url = "http://localhost:3000/api/user/tzunai/toggle";
            await axios.post(url, {
                id: userId,
            });
            console.log(e.target);
            e.target.checked = !e.target.checked;
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            <h1>ניהול אדמין</h1>
            {users != null ?
                (
                    <>
                        <h2>טבלת המשתמשים</h2>
                        <div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>שם מלא</th>
                                        <th>אימייל</th>
                                        <th>האם תזונאי?</th>
                                        <th>האם מנהל?</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {users.map((user, index) => (
                                        <>
                                            <tr>
                                                <td>{index}</td>
                                                <td>{user.firstName} {user.lastName}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                    <Form.Check // prettier-ignore
                                                        type="switch"
                                                        checked={user.isTzunai}
                                                        label={user.isTzunai ? "כן" : "לא"}
                                                        onClick={handleUpdateTzunai}
                                                        id={user._id}
                                                    />
                                                </td>
                                                <td>
                                                    {user.isAdmin ? "כן" : "לא"}
                                                </td>
                                            </tr>

                                            {/* <Button id={user._id} onClick={handleUpdateTzunai}><h4>הפוך את {user.firstName} {user.lastName} לתזונאי</h4></Button> */}
                                            {/* <script>console.log({user._id});</script> */}
                                        </>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </>
                )
                : (<>
                    <h1>אין משתמשים עדיין...</h1>
                </>)}
        </>
    );
}

export default AdminManagement;