import React from 'react';
import {Navbar, Nav, Button, Container, Image} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import coinImg from "../../assets/img/pixel-art-bitcoin-gold-coin.png"

function Navigation({admin, logout, user}) {

    return (
        <Navbar expand="lg" id="navbar">
            <Navbar.Brand id="navbarBrand">
                <NavLink to="/" className="nav-link text-dark">Task Garden</NavLink>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                <Nav className="mx-4 align-items-center">
                    {!admin &&
                        <>
                            <Image style={{width: "25px", height: "25px"}} src={coinImg} />
                            <Container className="pl-1">{user ? user.coins : 0}</Container>
                            <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
                            <NavLink to="/garden" className="nav-link">Garden</NavLink>
                            <NavLink to="/florist" className="nav-link">Florist</NavLink>
                        </>
                    }
                    <Button onClick={logout}>Logout</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Navigation;
