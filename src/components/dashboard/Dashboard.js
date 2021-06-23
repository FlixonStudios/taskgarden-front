import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import AddTask from "./AddTask";
import axios from "axios";
import {useSelector, useDispatch} from "react-redux";
import {setTaskList, setDailies} from "../../store/actions/task.action";
import {isAuth} from "../../lib/checks";
import Taskboard from "./Taskboard";
import DailiesBar from "./DailiesBar";

function Dashboard({auth, setAuth}) {
    // Add Task Modal
    const [addTaskShow, setAddTaskShow] = useState(false); // Modal appearance state
    const [daily, setDaily] = useState({mes: "Description"})
    const handleShow = () => setAddTaskShow(true); // Function to show Modal
    const addTaskButtonStyle = {
        width: "50px",
        fontSize: "2rem",
        color: "white",
        backgroundColor: "rgba(58, 70, 93, 1)",
        borderRadius: "50%",
    }

    let tasks = useSelector(state => state.tasks)
    let dailies = useSelector(state => state.dailies)
    const dispatch = useDispatch()

    useEffect(() => {
        isAuth().then(suc => setAuth(suc)).catch(err => setAuth(err))
        getTasks()
        getDailies()
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
    async function getDailies() {
        try {
            let dailyRes = await axios.get("/api/tasks/dailies", {
                headers: {
                    authorization: `Bearer ${localStorage.token}`
                }
            })
            let dailies = dailyRes.data.dailies
            dispatch(setDailies(dailies))
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <>
            {   dailies ?
                dailies.map((el,idx)=>(
                    <DailiesBar daily={el} key={idx} />
                )) : <div>Loading...</div>
            }

            <Container className="mr-3 my-2" style={addTaskButtonStyle} onClick={handleShow}>
                +
            </Container>
            <AddTask addTaskShow={addTaskShow} setAddTaskShow={setAddTaskShow} getTasks={getTasks} />
            <Container>
                <Taskboard tasks={tasks} getTasks={getTasks}/>
            </Container>
        </>
    );
}

export default Dashboard;
