import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Row, Toast} from "react-bootstrap";
import AddTask from "./AddTask";
import axios from "axios";
import moment from "moment";

function Dashboard(props) {
    // Add Task Modal
    const [addTaskShow, setAddTaskShow] = useState(false); // Modal appearance state
    const handleShow = () => setAddTaskShow(true); // Function to show Modal

    // Tasks State
    const [tasks, setTasks] = useState([])

    async function getTasks() {
        try {
            let {data:{tasks}} = await axios.get("/api/tasks", {
                headers: {
                    authorization: `Bearer ${localStorage.token}`
                }
            })
            setTasks(tasks)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getTasks()
    }, [])

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add Task
            </Button>
            <AddTask addTaskShow={addTaskShow} setAddTaskShow={setAddTaskShow} getTask={getTasks} />
            <Container>
                <Row>
                    {tasks.length > 0 && tasks.map(task => (
                    <Col md={4} key={task._id}>
                        <Toast onClose>
                            <Toast.Header>
                                <strong className="mr-auto">{task.name}</strong>
                                <small>{moment(task.dateBy).calendar(null, {sameElse: 'DD/MM/YY'})}</small>
                            </Toast.Header>
                            <Toast.Body>{task.category}</Toast.Body>
                        </Toast>
                    </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default Dashboard;
