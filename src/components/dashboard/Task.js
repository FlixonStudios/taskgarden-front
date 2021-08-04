import React, {useEffect, useState} from 'react';
import {Button, Form, Toast} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {removeTask} from "../../store/actions/task.action";
import axios from "axios";


function Task({task, handleEditTask}) {
    const [showTask, setShowTask] = useState(true)
    const [done, setDone] = useState(false)

    const dispatch = useDispatch()

    const strikethrough = {
        textDecoration: "line-through"
    }

    let deleteBtnStyle = {
        border: "rgba(68,9,9, 1)",
        backgroundColor: "rgb(208,30,30)",
        borderRadius: "10px",
        boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
        height: "20px",
        width: "20px",
    }

    useEffect(()=>{
        if (task.status === "Completed") {
            setDone(true)
        }else{
            setDone(false)
        }
    },[task])

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

    function closeToast(e){
        e.stopPropagation()
        removeTaskFromScreen();
    }

    function handleDone(e){
        //setDone(!done)
        changeStatus()
        e.stopPropagation()
    }

    async function changeStatus(){
        try{
            let statusRes = await axios.get(`/api/tasks/done/${task._id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.token}`
                }
            })
            if (statusRes.data.payload === "Completed"){
                setDone(true)
            }else{
                setDone(false)
            }
        }catch(e){
            console.log(e)
        }
    }

    return (
            <Toast show={showTask} onClose={closeToast} >
                <Toast.Header closeButton={false}>
                    <strong style={done?{textDecoration: "line-through"}:{textDecoration: "none"}}
                            onClick={e=>handleEditTask(e,task)}
                            className={`mr-auto`}>
                        {task.name}
                    </strong>
                    <Form.Check className={"mr-1"} type={"checkbox"} onChange={handleDone} checked={done}/>
                    <Button variant={"danger"} size={"sm"} style={deleteBtnStyle} onClick={deleteTask}
                            className={"d-flex align-items-center justify-content-center"}>
                        X
                    </Button>
                </Toast.Header>

                {/*<Toast.Body>{task.category}</Toast.Body>*/}
            </Toast>
    );
}

export default Task;
