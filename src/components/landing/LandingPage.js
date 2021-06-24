import React, {useState} from 'react';
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import forestImg from "../../assets/img/nP5HPw4.jpeg"
import Login from "./Login";
import Register from "./Register";

function LandingPage({auth, setAuth, setAdmin, setUser}) {
    const [loginShow, setLoginShow] = useState(false);
    const [registerShow, setRegisterShow] = useState(false);
    const handleLoginShow = () => setLoginShow(true);
    const handleRegisterShow = () => setRegisterShow(true);

    const bgImgStyle = {

        height: "100vh",
        width: "100%",
        position: "absolute",
        objectFit: "cover",
        objectPosition: "center",
        top: "56px",
        left: "0",
        zIndex: -1
    }

    const loginStyle = {
        backgroundColor: "rgba(81, 163, 136,0.7)",
        top: "30%",
        borderRadius: "25px",
        border: "solid rgba(24,71,57, 1)"
    }


    return (
        <div>
            <Image src={forestImg} style={bgImgStyle} fluid id="landingForest"/>
            <Row className="flex-grow-1">
                <Col className="bg-dark align-content-center">
                    <Container>
                        <Col className="text-white h1">
                            Task Garden
                        </Col>
                    </Container>
                </Col>
            </Row>
                <div style={{height: "100vh"}} className={"d-flex flex-column justify-content-around"}>

                    <Row className={"d-flex justify-content-center"}>
                        <Col lg={6} >
                        <Container style={loginStyle} className={"p-3"}>
                                <Row className={"justify-content-center mb-3"}>
                                    Have an Account? Sign in!
                                </Row>
                                <Row className="justify-content-center">
                                    <Button variant="primary" className="landingButton" onClick={handleLoginShow}>
                                        Sign in
                                    </Button>
                                </Row>
                                <Row className="justify-content-center mb-3 mt-3">
                                    If not, register here!

                                </Row>
                                <Row className="justify-content-center">
                                    <Button variant="primary" className="landingButton" onClick={handleRegisterShow}>
                                        Register
                                    </Button>
                                </Row>
                        </Container>
                        </Col>
                    </Row>

                    <Row></Row>
                    <Row></Row>
                </div>

            <Login show={loginShow} setShow={setLoginShow} setAuth={setAuth} setAdmin={setAdmin}/>
            <Register show={registerShow} setShow={setRegisterShow} setAuth={setAuth}/>
        </div>

    );
}

export default LandingPage;
