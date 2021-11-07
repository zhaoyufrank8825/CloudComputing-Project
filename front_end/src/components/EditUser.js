import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';

export const EditUser = (props) => {
    const [selectedUser, setSelectedUser] = useState({
        id: "",
        name: "",
    });
    const history = useHistory();
    const currentUserId = props.match.params.id;

    useEffect(() => {
        const getUser = async () => {
            const userId = currentUserId;
            const res = await axios.get(`https://us-central1-fir-functions-api-961bb.cloudfunctions.net/user/${userId}`);
            const user = res.data
            setSelectedUser(user);
        }
        getUser()
    }, [currentUserId]);

    const onChange = (e) => {
        setSelectedUser({
            ...selectedUser,
            [e.target.name]: e.target.value,
            [e.target.email]: e.target.value,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const userId = currentUserId;
        await axios.put(`https://us-central1-fir-functions-api-961bb.cloudfunctions.net/user/${userId}`,  selectedUser )
        
        history.push("/");
    };

    return (
        <Form onSubmit={onSubmit}>
            <h1>Edit User</h1>
            <FormGroup>
                <Label>Name</Label>
                <Input
                    type="text"
                    name="name"
                    onChange={onChange}
                    value={selectedUser.name}
                ></Input>
                <Label>Email</Label>
                <Input
                    type="email"
                    name="email"
                    onChange={onChange}
                    value={selectedUser.email}
                ></Input>
            </FormGroup>
            <Button type="submit">Update</Button>
            <Link to="/" className="btn btn-danger m-1">
                Cancel
            </Link>
        </Form>
    );
};

