import React from "react";
import { Navbar, Nav, NavItem, NavbarBrand, Container } from "reactstrap";
import { Link } from "react-router-dom";

export const Heading = () => {
    return (
        <Navbar color="dark" dark>
            <Container>
                <NavbarBrand href="/">My Team</NavbarBrand>
                <Nav>
                    <NavItem>
                        <Link className="btn btn-primary" to="/add">
                            Add User
                        </Link>
                    </NavItem>
                </Nav>
            </Container>
        </Navbar>
    );
};
