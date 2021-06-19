import React, {useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import AddTask from "./AddTask";

function Dashboard(props) {
    // Add Task Modal
    const [addTaskShow, setAddTaskShow] = useState(false); // Modal appearance state
    const handleShow = () => setAddTaskShow(true); // Function to show Modal

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add Task
            </Button>
            <AddTask addTaskShow={addTaskShow} setAddTaskShow={setAddTaskShow} />
            <Container>
                <Row>
                    <Col>

                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Dashboard;
