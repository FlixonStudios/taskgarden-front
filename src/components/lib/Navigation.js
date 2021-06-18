import React from 'react';
import {Navbar, Nav, Button} from "react-bootstrap";
import {NavLink} from "react-router-dom";

function Navigation({logout}) {
    return (
        <Navbar expand="lg" id="navbar">
            <Navbar.Brand id="navbarBrand" className="">Task Garden</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
                <Nav>
                    <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
                    <NavLink to="/garden" className="nav-link">Garden</NavLink>
                    <NavLink to="/florist" className="nav-link">Florist</NavLink>
                    <Button onClick={logout}>Logout</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Navigation;
