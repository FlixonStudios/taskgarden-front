import React, {useState} from 'react';
import {Form, Toast} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {removeTask} from "../../store/actions/task.action";
import axios from "axios";


function Task({task, handleEditTask}) {
    const [showTask, setShowTask] = useState(true)
    const [done, setDone] = useState(false)
    const dispatch = useDispatch()

    const strikethrough = {
        textDecoration: "line-through"
    }

    function deleteTask(e){
        e.stopPropagation()
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

    function handleDone(e){
        setDone(!done)
        console.log(done)
        e.stopPropagation()
    }

    async function changeStatus(){
        
    }

    return (
            <Toast show={showTask} onClose={deleteTask} >

                <Toast.Header >
                    <strong style={done?{textDecoration: "line-through"}:{textDecoration: "none"}}
                            onClick={e=>handleEditTask(e,task)}
                            className={`mr-auto`}>
                        {task.name}
                    </strong>
                    <Form.Check type={"checkbox"} onChange={handleDone}/>
                </Toast.Header>

                {/*<Toast.Body>{task.category}</Toast.Body>*/}
            </Toast>
    );
}

export default Task;
