import React from 'react';
import {Navbar, Nav, Button, Image} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import coinImg from "../../assets/img/pixel-art-bitcoin-gold-coin.png"

function Navigation({admin, logout, user}) {
    const logoutButtonStyle = {
        backgroundColor: "rgba(58, 70, 93, 1)",
        color: "white",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "5px",
        border: "none"
    }

    return (
        <Navbar expand="lg" id="navbar" className="p-0" style={{backgroundColor: "rgba(81, 163, 136, 1)"}}>
            <Navbar.Brand id="navbarBrand" style={{backgroundColor: "rgba(196, 196, 196, 0.3)"}}>
                <NavLink to="/" style={{fontSize: "2.5rem", textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}} className="py-0 px-5 nav-link text-white">Task Garden</NavLink>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" className="ml-5"/>
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                <Nav className="mx-4 align-items-center" style={{textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}>
                    {!admin &&
                        <>
                            <Nav.Item className="nav-link text-white">
                            <Image style={{width: "25px", height: "25px"}} src={coinImg} className="mr-1" />
                            {user ? user.coins : 0}
                            </Nav.Item>
                            <NavLink to="/dashboard" className="nav-link text-white">Dashboard</NavLink>
                            <NavLink to="/garden" className="nav-link text-white">Garden</NavLink>
                            <NavLink to="/florist" className="nav-link text-white">Florist</NavLink>
                        </>
                    }
                    <Button style={logoutButtonStyle} onClick={logout}>Logout</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Navigation;
