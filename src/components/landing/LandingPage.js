import React, {useState} from 'react';
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import forestImg from "../../assets/img/nP5HPw4.jpeg"
import Login from "./Login";
import Register from "./Register";

function LandingPage({auth, setAuth, setUser}) {
    const [loginShow, setLoginShow] = useState(false);
    const [registerShow, setRegisterShow] = useState(false);
    const handleLoginShow = () => setLoginShow(true);
    const handleRegisterShow = () => setRegisterShow(true);

    return (
        <Row className="flex-grow-1">
            <Col xs={12} md={7} className="bg-dark align-content-center">
                <Row>
                    <Row className="text-center">
                        <Col className="text-white h1">Task Garden</Col>
                    </Row>
                    <Row>
                        <Col>
                            <Image src={forestImg} fluid id="landingForest"/>
                        </Col>
                    </Row>
                </Row>
            </Col>
            <Col xs={5} >
                <Col>
                    <Row >
                        <Col >
                            <Row className="justify-content-center">
                                Have an Account? Sign in!
                            </Row>
                            <Row className="justify-content-center">
                                <Button variant="primary" className="landingButton" onClick={handleLoginShow}>
                                    Sign in
                                </Button>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row className="justify-content-center">
                                If not, register here!
                            </Row>
                            <Row className="justify-content-center">
                                <Button variant="primary" className="landingButton" onClick={handleRegisterShow}>
                                    Register
                                </Button>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Col>
            <Login show={loginShow} setShow={setLoginShow} setAuth={setAuth}/>
            <Register show={registerShow} setShow={setRegisterShow} setAuth={setAuth}/>
        </Row>
    );
}

export default LandingPage;
