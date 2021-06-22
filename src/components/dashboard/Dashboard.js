import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Row, Toast} from "react-bootstrap";
import AddTask from "./AddTask";
import axios from "axios";
import moment from "moment";
import {useSelector, useDispatch} from "react-redux";
import {setTaskList} from "../../store/actions/task.action";
import {isAuth} from "../../lib/checks";
import Taskboard from "./Taskboard";

function Dashboard({auth, setAuth}) {
    // Add Task Modal
    const [addTaskShow, setAddTaskShow] = useState(false); // Modal appearance state

    const handleShow = () => setAddTaskShow(true); // Function to show Modal

    let tasks = useSelector(state => state.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(auth)
        isAuth().then(suc => setAuth(suc)).catch(err => setAuth(err))
        getTasks()
    }, [])

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

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add Task
            </Button>
            <AddTask addTaskShow={addTaskShow} setAddTaskShow={setAddTaskShow} getTasks={getTasks} />
            <Container>
                <Taskboard tasks={tasks}/>
            </Container>

        </>
    );
}

export default Dashboard;
