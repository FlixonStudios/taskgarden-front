import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Row, Toast} from "react-bootstrap";
import AddTask from "./AddTask";
import axios from "axios";
import moment from "moment";
import {useSelector, useDispatch} from "react-redux";
import {setTaskList} from "../../store/actions/task.action";

function Dashboard(props) {
    // Add Task Modal
    const [addTaskShow, setAddTaskShow] = useState(false); // Modal appearance state
    const handleShow = () => setAddTaskShow(true); // Function to show Modal

    let tasks = useSelector(state => state.tasks)
    const dispatch = useDispatch()

    async function getTasks() {
        try {
            let {data} = await axios.get("/api/tasks", {
                headers: {
                    authorization: `Bearer ${localStorage.token}`
                }
            })
            dispatch(setTaskList(data.tasks))
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
            <AddTask addTaskShow={addTaskShow} setAddTaskShow={setAddTaskShow} getTasks={getTasks} />
            <Container>
                <Row>
                    {tasks.length > 0 && tasks.map(task => (
                    <Col md={4} key={task._id}>
                        <Toast onClose>
                            <Toast.Header>
                                <strong className="mr-auto">{task.name}</strong>
                                <small>Complete by: {moment(task.dateBy).calendar(null, {sameElse: 'DD/MM/YY'})}</small>
                            </Toast.Header>
                            <Toast.Body>
                                <h6>Category: {task.category}</h6>
                                <h6>{task.description}</h6>
                            </Toast.Body>
                        </Toast>
                    </Col>
                    ))}
                </Row>
            </Container>

        </>
    );
}

export default Dashboard;
