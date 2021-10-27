import React, { useState, useContext } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { v4 as uuid } from "uuid";

export const AddUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const { addUser } = useContext(GlobalContext);
    const history = useHistory();
    // const onChange = (e) => {
    //     setName(e.target.value);
    // };
    const onSubmit = () => {
        const newUser = {
            id: uuid(),
            name,
            email,
        };
        addUser(newUser);
        history.push("/");
    };

    return (
        <Form onSubmit={onSubmit}>
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
