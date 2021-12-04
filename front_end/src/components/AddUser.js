import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';

// Add user to the database, and redirect to the home page
export const AddUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const history = useHistory();

    // After getting all the input information, using RESTfull API post to save to the database.
    // Redirect to the home page.
    const onSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            name,
            email,
        };
        await axios.post(`https://us-central1-fir-functions-api-961bb.cloudfunctions.net/user`,  newUser )
        history.push("/");
    };

    return (
        <Form onSubmit={onSubmit}>
            <h1>Add New User</h1>
            <FormGroup>
                <Label>Name</Label>
                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Name"
                ></Input>
                <Label>Email</Label>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                ></Input>
            </FormGroup>
            <Button type="submit">Submit</Button>
            <Link to="/" className="btn btn-danger m-1">
                Cancel
            </Link>
        </Form>
    );
};
