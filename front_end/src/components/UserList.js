import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import axios from 'axios';

// List the user in the firestore database, through the axios API call,
// We also do the remove function in here with the related user ID.
export const UserList = () => {

    const [users, setUsers] = useState([]);

    // list all the users get from database, when the users is changed, rerender the page.
    useEffect( () => {
        const getUsers = async () => {
            const res = await axios.get(`https://us-central1-fir-functions-api-961bb.cloudfunctions.net/user`);
            const users = res.data;
            setUsers(users);
        }
    
        getUsers()
    }, [users]);

    // Delete the user by sending the function to the backend.
    const removeUser = async (userId, e) => {
        e.preventDefault();
        await axios.delete(`https://us-central1-fir-functions-api-961bb.cloudfunctions.net/user/${userId}`)
    }

    return (
        <ListGroup className="mt-4">
            {users.length > 0 ? (
                <>
                    {users.map((user) => (
                        <ListGroupItem className="d-flex" key={user.id}>
                            <strong>{user.name}</strong>
                            <div className="ms-auto">
                                <Link
                                    to={`/edit/${user.id}`}
                                    color="warning"
                                    className="btn btn-warning m-1"
                                >
                                    Edit
                                </Link>
                                <Button
                                    onClick={(event) => removeUser(user.id, event)}
                                    color="danger"
                                >
                                    Delete
                                </Button>
                            </div>
                        </ListGroupItem>
                    ))}
                </>
            ) : (
                <h4 className="text-center">No Users</h4>
            )}
        </ListGroup>
    );
};
