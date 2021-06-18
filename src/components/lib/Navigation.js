import React from 'react';
import {Navbar, Nav} from "react-bootstrap";

function Navigation(props) {
    return (
        <Navbar expand="lg" id="navbar">
            <Navbar.Brand href="#home" id="navbarBrand" className="">Task Garden</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
                <Nav>
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Navigation;
