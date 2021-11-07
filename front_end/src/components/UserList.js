import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import axios from 'axios';

export const UserList = () => {

    const [users, setUsers] = useState([]);

    useEffect( () => {
        const getUsers = async () => {
            const res = await axios.get(`https://us-central1-fir-functions-api-961bb.cloudfunctions.net/user`);
            const users = res.data;
            setUsers(users);
        }
    
        getUsers()
    }, [users]);

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
