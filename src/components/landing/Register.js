import React, {useState} from 'react';
import {Modal, Button, Form} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import axios from "axios";

function Register({show, setShow, setAuth}) {
    const handleClose = () => setShow(false);
    const [cred, setCred] = useState({})
    let history = useHistory()

    async function submit() {
        try {
            let {data: {token}} = await axios.post("/api/register", cred)
            localStorage.setItem("token", token)
            setAuth(true)
            setShow(false)
            history.push("/dashboard")
        } catch (e) {
            console.log(e)
        }
    }

    function handleChange(e) {
        setCred(prevState => ({...prevState, [e.target.name] : e.target.value }))
    }

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" type="email" placeholder="Enter email" onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control name="username" type="text" placeholder="Enter Username" onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Password" onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control name="passwordConfirmation" type="password" placeholder="Password" onChange={handleChange}/>
                    </Form.Group>
                    <Button variant="primary" onClick={submit}>
                        Register
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default Register;
