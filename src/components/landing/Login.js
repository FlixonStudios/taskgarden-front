import React, {useState} from 'react';
import {Modal, Button, Form} from "react-bootstrap";
import axios from "axios";
import {useHistory} from "react-router-dom"

function Login({setAuth, show, setShow}) {
    // Modal Open/Close State
    const handleClose = () => setShow(false);

    // Auth State
    const [cred, setCred] = useState({})
    let history = useHistory()

    async function submit() {
        try {
            let {data: {token}} = await axios.post("/api/login", cred)
            localStorage.setItem("token", token)
            setAuth(true)
            setShow(false)
            history.push("/dashboard")
        } catch (e) {
            console.log(e)
        }
    }

    // Form Change
    function handleChange(e) {
        setCred(prevState => ({...prevState, [e.target.name] : e.target.value }))
    }

    return (
            <Modal className="" show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Log In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" type="email" placeholder="Enter email" onChange={handleChange}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" placeholder="Password" onChange={handleChange}/>
                        </Form.Group>

                        <Button variant="primary" onClick={submit} block>
                            Log In
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
    );
}

export default Login;
