import React, {useEffect, useState} from 'react';
<<<<<<< HEAD
import {useSelector, useDispatch} from "react-redux";
import {getTaskList} from "../../store/actions/task.action";

function Dashboard(props) {
    const [taskList, setTaskList] = useState([])
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getTaskList())
    },[])
    let store = useSelector(state => state)
    console.log(store)

    return (
        <>
        <div>Dashboard</div>
        <div>Dashboard</div>
        <div>Dashboard</div>
=======
import {Button, Col, Container, Row, Toast} from "react-bootstrap";
import AddTask from "./AddTask";
import axios from "axios";

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
                        <Toast>
                            <Toast.Header>
                                <strong className="mr-auto">{task.name}</strong>
                                <small>{task.dateBy.split("T")[0]}</small>
                            </Toast.Header>
                            <Toast.Body>{task.category}</Toast.Body>
                        </Toast>
                    </Col>
                    ))}
                </Row>
            </Container>
>>>>>>> 32c070a36143db25d57330dd5b825a4ad5f96876
        </>
    );
}

export default Dashboard;
