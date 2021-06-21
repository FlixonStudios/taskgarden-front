import React, {useState} from 'react';
import {Toast} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {removeTask} from "../../store/actions/task.action";
import axios from "axios";

function Task({task}) {
    const [showTask, setShowTask] = useState(true)

    let tasks = useSelector(state => state.tasks)
    const dispatch = useDispatch()


    function deleteTask(){
        removeTaskFromScreen();
        deleteTaskFromDB()
    }
    async function deleteTaskFromDB(){
        await axios.delete(`/api/tasks/delete/${task._id}`,{
            headers: {
                authorization: `Bearer ${localStorage.token}`
            }
        })
    }
    function removeTaskFromScreen() {
        setShowTask(false)
        dispatch(removeTask(task._id))
    }

    return (
            <Toast show={showTask} onClose={deleteTask}>
                <Toast.Header>
                    <strong className="mr-auto">{task.name}</strong>
                </Toast.Header>
                <Toast.Body>{task.category}</Toast.Body>
            </Toast>
    );
}

export default Task;