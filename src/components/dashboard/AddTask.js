import React, {useState} from 'react';
import {Button, Modal, Form, Container, Row, Col, ButtonGroup, ButtonToolbar} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddTask({addTaskShow, setAddTaskShow}) {
    // Add Task Modal
    const handleClose = () => setAddTaskShow(false); // Function to close Modal

    // Datepicker
    const [startDate, setStartDate] = useState(new Date());

    return (
        <Modal show={addTaskShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Task</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <Form>
                    <Form.Group>
                        <Form.Label>Task Title</Form.Label>
                        <Form.Control type="text" placeholder="Task Title" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" placeholder="Category" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Completed By</Form.Label>
                        <div><DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /></div>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Select Plant</Form.Label>
                        <Form.Control as="select">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </Form.Control>
                    </Form.Group>

                        <ButtonGroup aria-label="Basic example" size="lg">
                            <Button variant="secondary">Important Urgent</Button>
                            <Button variant="secondary">Important Not-Urgent</Button>
                        </ButtonGroup>
                    <br/>
                        <ButtonGroup aria-label="Basic example" size="lg">
                            <Button variant="secondary">Unimportant Urgent</Button>
                            <Button variant="secondary">Unimportant Not-Urgent</Button>
                        </ButtonGroup>
                    <br/>
                    <br/>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default AddTask;
